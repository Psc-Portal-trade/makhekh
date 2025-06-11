// quiz.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class QuizService {
  private baseUrl = 'https://api.makhekh.com/api/teacher/quizzes';

  constructor(private http: HttpClient) {}

  createQuiz(data: any) {
    return this.http.post(`${this.baseUrl}/create`, data);
  }
}
