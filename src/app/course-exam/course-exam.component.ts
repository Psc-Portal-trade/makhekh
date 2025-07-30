import { CommonModule } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ConfirmFinishPopupComponent } from '../course-exams/confirm-finish-popup.component';
import { ExamSummaryModalComponent } from '../course-exams/exam-summary-modal.component';
import { SecondNavComponent } from '../navbar/second-nav/second-nav.component';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CourseInformationService } from '../services/course-information.service';
import { TranslocoPipe } from '@ngneat/transloco';


// Interface for our question model
interface Answer {
  questionId: string;
  selectedOptionId?: string;
  essayAnswer?: string;
  isUnique?: boolean; // Mapped from isFlagged
}

interface Choice {
  id: string;
  text: string;
}

interface Question {
  id: string;
  text: string;
  choices?: Choice[];
  type: 'mcq' | 'essay';
  answer: string; // For essay, this will be the text. For MCQ, it will be the selectedOptionId.
  isFlagged: boolean;
  isAnswered: boolean;
}



@Component({
  selector: 'app-course-exam',
  imports: [CommonModule, SecondNavComponent, ExamSummaryModalComponent, ConfirmFinishPopupComponent,TranslocoPipe],
  templateUrl: './course-exam.component.html',
  styleUrl: './course-exam.component.css',
  
})
export class CourseExamComponent implements OnInit, OnDestroy {
  isCourseSidebarOpen = true;

  toggleCourseSidebar() {
    this.isCourseSidebarOpen = !this.isCourseSidebarOpen;
  }
  


  // بيانات الكورس
  courseData: any = null;
  // الأقسام بشكل متداخل مع منطق toggle
  nestedSections: any[] = [];

  // Modal and popup state
  isSummaryModalOpen: boolean = false;
  isConfirmPopupOpen: boolean = false;
  answeredCount: number = 0;
  unansweredCount: number = 0;
courseId: string | null = null;
  selectedQuiz: any = null;
  constructor(private router: Router,private courseInfoService: CourseInformationService,
    private http: HttpClient) {}


  isNavOpen = true; // Sidebar is open by default
  currentQuestionIndex = 0;
  currentQuestion!: Question;

  // Timer properties
  private timerInterval: any;
  private totalTimeInSeconds: number = 60; // 20 minutes
  displayTime: string = '01:00';

  // Mock data for questions
questions: Question[] = [];
pausedAttemptData: any = null;


async ngOnInit(): Promise<void> {
  window.scrollTo(0, 0);
  this.courseId = this.courseInfoService.getSelectedCourseId();
  this.selectedQuiz = this.courseInfoService.getSelectedQuiz();

  console.log('📌 Course ID:', this.courseId);
  console.log('📝 Selected Quiz:', this.selectedQuiz);

  const attemptId = this.courseInfoService.getAttemptId();
  if (attemptId) {
    const key = `resume_attempt_data_${attemptId}`;
    const stored = localStorage.getItem(key);
  
    if (stored) {
      const resumedData = JSON.parse(stored);
      console.log('📥 Resumed data loaded from localStorage:', resumedData);
      this.loadResumedAttempt(resumedData);
      return;
    }
  }
  

  if (this.selectedQuiz && this.selectedQuiz.questions?.length > 0) {
    this.questions = this.selectedQuiz.questions.map((q: any) => ({
      id: q.id,
      text: q.text,
      type: q.type === 1 ? 'mcq' : 'essay',
      choices: q.choices?.map((c: any) => ({ id: c.id, text: c.text })) || [],
      answer: '',
      isFlagged: false,
      isAnswered: false
    }));

    this.currentQuestionIndex = 0;
    this.currentQuestion = this.questions[0];
    this.totalTimeInSeconds = this.selectedQuiz.timeLimitInMinutes * 60;

    // لو في محاولة موقوفة (paused) نكملها
    await this.checkForPausedAttempt();
  } else {
    console.warn('⚠️ No questions found in selected quiz.');
  }

  if (this.courseId) {
    await this.fetchCourseData();
    this.getCourseDetails(this.courseId);
  } else {
    console.error('❌ No Course ID found in CourseInformationService');
  }
}



loadResumedAttempt(data: any): void {
  this.totalTimeInSeconds = (data.remainingTimeInMinutes || 0) * 60;
  console.log(`⏳ Resumed Timer: ${this.totalTimeInSeconds} seconds (${data.remainingTimeInMinutes} minutes)`);

  this.questions = data.questions.map((q: any) => {
    const answer = data.studentAnswers.find((a: any) => a.questionId === q.id);
    return {
      id: q.id,
      text: q.text,
      type: q.type === 1 ? 'mcq' : 'essay',
      choices: q.choices?.map((c: any) => ({ id: c.id, text: c.text })) || [],
      answer: answer?.selectedOptionId || answer?.essayAnswer || '',
      isFlagged: answer?.isUnique || false,
      isAnswered: !!(answer?.selectedOptionId || answer?.essayAnswer)
    };
  });

  console.log('📝 Loaded Questions after resume:', this.questions);

  this.currentQuestionIndex = 0;
  this.currentQuestion = this.questions[0];
  this.startTimer();
}




