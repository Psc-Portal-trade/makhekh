import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CourseInformationService } from '../services/course-information.service';
import { CommonModule } from '@angular/common';
import { SecondNavComponent } from "../navbar/second-nav/second-nav.component";
import { ExamReviewService } from '../services/exam-review.service';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-course-exam-result',
  standalone: true,
  imports: [CommonModule, SecondNavComponent, RouterLink, TranslocoPipe],
  templateUrl: './course-exam-result.component.html',
  styleUrls: ['./course-exam-result.component.css']
})
export class CourseExamResultComponent implements OnInit {
  selectedQuiz: any = null;
  selectedCourse: any = null;
  quizToReview: any;
  quizzesList: any[] = [];
  isDataLoaded: boolean = false;

  constructor(
    private courseInformationService: CourseInformationService,
    private router: Router,
    private examReviewService: ExamReviewService,
    private translocoService: TranslocoService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);

    this.selectedCourse = this.courseInformationService.getCourse();
    this.selectedQuiz = this.courseInformationService.getSelectedQuiz();
    this.quizToReview = this.examReviewService.getCurrentQuiz();
    this.quizzesList = this.examReviewService.getFilteredQuizzes();

    if (this.selectedQuiz?.attempts?.length) {
      this.selectedQuiz.attempts.sort((a: any, b: any) =>
        new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
      );
    }

    const storedCourseId = localStorage.getItem('selectedCourseId');
    if (storedCourseId) {
      this.fetchCourseFromApi(storedCourseId);
    } else {
      this.finalizeLoading();
    }

    console.log('🔍 Quiz to review:', this.quizToReview);
    console.log('📚 Filtered list:', this.quizzesList);
  }

  fetchCourseFromApi(courseId: string): void {
    const url = `https://api.makhekh.com/api/Courses/${courseId}`;
    this.http.get<any>(url).subscribe({
      next: (res) => {
        this.selectedCourse = res.data;
        console.log('✅ Course data fetched from API:', this.selectedCourse);
        this.finalizeLoading();
      },
      error: (err) => {
        console.error('❌ Error fetching course data:', err);
        this.finalizeLoading(); // حتى في حال الخطأ لتجنب توقف الكومبوننت
      }
    });
  }

  finalizeLoading(): void {
    this.isDataLoaded = true;
  }

  formatDuration(start: string, end: string): string {
    if (!start || !end) return '-';
    const startTime = new Date(start);
    const endTime = new Date(end);
    const diffMs = endTime.getTime() - startTime.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const mins = diffMins % 60;
    const hours = Math.floor(diffMins / 60);
    return `${hours}س ${mins}د`;
  }

  reviewAttempt(attempt: any): void {
    this.examReviewService.setCurrentAttempt(attempt);
    localStorage.setItem('currentAttempt', JSON.stringify(attempt));
    this.router.navigate(['/view-attempt']);
  }

  goBack(): void {
    this.router.navigate(['/course-exams-results']);
  }

  restartQuiz() {
    if (this.quizToReview) {
      this.examReviewService.startExam(this.quizToReview);
    }
  }

  get remainingAttempts(): number {
    if (!this.quizToReview) return 0;
    return Math.max(
      0,
      (this.quizToReview.attemptsAllowed ?? 0) - (this.quizToReview.studentAttemptsNumber ?? 0)
    );
  }

  getCorrectAnswersCount(attempt: any): number {
    if (!this.quizToReview?.questions || !attempt?.studentAnswers) return 0;

    return this.quizToReview.questions.filter((q: any) => {
      const studentAnswer = attempt.studentAnswers.find((a: any) => a.questionId === q.id);
      return studentAnswer && studentAnswer.selectedOptionId !== '' &&
             q.choices?.some((choice: any) => choice.id === studentAnswer.selectedOptionId && choice.isCorrect);
    }).length;
  }

  getTotalQuestions(): number {
    return this.quizToReview?.questions?.length || 0;
  }

  getScorePercentage(attempt: any): number {
    const total = this.getTotalQuestions();
    const correct = this.getCorrectAnswersCount(attempt);
    return total > 0 ? Math.round((correct / total) * 100) : 0;
  }

  formatSubmittedDuration(start: string, submitted: string): string {
    if (!start || !submitted) return '-';

    const startTime = new Date(start);
    const submittedTime = new Date(submitted);
    const diffMs = submittedTime.getTime() - startTime.getTime();

    const totalSeconds = Math.floor(diffMs / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const lang = this.translocoService.getActiveLang();
    const isArabic = lang === 'ar';

    const hLabel = isArabic ? 'س' : 'h';
    const mLabel = isArabic ? 'د' : 'm';
    const sLabel = isArabic ? 'ث' : 's';

    const parts = [];
    if (hours > 0) parts.push(`${hours}${hLabel}`);
    if (minutes > 0 || hours > 0) parts.push(`${minutes}${mLabel}`);
    parts.push(`${seconds}${sLabel}`);

    return parts.join(' ');
  }
}
