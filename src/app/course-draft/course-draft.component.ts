import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslocoPipe } from '@ngneat/transloco';
declare var bootstrap: any;
import { SecondNavComponent } from '../navbar/second-nav/second-nav.component';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-course-draft',
  imports: [SecondNavComponent, FormsModule, CommonModule,TranslocoPipe],
  templateUrl: './course-draft.component.html',
  styleUrl: './course-draft.component.css'
})
export class CourseDraftComponent implements OnInit {
  newLecture: any = { title: '', description: '' };
  newSubSection = { title: '', description: '' };
  newLectureInSubSection = { title: '', description: '' };
  newLectureVideoFile: File | null = null;
  lectureVideoFile: File | null = null;
  currentSectionId: string | null = null;
  currentSubSectionId: string | null = null;
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
  newSection: any = { title: '', description: '' };
isLoading: boolean = false;

  constructor(private router: Router,private http: HttpClient,private categoriesService: CategoriesService) {}
originalCourseData: any = {};

   ngOnInit(): void {
    window.scrollTo(0, 0);
    this.categoriesService.getCategories().subscribe({
      next: (res) => {
        console.log('📦 categories response:', res);
        this.categories = Array.isArray(res) ? res : res.data || [];
      },
      error: (err) => console.error('Error loading categories:', err)
    });
    this.loadCourseData();
  }

