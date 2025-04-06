import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecondNavComponent } from '../navbar/second-nav/second-nav.component';

@Component({
  selector: 'app-exam-result',
  imports: [CommonModule,SecondNavComponent],
  templateUrl: './exam-result.component.html',
  styleUrl: './exam-result.component.css'
})
export class ExamResultComponent implements OnInit {
  quiz: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const state = history.state;
    if (state.quiz) {
      this.quiz = state.quiz;
      console.log('✅ Received quiz with student answers:', this.quiz);
    } else {
      this.router.navigate(['/my-courses']); // fallback
    }
  }



  
  currentPage: number = 1;
  questionsPerPage: number = 10;
  
  get paginatedQuestions() {
    const start = (this.currentPage - 1) * this.questionsPerPage;
    return this.quiz.questions.slice(start, start + this.questionsPerPage);
  }
  
  goToPage(page: number) {
    this.currentPage = page;
  }
  
  get totalPages(): number {
    return Math.ceil(this.quiz.questions.length / this.questionsPerPage);
  }
  
  getOptionLetter(index: number): string {
    return String.fromCharCode(97 + index); // a), b), ...
  }
  

}