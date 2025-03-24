import { CommonModule, NgFor } from '@angular/common';
import { Component, HostListener, NgModule } from '@angular/core';
import { FormsModule, NgSelectOption } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-test',
  imports: [FormsModule,NgFor,CommonModule, RouterLink,TranslocoPipe],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {
  step: number = 1; // تتبع رقم الخطوة الحالية
  selectedCourse: number | null = null; // الكورس المختار
  courseTitle: string = '';
  selectedCategory: string = ''; // الفئة المختارة
  learningObjectives: string = '';
  requirements: string = '';
  targetAudience: string = '';

  // بيانات الكورس
  courseData = {
    courseType: '', // نوع الكورس (جديد)
    category: '',
    learningObjectives: '',
    requirements: '',
    targetAudience: '',
    courseTitle: ''
  };

  // قائمة الدورات
  courses = [
    {
      image: '../../assets/fluent_record-20-regular (1).png',
      title: 'Recorded Educational Courses',
      description: 'You can upload a recorded made video on our website and increase the no of learners. Define your target audience, pick a promising topic and benefit other learners.'
    },
    {
      image: '../../assets/streamline_live-video.png',
      title: 'Live Streamed Educational Courses',
      description: 'Upload live videos and will help you to reserve your class with the capacity you need. Calendar schedule where you can adjust all your data. Submit your course link.'
    }
  ];

  // قائمة الفئات
// قائمة الفئات مع استخدام مفاتيح الترجمة
categories = [
  'development', 'business', 'finance', 'itSoftware',
  'officeProductivity', 'personalDevelopment', 'design', 'marketing',
  'lifestyle', 'music', 'photography', 'healthFitness',
  'teachingAcademics', 'other'
];

  constructor(private router: Router, private route: ActivatedRoute) {}

  // اختيار نوع الكورس
  selectCourse(index: number): void {
    this.selectedCourse = index;
    this.courseData.courseType = this.courses[index].title; // حفظ نوع الكورس المختار
  }

  // الانتقال إلى الخطوة التالية
  continue(): void {
    if (this.step === 1 && this.selectedCourse !== null) {
      console.log('Selected Course:', this.courses[this.selectedCourse]);
      this.step++;
    } else if (this.step === 2 && this.courseTitle.trim() !== '') {
      this.step++;
    } else if (this.step === 3) {
      this.step++;
    }
  }

  // الرجوع للخطوة السابقة
  previous(): void {
    if (this.step > 1) {
      this.step--;
    }
  }

  // حفظ البيانات وإرسالها
  // submitCourse(): void {
  //   if (
  //     this.courseTitle.trim() !== '' &&
  //     this.selectedCategory.trim() !== '' &&
  //     this.learningObjectives.trim() !== '' &&
  //     this.requirements.trim() !== '' &&
  //     this.targetAudience.trim() !== ''
  //   ) {
  //     this.courseData.courseTitle = this.courseTitle;
  //     this.courseData.category = this.selectedCategory;
  //     this.courseData.learningObjectives = this.learningObjectives;
  //     this.courseData.requirements = this.requirements;
  //     this.courseData.targetAudience = this.targetAudience;

  //     console.log('✅ Course Data Submitted:', this.courseData);
  //   } else {
  //     alert('⚠️ Please fill in all the required fields before submitting.');
  //   }

  // }
  submitCourse() {
    // تحديث بيانات الكورس قبل الإرسال
    this.courseData.courseTitle = this.courseTitle;
    this.courseData.category = this.selectedCategory;
    this.courseData.learningObjectives = this.learningObjectives;
    this.courseData.requirements = this.requirements;
    this.courseData.targetAudience = this.targetAudience;

    console.log("🚀 Data before navigation:", this.courseData);

    this.router.navigate(['/createCoursesDetalis'], {
      queryParams: { course: encodeURIComponent(JSON.stringify(this.courseData)) }
    });
  }


  }
