import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // يجعل الخدمة متاحة في التطبيق بدون الحاجة لإضافتها في providers
})
export class CourseInformationService {
  private selectedCourse: any = null; // متغير لتخزين بيانات الكورس

  constructor() {}

  // دالة لتخزين بيانات الكورس المحدد
  setCourse(course: any) {
    this.selectedCourse = course;
  }

  // دالة لاسترجاع بيانات الكورس
  getCourse() {
    return this.selectedCourse;
  }
}
