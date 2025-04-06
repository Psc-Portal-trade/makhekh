import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslocoPipe } from '@ngneat/transloco';

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
  imports: [CommonModule, RouterModule, TranslocoPipe],
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



  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const state = this.router.getCurrentNavigation()?.extras.state || history.state;
    console.log('ExamComponent: Checking state:', state);

    if (state && state.quiz && state.quizIndex !== undefined) {
      this.quiz = state.quiz;
      this.quizIndex = state.quizIndex;
      console.log('Quiz data received:', this.quiz);
      console.log('Quiz Index received:', this.quizIndex);

      this.quiz.questions.forEach((q: any, index: number) => {
        q.id = index + 1;
      });

      this.totalPages = Math.ceil(this.quiz.questions.length / this.questionsPerPage);
      this.timeLeft = this.quiz.duration * 60;
      this.paginateQuestions();
      this.startTimer();
    } else {
      console.warn('No quiz data found, redirecting...');
      this.router.navigate(['/my-courses']);
    }
  }


  // دالة لتحديث الأسئلة المعروضة بناءً على الصفحة الحالية
  paginateQuestions() {
    if (this.quiz?.questions?.length) {
      const startIndex = (this.currentPage - 1) * this.questionsPerPage;
      const endIndex = startIndex + this.questionsPerPage;
      this.paginatedQuestions = this.quiz.questions.slice(startIndex, endIndex).map((q:Question) => ({
        ...q,
        isUnique: q.isUnique ?? false
      }));
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
    // إيقاف التايمر
    clearInterval(this.timer);

    // نحسب الوقت المستخدم
    const totalDuration = this.quiz.duration * 60; // بالسكوند
    const usedDuration = totalDuration - this.timeLeft;
    const usedMinutes = Math.floor(usedDuration / 60);
    const usedSeconds = usedDuration % 60;
    this.examDurationUsed = `${usedMinutes} min : ${usedSeconds} sec`;

    // نحسب عدد الأسئلة المُجابة
    const allQuestions = this.quiz.questions;
    let answeredCount = 0;

    allQuestions.forEach((question: any) => {
      const selectedOption = document.querySelector(
        `input[name="question-${question.text}-${question.id}"]:checked`
      );
      if (selectedOption) answeredCount++;
    });

    this.answeredQuestionsCount = answeredCount;
    this.unansweredQuestionsCount = allQuestions.length - answeredCount;

    // نحسب نسبة النجاح (مثلاً كل سؤال بدرجة واحدة)
    this.scorePercentage = (answeredCount / allQuestions.length) * 100;
    this.isPassed = this.scorePercentage >= 50;

    // عدد المحاولات من localStorage
    const storedAttempts = localStorage.getItem('examAttempts');
    if (storedAttempts) {
      this.attempts = Number(storedAttempts) + 1;
    }
    localStorage.setItem('examAttempts', this.attempts.toString());

    // نعرض النتيجة
    this.showExamResult = true;

    console.log('Exam submitted!');
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
