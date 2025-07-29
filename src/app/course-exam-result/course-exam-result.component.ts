import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CourseInformationService } from '../services/course-information.service';
import { CommonModule } from '@angular/common';
import { SecondNavComponent } from "../navbar/second-nav/second-nav.component";
import { ExamReviewService } from '../services/exam-review.service';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-course-exam-result',
  standalone: true,
  imports: [CommonModule, SecondNavComponent,RouterLink,TranslocoPipe],
  templateUrl: './course-exam-result.component.html',
  styleUrls: ['./course-exam-result.component.css']
})
export class CourseExamResultComponent implements OnInit {
  selectedQuiz: any = null;
  selectedCourse: any = null;

  constructor(
    private courseInformationService: CourseInformationService,
    private router: Router,private examReviewService: ExamReviewService,private translocoService: TranslocoService
  ) { }
  quizToReview: any;
  quizzesList: any[] = [];

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.selectedCourse = this.courseInformationService.getCourse();
    this.selectedQuiz = this.courseInformationService.getSelectedQuiz();

    if (!this.selectedQuiz || !this.selectedCourse) {
      console.error('❌ No quiz or course selected. Redirecting...');
      this.router.navigate(['/courses']); // Redirect to a safe page
      return;
    }

    // Sort attempts from newest to oldest
    if (this.selectedQuiz.attempts) {
      this.selectedQuiz.attempts.sort((a: any, b: any) =>
        new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
      );
    }

    this.quizToReview = this.examReviewService.getCurrentQuiz();
    this.quizzesList = this.examReviewService.getFilteredQuizzes();

    console.log('🔍 Quiz to review:', this.quizToReview);
    console.log('📚 Filtered list:', this.quizzesList);


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
  // 1. احفظ في السيرفيس
  this.examReviewService.setCurrentAttempt(attempt);

  // 2. احفظ في localStorage كـ JSON
  localStorage.setItem('currentAttempt', JSON.stringify(attempt));

  // 3. انتقل إلى صفحة المراجعة
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
    this.quizToReview.attemptsAllowed - this.quizToReview.studentAttemptsNumber
  );
}
getCorrectAnswersCount(attempt: any): number {
  if (!this.quizToReview?.questions) return 0;

  return this.quizToReview.questions.filter((q: any) => {
    const studentAnswer = attempt.studentAnswers.find((a: any) => a.questionId === q.id);
    return studentAnswer && studentAnswer.selectedOptionId !== '' &&
           q.choices.some((choice: any) => choice.id === studentAnswer.selectedOptionId && choice.isCorrect);
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
