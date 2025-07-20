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
  selectedEntityType: number = 1;
  selectedEntityId: string = '';
  filteredAttachments: any[] = [];

  constructor(
    private http: HttpClient,
    private courseInfoService: CourseInformationService,
    private router: Router
  ) {}

  ngOnInit(): void {
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
        this.selectEntity(1, this.courseData.id);
      },
      error: (err) => {
        console.error('❌ Error fetching course details:', err);
      }
    });
  }

  selectEntity(type: number, id: string) {
    this.selectedEntityType = type;
    this.selectedEntityId = id;
    this.filteredAttachments = [];

    switch (type) {
      case 1:
        this.filteredAttachments = this.courseData?.quizzes || [];
        break;

      case 2: {
        const section = this.courseData.sections?.find((s: any) => s.id === id);
        this.filteredAttachments = section?.quizzes || [];
        break;
      }

      case 3: {
        let found = false;

        for (let section of this.courseData.sections || []) {
          const lecture = section.lectures?.find((l: any) => l.id === id);
          if (lecture) {
            this.filteredAttachments = lecture.quizzes || [];
            found = true;
            break;
          }

          for (let sub of section.subSections || []) {
            const subLec = sub.lectures?.find((l: any) => l.id === id);
            if (subLec) {
              this.filteredAttachments = subLec.quizzes || [];
              found = true;
              break;
            }
          }

          if (found) break;
        }
        break;
      }

      case 4: {
        for (let section of this.courseData.sections || []) {
          const sub = section.subSections?.find((s: any) => s.id === id);
          if (sub) {
            this.filteredAttachments = sub.quizzes || [];
            break;
          }
        }
        break;
      }
    }

    console.log('📎 Filtered Quizzes:', this.filteredAttachments);
  }
startExam(quiz: any) {
  this.courseInfoService.setSelectedQuiz(quiz); // حفظ الامتحان في السيرفيس
  this.router.navigate(['/course-exam']);
}

}
