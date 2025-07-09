import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service'; // 👈 مهم

@Injectable({
  providedIn: 'root'
})
export class CourseApiService {

  private apiUrl = 'https://api.makhekh.com/api/Courses';

  constructor(private http: HttpClient, private authService: AuthService) {}

getAllCourses(): Observable<any> {
  const token = this.authService.getToken();
  let headers = new HttpHeaders();

  if (token) {
    headers = headers.set('Authorization', `Bearer ${token}`);
  }

  const url = `${this.apiUrl}?page=1&pageSize=1000`;

  return this.http.get(url, { headers }).pipe(
    catchError(err => {
      console.error('Error fetching all courses:', err);
      return throwError(() => err);
    })
  );
}


}
