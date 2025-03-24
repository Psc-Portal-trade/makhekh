import { Component, inject } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { LangService } from '../services/lang.service';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reviews',
  imports: [FormsModule, CommonModule, SidebarComponent,TranslocoPipe,RouterLink],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent {
  activeTab: string = 'instructorRating';
  selectedCourse: string = 'All Courses';
  logoSrc: string = 'assets/Logo AR.png';
 constructor(private langService: LangService) {
    this.setLogo();

   }
   _translocoService = inject(TranslocoService);
   ngOnInit() {

    this.langService.lang$.subscribe((lang) => {
      this.logoSrc = lang === 'ar' ? 'assets/Logo AR.png' : 'assets/Logo EN.png';
    });
    // تعيين الدورة الافتراضية
    this.selectedCourseKey = 'AllCourses';
    this.selectedCourse$ = this.translocoService.selectTranslate('AllCourses');
    
    // حساب المجموع لجميع الدورات
    this.calculateAverageRating();
    
    // تعيين البيانات الأولية
    this.setCourseData('AllCourses');
   }


   changeLang(): void {
    const htmlTag = document.documentElement;
    let lang = localStorage.getItem('lang');
    if (lang === 'ar') {
      htmlTag.setAttribute('dir', 'ltr');
      htmlTag.setAttribute('lang', 'en');
      this._translocoService.setActiveLang('en');
      this.langService.setLang('en');
    } else {
      htmlTag.setAttribute('dir', 'rtl');
      htmlTag.setAttribute('lang', 'ar');
      this._translocoService.setActiveLang('ar');
      this.langService.setLang('ar');
    }
    console.log('active lang', lang);
  }

  setLogo(): void {
    const lang = localStorage.getItem('lang');
    this.logoSrc = lang === 'ar' ? 'assets/Logo AR.png' : 'assets/Logo EN.png';
  }


  selectedCourseKey: string = ''; // المفتاح الفعلي

  

  // بيانات الكورسات المختلفة
  coursesData: any = {
    'AllCourses': {instructorRating: 0 }, // مضافة افتراضيًا
    'course 1': { instructorRating: 4 },
    'course 2': { instructorRating: 3.5 },
    'course 3': { instructorRating: 5 }
  };
private translocoService = inject(TranslocoService);
  selectedCourse$: Observable<string> = this.translocoService.selectTranslate('AllCourses');


  // تغيير القيم عند اختيار كورس معين
  changeCourse(courseKey: string) {
    this.selectedCourseKey = courseKey; // الاحتفاظ بالمفتاح الفعلي
    this.selectedCourse$ = this.translocoService.selectTranslate(courseKey);

    this.setCourseData(courseKey);
  }
 
  private setCourseData(courseKey: string) {
    if (this.coursesData[courseKey]) {
      this.instructorRating = this.coursesData[courseKey].instructorRating;
    
    }
  }
  // حساب متوسط التقييمات عند تحميل الصفحة
  instructorRating: number = this.calculateAverageRating();
  // حساب المتوسط الحسابي لتقييمات الكورسات
  calculateAverageRating(): number {
    // استخراج جميع التقييمات بدون تضمين AllCourses
    const ratings = Object.entries(this.coursesData)
      .filter(([key, _]) => key !== 'AllCourses') // استبعاد AllCourses
      .map(([_, course]) => (course as any).instructorRating)
      .filter(rating => typeof rating === 'number'); // التأكد من أن التقييم رقم وليس undefined
  
    const sum = ratings.reduce((acc, rating) => acc + rating, 0);
    const averaging = ratings.length ? parseFloat((sum / ratings.length).toFixed(1)) : 0;
  
    // تحديث القيمة العامة
    this.instructorRating = averaging;
    this.coursesData['AllCourses'].instructorRating = averaging;
  
    return averaging;
  }
  



  // توليد تقرير PDF عند الضغط على "Extract Report"
  exportReport() {
    if (!this.instructorRating) {
      alert(this.translocoService.translate('No data available for the report.'));
      return;
    }
  
    const currentLang = this.translocoService.getActiveLang();
    const isArabic = currentLang === 'ar';
    const translatedCourse = this.translocoService.translate(this.selectedCourseKey);
    
    const title = isArabic ? `تقرير الأداء - ${translatedCourse}` : `Performance Report - ${translatedCourse}`;
    const ratingLabel = isArabic ? 'تقييم المُحاضر:' : 'Instructor Rating:';
    const starsLabel = isArabic ? 'نجوم' : 'stars';
    const report = isArabic ? 'تقرير' : 'report';

    const doc = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4'
    });

    // تحميل الخط الصحيح عند استخدام العربية
    if (isArabic) {
      doc.addFont('assets/fonts/Amiri-Bold.ttf', 'Amiri-Bold', 'bold');
      doc.setFont('Amiri-Bold', 'bold');
    } 

    doc.setFontSize(16);
    const xPos = isArabic ? 180 : 20; // ضبط المحاذاة

    doc.text(title, xPos, 20, { align: isArabic ? 'right' : 'left' });
    doc.setFontSize(14);
    doc.text(`${ratingLabel} ${this.instructorRating} ${starsLabel}`, xPos, 40, { align: isArabic ? 'right' : 'left' });

    doc.save(`${translatedCourse}-${report}.pdf`);
}


  // تعيين التبويب النشط
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
