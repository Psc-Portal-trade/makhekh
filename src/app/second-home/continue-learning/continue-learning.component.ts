import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/course.service';
import { Router } from '@angular/router';
import { CourseInformationService } from '../../services/course-information.service';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-continue-learning',
  templateUrl: './continue-learning.component.html',
  styleUrls: ['./continue-learning.component.css'],
  standalone: true,
  imports: [CommonModule,TranslocoPipe]
})
export class ContinueLearningComponent implements OnInit {
  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;

  lectures: any[] = [];
  private isDragging = false;
  private startX = 0;
  private scrollLeft = 0;

  constructor(private courseService: CourseService,private courseInfoService: CourseInformationService, private router: Router) {}

  ngOnInit() {
    // جلب الكورسات المشتراة من CourseService
    this.courseService.purchasedCourses$.subscribe(courses => {
      this.lectures = courses;
    });
  }
  goToCourseDetails(course: any) {
    this.courseInfoService.setCourse(course); // تخزين بيانات الكورس عند الضغط عليه
    this.router.navigate(['course-content']); // الانتقال إلى صفحة التفاصيل
  }
  // حركة الماوس
  onMouseMove(event: MouseEvent) {
    if (!this.scrollContainer) return;
    const { clientX } = event;
    const { offsetWidth, scrollWidth } = this.scrollContainer.nativeElement;
    const maxScroll = scrollWidth - offsetWidth;
    const percentage = clientX / offsetWidth;
    this.scrollContainer.nativeElement.scrollLeft = maxScroll * percentage;
  }

  // عند بدء السحب باللمس
  onTouchStart(event: TouchEvent) {
    if (!this.scrollContainer) return;
    this.isDragging = true;
    this.startX = event.touches[0].pageX - this.scrollContainer.nativeElement.offsetLeft;
    this.scrollLeft = this.scrollContainer.nativeElement.scrollLeft;
  }

  // أثناء السحب باللمس
  onTouchMove(event: TouchEvent) {
    if (!this.scrollContainer || !this.isDragging) return;
    event.preventDefault();
    const x = event.touches[0].pageX - this.scrollContainer.nativeElement.offsetLeft;
    const walk = (x - this.startX) * 2; // التحكم في سرعة السحب
    this.scrollContainer.nativeElement.scrollLeft = this.scrollLeft - walk;
  }

  // عند إنهاء السحب
  onTouchEnd() {
    this.isDragging = false;
  }
}
