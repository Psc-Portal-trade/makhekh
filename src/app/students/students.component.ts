import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { LangService } from '../services/lang.service';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

interface CourseData {
  NoOfStudent: number;
  NoOfStudentCompletedTheCourse: number;
  StudentsSuggestions: number;
  NoOfQuestions: number;
}

@Component({
  selector: 'app-students',
  imports: [FormsModule, CommonModule, SidebarComponent,TranslocoPipe,RouterLink],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css',
})
export class StudentsComponent {
  activeTab: string = 'NoOfStudent';
  selectedCourse: string = '';
  selectedCourseKey: string = ''; // المفتاح الفعلي

  // بيانات الكورسات المختلفة
  coursesData: Record<string, CourseData> = {
    'AllCourses': { NoOfStudent: 0, NoOfStudentCompletedTheCourse: 0, StudentsSuggestions: 0, NoOfQuestions:0}, // مضافة افتراضيًا
    'course 1': { NoOfStudent: 5000, NoOfStudentCompletedTheCourse: 75, StudentsSuggestions: 10, NoOfQuestions: 150 },
    'course 2': { NoOfStudent: 8000, NoOfStudentCompletedTheCourse: 90, StudentsSuggestions: 120, NoOfQuestions: 150 },
    'course 3': { NoOfStudent: 12000, NoOfStudentCompletedTheCourse: 200, StudentsSuggestions: 250, NoOfQuestions: 150 }
  };

  // القيم الافتراضية عند تحميل الصفحة
  NoOfStudent: number = 0;
  NoOfStudentCompletedTheCourse: number = 0;
  StudentsSuggestions: number = 0;
  NoOfQuestions: number = 0;

  logoSrc: string = 'assets/Logo AR.png';

  constructor(private langService: LangService) {
    this.setLogo();

  }

   _translocoService = inject(TranslocoService);
   private translocoService = inject(TranslocoService);

   selectedCourse$: Observable<string> = this.translocoService.selectTranslate('AllCourses');


   ngOnInit() {

    this.langService.lang$.subscribe((lang) => {
      this.logoSrc = lang === 'ar' ? 'assets/Logo AR.png' : 'assets/Logo EN.png';
    });
     // تعيين الدورة الافتراضية
     this.selectedCourseKey = 'AllCourses';
     this.selectedCourse$ = this.translocoService.selectTranslate('AllCourses');
     
     // حساب المجموع لجميع الدورات
     this.calculateAllCoursesTotals();
     
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




 // تغيير القيم عند اختيار كورس معين
 changeCourse(courseKey: string) {
  this.selectedCourseKey = courseKey; // الاحتفاظ بالمفتاح الفعلي
  this.selectedCourse$ = this.translocoService.selectTranslate(courseKey);

  this.setCourseData(courseKey);
}

private setCourseData(courseKey: string) {
  if (this.coursesData[courseKey]) {
    this.NoOfStudent = this.coursesData[courseKey].NoOfStudent;
    this.NoOfStudentCompletedTheCourse = this.coursesData[courseKey].NoOfStudentCompletedTheCourse;
    this.StudentsSuggestions = this.coursesData[courseKey].StudentsSuggestions;
    this.NoOfQuestions = this.coursesData[courseKey].NoOfQuestions;
  }
}

  // حساب مجموع كل القيم لجميع الكورسات
  private calculateAllCoursesTotals() {
    this.NoOfStudent = Object.values<{ NoOfStudent: number; NoOfStudentCompletedTheCourse: number; StudentsSuggestions: number; NoOfQuestions: number }>(this.coursesData)
      .reduce((sum, course) => sum + course.NoOfStudent, 0);
  
      this.NoOfStudentCompletedTheCourse = Object.values<{ NoOfStudent: number; NoOfStudentCompletedTheCourse: number; StudentsSuggestions: number; NoOfQuestions: number }>(this.coursesData)
      .reduce((sum, course) => sum + course.NoOfStudentCompletedTheCourse, 0);

      this.StudentsSuggestions = Object.values<{ NoOfStudent: number; NoOfStudentCompletedTheCourse: number; StudentsSuggestions: number; NoOfQuestions: number }>(this.coursesData)
      .reduce((sum, course) => sum + course.StudentsSuggestions, 0);

      this.NoOfQuestions = Object.values<{ NoOfStudent: number; NoOfStudentCompletedTheCourse: number; StudentsSuggestions: number; NoOfQuestions: number }>(this.coursesData)
      .reduce((sum, course) => sum + course.NoOfQuestions, 0);

    this.coursesData['AllCourses'] = {
      NoOfStudent: this.NoOfStudent,
      NoOfStudentCompletedTheCourse: this.NoOfStudentCompletedTheCourse,
      StudentsSuggestions: this.StudentsSuggestions,
      NoOfQuestions: this.NoOfQuestions

    };
  }

  // توليد تقرير PDF عند الضغط على "Extract Report"
  exportReport() {
    if (!this.NoOfStudent && !this.NoOfStudentCompletedTheCourse && !this.StudentsSuggestions && !this.NoOfQuestions) {
      alert(this.translocoService.translate('No data available for the report.'));
      return;
    }
  
    const currentLang = this.translocoService.getActiveLang();
    const isArabic = currentLang === 'ar';
    const translatedCourseKey = this.translocoService.translate(this.selectedCourseKey);

    const title = isArabic ? `تقرير الأداء - ${translatedCourseKey}` : `Performance Report - ${translatedCourseKey}`;
    const noOfStudentsLabel = isArabic ? 'عدد الطلاب:' : 'No of students:';
    const completedLabel = isArabic ? 'عدد الطلاب الذين أكملوا الدورة:' : 'No of students completed the course:';
    const suggestionsLabel = isArabic ? 'اقتراحات الطلاب:' : 'Students suggestions:';
    const questionsLabel = isArabic ? 'عدد الأسئلة:' : 'No of questions:';
    const report = isArabic ?'تقرير' : 'report';

  
    const doc = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4'
    });
  
    // تحميل الخط الصحيح "Amiri-Bold.ttf" فقط
    if (isArabic) {
      doc.addFont('assets/fonts/Amiri-Bold.ttf', 'Amiri-Bold', 'bold');
      doc.setFont('Amiri-Bold', 'bold');

    } 
  
    doc.setFontSize(16);
    const xPos = isArabic ? 180 : 20; // ضبط محاذاة النصوص
  
    doc.text(title, xPos, 20, { align: isArabic ? 'right' : 'left' });
    doc.setFontSize(14);
    doc.text(`${noOfStudentsLabel} ${this.NoOfStudent}`, xPos, 40, { align: isArabic ? 'right' : 'left' });
    doc.text(`${completedLabel} ${this.NoOfStudentCompletedTheCourse}`, xPos, 50, { align: isArabic ? 'right' : 'left' });
    doc.text(`${suggestionsLabel} ${this.StudentsSuggestions}`, xPos, 60, { align: isArabic ? 'right' : 'left' });
    doc.text(`${questionsLabel} ${this.NoOfQuestions}`, xPos, 70, { align: isArabic ? 'right' : 'left' });
    doc.save(`${translatedCourseKey}-${report}.pdf`);

  }
  

  // تعيين التبويب النشط
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
