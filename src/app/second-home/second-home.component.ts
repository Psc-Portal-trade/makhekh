import { Component } from '@angular/core';
import { CoursesComponent } from './courses/courses.component';
import { ContinueLearningComponent } from './continue-learning/continue-learning.component';
import { RecommendedVideosComponent } from './recommended-videos/recommended-videos.component';
import { FeaturedCoursesComponent } from './featured-courses/featured-courses.component';
import { SecondNavComponent } from "../navbar/second-nav/second-nav.component";
import { FooterComponent } from "../footer/footer.component";
import { TranslocoPipe } from '@ngneat/transloco';
import { SecondHomeHeaderComponent } from '../second-home-header/second-home-header.component';

@Component({
  selector: 'app-second-home',
  imports: [CoursesComponent, ContinueLearningComponent,SecondHomeHeaderComponent ,RecommendedVideosComponent, FeaturedCoursesComponent, SecondNavComponent,TranslocoPipe],
  templateUrl: './second-home.component.html',
  styleUrl: './second-home.component.css'
})
export class SecondHomeComponent {

}
