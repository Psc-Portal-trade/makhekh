import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // تأكدي إن عندك AuthService

@Injectable({
  providedIn: 'root'
})
export class CourseeService {
  private apiUrl = 'https://api.makhekh.com/api/Courses/teacher/all-courses';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getCourses(): Observable<any> {
    const token = this.authService.getToken(); // أو localStorage.getItem('token')

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get(this.apiUrl, { headers });
  }
}
