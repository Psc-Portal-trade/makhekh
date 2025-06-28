import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslocoPipe } from '@ngneat/transloco';
import { SecondNavComponent } from '../navbar/second-nav/second-nav.component';

@Component({
  selector: 'app-edit-cours',
  templateUrl: './edit-cours.component.html',
  styleUrls: ['./edit-cours.component.css'],
  standalone: true,
  imports: [SecondNavComponent, FormsModule, CommonModule,TranslocoPipe]
})
export class EditCoursComponent implements OnInit {
  activeLang: string = 'en';
  courseData: any;
  changingPhoto = false;
  changingVideo = false;
  isEditing: boolean = false;

  constructor(private router: Router) {}

   ngOnInit(): void {
    const storedCourse = localStorage.getItem('selectedCourse');
    if (storedCourse) {
      this.courseData = JSON.parse(storedCourse);
      console.log('📦 Loaded course from localStorage:', this.courseData);
    } else {
      console.warn('❌ No course found in localStorage. Redirecting...');
      this.router.navigate(['/instructor-profile/create-course']);
    }
  }
getLevelText(level: number): string {
  switch (level) {
    case 1:
      return 'Beginner';
    case 2:
      return 'Intermediate';
    case 3:
      return 'Advanced';
    default:
      return 'Unknown';
  }
}

  onThumbnailChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.courseData.thumbnailUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onLectureVideoChange(event: any, sectionIndex: number, lectureIndex: number) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('video/')) {
      const reader = new FileReader();
      reader.onload = () => {
        this.courseData.sections[sectionIndex].lectures[lectureIndex].videoUrl = reader.result;
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select a valid video file.');
    }
  }

  saveChanges() {
    const updatedCourse = { ...this.courseData };
    localStorage.setItem('selectedCourse', JSON.stringify(updatedCourse));
    console.log('✅ Updated course saved in localStorage:', updatedCourse);
    this.isEditing = false;
  }

goBack(): void {
  // لو عندك Router
  this.router.navigate(['/instructor-profile/create-course']); // أو أي مسار تروحي له
}




}




    // const storedCourse = localStorage.getItem('selectedCourse');
    // if (storedCourse) {
    //   this.courseData = JSON.parse(storedCourse);
    //   console.log('📦 Loaded course from localStorage:', this.courseData);
    // } else {
    //   console.warn('❌ No course found in localStorage. Redirecting...');
    //   this.router.navigate(['/instructor-profile/create-course']);
    //   return;
    // }

    // this.courseData.landingPage.photo = this.courseData.landingPage.photo || {
    //   preview: 'data:image/jpeg;base64,...'
    // };

    // this.courseData.landingPage.video = this.courseData.landingPage.video || {
    //   preview: 'https://www.w3schools.com/html/mov_bbb.mp4'
    // };


  // saveChanges() {
  //   const updatedCourse = { ...this.courseData };
  //   localStorage.setItem('selectedCourse', JSON.stringify(updatedCourse));
  //   console.log('✅ Updated course saved in localStorage:', updatedCourse);
  //   this.router.navigate(['/instructor-profile/create-course']);
  // }

  // addSchedule() {
  //   this.courseData.schedules.push({
  //     courseTitle: '',
  //     date: '',
  //     time: '',
  //     lecturerName: '',
  //     registered: '',
  //     status: '',
  //     joinLink: '',
  //     limit: 0,
  //     quizzes: []
  //   });
  // }

  // removeSchedule(index: number) {
  //   if (index > 0) {
  //     this.courseData.schedules.splice(index, 1);
  //   }
  // }

  // onPhotoSelected(event: any) {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       this.courseData.landingPage.photo = {
  //         file,
  //         preview: reader.result
  //       };
  //       this.changingPhoto = false;
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }

  // onVideoSelected(event: any) {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       this.courseData.landingPage.video = {
  //         file,
  //         preview: reader.result
  //       };
  //       this.changingVideo = false;
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }

  // addCoupon() {
  //   this.courseData.coupons.push({
  //     code: '',
  //     status: '',
  //     users: '',
  //     startDate: '',
  //     endDate: ''
  //   });
  // }

  // removeCoupon(index: number) {
  //   this.courseData.coupons.splice(index, 1);
  // }

  // addSection() {
  //   this.courseData.curriculum.push({
  //     name: '',
  //     lectures: [
  //       {
  //         title: '',
  //         video: {},
  //         videoName: '',
  //         description: '',
  //         activeTab: 'video',
  //         quizzes: []
  //       }
  //     ]
  //   });
  // }

  // removeSection(index: number) {
  //   if (index > 0) {
  //     this.courseData.curriculum.splice(index, 1);
  //   }
  // }

  // addLecture(sectionIndex: number) {
  //   this.courseData.curriculum[sectionIndex].lectures.push({
  //     title: '',
  //     video: {},
  //     videoName: '',
  //     description: '',
  //     activeTab: 'video',
  //     quizzes: []
  //   });
  // }

  // removeLecture(sectionIndex: number, lectureIndex: number) {
  //   if (!(sectionIndex === 0 && lectureIndex === 0)) {
  //     this.courseData.curriculum[sectionIndex].lectures.splice(lectureIndex, 1);
  //   }
  // }

  // onLectureVideoSelected(event: any, sectionIndex: number, lectureIndex: number) {
  //   const file = event.target.files[0];
  //   if (file && file.type.startsWith('video/')) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       const lecture = this.courseData.curriculum[sectionIndex].lectures[lectureIndex];
  //       lecture.video = {
  //         file,
  //         preview: reader.result
  //       };
  //       lecture.changingVideo = false;
  //     };
  //     reader.readAsDataURL(file);
  //   } else {
  //     alert('Please select a valid video file.');
  //   }
  // }
