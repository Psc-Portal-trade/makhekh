import { Component } from '@angular/core';
import { SecondNavComponent } from "../navbar/second-nav/second-nav.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-course-exams-results',
  imports: [SecondNavComponent,RouterLink],
  templateUrl: './course-exams-results.component.html',
  styleUrl: './course-exams-results.component.css'
})
export class CourseExamsResultsComponent {

}
