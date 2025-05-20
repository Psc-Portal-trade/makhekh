import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router'; // ✅ تأكد من استيراد Router
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { QuizFormComponent } from '../quiz-form/quiz-form.component';
import { InstructorCoursesService } from '../services/instructor-courses.service';

@Component({
  selector: 'app-course-header',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, HttpClientModule,TranslocoPipe,QuizFormComponent],
  templateUrl: './course-header.component.html',
  styleUrls: ['./course-header.component.css']
})
export class CourseHeaderComponent implements OnInit {
  isQuizModalOpen = false;
  selectedSectionIndex: number = 0;
  selectedLectureIndex: number = 0;
  selectedRowIndex: number = 0;



  openQuizModal(sectionIndex: number, lectureIndex: number) {
    this.selectedSectionIndex = sectionIndex;
    this.selectedLectureIndex = lectureIndex;
    this.isQuizModalOpen = true;



    // فتح المودال يدويًا
    setTimeout(() => {
      const modal = document.getElementById('quizModal');
      if (modal) {
        modal.classList.add('show');
        modal.style.display = 'block';
      }
    });
  }


  handleQuizData(payload: { data: any, sectionIndex: number, lectureIndex: number }) {
  const { data, sectionIndex, lectureIndex } = payload;

  const targetLecture = this.sections[sectionIndex].lectures[lectureIndex];

  const quizData = {
    title: data.title || '',
    duration: data.duration || 0,
    questions: data.questions?.map((q: any) => ({
      text: q.text || '',
      options: q.options ? [...q.options] : [],
      correctAnswer: q.correctAnswer || null,
      answerExplanation: q.answerExplanation || ''
    })) || []
  };

  targetLecture.quizzes.push(quizData);
  this.courseObj.curriculum = [...this.sections];

  console.log("✅ تم إضافة كويز جديد في:");
  console.log("Section Index:", sectionIndex);
  console.log("Lecture Index:", lectureIndex);
  console.log("Quiz Data:", quizData);

  this.closeQuizModal();
}

openQuizModallive( rowIndex: number) {

  this.isQuizModalOpen = true;
  this.selectedRowIndex = rowIndex;  // حفظ الرقم الفريد للصف المحدد


  // فتح المودال يدويًا
  setTimeout(() => {
    const modal = document.getElementById('quizModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
    }
  });
}
handleQuizDatalive(payload: { data: any, rowIndex: number}) {
  const { data, rowIndex} = payload;

  const quizDatalive = {
    title: data.title || '',
    duration: data.duration || 0,
    questions: data.questions?.map((q: any) => ({
      text: q.text || '',
      options: q.options ? [...q.options] : [],
      correctAnswer: q.correctAnswer || null,
      answerExplanation: q.answerExplanation || ''
    })) || []
  };

  // إضافة الكويز إلى الصف المحدد
  if (this.courseObj.courseType === 'Live Streamed Educational Courses') {
    if (this.selectedSchedule.length > 0) {
      const selectedRow = this.selectedSchedule[rowIndex];  // الحصول على الصف باستخدام rowIndex

      if (!selectedRow.quizzes) {
        selectedRow.quizzes = [];  // إذا لم تكن هناك كويزات من قبل، نقوم بإنشاء مصفوفة جديدة
      }

      selectedRow.quizzes.push(quizDatalive);  // إضافة الكويز للصف
      this.courseObj.schedules = [...this.selectedSchedule];  // تحديث الكائن الذي يحتوي على البيانات
      console.log("✅ تم إضافة كويز داخل الجدول:", this.courseObj);
    } else {
      console.warn("⚠️ لا توجد صفوف (Schedules) لإضافة الكويز!");
    }
  }
}






closeQuizModal() {
  this.isQuizModalOpen = false;
  const modal = document.getElementById('quizModal');
  if (modal) {
    modal.classList.remove('show');
    modal.style.display = 'none';
  }
}



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

  nextStep1() {
    // التحقق من صحة البيانات لكل خطوة قبل المتابعة
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
    // إزالة رسالة التحذير إذا كانت البيانات مكتملة
    this.warningMessageKey = '';

    // حفظ بيانات كل خطوة في courseObj قبل الانتقال للخطوة التالية
    switch (this.currentStep) {
      case 0:
        this.courseObj.curriculum = this.sections;
        break;
      case 1:
        this.courseObj.landingPage = { ...this.course };
        break;
      case 2:
        this.courseObj.pricing = { ...this.courseData };
        break;
      case 3:
        this.courseObj.coupons = [...this.coupons];
        this.instructorCoursesService.addCourse(this.courseObj);
        this.router.navigate(['courseDetails'], { queryParams: { data: JSON.stringify(this.courseObj) } });
        return;
    }

    // الانتقال إلى الخطوة التالية فقط إذا لم تكن الأخيرة
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
      this.instructorCoursesService.addCourse(this.courseObj);
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
    if (!firstSection || firstSection.name.trim() === '') return false;
    const firstLecture = firstSection.lectures[0];
    if (!firstLecture || firstLecture.title.trim() === '') return false;
    if (!firstLecture.video || !firstLecture.description.trim()) return false;
    return true;
  }

  changeTab(sectionIndex: number, lectureIndex: number, tab: 'video' | 'description') {
    this.sections[sectionIndex].lectures[lectureIndex].activeTab = tab;
  }


  addSection() {
    this.sections.push({
      name: '',
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
    return !!this.course.title &&
           !!this.course.description &&
           !!this.course.language &&
           !!this.course.level &&
           !!this.course.category &&
           !!this.course.duration &&
           !!this.course.lecturer &&
           !!this.course.lecturerDescription &&
           !!this.course.photo &&  // التأكد من وجود صورة
           !!this.course.video;    // التأكد من وجود فيديو
  }


  onFileSelectedd(event: any, type: string) {
    const file = event.target.files[0];
    if (file) {
      if (type === 'photo' && ['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
        this.course.photo = file;
      } else if (type === 'video' && ['video/mp4', 'video/avi', 'video/mov'].includes(file.type)) {
        this.course.video = file;
      } else {
        alert(`Invalid ${type} format!`);
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
