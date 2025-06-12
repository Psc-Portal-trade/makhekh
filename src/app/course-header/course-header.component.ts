import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router'; // ✅ تأكد من استيراد Router
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { QuizFormComponent } from '../quiz-form/quiz-form.component';
import { InstructorCoursesService } from '../services/instructor-courses.service';
import { QuizFormSectionComponent } from "../quiz-form-section/quiz-form-section.component";
import { QuizFormCourseComponent } from "../quiz-form-course/quiz-form-course.component";

@Component({
  selector: 'app-course-header',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, HttpClientModule, TranslocoPipe],
  templateUrl: './course-header.component.html',
  styleUrls: ['./course-header.component.css']
})
export class CourseHeaderComponent implements OnInit {
  isQuizModalOpen = false;
  selectedSectionIndex: number = 0;
  selectedLectureIndex: number = 0;
  selectedRowIndex: number = 0;


  activeLang: string = 'en'; // تعيين اللغة الافتراضية


  courseObj: any = {};
  originalCourseData: any = {};
  copiedCourse: any = null;
  currentStep = 0;
  allFormData: any = {};
  selectedSchedule: any[] = [];
  coupons: any[] = [{ code: '', status: 'Free', users: 'Limited', startDate: '', endDate: '' }];

  stepsRecorded_Educational_Courses = [
    {  titleEn: 'Curriculum',titleAr: 'مقرر',  completed: false },
    { titleEn: 'Landing Page',titleAr: 'صفحة الهبوط', completed: false },
    { titleEn: 'Pricing & Promotions',titleAr: 'التسعير والعروض الترويجية', completed: false },
    { titleEn: 'Create Coupons',titleAr: 'إنشاء قسائم', completed: false }
  ];
  stepsLive_Streamed_Educational_Courses = [
    { titleEn: 'Instructor Schedules',titleAr: 'جداول المدربين', completed: false },
    { titleEn: 'Landing Page',titleAr: 'صفحة الهبوط', completed: false },
    { titleEn: 'Pricing & Promotions',titleAr: 'التسعير والعروض الترويجية', completed: false },
    { titleEn: 'Create Coupons',titleAr: 'إنشاء قسائم', completed: false }
  ];


  sections = [{
    name: '',
    description: '',
    lectures: [{ title: '', video: null, videoName: '', description: '', activeTab: 'video', quizzes: []as any[]}]
  }];

  course = {
    title: '', description: '', language: 'English', level: 'Beginner', category: 'Design', duration: 'Week',
    video: null, photo: null, lecturer: '', lecturerDescription: ''
  };

 courseData = {
  currency: 'USD',
  priceTier: 'Free',
  promoLink: '',
  price: 0,
  selectedVoucher: 'best_current_price',
  voucherOptions: [
    { value: 'best_current_price', labelEn: 'Best Current Price',labelAr: 'أفضل سعر حالي', featuresEn: ['Fixed price', 'Unlimited quantity', 'Limited validity period'],featuresAr: ['سعر ثابت', 'كمية غير محدودة', 'فترة صلاحية محدودة'] },
    { value: 'custom_price', labelEn: 'Custom Price',labelAr: 'سعر مخصص', featuresEn: ['Select a price between two numbers', 'Unlimited quantity', 'Limited validity period'],featuresAr: ['اختر سعرًا بين رقمين', 'كمية غير محدودة', 'فترة صلاحية محدودة'] },
    { value: 'Free period', labelEn: 'Free period',labelAr: 'فترة مجانية', featuresEn: ['Unlimited quantity', 'Limited validity period'],featuresAr: ['كمية غير محدودة', 'فترة صلاحية محدودة'] },

 ]
};



  constructor(private http: HttpClient, private route: ActivatedRoute,  private router: Router,private translocoService: TranslocoService,    private instructorCoursesService: InstructorCoursesService,
  ) {
    this.translocoService.langChanges$.subscribe(lang => {
      this.activeLang = lang;
    });

   }

