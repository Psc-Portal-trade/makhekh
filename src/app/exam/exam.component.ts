import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';

interface Question {
  id: number;
  text: string;
  options?: string[];
  isUnique?: boolean;
  // أي خصائص تانية
}

@Component({
  selector: 'app-exam',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TranslocoPipe],
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit, OnDestroy {
  
  quiz: any; // لتخزين بيانات الكويز
  quizIndex!: number; // لتخزين الـ index الخاص بالكويز
  currentPage: number = 1; // الصفحة الحالية
  questionsPerPage: number = 10; // عدد الأسئلة في كل صفحة
  totalPages: number = 1; // عدد الصفحات
  paginatedQuestions: any[] = []; // الأسئلة المعروضة في الصفحة الحالية
  timeLeft: number = 60 * 60; // 60 دقيقة = 3600 ثانية
  timer: any;
  minutes: number = 0;
  seconds: number = 0;


  answeredQuestionsCount: number = 0;
  unansweredQuestionsCount: number = 0;
  examDurationUsed: string = '';
  scorePercentage: number = 0;
  isPassed: boolean = false;
  attempts: number = 1; // تقدر تخزنيها في localStorage لو عايزة تحفظي المحاولات
  showExamResult: boolean = false;



  constructor(private route: ActivatedRoute, private router: Router,  private translocoService: TranslocoService
) { }
ngOnInit(): void {
  window.scrollTo(0, 0);

  const storedQuiz = localStorage.getItem('currentExam');

  if (!storedQuiz) {
    console.warn('⛔ لا يوجد امتحان محفوظ!');
    this.router.navigate(['/my-courses']);
    return;
  }

  try {
    this.quiz = JSON.parse(storedQuiz);

    // تحقق من وجود الأسئلة
    if (!this.quiz.questions || !Array.isArray(this.quiz.questions)) {
      console.error('❌ الكويز لا يحتوي على أسئلة!');
      this.router.navigate(['/my-courses']);
      return;
    }

    // تهيئة الأسئلة
    this.quiz.questions.forEach((q: any, index: number) => {
      q.id = index + 1;
      q.isUnique = false;
      q.studentAnswer = null;
    });

    // استخراج مدة الامتحان
    const durationInMinutes = this.quiz.timeLimitInMinutes || this.quiz.duration || 60;
    this.timeLeft = durationInMinutes * 60;

    this.totalPages = Math.ceil(this.quiz.questions.length / this.questionsPerPage);

    this.paginateQuestions();
    this.startTimer();

    console.log('✅ Quiz loaded:', this.quiz);
    console.log('✅ Questions:', this.quiz.questions);

  } catch (err) {
    console.error('❌ فشل في قراءة الامتحان من localStorage:', err);
    this.router.navigate(['/my-courses']);
  }
}


  onOptionSelected(question: any, selectedValue: string) {
    question.studentAnswer = selectedValue;
    console.log(`Answer selected for Q${question.id}: ${selectedValue}`);
  }


  // دالة لتحديث الأسئلة المعروضة بناءً على الصفحة الحالية
  paginateQuestions() {
    if (this.quiz?.questions?.length) {
      const startIndex = (this.currentPage - 1) * this.questionsPerPage;
      const endIndex = startIndex + this.questionsPerPage;
      this.paginatedQuestions = this.quiz.questions.slice(startIndex, endIndex); // لا نستخدم map هنا
    }
  }

  // دالة للتنقل بين الصفحات
  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.paginateQuestions();
    }
  }

  // دالة لتقديم الامتحان عند الضغط على "Submit"