  getCourseDetails(id: string) {
    const url = `https://api.makhekh.com/api/Courses/${id}`;
    this.http.get<any>(url).subscribe({
      next: (res) => {
        this.courseData = res.data;
        console.log('📘 Course Data:', this.courseData);
      },
      error: (err) => {
        console.error('❌ Error fetching course details:', err);
      }
    });
  }
  ngOnDestroy(): void {
    // Clear the interval when the component is destroyed to prevent memory leaks
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    // this.pauseAttempt(); // Pause the attempt when the component is destroyed
  }

  // @HostListener('window:beforeunload', ['$event'])
  // unloadNotification($event: any): void {
  //   this.pauseAttempt();
  // }

  // @HostListener('window:offline', ['$event'])
  // onOffline($event: any): void {
  //   this.pauseAttempt();
  // }

  // pauseAttempt(): void {
  //   const attemptId = this.courseInfoService.getAttemptId();
  //   if (!attemptId || !this.questions || this.questions.length === 0) {
  //     return; // No attempt or questions to save
  //   }

  //   const answers = this.questions
  //     .filter(q => q.isAnswered)
  //     .map(q => {
  //       const answer: Answer = {
  //         questionId: q.id,
  //         isUnique: q.isFlagged, // Assuming isUnique maps to isFlagged
  //       };

  //       if (q.type === 'mcq') {
  //         answer.selectedOptionId = q.answer;
  //       } else {
  //         answer.essayAnswer = q.answer;
  //       }

  //       return answer;
  //     });

  //   if (answers.length === 0) {
  //     return; // No answered questions to save
  //   }

  //   const url = `https://api.makhekh.com/api/student/quizzes/${attemptId}/pause`;
  //   const body = answers;

  //   // Use sendBeacon for reliability on unload, fallback to post
  //   if (navigator.sendBeacon) {
  //     const blob = new Blob([JSON.stringify(body)], { type: 'application/json' });
  //     navigator.sendBeacon(url, blob);
  //     console.log('✅ Exam progress saved via sendBeacon.');
  //   } else {
  //     // Synchronous request as a fallback for older browsers during unload
  //     const request = new XMLHttpRequest();
  //     request.open('POST', url, false); // `false` makes the request synchronous
  //     request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  //     request.send(JSON.stringify(body));
  //     console.log('✅ Exam progress saved via synchronous XHR.');
  //   }
  // }