  ngOnInit() {
      window.scrollTo(0, 0);

    this.route.queryParams.subscribe(params => {
      console.log("📩 Received Params:", params);

      if (params['course']) {
        try {
          this.courseObj = JSON.parse(decodeURIComponent(params['course']));
          console.log('✅ Received Course Data:', this.courseObj);



        } catch (error) {
          console.error("❌ Error parsing course data:", error);
        }
      }
    });

    this.ensureMinimumRows();

  }
  ensureMinimumRows() {
    while (this.selectedSchedule.length < 1) {
      this.selectedSchedule.push({
        courseTitle: '', date: '', time: '', lecturerName: '',
        registered: '', status: '', joinLink: '', limit: '', quizzes: []as any[]
      });
    }
  }
  isFirstRowComplete(): boolean {
    if (this.selectedSchedule.length === 0) return false; // تأكد من وجود صف واحد على الأقل

    const firstRow = this.selectedSchedule[0]; // الحصول على الصف الأول

    return firstRow.courseTitle?.trim() !== '' &&
           firstRow.date !== '' &&
           firstRow.time !== '' &&
           firstRow.lecturerName?.trim() !== '' &&
           firstRow.registered != null && firstRow.registered !== '' &&
           firstRow.status?.trim() !== '' &&
           firstRow.joinLink?.trim() !== '' &&
           firstRow.limit != null && firstRow.limit !== '';
  }

  resetToOriginalData() {
    this.courseObj = { ...this.originalCourseData };
  }

  saveCourseData() {
    this.copiedCourse = { ...this.courseObj };
    console.log("Copied Course Data:", this.copiedCourse);
  }


  isStepTwoValid(): boolean {
    return this.courseData && Object.keys(this.courseData).length > 0 && this.courseData.price > 0;
  }


async submitCourseFlow() {
  try {
    this.isLoading = true;

    const userData = localStorage.getItem('user');
    const token = userData ? JSON.parse(userData).token : null;

    if (!token) throw new Error('Missing token');

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const formData = new FormData();

    const photo = this.courseObj?.landingPage?.photo;
    if (photo instanceof File) {
      formData.append('thumbnail', photo);
    } else {
      alert('❌ Please upload a valid image file (png/jpeg).');
      console.warn('Thumbnail is missing or not a valid File:', photo);
      this.isLoading = false;
      return;
    }

    if (this.courseObj.categoryId) {
      formData.append('categoryId', this.courseObj.categoryId);
    }

    const levelMap: { [key: string]: string } = {
      Beginner: '1',
      Intermediate: '2',
      Advanced: '3',
    };
    const level = this.courseObj.landingPage?.level;
    if (level && levelMap[level]) {
      formData.append('level', levelMap[level]);
    }

    if (this.courseObj.landingPage?.language) {
      formData.append('language', this.courseObj.landingPage.language.toLowerCase());
    }

    if (this.courseObj.pricing?.price != null) {
      formData.append('price', this.courseObj.pricing.price.toString());
    }

    if (this.courseObj.courseTitle) {
      formData.append('Title', this.courseObj.courseTitle);
    }

    if (this.courseObj.pricing?.currency) {
      formData.append('currency', this.courseObj.pricing.currency);
    }

    if (this.courseObj.subcategoryId) {
      formData.append('subcategoryId', this.courseObj.subcategoryId);
    }

    if (this.courseObj.targetAudience) {
      formData.append('targetAudience', this.courseObj.targetAudience);
    }

    if (this.courseObj.requirements) {
      formData.append('prerequisites', this.courseObj.requirements);
    }

    if (this.courseObj.landingPage?.description) {
      formData.append('descriptions', this.courseObj.landingPage.description);
    }

    const typeMap: { [key: string]: string } = {
      'Recorded Educational Courses': '1',
      'Live Streamed Educational Courses': '2',
    };
    if (this.courseObj.courseType && typeMap[this.courseObj.courseType]) {
      formData.append('type', typeMap[this.courseObj.courseType]);
    }

    console.log('🟡 Sending formData...');
    formData.forEach((val, key) => console.log(`${key}:`, val));

    const courseResponse: any = await this.http
      .post('https://api.makhekh.com/api/Courses', formData, { headers })
      .toPromise();

    console.log('✅ Course Creation Response:', courseResponse);

    const courseId = courseResponse.data?.id;
    this.courseObj.categoryId = courseId;
    console.log('✅ Course ID set as categoryId:', courseId);

    for (const section of this.courseObj.curriculum) {
      const sectionBody = {
        title: section.name,
        description: section.description,
      };

      const sectionResponse: any = await this.http
        .post(
          `https://api.makhekh.com/api/courses/${courseId}/Sections`,
          sectionBody,
          {
            headers: {
              ...headers,
              'Content-Type': 'application/json',
            },
          }
        )
        .toPromise();

      console.log('📦 Section Response:', sectionResponse);

      const sectionId = sectionResponse.id;

      for (const lecture of section.lectures) {
        const lectureFormData = new FormData();
        lectureFormData.append('Title', lecture.title);
        lectureFormData.append('SectionId', sectionId);

        if (lecture.video) {
          lectureFormData.append('videoFile', lecture.video);
        }

        const lectureResponse: any = await this.http
          .post(`https://api.makhekh.com/api/Courses/${courseId}/Lectures/video`, lectureFormData, { headers })
          .toPromise();

        console.log('🎥 Lecture Upload Response:', lectureResponse);
      }
    }

    // ✅ عمل Approve تلقائي
    const approveToken = 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjkzM2RkOGU5LTk2ZDItNDliOS1hOTdiLTJhMGJkMDMyZTc4NyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2dpdmVubmFtZSI6Ik11c3RhZmEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJhZG1pbkBtYWhrZWhrLmNvbSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiZXhwIjoxNzQ5OTAyMDMyLCJpc3MiOiJodHRwczovL2FwaS5tYWtoZWtoLmNvbS8iLCJhdWQiOiJNeVNlY3VyZUtleSJ9.Xq3nAOuu_ohD3PqVy4KIC1vNvsA9spTFq5hGbDgd0x4';

    const approveBody = {
      courseId: courseId,
      approve: true,
      comment: "ok"
    };

    const approveResponse = await this.http
      .post(
        'https://api.makhekh.com/api/admin/courses/approve',
        approveBody,
        {
          headers: {
            Authorization: `Bearer ${approveToken}`,
            'Content-Type': 'application/json',
          },
        }
      )
      .toPromise();

    console.log('✅ Course Approved Response:', approveResponse);

    this.isLoading = false;

    this.router.navigate(['instructor-profile/create-course'], {
      queryParams: { data: JSON.stringify({ ...this.courseObj, id: courseId }) },
    });

  } catch (error) {
    this.isLoading = false;
    console.error('❌ Error during course submission:', error);
    this.warningMessageKey = 'warnings.courseUploadFailed';
  }
}





isLoading: boolean = false;