submitExam() {
  clearInterval(this.timer);

  const totalDuration = (this.quiz.timeLimitInMinutes || 60) * 60;
  const usedDuration = totalDuration - this.timeLeft;

  const usedMinutes = Math.floor(usedDuration / 60);
  const usedSeconds = usedDuration % 60;

  // ترجمة الكلمات حسب اللغة الحالية
  const t = (key: string) => this.translocoService.translate(key);

  const minText = usedMinutes === 1 ? t('exam.minute') : t('exam.minutes');
  const secText = usedSeconds === 1 ? t('exam.second') : t('exam.seconds');
  const andText = t('exam.and');

  // تنسيق الوقت المستخدم
  if (usedMinutes > 0 && usedSeconds > 0) {
    this.examDurationUsed = `${usedMinutes} ${minText} ${andText} ${usedSeconds} ${secText}`;
  } else if (usedMinutes > 0) {
    this.examDurationUsed = `${usedMinutes} ${minText}`;
  } else {
    this.examDurationUsed = `${usedSeconds} ${secText}`;
  }

  let answeredCount = 0;

  // إنشاء نسخة من الأسئلة مع إجابات الطالب
  const answeredQuestions = this.quiz.questions.map((question: any) => {
    const studentAnswer = question.studentAnswer ?? null;

    if (studentAnswer !== null && studentAnswer !== undefined) {
      answeredCount++;
    }

    return {
      id: question.id,
      text: question.text,
      type: question.type,
      studentAnswer: studentAnswer,
      isUnique: question.isUnique || false,
      options: question.options || [],
      modelAnswer: question.modelAnswer ?? null
    };
  });

  this.answeredQuestionsCount = answeredCount;
  this.unansweredQuestionsCount = this.quiz.questions.length - answeredCount;
  this.scorePercentage = (answeredCount / this.quiz.questions.length) * 100;
  this.isPassed = this.scorePercentage >= 50;

  // إعداد محاولة الامتحان
  const attemptData = {
    id: Date.now(), // ID فريد للمحاولة
    quizId: this.quiz.id,
    quizTitle: this.quiz.title,
    courseId: this.quiz.courseId,
    courseTitle: this.quiz.courseTitle,
    timeUsed: this.examDurationUsed,
    answered: this.answeredQuestionsCount,
    unanswered: this.unansweredQuestionsCount,
    percentage: this.scorePercentage,
    passed: this.isPassed,
    timestamp: new Date().toISOString(),
    questions: answeredQuestions
  };

  // ✅ التأكد من أن examAttempts مصفوفة
  let previousAttempts: any[] = [];

  try {
    const attemptsFromStorage = JSON.parse(localStorage.getItem('examAttempts') || '[]');
    if (Array.isArray(attemptsFromStorage)) {
      previousAttempts = attemptsFromStorage;
    } else {
      console.warn('⚠️ examAttempts is not an array. Reinitializing...');
    }
  } catch (error) {
    console.error('❌ Failed to parse examAttempts:', error);
  }

localStorage.setItem('examAttempts', JSON.stringify(attemptData)); // ✅ صحيح

  this.showExamResult = true;

  console.log('✅ Saved Exam Attempt:', attemptData);
}




  goToExamResult() {
    this.router.navigate(['/exam-result'], {
      state: { quiz: this.quiz }
    });

  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  startTimer(): void {
    this.timer = setInterval(() => {
      if (this.timeLeft <= 0) {
        this.endExam();
      } else {
        this.timeLeft--;
        this.minutes = Math.floor(this.timeLeft / 60);
        this.seconds = this.timeLeft % 60;
      }
    }, 1000);
  }


  endExam(): void {
    clearInterval(this.timer);
    // إعادة التوجيه إلى صفحة الداشبورد بعد انتهاء الامتحان
    this.router.navigate(['/my-courses']);
  }






  uniqueQuestions: Question[] = [];
  toggleUnique(question: Question): void {
    question.isUnique = !question.isUnique;

    if (question.isUnique) {
      // أضف السؤال للـ uniqueQuestions لو مش موجود
      const exists = this.uniqueQuestions.some(q => q.id === question.id);
      if (!exists) {
        this.uniqueQuestions.push(question);
        console.log(`Question ${question.id} added to uniqueQuestions`);
      }
    } else {
      // احذفه لو المستخدم لغى التحديد
      this.uniqueQuestions = this.uniqueQuestions.filter(q => q.id !== question.id);
      console.log(`Question ${question.id} removed from uniqueQuestions`);
    }

    console.log('Unique questions:', this.uniqueQuestions);
  }






}
