import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private readonly localStorageKey = 'purchasedCourses';

  private purchasedCourses = new BehaviorSubject<any[]>(this.loadCoursesFromStorage());
  purchasedCourses$ = this.purchasedCourses.asObservable();

  constructor() {}

  private loadCoursesFromStorage(): any[] {
    localStorage.removeItem('purchasedCourses');

    const stored = localStorage.getItem(this.localStorageKey);
    return stored ? JSON.parse(stored) : [];

  }

  private saveCoursesToStorage(courses: any[]) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(courses));
  }

  addPurchasedCourses(courses: any[]) {
    const currentCourses = this.purchasedCourses.getValue();

    // Filter only new courses (not duplicated)
    const newCourses = courses.filter(
      newCourse => !currentCourses.some(existing => existing.id === newCourse.id)
    );

    if (newCourses.length > 0) {
      const updatedCourses = [...currentCourses, ...newCourses];
      this.purchasedCourses.next(updatedCourses);
      this.saveCoursesToStorage(updatedCourses);
    }
  }


  getPurchasedCourses() {
    return this.purchasedCourses.getValue();
  }
}