  loadCourseData(): void {
  const storedCourse = localStorage.getItem('selectedCourse');
  if (storedCourse) {
    this.courseData = JSON.parse(storedCourse);
    this.originalCourseData = JSON.parse(JSON.stringify(this.courseData));
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
isLoading2: boolean = false;

saveChanges(): void {
  this.isLoading2 = true;

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
// ✅ حذف الأقسام المحذوفة
for (const deletedSection of this.deletedSections) {
  const sectionId = deletedSection.id;
  updateRequests.push(
    this.http.delete(`https://api.makhekh.com/api/Courses/${courseId}/Sections/${sectionId}`, {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${token}` })
    }).toPromise().then(res => {
      console.log("✅ تم حذف السكشن:", res);
    }).catch(err => {
      console.error("❌ خطأ أثناء حذف السكشن:", err);
    })
  );
}

// ✅ حذف المحاضرات المحذوفة
for (const deletedLecture of this.deletedLectures) {
  const lectureId = deletedLecture.id;
  updateRequests.push(
    this.http.delete(`https://api.makhekh.com/api/Courses/${courseId}/Lectures/${lectureId}`, {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${token}` })
    }).toPromise().then(res => {
      console.log("✅ تم حذف المحاضرة:", res);
    }).catch(err => {
      console.error("❌ خطأ أثناء حذف المحاضرة:", err);
    })
  );
}

// ✅ حذف الـ sub-sections المحذوفة
for (const deletedSubSection of this.deletedSubSections) {
  const subSectionId = deletedSubSection.id;
  updateRequests.push(
    this.http.delete(`https://api.makhekh.com/api/Courses/section/subsection/${subSectionId}`, {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${token}` })
    }).toPromise().then(res => {
      console.log("✅ تم حذف الـ SubSection:", res);
    }).catch(err => {
      console.error("❌ خطأ أثناء حذف الـ SubSection:", err);
    })
  );
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
      this.isLoading2 = false;

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
// لحذف المحاضرة داخل SubSection
deleteLesson(sectionIndex: number, subSectionIndex: number, lessonIndex: number) {
  this.courseData.sections[sectionIndex].contentItems[subSectionIndex].subSection.lectures.splice(lessonIndex, 1);
}

// لحذف المحاضرة
deleteLecture(sectionIndex: number, contentItemIndex: number): void {
  const lecture = this.courseData.sections[sectionIndex].contentItems[contentItemIndex].lecture;
  this.deletedLectures.push(lecture);  // إضافة المحاضرة المحذوفة
  this.courseData.sections[sectionIndex].contentItems.splice(contentItemIndex, 1);  // إزالة المحاضرة من الكورس
}



// لحذف الصب سيكشن
deleteSubSection(sectionIndex: number, contentItemIndex: number): void {
  const subSection = this.courseData.sections[sectionIndex].contentItems[contentItemIndex].subSection;
  this.deletedSubSections.push(subSection);  // إضافة الصب سيكشن المحذوف
  this.courseData.sections[sectionIndex].contentItems.splice(contentItemIndex, 1);  // إزالة الصب سيكشن من الكورس
}

// لحذف السكشن
deleteSection(index: number): void {
  const section = this.courseData.sections[index];
  if (section?.id) {
    this.deletedSections.push(section);  // أضف للقائمة
  }
  this.courseData.sections.splice(index, 1);  // احذف من الواجهة فقط
}

getToken(): string {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user).token : '';
}



fetchUpdatedCourse(): void {
  const courseId = this.courseData.id;
 const token = this.getToken();

  if (!token) return;

  this.isLoading = true;

  const apiUrl = `https://api.makhekh.com/api/Courses/${courseId}/drafted`;
  this.http.get(apiUrl, {
    headers: new HttpHeaders({ 'Authorization': `Bearer ${token}` })
  }).subscribe({
    next: (response: any) => {
      const updatedCourse = response.data; // ✅ استخدم data فقط

      this.courseData = updatedCourse;
      localStorage.setItem('selectedCourse', JSON.stringify(updatedCourse));

      this.isLoading = false;

      // إغلاق المودال إذا كان مفتوح
      const modalElement = document.getElementById('addSectionModal');
      if (modalElement) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal?.hide();
      }
    },
    error: () => {
      this.isLoading = false;
    }
  });
}


submitNewSection(): void {
  this.isLoading = true; // بدء تحميل البيانات (تشغيل الـ spinner)

  const courseId = this.courseData.id;
  const apiUrl = `https://api.makhekh.com/api/courses/${courseId}/Sections`;

  this.http.post(apiUrl, this.newSection).subscribe({
    next: (response: any) => {
      console.log('Section added successfully', response);
      this.courseData.sections.push(response.data); // إضافة السكشن الجديد إلى الكورس

      // حفظ الكورس في الـ localStorage
      localStorage.setItem('selectedCourse', JSON.stringify(this.courseData));

      // استدعاء API للحصول على الكورس المعدل
      this.fetchUpdatedCourse(); // جلب الكورس المحدث

      this.newSection = { title: '', description: '' };

      // إغلاق الموديل بعد إضافة السكشن
      const modalElement = document.getElementById('addSectionModal');
      if (modalElement) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal?.hide();
      }

      this.isLoading = false; // إيقاف الـ spinner
    },
    error: (err) => {
      console.error('Error adding section', err);
      this.isLoading = false; // إيقاف الـ spinner في حالة حدوث خطأ
    }
  });
}




openAddLectureModal(sectionId: string): void {
  this.currentSectionId = sectionId;
  this.newLecture = { title: '', description: '' };
  this.lectureVideoFile = null;
}

openAddSubSectionModal(sectionId: string): void {
  this.currentSectionId = sectionId;
  this.newSubSection = { title: '', description: '' };
}

openAddLectureToSubSectionModal(sectionId: string, subSectionId: string): void {
    this.currentSectionId = sectionId;
    this.currentSubSectionId = subSectionId;
    this.newLectureInSubSection = { title: '', description: '' };
    this.newLectureVideoFile = null;
    console.log(`Modal for adding lecture to section ${sectionId} and subsection ${subSectionId} opened.`);
  }

  onNewLectureVideoInSubSectionChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.newLectureVideoFile = file;
    }
  }

submitNewLectureToSubSection(): void {
  if (!this.newLectureInSubSection.title || !this.newLectureVideoFile || !this.currentSectionId || !this.currentSubSectionId) {
    console.error('Missing data for new lecture in subsection');
    return;
  }
  this.isLoading = true; // بدء تحميل البيانات

  const courseId = this.courseData.id;
  const apiUrl = `https://api.makhekh.com/api/Courses/${courseId}/Lectures/video`;

  const formData = new FormData();
  formData.append('Title', this.newLectureInSubSection.title);
  formData.append('Description', this.newLectureInSubSection.description);
  formData.append('SectionId', this.currentSectionId);
  formData.append('SubSectionId', this.currentSubSectionId);
  formData.append('videoFile', this.newLectureVideoFile, this.newLectureVideoFile.name);

  this.http.post(apiUrl, formData).subscribe({
    next: (response) => {
      console.log('Lecture added to subsection successfully', response);
      this.courseData.sections.forEach((section: any) => {
        if (section.id === this.currentSectionId) {
          section.contentItems.forEach((item: any) => {
            if (item.subSection && item.subSection.id === this.currentSubSectionId) {
              item.subSection.lectures.push(response); // إضافة المحاضرة الجديدة داخل الصب سيكشن
            }
          });
        }
      });

      // تحديث الكورس في الـ localStorage
      localStorage.setItem('selectedCourse', JSON.stringify(this.courseData));

      // استدعاء API للحصول على الكورس المعدل
      this.fetchUpdatedCourse();

      // إغلاق الموديل
      const modalElement = document.getElementById('addLectureToSubSectionModal');
      if (modalElement) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal?.hide();
      }

      this.newLectureInSubSection = { title: '', description: '' };
      this.newLectureVideoFile = null;
      this.isLoading = false;
    },
    error: (err) => {
      console.error('Error adding lecture to subsection', err);
      this.isLoading = false; // إيقاف الـ spinner في حالة حدوث خطأ
    }
  });
}


onNewLectureVideoChange(event: any): void {
  if (event.target.files && event.target.files.length) {
    this.lectureVideoFile = event.target.files[0];
  }
}

submitNewLecture(): void {
  if (!this.currentSectionId || !this.lectureVideoFile) {
    console.error('Section ID or video file is missing');
    return;
  }
  this.isLoading = true; // بدء تحميل البيانات

  const courseId = this.courseData.id;
  const apiUrl = `https://api.makhekh.com/api/Courses/${courseId}/Lectures/video`;

  const formData = new FormData();
  formData.append('Title', this.newLecture.title);
  formData.append('Description', this.newLecture.description);
  formData.append('SectionId', this.currentSectionId);
  formData.append('videoFile', this.lectureVideoFile, this.lectureVideoFile.name);

  this.http.post(apiUrl, formData).subscribe({
    next: (response: any) => {
      console.log('Lecture added successfully', response);
      this.courseData.sections.forEach((section: any) => {
        if (section.id === this.currentSectionId) {
          section.contentItems.push(response); // إضافة المحاضرة الجديدة إلى السكشن
        }
      });

      // تحديث الكورس في الـ localStorage
      localStorage.setItem('selectedCourse', JSON.stringify(this.courseData));

      // استدعاء API للحصول على الكورس المعدل
      this.fetchUpdatedCourse();

      const closeButton = document.querySelector('#addLectureModal .btn-close');
      if (closeButton) {
        (closeButton as HTMLElement).click();
      }
      this.isLoading = false;
    },
    error: (err) => {
      console.error('Error adding lecture', err);
      this.isLoading = false; // إيقاف الـ spinner في حالة حدوث خطأ
    }
  });
}

submitNewSubSection(): void {
  if (!this.currentSectionId) {
    console.error('Section ID is missing');
    return;
  }
  this.isLoading = true; // بدء تحميل البيانات

  const apiUrl = `https://api.makhekh.com/api/courses/section/${this.currentSectionId}/subsection`;

  const payload = {
    title: this.newSubSection.title,
    description: this.newSubSection.description
  };

  this.http.post(apiUrl, payload).subscribe({
    next: (response: any) => {
      console.log('Sub-section added successfully', response);
      this.courseData.sections.forEach((section: any) => {
        if (section.id === this.currentSectionId) {
          section.contentItems.push({ type: 'SubSection', subSection: response.data }); // إضافة الصب سيكشن الجديد
        }
      });

      // تحديث الكورس في الـ localStorage
      localStorage.setItem('selectedCourse', JSON.stringify(this.courseData));

      // استدعاء API للحصول على الكورس المعدل
      this.fetchUpdatedCourse();

      const closeButton = document.querySelector('#addSubSectionModal .btn-close');
      if (closeButton) {
        (closeButton as HTMLElement).click();
      }
      this.isLoading = false;
    },
    error: (err) => {
      console.error('Error adding sub-section', err);
      this.isLoading = false; // إيقاف الـ spinner في حالة حدوث خطأ
    }
  });
}


deletedSections: any[] = [];
  deletedLectures: any[] = [];
  deletedSubSections: any[] = [];

// دالة لرفع الملفات الخاصة بالسكشن
onFileChange(event: any, sectionIndex: number, fileIndex: number) {
  const file = event.target.files[0]; // الحصول على الملف المحمل
  if (file) {
    // حفظ الملف داخل البيانات الخاصة بالسكشن
    this.courseData.sections[sectionIndex].pdfFiles[fileIndex].file = file;
  }
}


// دالة لحذف ملف من السكشن
removeFileFromSection(sectionIndex: number, fileIndex: number) {
  this.courseData.sections[sectionIndex].pdfFiles.splice(fileIndex, 1);
}

// دالة لحذف ملف من المحاضرة
removeFileFromLecture(sectionIndex: number, contentItemIndex: number, fileIndex: number) {
  this.courseData.sections[sectionIndex].contentItems[contentItemIndex].lecture.pdfFiles.splice(fileIndex, 1);
}

// دالة لحذف ملف من درس داخل SubSection
removeFileFromLesson(sectionIndex: number, contentItemIndex: number, subSectionIndex: number, fileIndex: number) {
  this.courseData.sections[sectionIndex].contentItems[contentItemIndex].subSection.lectures[subSectionIndex].pdfFiles.splice(fileIndex, 1);
}





}