 nextStep1() {
  if (this.currentStep === 0 && !this.isFirstStepValid()) {
    this.warningMessageKey = 'warnings.fillFirstSection';
    return;
  }

  if (this.currentStep === 1 && !this.isStepThreeValid()) {
    this.warningMessageKey = 'warnings.fillCourseData';
    return;
  }

  if (this.currentStep === 2 && !this.isStepTwoValid()) {
    this.warningMessageKey = 'warnings.fillPriceData';
    return;
  }

  this.warningMessageKey = '';

  switch (this.currentStep) {
    case 0:
      this.courseObj.curriculum = this.sections;
      break;
    case 1:
      this.courseObj.landingPage = {
        ...this.course,
        photo: this.courseObj.landingPage.photo,
        video: this.courseObj.landingPage.video
      };
      break;
    case 2:
      this.courseObj.pricing = { ...this.courseData };
      break;
    case 3:
      this.courseObj.coupons = [...this.coupons];
      // this.instructorCoursesService.addCourse(this.courseObj);

      // ✅ نشغّل السبنر ونستدعي الارسال
      this.isLoading = true;
      this.submitCourseFlow();
      return; // ⛔ نحذف التنقل من هنا
  }

  if (this.currentStep < this.stepsRecorded_Educational_Courses.length - 1) {
    this.currentStep++;
  }

  console.log(this.courseObj);
}



  nextStep2() {
    console.log("Before Saving:", this.courseObj); // لمعرفة البيانات قبل الحفظ
    if (this.currentStep === 0 && !this.isFirstRowComplete()) {
      this.warningMessageKey = 'warnings.fillFirstSection';
      return;
    }

    if (this.currentStep === 1 && !this.isStepThreeValid()) {
      this.warningMessageKey = 'warnings.fillCourseData';
      return;
    }

    if (this.currentStep === 2 && !this.isStepTwoValid()) {
      this.warningMessageKey = 'warnings.fillPriceData';
      return;
    }

    this.warningMessageKey = '';



    if (this.currentStep === 0) {
      this.courseObj.schedules = this.selectedSchedule;  // احفظ بيانات الجدول
    }
    else if (this.currentStep === 1) {
      this.courseObj.landingPage = {
        title: this.course.title,
        description: this.course.description,
        language: this.course.language,
        level: this.course.level,
        category: this.course.category,
        duration: this.course.duration,
        lecturer: this.course.lecturer,
        lecturerDescription: this.course.lecturerDescription,
        photo: this.course.photo,  // ✅ حفظ الصورة
        video: this.course.video   // ✅ حفظ الفيديو
      };
    }

    else if (this.currentStep === 2) {
      this.courseObj.pricing = {
        currency: this.courseData.currency,
        priceTier: this.courseData.priceTier,
        promoLink: this.courseData.promoLink,
        selectedVoucher: this.courseData.selectedVoucher,
        price:this.courseData.price
      };
    }
    else if (this.currentStep === 3) {
      this.courseObj.coupons = this.coupons;
      // this.instructorCoursesService.addCourse(this.courseObj);
      this.router.navigate(['courseDetails'], { queryParams: { data: JSON.stringify(this.courseObj) } });

    }


    // التنقل إلى الخطوة التالية
    if (this.currentStep < this.stepsLive_Streamed_Educational_Courses.length - 1) {
      this.currentStep++;
    }
console.log("Course Object:", this.courseObj);

  }






  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }



  addCoupon() {
    this.coupons.push({ code: '', status: 'Free', users: 'Limited', startDate: '', endDate: '' });
  }

  removeCoupon(index: number) {
    this.coupons.splice(index, 1);
  }



  saveData() {
    console.log('Saved Data:', this.courseData);
  }

  pastePromoLink() {
    this.courseData.promoLink = 'https://your-promo-link.com';
    console.log('Promo link pasted:', this.courseData.promoLink);
  }