  async checkForPausedAttempt(): Promise<void> {
    const attemptId = this.courseInfoService.getAttemptId();
    if (!attemptId) {
      console.log('🆕 No attempt ID found, starting new attempt.');
      this.startTimer();
      return;
    }

    try {
      const userStr = localStorage.getItem('user');
      let token = '';
      if (userStr) {
        const user = JSON.parse(userStr);
        token = user.token;
      }

      // Check if there's a paused attempt
      const response = await fetch(`https://api.makhekh.com/api/student/quizzes/attempts/${attemptId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        
        // Check if the attempt is paused and has saved data
        if (data.success && data.data && data.data.status === 'paused') {
          console.log('🔄 Found paused attempt, resuming...');
          await this.resumePausedAttempt(data.data);
        } else {
          console.log('🆕 No paused attempt found, starting new attempt.');
          this.startTimer();
        }
      } else {
        console.log('🆕 Could not fetch attempt data, starting new attempt.');
        this.startTimer();
      }
    } catch (error) {
      console.error('❌ Error checking for paused attempt:', error);
      console.log('🆕 Starting new attempt due to error.');
      this.startTimer();
    }
  }

  async resumePausedAttempt(attemptData: any): Promise<void> {
    try {
      // Restore remaining time
      if (attemptData.remainingTimeInSeconds) {
        this.totalTimeInSeconds = attemptData.remainingTimeInSeconds;
        console.log(`⏰ Resuming with ${this.totalTimeInSeconds} seconds remaining.`);
      }

      // Restore saved answers
      if (attemptData.answers && attemptData.answers.length > 0) {
        attemptData.answers.forEach((savedAnswer: any) => {
          const question = this.questions.find(q => q.id === savedAnswer.questionId);
          if (question) {
            if (question.type === 'mcq') {
              question.answer = savedAnswer.selectedOptionId || '';
            } else {
              question.answer = savedAnswer.essayAnswer || '';
            }
            question.isAnswered = !!question.answer;
            question.isFlagged = savedAnswer.isUnique || false;
          }
        });
        console.log(`📝 Restored ${attemptData.answers.length} saved answers.`);
      }

      // Update current question to reflect restored data
      this.currentQuestion = { ...this.questions[this.currentQuestionIndex] };
      
      // Start timer with remaining time
      this.startTimer();
      
      console.log('✅ Successfully resumed paused attempt.');
    } catch (error) {
      console.error('❌ Error resuming paused attempt:', error);
      console.log('🆕 Starting new attempt due to resume error.');
      this.startTimer();
    }
  }

  startTimer() {
    console.log(`▶️ Starting timer with ${this.totalTimeInSeconds} seconds`);
  
    this.updateDisplayTime(); // Initial display
    this.timerInterval = setInterval(() => {
      this.totalTimeInSeconds--;
      this.updateDisplayTime();
  
      if (this.totalTimeInSeconds <= 0) {
        clearInterval(this.timerInterval);
        this.autoSubmitExam();
      }
    }, 1000);
  }
  
  

  updateDisplayTime() {
    const minutes = Math.floor(this.totalTimeInSeconds / 60);
    const seconds = this.totalTimeInSeconds % 60;
    this.displayTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  toggleNav() {
    this.isNavOpen = !this.isNavOpen;
  }

  goToQuestion(index: number) {
    this.currentQuestionIndex = index;
    this.currentQuestion = this.questions[index];
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.currentQuestion = this.questions[this.currentQuestionIndex];
    }
  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.currentQuestion = this.questions[this.currentQuestionIndex];
    }
  }

  toggleFlag() {
    this.currentQuestion.isFlagged = !this.currentQuestion.isFlagged;
  }

  selectAnswer(answer: any) {
    const questionToUpdate = this.questions[this.currentQuestionIndex];

    if (questionToUpdate.type === 'essay') {
      const value = answer.target.value;
      questionToUpdate.answer = value;
      questionToUpdate.isAnswered = value.trim() !== '';
    } else {
      // For MCQ, 'answer' is the choice ID
      const value = answer;
      questionToUpdate.answer = value;
      questionToUpdate.isAnswered = !!value;
    }

    // Ensure the currentQuestion reflects the change for immediate UI updates
    this.currentQuestion = { ...questionToUpdate };
  }

  clearChoice() {
    const questionToUpdate = this.questions[this.currentQuestionIndex];
    questionToUpdate.answer = '';
    questionToUpdate.isAnswered = false;

    // Ensure the currentQuestion reflects the change for immediate UI updates
    this.currentQuestion = { ...questionToUpdate };
  }

  finishAttempt() {
    // Stop the timer
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    // احسب عدد الأسئلة المجابة وغير المجابة
    this.answeredCount = this.questions.filter(q => q.isAnswered).length;
    this.unansweredCount = this.questions.length - this.answeredCount;
    // افتح ملخص الأسئلة
    this.isSummaryModalOpen = true;
  }

  onRequestFinishAttempt() {
    this.isSummaryModalOpen = false;
    this.answeredCount = this.questions.filter(q => q.isAnswered).length;
    this.unansweredCount = this.questions.length - this.answeredCount;
    this.isConfirmPopupOpen = true;
  }

    onConfirmFinishAttempt() {
    this.isConfirmPopupOpen = false;

    const attemptId = this.courseInfoService.getAttemptId();
    if (!attemptId) {
      console.error('❌ Attempt ID not found!');
      // ربما عرض رسالة خطأ للمستخدم
      return;
    }

    const answers = this.questions.map(q => {
      const answer: Answer = {
        questionId: q.id,
        isUnique: q.isFlagged, // Assuming isUnique maps to isFlagged
      };

      if (q.type === 'mcq') {
        answer.selectedOptionId = q.answer;
      } else {
        answer.essayAnswer = q.answer;
      }

      return answer;
    });

    const body = {
      attemptId: attemptId,
      answers: answers
    };

        const url = 'https://api.makhekh.com/api/student/quizzes/submit';

    console.log('Submitting exam with body:', body);

    this.http.post(url, body).subscribe({
      next: (res) => {
        console.log('✅ Exam submitted successfully:', res);
        // Route to results page
        this.courseInfoService.clearResumeData();

        this.router.navigate(['/course-exams-results']);
      },
      error: (err) => {
        console.error('❌ Error submitting exam:', err);
        // ربما عرض رسالة خطأ للمستخدم
      }
    });
  }

  
  onCancelFinishAttempt() {
    this.isConfirmPopupOpen = false;
  }

  onCloseSummaryModal() {
    this.isSummaryModalOpen = false;
  }

  // جلب بيانات الكورس من الـ API مع التوكن
async fetchCourseData() {
  try {
    const userStr = localStorage.getItem('user');
    let token = '';
    if (userStr) {
      const user = JSON.parse(userStr);
      token = user.token;
    }

    // ✅ استخدم courseId من الخاصية
    const courseId = this.courseId;

    if (!courseId) {
      console.warn('❗ Course ID is not available for fetchCourseData()');
      return;
    }

    const response = await fetch(`https://api.makhekh.com/api/Courses/${courseId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (data && data.success) {
      this.courseData = data.data;
      this.nestedSections = this.buildNestedSections(this.courseData.sections);
    }
  } catch (error) {
    console.error('❌ خطأ في جلب بيانات الكورس:', error);
  }
}

