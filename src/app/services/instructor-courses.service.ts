import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InstructorCoursesService {
  private courses: any[] = [];
  private selectedCourse: any = null;

  constructor() {}

  // أضف كورس جديد
  addCourse(course: any): void {
    this.courses.push(course);
  }

  // استرجاع كل الكورسات
  getCourses(): any[] {
    return this.courses;
  }

  // حذف كل الكورسات
  clearCourses(): void {
    this.courses = [];
  }

  // تعيين كورس للتعديل
  setCourse(course: any): void {
    this.selectedCourse = course;
  }

  // استرجاع الكورس المحدد
  getCourse(): any {
    return this.selectedCourse;
  }

  // مسح الكورس المؤقت
  clearSelectedCourse(): void {
    this.selectedCourse = null;
  }

  // ✅ تحديث الكورس المحدد داخل المصفوفة
  updateCourse(updatedCourse: any): void {
    const index = this.courses.findIndex(
      c => c === this.selectedCourse
    );
    if (index !== -1) {
      this.courses[index] = updatedCourse;
      this.selectedCourse = updatedCourse; // تحديث النسخة المختارة كمان
    }
  }
}
