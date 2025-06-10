// src/app/services/teacher.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  constructor(private http: HttpClient) {}

  getInstructorProfile() {
    return this.http.get<any>('https://api.makhekh.com/api/Teachers/profile');
  }
}
