import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InstructorCoursesService } from '../services/instructor-courses.service';
import { SecondNavComponent } from "../../../Makhekh/src/app/navbar/second-nav/second-nav.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-edit-cours',
  templateUrl: './edit-cours.component.html',
  styleUrls: ['./edit-cours.component.css'],
  imports: [ SecondNavComponent,FormsModule,CommonModule,TranslocoPipe]
})
export class EditCoursComponent implements OnInit {
  activeLang: string = 'en'; // تعيين اللغة الافتراضية

  courseData: any;

  constructor(
    private instructorCoursesService: InstructorCoursesService,
    private router: Router
  ) {





  }

  ngOnInit(): void {
    // الحصول على بيانات الكورس من السيرفيس
    this.courseData = this.instructorCoursesService.getCourse();
    console.log(this.courseData)

    // لو مفيش بيانات (دخل الصفحة مباشرة) نرجعه
    if (!this.courseData) {
      // مثلاً نرجعه على صفحة My Courses
      this.router.navigate(['/instructor-courses']);
    }
    this.courseData.landingPage.photo = {
      preview: 'data:image/jpeg;base64,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'
    };

    this.courseData.landingPage.video = {
      preview: 'https://www.w3schools.com/html/mov_bbb.mp4'
    };

  }



  addSchedule() {
    const newSchedule = {
      courseTitle: '',
      date: '',
      time: '',
      lecturerName: '',
      registered: '',
      status: '',
      joinLink: '',
      limit: 0,
      quizzes: []
    };
    this.courseData.schedules.push(newSchedule);
  }

  removeSchedule(index: number) {
    if (index > 0) {
      this.courseData.schedules.splice(index, 1);
    }
  }

  changingPhoto = false;
  changingVideo = false;

  onPhotoSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.courseData.landingPage.photo = {
          file: file,
          preview: reader.result
        };
        this.changingPhoto = false; // hide input after selection
      };
      reader.readAsDataURL(file);
    }
  }

  onVideoSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.courseData.landingPage.video = {
          file: file,
          preview: reader.result
        };
        this.changingVideo = false; // hide input after selection
      };
      reader.readAsDataURL(file);
    }
  }

  saveChanges() {
    const updatedCourse = { ...this.courseData };

    // تحدث الكورس داخل المصفوفة
    this.instructorCoursesService.updateCourse(updatedCourse);

    // رجع المستخدم مثلاً لصفحة الكورسات
    this.router.navigate(['instructor-profile/create-course']);

    console.log('Updated course saved in courses array:', updatedCourse);
  }


  addCoupon() {
    this.courseData.coupons.push({
      code: '',
      status: '',
      users: '',
      startDate: '',
      endDate: ''
    });
  }

  removeCoupon(index: number) {
    this.courseData.coupons.splice(index, 1);
  }

  addSection() {
    this.courseData.curriculum.push({
      name: '',
      lectures: [
        {
          title: '',
          video: {},
          videoName: '',
          description: '',
          activeTab: 'video',
          quizzes: []
        }
      ]
    });
  }

  removeSection(index: number) {
    if (index > 0) {
      this.courseData.curriculum.splice(index, 1);
    }
  }

  addLecture(sectionIndex: number) {
    this.courseData.curriculum[sectionIndex].lectures.push({
      title: '',
      video: {},
      videoName: '',
      description: '',
      activeTab: 'video',
      quizzes: []
    });
  }

  removeLecture(sectionIndex: number, lectureIndex: number) {
    // لا تحذف أول محاضرة من أول سكشن
    if (!(sectionIndex === 0 && lectureIndex === 0)) {
      this.courseData.curriculum[sectionIndex].lectures.splice(lectureIndex, 1);
    }
  }
  onLectureVideoSelected(event: any, sectionIndex: number, lectureIndex: number) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('video/')) {
      const reader = new FileReader();
      reader.onload = () => {
        const lecture = this.courseData.curriculum[sectionIndex].lectures[lectureIndex];
        lecture.video = {
          file,
          preview: reader.result
        };
        lecture.changingVideo = false;
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please select a valid video file.");
    }
  }



}
