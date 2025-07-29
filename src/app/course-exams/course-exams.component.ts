import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecondNavComponent } from '../navbar/second-nav/second-nav.component';
import { Router } from '@angular/router';
import { CourseInformationService } from '../services/course-information.service';
import { HttpClient } from '@angular/common/http';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-course-exams',
  standalone: true,
  imports: [CommonModule, SecondNavComponent, TranslocoPipe],
  templateUrl: './course-exams.component.html',
  styleUrls: ['./course-exams.component.css']
})
export class CourseExamsComponent implements OnInit {
  courseId: string | null = null;
  courseData: any;
  quizzesData: any = null; // Store the new API response
  selectedEntityType: number = 1;
  selectedEntityId: string = '';
  filteredAttachments: any[] = [];

  constructor(
    private http: HttpClient,
    private courseInfoService: CourseInformationService,
    private router: Router
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
startExam(quiz: any) {
  const quizId = quiz.id;
  if (quizId) {
    const url = 'https://api.makhekh.com/api/student/quizzes/start';
    const body = { quizId: quizId };
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

  hasRunningAttempt(quiz: any): boolean {
    if (quiz?.attempts?.length > 0) {
      return quiz.attempts.some((attempt: any) => attempt.isRunning === true);
    }
    return false;
  }

  resumeExam(quiz: any) {
    const runningAttempt = quiz.attempts?.find((attempt: any) => attempt.isRunning);
  
    if (runningAttempt) {
      const attemptId = runningAttempt.id;
      const userStr = localStorage.getItem('user');
      let token = '';
      if (userStr) {
        const user = JSON.parse(userStr);
        token = user.token;
      }
  
      const url = `https://api.makhekh.com/api/student/quizzes/${attemptId}/resume`;
  
      this.http.post(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }).subscribe({
        next: (res: any) => {
          if (res.success && res.data) {
            console.log('✅ Resume response:', res.data);
  
            this.courseInfoService.setAttemptId(attemptId);
            this.courseInfoService.setSelectedQuiz(quiz);
  
            const resumeKey = `resume_attempt_data_${attemptId}`;
            localStorage.setItem(resumeKey, JSON.stringify(res.data));
  
            this.courseInfoService.setResumeData(res.data);
  
            this.router.navigate(['/course-exam']);
          } else {
            console.warn('⚠️ Resume data not found in API response.');
          }
        },
        error: (err) => {
          console.error('❌ Error fetching resume data:', err);
        }
      });
    } else {
      console.warn('❌ No running attempt found to resume.');
    }
  }
  
  

}
