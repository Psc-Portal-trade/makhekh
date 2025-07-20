import { Component, OnInit } from '@angular/core';
import { SecondNavComponent } from "../navbar/second-nav/second-nav.component";
import { CourseInformationService } from '../services/course-information.service';
import { AttachmentService } from '../services/attachment.service';
import { CourseService } from '../services/course.service';
import { CommonModule } from '@angular/common';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-course-attachments',
  standalone: true,
  imports: [SecondNavComponent,CommonModule,TranslocoPipe],
  templateUrl: './course-attachments.component.html',
  styleUrl: './course-attachments.component.css'
})
export class CourseAttachmentsComponent implements OnInit {
  course: any = null;
  sections: any[] = []; // ✅ أضفنا دي
  allAttachments: any[] = [];
  filteredAttachments: any[] = [];

  selectedEntityType: number = 1;
  selectedEntityId: string = '';

  constructor(
    private courseInfoService: CourseInformationService,
    private attachmentService: AttachmentService,
    private courseService: CourseService
  ) {}

  ngOnInit() {
    const courseId = this.courseInfoService.getSelectedCourseId();
    if (courseId) {
      this.courseService.fetchCourseDetails(courseId).subscribe(res => {
        this.course = res.data;
        this.sections = this.course.sections || []; // ✅ هنا
        this.selectEntity(1, courseId);
      });

      this.attachmentService.getCourseAttachments(courseId).subscribe(res => {
        this.allAttachments = res.data;
      });
    }
  }

  selectEntity(type: number, id: string) {
    this.selectedEntityType = type;
    this.selectedEntityId = id;
    this.filteredAttachments = this.allAttachments.filter(att =>
      att.entityType === type && att.entityId === id
    );
  }
}
