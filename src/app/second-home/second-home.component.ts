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

@Component({
  selector: 'app-second-home',
  imports: [CoursesComponent, ContinueLearningComponent,SecondHomeHeaderComponent ,RecommendedVideosComponent, FeaturedCoursesComponent, SecondNavComponent,TranslocoPipe],
  templateUrl: './second-home.component.html',
  styleUrl: './second-home.component.css'
})
export class SecondHomeComponent {

 fullName: string = '';
 firstLetter: string = '';
  role: string = '';
  userRole: string = '';
email:string=''


constructor(private authService: AuthService,private router: Router) {

 const userData = this.authService.getUserData();
    if (userData) {
      this.fullName = userData.fullName;
      this.role = userData.role;
  }


}



 ngOnInit(): void {



  const user = this.authService.getUserData(); // هنا بنجيب الداتا من السيرفيس
  this.userRole = user?.userRole || ''; // هنا بنستخرج الرول
  this.fullName = user?.fullName || '';
  this.email = user?.email || '';
this.firstLetter = this.fullName.charAt(0).toUpperCase();


  }







}
