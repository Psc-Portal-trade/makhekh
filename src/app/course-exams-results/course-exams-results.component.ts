import { Component } from '@angular/core';
import { SecondNavComponent } from "../navbar/second-nav/second-nav.component";
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CourseInformationService } from '../services/course-information.service';
import { TranslocoPipe } from '@ngneat/transloco';
import { ExamReviewService } from '../services/exam-review.service';

@Component({
  selector: 'app-course-exams-results',
  imports: [SecondNavComponent,RouterLink,CommonModule,TranslocoPipe],
  templateUrl: './course-exams-results.component.html',
  styleUrl: './course-exams-results.component.css'
})
export class CourseExamsResultsComponent {
 courseId: string | null = null;
  courseData: any;
  quizzesData: any = null; // Store the new API response
  selectedEntityType: number = 1;
  selectedEntityId: string = '';
  filteredAttachments: any[] = [];

  constructor(
    private http: HttpClient,
    private courseInfoService: CourseInformationService,
    private router: Router,
    private examReviewService: ExamReviewService

  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.courseId = this.courseInfoService.getSelectedCourseId();
    console.log('📌 Selected Course ID:', this.courseId);

    if (this.courseId) {
      this.getCourseDetails();
    } else {
      console.error('❌ Course ID not found!');
    }
  }

  getCourseDetails() {
    const url = `https://api.makhekh.com/api/Courses/${this.courseId}`;
    this.http.get<any>(url).subscribe({
      next: (res) => {
        console.log('📘 Course Details:', res);
        this.courseData = res.data;
        // After getting course details, fetch quizzes using new API
        this.getQuizzesData();
      },
      error: (err) => {
        console.error('❌ Error fetching course details:', err);
      }
    });
  }

  getQuizzesData() {
    const url = `https://api.makhekh.com/api/student/quizzes/${this.courseId}/all-quizzes`;
    this.http.get<any>(url).subscribe({
      next: (res) => {
        console.log('📝 Quizzes Data:', res);
        this.quizzesData = res.data;
        // Default to showing course quizzes
        this.selectEntity(1, this.courseData.id);
      },
      error: (err) => {
        console.error('❌ Error fetching quizzes:', err);
      }
    });
  }

  selectEntity(type: number, id: string) {
    this.selectedEntityType = type;
    this.selectedEntityId = id;
    this.filteredAttachments = [];

    if (!this.quizzesData) {
      console.warn('⚠️ Quizzes data not loaded yet');
      return;
    }

    switch (type) {
      case 1: // Course
        this.filteredAttachments = this.quizzesData.courseQuizzes || [];
        break;

      case 2: // Section
        this.filteredAttachments = this.quizzesData.sectionQuizzes?.filter((quiz: any) => 
          quiz.sectionId === id
        ) || [];
        break;

      case 3: // Lecture
        this.filteredAttachments = this.quizzesData.lectureQuizzes?.filter((quiz: any) => 
          quiz.lectureId === id
        ) || [];
        break;

      case 4: // SubSection
        this.filteredAttachments = this.quizzesData.subSectionQuizzes?.filter((quiz: any) => 
          quiz.subSectionId === id
        ) || [];
        break;
    }

    console.log(`📎 Filtered Quizzes for ${this.getEntityTypeName(type)} (${id}):`, this.filteredAttachments);
  }

  getEntityTypeName(type: number): string {
    switch (type) {
      case 1: return 'Course';
      case 2: return 'Section';
      case 3: return 'Lecture';
      case 4: return 'SubSection';
      default: return 'Unknown';
    }
  }

  gotoQuizDetails(quiz: any) {
    if (!quiz) {
      console.error('❌ No quiz provided to review.');
      return;
    }
  
    // 🔐 خزّن الداتا في السيرفيس
    this.examReviewService.setCurrentQuiz(quiz);
    this.examReviewService.setFilteredQuizzes(this.filteredAttachments);
  
    // 🚀 التنقل للنتيجة
    this.router.navigate(['/course-exam-result']);
  }
  
startExam(quiz: any) {
  const quizId = quiz.id;
  if (quizId) {
    const url = 'https://api.makhekh.com/api/student/quizzes/start';
    const body = { quizId: quizId};
        this.http.post(url, body).subscribe({
      next: (res: any) => {
        console.log('✅ Response from starting exam API:', res);
        if (res.success && res.data && res.data.id) {
          this.courseInfoService.setAttemptId(res.data.id);
          this.courseInfoService.setSelectedQuiz(quiz); // حفظ الامتحان في السيرفيس
          this.router.navigate(['/course-exam']); // توجيه المستخدم بعد نجاح العملية
        } else {
          console.error('API response was not successful or did not contain an attempt ID.', res);
          // يمكنك إضافة رسالة خطأ للمستخدم هنا
        }
      },
      error: (err) => {
        console.error('API call to start exam failed.', err);
        // يمكنك إضافة رسالة خطأ للمستخدم هنا
      }
    });
  } else {
    // في حال عدم وجود quizId، يتم تنفيذ الإجراء القديم كحل بديل
    this.courseInfoService.setSelectedQuiz(quiz);
    this.router.navigate(['/course-exam']);
  }
}
}
