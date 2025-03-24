import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { jsPDF } from "jspdf";
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { QaService } from '../services/qa.service';
import { LangService } from '../services/lang.service';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [FormsModule, CommonModule, SidebarComponent, TranslocoPipe , RouterLink],
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent {

  logoSrc: string = 'assets/Logo AR.png';

 

  private translocoService = inject(TranslocoService);
  selectedCourse$: Observable<string> = this.translocoService.selectTranslate('AllCourses');

 constructor(private qaService: QaService,private langService: LangService) {
    this.setLogo();

   }

   _translocoService = inject(TranslocoService);

  ngOnInit() {
   // تعيين الدورة الافتراضية
   this.selectedCourseKey = 'AllCourses';
   this.selectedCourse$ = this.translocoService.selectTranslate('AllCourses');
   
   // حساب المجموع لجميع الدورات
   this.calculateAllCoursesTotals();
   
   // تعيين البيانات الأولية
   this.setCourseData('AllCourses');


    this.langService.lang$.subscribe((lang) => {
      this.logoSrc = lang === 'ar' ? 'assets/Logo AR.png' : 'assets/Logo EN.png';
    });

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

  activeTab: string = 'revenue';
  selectedCourse: string = ''; // الاسم المترجم
  selectedCourseKey: string = ''; // المفتاح الفعلي

  // بيانات الكورسات المختلفة
  coursesData: any = {
    'AllCourses': { totalRevenue: 0, totalEnrollments: 0, totalSales: 0 }, // مضافة افتراضيًا
    'course 1': { totalRevenue: 6000, totalEnrollments: 75, totalSales: 100 },
    'course 2': { totalRevenue: 7000, totalEnrollments: 90, totalSales: 120 },
    'course 3': { totalRevenue: 12000, totalEnrollments: 200, totalSales: 250 }
  };

  totalRevenue: number = 0;
  totalEnrollments: number = 0;
  totalSales: number = 0;


  // تغيير القيم عند اختيار كورس معين
  changeCourse(courseKey: string) {
    this.selectedCourseKey = courseKey; // الاحتفاظ بالمفتاح الفعلي
    this.selectedCourse$ = this.translocoService.selectTranslate(courseKey);

    this.setCourseData(courseKey);
  }

  // تحديث بيانات الدورة المحددة
  private setCourseData(courseKey: string) {
    if (this.coursesData[courseKey]) {
      this.totalRevenue = this.coursesData[courseKey].totalRevenue;
      this.totalEnrollments = this.coursesData[courseKey].totalEnrollments;
      this.totalSales = this.coursesData[courseKey].totalSales;
    }
  }

  // حساب المجموع لجميع الدورات وإضافته لـ "AllCourses"
  private calculateAllCoursesTotals() {
    this.totalRevenue = Object.values<{ totalRevenue: number; totalEnrollments: number; totalSales: number }>(this.coursesData)
      .reduce((sum, course) => sum + course.totalRevenue, 0);
  
    this.totalEnrollments = Object.values<{ totalRevenue: number; totalEnrollments: number; totalSales: number }>(this.coursesData)
      .reduce((sum, course) => sum + course.totalEnrollments, 0);
  
    this.totalSales = Object.values<{ totalRevenue: number; totalEnrollments: number; totalSales: number }>(this.coursesData)
      .reduce((sum, course) => sum + course.totalSales, 0);
  
    this.coursesData['AllCourses'] = {
      totalRevenue: this.totalRevenue,
      totalEnrollments: this.totalEnrollments,
      totalSales: this.totalSales
    };
  }
  
  // توليد تقرير PDF عند الضغط على "Extract Report"
  exportReport() {
    if (!this.totalRevenue && !this.totalEnrollments && !this.totalSales) {
      alert(this.translocoService.translate('No data available for the report.'));
      return;
    }
  
    const currentLang = this.translocoService.getActiveLang();
    const isArabic = currentLang === 'ar';
    const translatedCourse = this.translocoService.translate(this.selectedCourseKey);
    
    const title = isArabic ? `تقرير الأداء - ${translatedCourse}` : `Performance Report - ${translatedCourse}`;
    const revenueLabel = isArabic ? 'إجمالي الإيرادات:' : 'Total Revenue:';
    const enrollmentsLabel = isArabic ? 'إجمالي التسجيلات:' : 'Total Enrollments:';
    const salesLabel = isArabic ? 'إجمالي المبيعات:' : 'Total Sales:';
    const currency = isArabic ? 'جنيه' : 'LE';
    const report = isArabic ? 'تقرير' : 'report';

    const doc = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4'
    });

    // تحميل الخط الصحيح "Amiri-Bold.ttf" فقط عند استخدام العربية
    if (isArabic) {
      doc.addFont('assets/fonts/Amiri-Bold.ttf', 'Amiri-Bold', 'bold');
      doc.setFont('Amiri-Bold', 'bold');
    } 

    doc.setFontSize(16);
    const xPos = isArabic ? 180 : 20; // ضبط محاذاة النصوص

    doc.text(title, xPos, 20, { align: isArabic ? 'right' : 'left' });
    doc.setFontSize(14);
    doc.text(`${revenueLabel} ${this.totalRevenue || 0} ${currency}`, xPos, 40, { align: isArabic ? 'right' : 'left' });
    doc.text(`${enrollmentsLabel} ${this.totalEnrollments || 0}`, xPos, 50, { align: isArabic ? 'right' : 'left' });
    doc.text(`${salesLabel} ${this.totalSales || 0}`, xPos, 60, { align: isArabic ? 'right' : 'left' });

    doc.save(`${translatedCourse}-${report}.pdf`);
  }


  // تعيين التبويب النشط
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
