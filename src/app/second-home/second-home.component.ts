import { Component } from '@angular/core';
import { CoursesComponent } from './courses/courses.component';
import { ContinueLearningComponent } from './continue-learning/continue-learning.component';
import { RecommendedVideosComponent } from './recommended-videos/recommended-videos.component';
import { FeaturedCoursesComponent } from './featured-courses/featured-courses.component';
import { SecondNavComponent } from "../navbar/second-nav/second-nav.component";
import { FooterComponent } from "../footer/footer.component";
import { TranslocoPipe } from '@ngneat/transloco';
import { SecondHomeHeaderComponent } from '../second-home-header/second-home-header.component';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-second-home',
  imports: [CoursesComponent, ContinueLearningComponent,SecondHomeHeaderComponent ,RecommendedVideosComponent, FeaturedCoursesComponent, SecondNavComponent,TranslocoPipe,CommonModule],
  templateUrl: './second-home.component.html',
  styleUrl: './second-home.component.css'
})

export class SecondHomeComponent {

  fullName: string = '';
  firstLetter: string = '';
  role: string = '';
  userRole: string = '';
  email: string = '';
  job: string = ''; // هنا هنعرض الوظيفة

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) {
    const userData = this.authService.getUserData();
    if (userData) {
      this.fullName = userData.fullName;
      this.role = userData.role;
    }
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);

    const user = this.authService.getUserData();
    this.userRole = user?.userRole || '';
    this.fullName = user?.fullName || '';
    this.email = user?.email || '';
    this.firstLetter = this.fullName.charAt(0).toUpperCase();

    this.getProfile(); // استدعاء بيانات البروفايل
  }

  getProfile(): void {
    this.http.get<any>('https://api.makhekh.com/api/Student/profile').subscribe({
      next: (res) => {
        this.job = res.data?.job || '';
      },
      error: (err) => {
        console.error('Error loading profile', err);
      }
    });
  }
}
