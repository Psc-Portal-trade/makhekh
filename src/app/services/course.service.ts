import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private purchasedCourses = new BehaviorSubject<any[]>([]);
  purchasedCourses$ = this.purchasedCourses.asObservable();

  addPurchasedCourses(courses: any[]) {
    const currentCourses = this.purchasedCourses.getValue();
    this.purchasedCourses.next([...currentCourses, ...courses]);
  }

  getPurchasedCourses() {
    return this.purchasedCourses.getValue();
  }
}
