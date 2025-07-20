import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseInformationService {
  private selectedCourse: any = null;
  private selectedCourseId = new BehaviorSubject<string | null>(null);
  private selectedQuiz = new BehaviorSubject<any | null>(null);

  selectedCourseId$ = this.selectedCourseId.asObservable();
  selectedQuiz$ = this.selectedQuiz.asObservable();

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
}
