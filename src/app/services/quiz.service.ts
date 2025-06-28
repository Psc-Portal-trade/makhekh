// quiz.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class QuizService {
  getTeacherCourses(token: string) {
    throw new Error('Method not implemented.');
  }
  getSectionsByCourse(courseId: string) {
    throw new Error('Method not implemented.');
  }
  getLecturesBySection(sectionId: string) {
    throw new Error('Method not implemented.');
  }
  private baseUrl = 'https://api.makhekh.com/api/teacher/quizzes';

  constructor(private http: HttpClient) {}

  createQuiz(data: any) {
    return this.http.post(`${this.baseUrl}/create`, data);
  }
}
