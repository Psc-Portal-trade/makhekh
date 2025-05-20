import { Component, OnInit } from '@angular/core';
import { InstructorCoursesService } from '../services/instructor-courses.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-instructor-courses',
  templateUrl: './instructor-courses.component.html',
  imports: [CommonModule],
  styleUrls: ['./instructor-courses.component.css']
})
export class InstructorCoursesComponent implements OnInit {

  coursesToShow: any[] = [];
  allCourses: any[] = [];
  showAll = false;

  constructor(
    private instructorCoursesService: InstructorCoursesService,
    private router: Router
  ) {}


  ngOnInit(): void {
      window.scrollTo(0, 0);

    this.allCourses = this.instructorCoursesService.getCourses();
    this.updateCoursesToShow();
  }

  toggleShowAll() {
    this.showAll = !this.showAll;
    this.updateCoursesToShow();
  }

  editCourse(course: any) {
    this.instructorCoursesService.setCourse(course);
this.router.navigate(['edit-course']);

  }

  private updateCoursesToShow() {
    this.coursesToShow = this.showAll ? this.allCourses : this.allCourses.slice(0, 3);
  }
}
