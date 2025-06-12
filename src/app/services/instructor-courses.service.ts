import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InstructorCoursesService {
  private selectedCourse: any = null;

  constructor(private http: HttpClient) {}

  // حفظ كورس واحد عند الضغط على Edit
  setCourse(course: any): void {
    this.selectedCourse = course;
  }

  // استرجاع الكورس المخزن
  getCourse(): any {
    return this.selectedCourse;
  }

  // تعديل بيانات الكورس (اختياري – هنا مجرد تخزين محلي)
  updateCourse(course: any): void {
    this.selectedCourse = course;
  }

  // استدعاء كل الكورسات من الـ API
  getCoursesFromApi() {
    return this.http.get('https://api.makhekh.com/api/Courses/MyCourses');
  }
}
