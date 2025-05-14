import { Component, inject, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { QaService } from '../services/qa.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { Observable } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { LangService } from '../services/lang.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-qa',
  standalone: true,
  imports: [SidebarComponent,RouterLink, FormsModule, CommonModule, TranslocoPipe],
  templateUrl: './qa.component.html',
  styleUrl: './qa.component.css'
})
export class QaComponent implements OnInit {
  questions: any[] = [];
  logoSrc: string = 'assets/Logo AR.png';
 role: string = '';
 fullName: string = '';
 firstLetter: string = '';
userRole: string = '';
email:string=''
  private translocoService = inject(TranslocoService);
  selectedCourse$: Observable<string> = this.translocoService.selectTranslate('AllCourses');

 constructor(private qaService: QaService,private langService: LangService,private authService: AuthService,private router: Router) {
    this.setLogo();
    const userData = this.authService.getUserData();
    if (userData) {
      this.fullName = userData.fullName;
      this.role = userData.role;


  }

   }
   _translocoService = inject(TranslocoService);

  ngOnInit() {
    this.selectedCourse$ = this.translocoService.selectTranslate('AllCourses');

    this.qaService.getQuestions().subscribe(questions => {
      this.questions = questions.map(q => ({
        ...q,
        isEditing: false,
        tempAnswer: q.answer || ''
      }));
    });



    this.langService.lang$.subscribe((lang) => {
      this.logoSrc = lang === 'ar' ? 'assets/Logo AR.png' : 'assets/Logo EN.png';
    });



  const user = this.authService.getUserData(); // هنا بنجيب الداتا من السيرفيس
  this.userRole = user?.userRole || ''; // هنا بنستخرج الرول
  this.fullName = user?.fullName || '';
  this.email = user?.email || '';
this.firstLetter = this.fullName.charAt(0).toUpperCase();


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

  changeCourse(courseKey: string) {
    this.selectedCourse$ = this.translocoService.selectTranslate(courseKey);
    console.log(this.selectedCourse$);

    this.qaService.getQuestions().subscribe(questions => {
      if (courseKey === 'AllCourses') {

        this.questions = questions.map(q => ({
          ...q,
          isEditing: false,
          tempAnswer: q.answer || ''
        }));

      } else {
        const translatedCourse = this.translocoService.translate(courseKey); // الترجمة الصحيحة
        this.questions = questions
          .filter(q => q.course === translatedCourse) // تأكد من أن التصفية تعتمد على القيم المترجمة
          .map(q => ({
            ...q,
            isEditing: false,
            tempAnswer: q.answer || ''
          }));
      }
    });
  }

  toggleEdit(question: any) {
    question.isEditing = true;
  }

  saveAnswer(question: any) {
    if (question.tempAnswer.trim()) {
      this.qaService.addAnswer(question.id, question.tempAnswer);
      question.answer = question.tempAnswer;
      question.isEditing = false;
    }
  }


  logout() {
  localStorage.removeItem('user');
  this.router.navigate(['login']);
}

}
