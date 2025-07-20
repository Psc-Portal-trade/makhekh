import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmFinishPopupComponent } from '../course-exams/confirm-finish-popup.component';
import { ExamSummaryModalComponent } from '../course-exams/exam-summary-modal.component';
import { SecondNavComponent } from '../navbar/second-nav/second-nav.component';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CourseInformationService } from '../services/course-information.service';


// Interface for our question model
interface Question {
  id: string;
  text: string;
  options?: string[];
  type: 'mcq' | 'essay';
  answer: string;
  isFlagged: boolean;
  isAnswered: boolean;
}



@Component({
  selector: 'app-course-exam',
  imports: [CommonModule, SecondNavComponent, ExamSummaryModalComponent, ConfirmFinishPopupComponent],
  templateUrl: './course-exam.component.html',
  styleUrl: './course-exam.component.css'
})
export class CourseExamComponent implements OnInit, OnDestroy {
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


async ngOnInit(): Promise<void> {
  this.courseId = this.courseInfoService.getSelectedCourseId();
  this.selectedQuiz = this.courseInfoService.getSelectedQuiz();

  console.log('📌 Course ID:', this.courseId);
  console.log('📝 Selected Quiz:', this.selectedQuiz);

  if (this.selectedQuiz && this.selectedQuiz.questions?.length > 0) {
    this.questions = this.selectedQuiz.questions.map((q: any) => ({
      id: q.id,
      text: q.text,
      type: q.type === 1 ? 'mcq' : 'essay',
      options: q.choices?.map((c: any) => c.text) || [],
      answer: '',
      isFlagged: false,
      isAnswered: false
    }));

    this.currentQuestionIndex = 0;
    this.currentQuestion = this.questions[0];
    this.totalTimeInSeconds = this.selectedQuiz.timeLimitInMinutes * 60;
    this.startTimer();
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
  }

  startTimer() {
    this.updateDisplayTime(); // Initial display

    this.timerInterval = setInterval(() => {
      this.totalTimeInSeconds--;
      this.updateDisplayTime();

      if (this.totalTimeInSeconds <= 0) {
        this.finishAttempt();
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
    // For essay, the whole event is passed, so we get the value
    const value = this.currentQuestion.type === 'essay' ? answer.target.value : answer;

    // Get the actual question from the questions array to modify it directly
    const questionToUpdate = this.questions[this.currentQuestionIndex];

    if (value && value.trim() !== '') {
      questionToUpdate.isAnswered = true;
      questionToUpdate.answer = value;
    } else {
      questionToUpdate.isAnswered = false;
      questionToUpdate.answer = '';
    }

    // Ensure the currentQuestion reflects the change for immediate UI updates
    this.currentQuestion = questionToUpdate;
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
    // Route to results page
    this.router.navigate(['/course-exams-results']);
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

}
