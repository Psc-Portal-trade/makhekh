import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecondNavComponent } from '../navbar/second-nav/second-nav.component';
import { Router, RouterLink } from '@angular/router';
import { ExamReviewService } from '../services/exam-review.service';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-view-attempt',
  standalone: true,
  imports: [CommonModule, SecondNavComponent,TranslocoPipe,RouterLink],
  templateUrl: './view-attempt.component.html',
  styleUrls: ['./view-attempt.component.css'],
})
export class ViewAttemptComponent implements OnInit {
  isSidebarCollapsed = false;
  attempt: any;
  quiz: any;
  quizToReview: any;

  constructor(private examReviewService: ExamReviewService, private router: Router,private translocoService: TranslocoService) {}

    ngOnInit(): void {


this.attempt = this.examReviewService.getCurrentAttempt();
  this.quiz = this.examReviewService.getCurrentQuiz();

  if (!this.attempt || !this.quiz) {
    this.router.navigate(['/course-exams-results']);
    return;
  }

  this.quizToReview = this.examReviewService.getCurrentQuiz();

  // ✅ عرض كل البيانات في الكونسول
  console.log('📄 Attempt:', this.attempt);
  console.log('📘 Quiz:', this.quiz);
  console.log('🔍 Quiz to review:', this.quizToReview);



  }



  isCorrect(question: any, selectedOptionId: string): boolean {
    return question.correctChoiceId === selectedOptionId;
  }


  scrollToQuestion(questionNumber: number): void {
    const element = document.getElementById(`question-${questionNumber}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
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


getStudentAnswer(questionId: string): string {
  const answer = this.attempt?.studentAnswers.find((a: any) => a.questionId === questionId);
  return answer?.selectedOptionId || '';
}

getIsUnique(questionId: string): boolean {
  const answer = this.attempt?.studentAnswers.find((a: any) => a.questionId === questionId);
  return answer?.isUnique === true;
}

getQuestionState(question: any): 'correct' | 'incorrect' | 'unanswered' {
  const selectedId = this.getStudentAnswer(question.id);
  if (!selectedId) return 'unanswered';
  return question.choices.find((c: any) => c.id === selectedId && c.isCorrect) ? 'correct' : 'incorrect';
}


}

