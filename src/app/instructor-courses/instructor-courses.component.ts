import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';

declare var bootstrap: any;

@Component({
  selector: 'app-instructor-courses',
  templateUrl: './instructor-courses.component.html',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf],
  styleUrls: ['./instructor-courses.component.css']
})
export class InstructorCoursesComponent implements OnInit {
  coursesToShow: any[] = [];
  allCourses: any[] = [];
  showAll = false;
  selectedCourseIdToDelete: string | null = null;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    console.log("📌 InstructorCoursesComponent Constructor");
  }

  ngOnInit(): void {
    console.log('📌 InstructorCoursesComponent INIT');
    window.scrollTo(0, 0);
    this.fetchCourses();
  }

fetchCourses() {
  const token = JSON.parse(localStorage.getItem('user') || '{}')?.token;
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  this.http.get('https://api.makhekh.com/api/Courses/teacher/all-courses', { headers })
.subscribe({
    next: (res: any) => {
      console.log('✅ Full API Response:', res);

      const data = res?.data;

      if (!Array.isArray(data)) {
        console.error('❌ Data is not an array:', data);
        return;
      }

      this.allCourses = data;
      console.log('✅ Parsed Courses:', this.allCourses);

      this.updateCoursesToShow();
    },
    error: (err) => {
      console.error('❌ Error loading courses:', err);
    }
  });
}

  toggleShowAll() {
    this.showAll = !this.showAll;
    this.updateCoursesToShow();
  }

  editCourse(course: any) {
  console.log('📦 Selected Course:', course); // ✅ Console Log للكورس قبل التخزين
  localStorage.setItem('selectedCourse', JSON.stringify(course)); // ✅ تخزين بيانات الكورس
this.router.navigate(['instructor-profile/create-course/edit-course']);
 // ✅ التوجيه لصفحة التعديل
}


  confirmDelete(course: any) {
    this.selectedCourseIdToDelete = course.id;
    const modal = new bootstrap.Modal(document.getElementById('deleteModal')!);
    modal.show();
  }

 deleteCourse() {
  console.log('🧨 deleteCourse fired');
  if (!this.selectedCourseIdToDelete) {
    console.log('❌ No selectedCourseIdToDelete');
    return;
  }

  const token = JSON.parse(localStorage.getItem('user') || '{}')?.token;
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  this.http.delete(`https://api.makhekh.com/api/Courses/${this.selectedCourseIdToDelete}`, { headers })
    .subscribe({
      next: () => {
        this.allCourses = this.allCourses.filter(c => c.id !== this.selectedCourseIdToDelete);
        this.updateCoursesToShow();

        const modalEl = document.getElementById('deleteModal');
        if (modalEl) bootstrap.Modal.getInstance(modalEl)?.hide();

        this.selectedCourseIdToDelete = null;
        console.log('🗑️ Course deleted successfully.');
      },
      error: (err) => {
        console.error('❌ Error deleting course:', err);
      }
    });
}

  private updateCoursesToShow() {
    this.coursesToShow = this.showAll ? this.allCourses : this.allCourses.slice(0, 3);
  }
}