isFirstStepValid(): boolean {
  const firstSection = this.sections[0];
  if (
    !firstSection ||
    firstSection.name.trim() === '' ||
    firstSection.description.trim() === ''
  ) {
    return false;
  }

  const firstLecture = firstSection.lectures[0];
  if (
    !firstLecture ||
    firstLecture.title.trim() === '' ||
    firstLecture.description.trim() === '' ||
    !firstLecture.video
  ) {
    return false;
  }

  return true;
}


  changeTab(sectionIndex: number, lectureIndex: number, tab: 'video' | 'description') {
    this.sections[sectionIndex].lectures[lectureIndex].activeTab = tab;
  }


  addSection() {
    this.sections.push({
      name: '',
      description: '',
      lectures: [{ title: '', video: null, videoName: '', description: '', activeTab: 'video' ,quizzes: []as any[]}]
    });
  }
  addLecture(sectionIndex: number) {
    this.sections[sectionIndex].lectures.push({
      title: '',
      video: null,
      videoName: '',
      description: '',
      activeTab: 'video',
      quizzes: []
    });
  }
  warningMessageKey: string = '';

isStepThreeValid(): boolean {
  // نتحقق أولاً إننا في الخطوة رقم 1
  if (this.currentStep !== 1) return true;

  // بعد كده نتحقق من القيم المطلوبة
  return !!this.course.description?.trim() &&
         !!this.course.language &&
         !!this.course.level &&
         !!this.course.duration ;
}
// &&
// !!this.course.photo

onFileSelectedd(event: any, type: string) {
  const file = event.target.files?.[0];
  if (!file) return;

  console.log('📦 File selected:', file);
  console.log('📎 File type:', file.type);
  console.log('📎 File name:', file.name);

  if (!this.courseObj.landingPage) {
    this.courseObj.landingPage = {};
  }

  const validImageExtensions = ['jpg', 'jpeg', 'png', 'webp', 'bmp', 'gif', 'svg', 'jfif'];
  const fileExtension = file.name.split('.').pop()?.toLowerCase();
  const isImageByType = file.type.startsWith('image/');
  const isImageByExtension = fileExtension && validImageExtensions.includes(fileExtension);

  if (type === 'photo') {
    if (isImageByType || isImageByExtension) {
      this.courseObj.landingPage.photo = file;
      console.log('✅ Valid image file set:', file);
    } else {
      alert(`❌ Invalid image format!\nName: ${file.name}\nType: ${file.type}`);
    }
  } else if (type === 'video') {
    const validVideoTypes = ['video/mp4', 'video/avi', 'video/mov'];
    if (validVideoTypes.includes(file.type)) {
      this.courseObj.landingPage.video = file;
    } else {
      alert(`❌ Invalid video format!`);
    }
  }
}





  deleteRow(index: number) {
    this.selectedSchedule.splice(index, 1);
  }

  editRow(index: number, key: string, event: any) {
    if (this.selectedSchedule[index]) {
      this.selectedSchedule[index][key] = event.target.innerText.trim();
    }
  }
  addRow() {
    this.selectedSchedule.push({
      courseTitle: '', date: '', time: '', lecturerName: '',
      registered: '', status: '', joinLink: '', limit: ''
    });
  }

  onFileSelected(event: any, sectionIndex: number, lectureIndex: number) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('video/')) {
      this.sections[sectionIndex].lectures[lectureIndex].video = file;
      this.sections[sectionIndex].lectures[lectureIndex].videoName = file.name;
    } else {
      alert("Please select a valid video file.");
    }
  }


  removeLecture(sectionIndex: number, lectureIndex: number) {
    this.sections[sectionIndex].lectures.splice(lectureIndex, 1);
  }


  removeSection(index: number) {
    this.sections.splice(index, 1);
  }







}
