import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private readonly localStorageKey = 'purchasedCourses';
  private readonly enrollmentsUrl = 'https://api.makhekh.com/api/Enrollments/student';
  private readonly courseDetailsUrl = 'https://api.makhekh.com/api/Courses';

  private purchasedCourses = new BehaviorSubject<any[]>(this.loadCoursesFromStorage());
  purchasedCourses$ = this.purchasedCourses.asObservable();

  constructor(private http: HttpClient) {}

  private loadCoursesFromStorage(): any[] {
    const stored = localStorage.getItem(this.localStorageKey);
    return stored ? JSON.parse(stored) : [];
  }

  private saveCoursesToStorage(courses: any[]) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(courses));
  }

  addPurchasedCourses(courses: any[]) {
    const currentCourses = this.purchasedCourses.getValue();

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
fetchEnrolledCoursesFromApi() {
  return this.http.get<any>(this.enrollmentsUrl);
}

fetchAndStoreEnrolledCourses() {
  this.http.get<any>(this.enrollmentsUrl).subscribe({
    next: (response) => {
      const enrollments = response?.data || [];

      // خُد الكورسات الفعلية من داخل كل enrollment
      const courses = enrollments.map((enrollment: any) => enrollment.course);

      console.log('✅ الكورسات المستخرجة من الإنرولمنت:', courses);

      // حفظهم في ال BehaviorSubject
      this.purchasedCourses.next(courses);
      this.saveCoursesToStorage(courses);
    },
    error: (err) => {
      console.error('❌ فشل تحميل الكورسات من الإنرولمنت:', err);
    }
  });
}


  // ✅ 2. جلب تفاصيل كورس واحد من الـ API
  fetchCourseDetails(courseId: string) {
    const url = `${this.courseDetailsUrl}/${courseId}`;
    return this.http.get<any>(url);
  }
}
