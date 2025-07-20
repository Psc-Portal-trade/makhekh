import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../services/wishlist.service';
import { CartService } from '../services/cart.service';
import { CourseService } from '../services/course.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SecondNavComponent } from '../navbar/second-nav/second-nav.component';
import { Router, RouterLink } from '@angular/router';
import { CourseInformationService } from '../services/course-information.service';
import { TranslocoPipe } from '@ngneat/transloco';
interface Quiz {
  id: string;
  title: string;
  attemptsAllowed: number;
  timeLimitInMinutes: number;
}

interface Lecture {
  id: string;
  title: string;
  quizzes?: Quiz[];
}

interface SubSection {
  id: string;
  title: string;
  lectures?: Lecture[];
  quizzes?: Quiz[];
}

interface Section {
  id: string;
  title: string;
  lectures?: Lecture[];
  subSections?: SubSection[];
  quizzes?: Quiz[];
}

interface Course {
  id: string;
  title: string;
  quizzes?: Quiz[];
  sections?: Section[];
}

@Component({
  selector: 'app-my-courses',
  standalone: true,
  imports: [CommonModule, FormsModule, SecondNavComponent, TranslocoPipe],
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.css']
})
export class MyCoursesComponent implements OnInit {
  courses: any[] = [];
  wishlistCourses: any[] = [];
  searchQuery: string = '';
  searchQueryWishlist: string = '';

  currentPage: number = 1;
  currentPageWishlist: number = 1;
  itemsPerPage: number = 6;
  lectures: any[] = [];
searchQueryLectures: string = '';
currentPageLectures: number = 1;

filteredLectures: any[] = [];
paginatedLectures: any[] = [];
// allQuizzes: any[] = [];



allCourses: any[] = [];

selectedCourseId = '';
selectedSectionId = '';
selectedSubSectionId = '';
selectedLectureId = '';

sections: any[] = [];
subSections: any[] = [];

currentPageQuizzes: number = 1;






  constructor(
    private courseService: CourseService,
    private courseInfoService: CourseInformationService, private router: Router
  ) {}
  // myCourses: any[] = [];

ngOnInit() {
  this.courseService.fetchAndStoreEnrolledCourses(); // تجيب الكورسات

  this.courseService.purchasedCourses$.subscribe(courses => {
    this.allCourses = courses || [];
    this.filteredLectures = this.allCourses;
    this.updateFilteredLectures(); // للـ pagination

    console.log('📘 All Courses:', this.allCourses);
  });
}



onCourseChange() {
  const course = this.allCourses.find(c => c.id === this.selectedCourseId);
  this.sections = course?.sections || [];
  this.subSections = [];
  this.lectures = [];
  this.selectedSectionId = '';
  this.selectedSubSectionId = '';
  this.selectedLectureId = '';
}

onSectionChange() {
  const section = this.sections.find(s => s.id === this.selectedSectionId);
  this.subSections = section?.subSections || [];
  this.lectures = (section?.lectures || []).concat(
    this.subSections.flatMap((s: any) => s.lectures || [])
  );
  this.selectedSubSectionId = '';
  this.selectedLectureId = '';
}



updateFilteredLectures() {
  this.filteredLectures = this.allCourses.filter(course =>
    course.title?.toLowerCase().includes(this.searchQueryLectures.toLowerCase())
  );

  const start = (this.currentPageLectures - 1) * this.itemsPerPage;
  this.paginatedLectures = this.filteredLectures.slice(start, start + this.itemsPerPage);
}

goToPageLectures(page: number) {
  this.currentPageLectures = page;
  this.updateFilteredLectures();
}

getPagesArrayLectures() {
  return Array.from({ length: this.totalPagesLectures }, (_, i) => i + 1);
}

get totalPagesLectures() {
  return Math.ceil(this.filteredLectures.length / this.itemsPerPage);
}

  goToCourseDetails(course: any) {
  this.courseInfoService.setCourse(course); // الكورس كامل
  this.courseInfoService.setSelectedCourseId(course.id); // فقط الـ ID
  this.router.navigate(['course-parts']);
}


}
