import { CommonModule, NgFor, NgIf } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoPipe } from '@ngneat/transloco';
import { FormsModule } from '@angular/forms';

declare var bootstrap: any;

@Component({
  selector: 'app-course-drafts',
  imports: [CommonModule, NgFor, NgIf, TranslocoPipe, FormsModule],
  templateUrl: './course-drafts.component.html',
  styleUrls: ['./course-drafts.component.css']
})

export class CourseDraftsComponent implements OnInit {
  coursesToShow: any[] = [];
  allCourses: any[] = [];
  showAll = false;
  selectedCourseIdToDelete: string | null = null;
  searchQuery: string = '';  // متغير لتخزين النص المدخل في حقل البحث

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    console.log("📌 CourseDraftsComponent Constructor");
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    console.log('📌 CourseDraftsComponent INIT');
    window.scrollTo(0, 0);
    this.fetchCourses();
  }
puplish(course: any) {
    const userString = localStorage.getItem('user');
    if (!userString) {
      console.error('User not found in localStorage');
      return;
    }

    const user = JSON.parse(userString);
    const token = user?.token;
    if (!token) {
      console.error('Token not found in user object');
      return;
    }

    const url = `https://api.makhekh.com/api/Courses/${course.id}/send-for-approval`;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.post(url, {}, { headers }).subscribe({
      next: (res) => {
        console.log('تم الإرسال بنجاح', res);
        alert('تم إرسال الكورس للمراجعة');
      },
      error: (err) => {
        console.error('فشل الإرسال', err);
        alert('حدث خطأ أثناء الإرسال');
      }
    });
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

          // ✅ فلترة الكورسات الغير مسودة فقط
          this.allCourses = data.filter(course => course.isDrafted === true);
          console.log('✅ Parsed Draft Courses:', this.allCourses);

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
    this.router.navigate(['instructor-profile/create-course/course-draft']);
  }

  confirmDelete2(course: any) {
  // التأكد من تعيين معرّف الكورس بشكل صحيح
  this.selectedCourseIdToDelete = course.id;
  console.log('📦 Selected course ID to delete:', this.selectedCourseIdToDelete);  // إضافة تسجيل للتأكد
  const modal = new bootstrap.Modal(document.getElementById('deleteModal2')!);
  modal.show();
}


deleteCourse2() {
  console.log('🧨 deleteCourse fired');

  // التأكد من وجود معرّف الكورس المحدد
  if (!this.selectedCourseIdToDelete) {
    console.log('❌ No selectedCourseIdToDelete');
    return;
  }

  const token = JSON.parse(localStorage.getItem('user') || '{}')?.token;
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  // إرسال طلب حذف الكورس
  this.http.delete(`https://api.makhekh.com/api/Courses/${this.selectedCourseIdToDelete}`, { headers })
    .subscribe({
      next: () => {
        // تحديث قائمة الكورسات بعد الحذف
        this.allCourses = this.allCourses.filter(c => c.id !== this.selectedCourseIdToDelete);
        this.updateCoursesToShow();

        // إغلاق الـ modal بعد الحذف
        const modalEl = document.getElementById('deleteModal');
        if (modalEl) {
          const modalInstance = bootstrap.Modal.getInstance(modalEl);
          if (modalInstance) modalInstance.hide();
        }

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
    this.filterCourses();  // تطبيق البحث بعد التصفية
  }

  filterCourses() {
    if (!this.searchQuery.trim()) {
      this.updateCoursesToShow();  // إذا لم يكن هناك نص بحث، يتم إظهار الكورسات كاملة
    } else {
      this.coursesToShow = this.allCourses.filter(course =>
        course.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }
}
