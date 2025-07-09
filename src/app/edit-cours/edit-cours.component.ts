import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslocoPipe } from '@ngneat/transloco';
import { SecondNavComponent } from '../navbar/second-nav/second-nav.component';
import { finalize } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-edit-cours',
  templateUrl: './edit-cours.component.html',
  styleUrls: ['./edit-cours.component.css'],
  standalone: true,
  imports: [SecondNavComponent, FormsModule, CommonModule,TranslocoPipe]
})
export class EditCoursComponent implements OnInit {
  activeLang: string = 'en';
 courseData: any = {
    title: '',
    level: 1,
    description: '',
    prerequisites: '',
    targetAudience: '',
    price: 0,
    currency: 'SAR',
    language: '',
    categoryId: '',
    type: 1,
    thumbnailUrl: '',
    promoVideolUrl: ''
  };  changingPhoto = false;
  changingVideo = false;
  isEditing: boolean = false;
  categories: any[] = [];

  constructor(private router: Router,private http: HttpClient,private categoriesService: CategoriesService) {}
originalCourseData: any = {};

   ngOnInit(): void {
     this.categoriesService.getCategories().subscribe({
  next: (res) => {
    console.log('📦 categories response:', res); // <-- راقبي دي
    this.categories = Array.isArray(res) ? res : res.data || []; // تأكيد التحويل لمصفوفة
  },
  error: (err) => console.error('Error loading categories:', err)
});
    const storedCourse = localStorage.getItem('selectedCourse');
    if (storedCourse) {
      this.courseData = JSON.parse(storedCourse);
this.originalCourseData = JSON.parse(JSON.stringify(this.courseData)); // ✅ نسخة للقراءة فقط

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

get isRecordedCourse(): boolean {
  return this.courseData?.type === 1;
}

get isLiveCourse(): boolean {
  return this.courseData?.type === 2;
}







  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

onThumbnailChange(event: any): void {
  const file = event.target.files[0];
  if (file) {
    this.thumbnailFile = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.courseData.thumbnailUrl = reader.result;
    };
    reader.readAsDataURL(file);
  }
}


 onPromoVideoChange(event: any): void {
  const file = event.target.files[0];
  if (file && file.type.startsWith('video/')) {
    this.promoVideoFile = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.courseData.promoVideolUrl = reader.result;
    };
    reader.readAsDataURL(file);
  } else {
    alert('Please select a valid video file.');
  }
}


lectureVideoFiles: { [lectureId: string]: File } = {};
onLectureVideoChange(event: any, sectionIndex: number, contentIndex: number): void {
  const file = event.target.files[0];
  if (!file) return;

  const lecture = this.courseData.sections[sectionIndex].contentItems[contentIndex].lecture;
  if (lecture && lecture.id) {
    this.lectureVideoFiles[lecture.id] = file;
  }
}

onSubLectureVideoChange(event: any, sectionIndex: number, contentIndex: number, lessonIndex: number): void {
  const file = event.target.files[0];
  if (!file) return;

  const lecture = this.courseData.sections[sectionIndex].contentItems[contentIndex].subSection.lectures[lessonIndex];
  if (lecture && lecture.id) {
    this.lectureVideoFiles[lecture.id] = file;
  }
}

saveChanges(): void {
  const courseId = this.courseData.id;
  const courseType = this.courseData.type; // 1 = فيديو، 2 = لايف
  const updateRequests: Promise<any>[] = [];
  const token = localStorage.getItem('token') || '';

  // ✅ تحديث الكوبونات القديمة
  for (const existing of this.courseData.coupons) {
    if (existing.id) {
      const payload = {
        code: existing.code,
        discountPercentage: existing.discountPercentage ?? existing.discount,
        isValid: existing.isValid,
        courseId
      };
      updateRequests.push(
        this.http.put(`https://api.makhekh.com/api/Coupons/${existing.id}`, payload).toPromise()
      );
    }
  }

  // ✅ كوبون جديد
  if (this.newCoupon.code && this.newCoupon.discountPercentage > 0) {
    const payload = {
      code: this.newCoupon.code,
      discountPercentage: this.newCoupon.discountPercentage,
      isValid: this.newCoupon.isValid,
      courseId
    };
    updateRequests.push(
      this.http.post('https://api.makhekh.com/api/Coupons', payload).toPromise()
    );
  }

  // ✅ تحديث الصورة المصغرة
  if (this.thumbnailFile) {
    const formData = new FormData();
    formData.append('thumbnail', this.thumbnailFile);
    updateRequests.push(
      this.http.put(
        `https://api.makhekh.com/api/Courses/${courseId}/thumbnail`,
        formData,
        {
          headers: new HttpHeaders({ 'Authorization': `Bearer ${token}` })
        }
      ).toPromise()
    );
  }

  // ✅ تحديث الفيديو الترويجي
  if (this.promoVideoFile) {
    const formData = new FormData();
    formData.append('promoVideo', this.promoVideoFile);
    updateRequests.push(
      this.http.put(
        `https://api.makhekh.com/api/Courses/${courseId}/promo-video`,
        formData,
        {
          headers: new HttpHeaders({ 'Authorization': `Bearer ${token}` })
        }
      ).toPromise()
    );
  }

  // ✅ مقارنة وتحديث بيانات الأقسام
  const originalCourse = this.originalCourseData || {};
  const updatedCoursePayload: any = {};
  const fieldsToCheck = [
    'title', 'description', 'prerequisites', 'targetAudience',
    'price', 'currency', 'language', 'categoryId'
  ];

  for (let i = 0; i < this.courseData.sections.length; i++) {
    const section = this.courseData.sections[i];
    const originalSection = this.originalCourseData.sections?.[i];

    if (section.id && originalSection) {
      const hasTitleChanged = section.title !== originalSection.title;
      const hasDescChanged = (section.description ?? '') !== (originalSection.description ?? '');

      if (hasTitleChanged || hasDescChanged) {
        const sectionPayload = {
          title: section.title,
          description: section.description ?? ''
        };

        updateRequests.push(
          this.http.put(
            `https://api.makhekh.com/api/courses/${courseId}/Sections/${section.id}`,
            sectionPayload,
            {
              headers: new HttpHeaders({
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              })
            }
          ).toPromise()
        );
      }
    }
  }

  // ✅ تحديث بيانات الكورس الرئيسية
  for (const field of fieldsToCheck) {
    if (this.courseData[field] !== originalCourse[field]) {
      updatedCoursePayload[field] = this.courseData[field];
    }
  }

  if (Object.keys(updatedCoursePayload).length > 0) {
    updateRequests.push(
      this.http.put(
        `https://api.makhekh.com/api/Courses/${courseId}`,
        updatedCoursePayload,
        {
          headers: new HttpHeaders({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          })
        }
      ).toPromise()
    );
  }

  // ✅ تحديث المحاضرات (فيديو أو لايف)
  for (let sectionIndex = 0; sectionIndex < this.courseData.sections.length; sectionIndex++) {
    const section = this.courseData.sections[sectionIndex];
    const originalSection = this.originalCourseData.sections?.[sectionIndex];
    if (!originalSection) continue;

    for (let itemIndex = 0; itemIndex < section.contentItems.length; itemIndex++) {
      const item = section.contentItems[itemIndex];
      const originalItem = originalSection.contentItems?.[itemIndex];

      if (item.type === 'Lecture' && item.lecture && originalItem?.lecture) {
        const lecture = item.lecture;
        const originalLecture = originalItem.lecture;

        const hasChanged = lecture.title !== originalLecture.title ||
          lecture.description !== originalLecture.description ||
          (courseType === 2 && (
            lecture.lecturerName !== originalLecture.lecturerName ||
            lecture.zoomJoinUrl !== originalLecture.zoomJoinUrl ||
            lecture.zoomPassword !== originalLecture.zoomPassword ||
            lecture.status !== originalLecture.status ||
            lecture.maxParticipants !== originalLecture.maxParticipants
          ));

        if (hasChanged) {
          const lectureUrl = courseType === 2
            ? `https://api.makhekh.com/api/courses/${courseId}/Lectures/live/${lecture.id}`
            : `https://api.makhekh.com/api/Courses/${courseId}/Lectures/video/${lecture.id}`;

          let request;
          if (courseType === 1) {
            const formData = new FormData();
            formData.append('title', lecture.title);
            formData.append('description', lecture.description ?? '');
            formData.append('sectionId', section.id);
            if (item.subSectionId) formData.append('subSectionId', item.subSectionId);

            request = this.http.put(lectureUrl, formData, {
              headers: new HttpHeaders({ 'Authorization': `Bearer ${token}` })
            }).toPromise();
          } else {
            const payload: any = {
              title: lecture.title,
              description: lecture.description,
              sectionId: section.id
            };
            if (item.subSectionId) payload.subSectionId = item.subSectionId;
            payload.lecturerName = lecture.lecturerName;
            payload.zoomJoinUrl = lecture.zoomJoinUrl;
            payload.zoomPassword = lecture.zoomPassword;
            payload.status = lecture.status;
            payload.maxParticipants = lecture.maxParticipants;
            payload.zoomMeetingId = lecture.zoomMeetingId || '';
            payload.startTime = lecture.startTime || new Date().toISOString();
            payload.durationInMinutes = lecture.durationInMinutes || 0;
            payload.isInstant = true;

            request = this.http.put(lectureUrl, payload, {
              headers: new HttpHeaders({
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              })
            }).toPromise();
          }

          updateRequests.push(request);
        }
      }

      // ✅ محاضرات داخل SubSection
      if (item.type === 'SubSection' && item.subSection) {
        const subSection = item.subSection;
        const originalSubSection = originalItem?.subSection;
        if (!originalSubSection) continue;

        for (let li = 0; li < subSection.lectures.length; li++) {
          const lecture = subSection.lectures[li];
          const originalLecture = originalSubSection.lectures?.[li];
          if (!lecture || !originalLecture) continue;

          const hasChanged = lecture.title !== originalLecture.title ||
            lecture.description !== originalLecture.description ||
            (courseType === 2 && (
              lecture.lecturerName !== originalLecture.lecturerName ||
              lecture.zoomJoinUrl !== originalLecture.zoomJoinUrl ||
              lecture.zoomPassword !== originalLecture.zoomPassword ||
              lecture.status !== originalLecture.status ||
              lecture.maxParticipants !== originalLecture.maxParticipants
            ));

          if (hasChanged) {
            const lectureUrl = courseType === 2
              ? `https://api.makhekh.com/api/courses/${courseId}/Lectures/live/${lecture.id}`
              : `https://api.makhekh.com/api/Courses/${courseId}/Lectures/video/${lecture.id}`;

            let request;
            if (courseType === 1) {
              const formData = new FormData();
              formData.append('title', lecture.title);
              formData.append('description', lecture.description ?? '');
              formData.append('sectionId', section.id);
              formData.append('subSectionId', subSection.id);
              request = this.http.put(lectureUrl, formData, {
                headers: new HttpHeaders({ 'Authorization': `Bearer ${token}` })
              }).toPromise();
            } else {
              const payload: any = {
                title: lecture.title,
                description: lecture.description,
                sectionId: section.id,
                subSectionId: subSection.id,
                lecturerName: lecture.lecturerName,
                zoomJoinUrl: lecture.zoomJoinUrl,
                zoomPassword: lecture.zoomPassword,
                status: lecture.status,
                maxParticipants: lecture.maxParticipants,
                zoomMeetingId: lecture.zoomMeetingId || '',
                startTime: lecture.startTime || new Date().toISOString(),
                durationInMinutes: lecture.durationInMinutes || 0,
                isInstant: true
              };

              request = this.http.put(lectureUrl, payload, {
                headers: new HttpHeaders({
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json'
                })
              }).toPromise();
            }

            updateRequests.push(request);
          }
        }
      }
    }
  }

  // ✅ رفع ملفات الفيديو لو اتغيرت
  for (const lectureId in this.lectureVideoFiles) {
    const videoFile = this.lectureVideoFiles[lectureId];
    if (!videoFile) continue;

    const formData = new FormData();
    formData.append('videoFile', videoFile);

    const videoUploadUrl = `https://api.makhekh.com/api/Courses/${courseId}/Lectures/video/${lectureId}/update`;

    updateRequests.push(
      this.http.put(videoUploadUrl, formData, {
        headers: new HttpHeaders({ 'Authorization': `Bearer ${token}` })
      }).toPromise().then(res => {
        console.log(`🎥 Video uploaded for lecture ${lectureId}`);
        return res;
      }).catch(err => {
        console.error(`❌ Error uploading video for lecture ${lectureId}:`, err);
      })
    );
  }

  // ✅ تنفيذ كل الطلبات
  Promise.all(updateRequests)
    .then(results => {
      console.log('✅ Updated successfully:', results);
      localStorage.setItem('selectedCourse', JSON.stringify(this.courseData));
      const updated = localStorage.getItem('selectedCourse');
      if (updated) {
        this.courseData = JSON.parse(updated);
      }
      this.newCoupon = { code: '', discountPercentage: 0, expiryDate: '', isValid: true };
      this.addingCoupon = false;
      this.isEditing = false;
    })
    .catch(err => {
      console.error('❌ Error during saving:', err);
    });
}




thumbnailFile: File | null = null;
promoVideoFile: File | null = null;




  goBack(): void {
    this.router.navigate(['/instructor-profile/create-course']);
  }
addingCoupon = false;

newCoupon = {
  code: '',
  discountPercentage: 0,
  expiryDate: '',
  isValid: true
};

addCoupon() {
  if (this.newCoupon.code && this.newCoupon.discountPercentage > 0) {
    this.courseData.coupons.push({ ...this.newCoupon });
    this.newCoupon = { code: '', discountPercentage: 0, expiryDate: '', isValid: true };
    this.addingCoupon = false;
  }
}

deleteCoupon(index: number) {
  const coupon = this.courseData.coupons[index];
  if (!coupon.id) {
    // لو مفيش id (يعني كوبون جديد لسه متبعتش للـ API) نحذفه محلي بس
    this.courseData.coupons.splice(index, 1);
    return;
  }

  this.http.delete(`https://api.makhekh.com/api/Coupons/${coupon.id}`)
    .subscribe({
      next: () => {
        console.log(`✅ Coupon ${coupon.id} deleted from API`);
        this.courseData.coupons.splice(index, 1);
      },
      error: (err) => {
        console.error(`❌ Failed to delete coupon ${coupon.id}:`, err);
      }
    });
}



}


