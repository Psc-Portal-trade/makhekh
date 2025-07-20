import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AttachmentService {
  private baseUrl = 'https://api.makhekh.com/api/summary-attachments';

  constructor(private http: HttpClient) {}

  getCourseAttachments(courseId: string) {
    const url = `${this.baseUrl}/student/all-attachments?id=${courseId}`;
    return this.http.get<any>(url); // تقدر تعملي typing للداتا لو حبيتي
  }
  // course.service.ts
fetchCourseDetails(courseId: string) {
  return this.http.get<any>(`https://api.makhekh.com/api/Courses/${courseId}`);
}

}
