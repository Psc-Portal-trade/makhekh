import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseInformationService {
  private selectedCourse: any = null;
  private selectedCourseId = new BehaviorSubject<string | null>(null);
  private selectedQuiz = new BehaviorSubject<any | null>(null);
  private attemptId = new BehaviorSubject<string | null>(null);

  selectedCourseId$ = this.selectedCourseId.asObservable();
  selectedQuiz$ = this.selectedQuiz.asObservable();
  attemptId$ = this.attemptId.asObservable();

  constructor() {
    // ✅ تحميل القيم من localStorage عند إنشاء السيرفيس
    const storedCourse = localStorage.getItem('selectedCourse');
    if (storedCourse) {
      this.selectedCourse = JSON.parse(storedCourse);
    }

    const storedCourseId = localStorage.getItem('selectedCourseId');
    if (storedCourseId) {
      this.selectedCourseId.next(storedCourseId);
    }

    const storedQuiz = localStorage.getItem('selectedQuiz');
    if (storedQuiz) {
      this.selectedQuiz.next(JSON.parse(storedQuiz));
    }

    const storedAttemptId = localStorage.getItem('attemptId');
    if (storedAttemptId) {
      this.attemptId.next(storedAttemptId);
    }
  }

  // ✅ Course ID
  setSelectedCourseId(id: string) {
    this.selectedCourseId.next(id);
    localStorage.setItem('selectedCourseId', id);
  }

  getSelectedCourseId(): string | null {
    return this.selectedCourseId.getValue();
  }

  // ✅ Course Object
  setCourse(course: any) {
    this.selectedCourse = course;
    localStorage.setItem('selectedCourse', JSON.stringify(course));
  }

  getCourse() {
    return this.selectedCourse;
  }

  // ✅ Quiz Object
  setSelectedQuiz(quiz: any) {
    this.selectedQuiz.next(quiz);
    localStorage.setItem('selectedQuiz', JSON.stringify(quiz));
  }

  getSelectedQuiz(): any | null {
    return this.selectedQuiz.getValue();
  }

  // ✅ Attempt ID
  setAttemptId(id: string) {
    this.attemptId.next(id);
    localStorage.setItem('attemptId', id);
  }

  getAttemptId(): string | null {
    return this.attemptId.getValue();
  }

  private resumeData: any = null;

  setResumeData(data: any) {
    this.resumeData = data;
  }
  
  
  getResumeData(): any {
    const attemptId = this.getAttemptId();
    if (!attemptId) return null;
  
    // لو عندك نسخة بالكاش في الميموري
    if (this.resumeData) return this.resumeData;
  
    const key = `resume_attempt_data_${attemptId}`;
    const fromStorage = localStorage.getItem(key);
  
    if (fromStorage) {
      this.resumeData = JSON.parse(fromStorage);
      return this.resumeData;
    }
  
    return null;
  }
  
  clearResumeData(): void {
    const attemptId = this.getAttemptId();
    if (!attemptId) return;
  
    const key = `resume_attempt_data_${attemptId}`;
    localStorage.removeItem(key);
    this.resumeData = null;
  }





  
}