  // بناء الأقسام بشكل متداخل مع منطق toggle
  buildNestedSections(sections: any[]): any[] {
    if (!sections) return [];
    return sections.map(section => ({
      ...section,
      isOpen: false,
      subSections: section.subSections ? this.buildNestedSections(section.subSections) : [],
      lectures: section.lectures || [],
      contentItems: section.contentItems || []
    }));
  }

  // toggle لفتح/غلق أي قسم
  toggleSection(section: any) {
    section.isOpen = !section.isOpen;
  }


  async autoSubmitExam(): Promise<void> {
    const attemptId = this.courseInfoService.getAttemptId();
    if (!attemptId) {
      console.error('❌ Attempt ID not found for auto-submit!');
      return;
    }
  
    const answers = this.questions.map(q => {
      const answer: Answer = {
        questionId: q.id,
        isUnique: q.isFlagged,
      };
  
      if (q.type === 'mcq') {
        answer.selectedOptionId = q.answer;
      } else {
        answer.essayAnswer = q.answer;
      }
  
      return answer;
    });
  
    const body = {
      attemptId: attemptId,
      answers: answers
    };
  
    const userStr = localStorage.getItem('user');
    let token = '';
    if (userStr) {
      const user = JSON.parse(userStr);
      token = user.token;
    }
  
    const url = `https://api.makhekh.com/api/student/quizzes/${attemptId}/auto-submit`;
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log('✅ Auto-submit successful:', result);
        this.router.navigate(['/course-exams-results']);
      } else {
        console.error('❌ Auto-submit failed:', response.statusText);
      }
    } catch (error) {
      console.error('❌ Error during auto-submit:', error);
    }
  }
  
  async handleBackToExams(): Promise<void> {
    const attemptId = this.courseInfoService.getAttemptId();
    if (!attemptId || !this.questions || this.questions.length === 0) {
      this.router.navigate(['/course-exams']);
      return;
    }
  
    const answers = this.questions
      .filter(q => q.isAnswered)
      .map(q => {
        const answer: Answer = {
          questionId: q.id,
          isUnique: q.isFlagged,
        };
  
        if (q.type === 'mcq') {
          answer.selectedOptionId = q.answer;
        } else {
          answer.essayAnswer = q.answer;
        }
  
        return answer;
      });
  
    if (answers.length === 0) {
      // مفيش إجابات، هنرجع من غير ما نبعت API
      this.router.navigate(['/course-exams']);
      return;
    }
  
    const url = `https://api.makhekh.com/api/student/quizzes/${attemptId}/pause`;
    const userStr = localStorage.getItem('user');
    let token = '';
    if (userStr) {
      const user = JSON.parse(userStr);
      token = user.token;
    }
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(answers)
      });
  
      if (response.ok) {
        console.log('✅ Attempt paused successfully.');
      } else {
        console.warn('⚠️ Failed to pause attempt, navigating anyway.');
      }
  
      this.router.navigate(['/course-exams']);
  
    } catch (error) {
      console.error('❌ Error while pausing attempt:', error);
      this.router.navigate(['/course-exams']); // Navigation happens anyway
    }
  }
  


}
