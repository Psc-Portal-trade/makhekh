import { Component, inject, OnInit } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LangService } from '../services/lang.service';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TeacherService } from '../services/teacher.service';
import { HttpClient } from '@angular/common/http';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-create-quiz',
  imports: [SidebarComponent,TranslocoPipe,RouterLink,CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './create-quiz.component.html',
  styleUrl: './create-quiz.component.css'
})
export class CreateQuizComponent implements OnInit  {

 fullName: string = '';
 firstLetter: string = '';
  role: string = '';
  userRole: string = '';
email:string=''
categories: any[] = [];

 logoSrc: string = 'assets/Logo AR.png';
 constructor(private langService: LangService,private authService: AuthService,private router: Router,private teacherService: TeacherService,private http: HttpClient,  private fb: FormBuilder,private categoriesService: CategoriesService // ✅ هنا أضفناه
 ) {
    this.setLogo();

    const userData = this.authService.getUserData();
    if (userData) {
      this.fullName = userData.fullName;
      this.role = userData.role;
  }
  }

  _translocoService = inject(TranslocoService);
profileImg: string = '../../assets/download.jfif';

quizForm!: FormGroup;
quizzes: any[] = [];
selectedQuiz: any = null;
loadCategories(): void {
  this.categoriesService.getCategories().subscribe({
    next: (res) => {
      this.categories = res.data || res; // حسب شكل الاستجابة
      console.log(this.categories)
    },
    error: (err) => {
      console.error('فشل في تحميل التصنيفات', err);
    }
  });
}
  ngOnInit(): void {
      window.scrollTo(0, 0);
      this.loadCategories();

    this.langService.lang$.subscribe((lang) => {
      this.logoSrc = lang === 'ar' ? 'assets/Logo AR.png' : 'assets/Logo EN.png';
    });
    
    this.getQuizzes();
    this.initForm();
    this.loadQuizzes();

  const user = this.authService.getUserData(); // هنا بنجيب الداتا من السيرفيس
  this.userRole = user?.userRole || ''; // هنا بنستخرج الرول
  this.fullName = user?.fullName || '';
  this.email = user?.email || '';
this.firstLetter = this.fullName.charAt(0).toUpperCase();

this.teacherService.getInstructorProfile().subscribe({
  next: (res) => {
    const profile = res.data;
    this.profileImg = profile.profileImageUrl || this.profileImg;
  },
  error: (err) => {
    console.error('Error loading profile from API', err);
  }
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


logout() {
  localStorage.removeItem('user');
  this.router.navigate(['/logOut']);
}





getQuizzes() {
  const token = this.authService.getToken();

if (!token) {
  console.error('🚫 لا يوجد توكن، يرجى تسجيل الدخول أولاً');
  return;
}

this.http.get('https://api.makhekh.com/api/teacher/quizzes', {
  headers: {
    Authorization: `Bearer ${token}`
  }
}).subscribe({
  next: (res: any) => {
    this.quizzes = res.data || [];
  },
  error: (err) => {
    console.error('❌ Error fetching quizzes:', err);
  }
});

}



modalVisible = false;
openModal(quiz: any) {
  this.selectedQuiz = quiz;
  this.quizForm.patchValue({
    courseName: quiz.title,
    examDescription: quiz.description,
    quizType: quiz.type === 1 ? 'mcq' : 'essay',
    duration: quiz.timeLimitInMinutes,
    attempts: quiz.attemptsAllowed,
    passingScore: quiz.passingPercentage,
    isFree: quiz.isFree,
    price: quiz.price,
    categoryId: quiz.categoryId
  });

  const modal = document.getElementById('quizModal');
  if (modal) {
    modal.style.display = 'block';
    modal.classList.add('show');
  }
}

closeModal() {
  const modal = document.getElementById('quizModal');
  if (modal) {
    modal.classList.remove('show');
    modal.style.display = 'none';
  }
}




initForm() {
  this.quizForm = this.fb.group({
    courseName: [''],
    examDescription: [''],
    quizType: [''],
    duration: [''],
    attempts: [''],
    passingScore: [''],
    isFree: [true],
    price: [''],
    categoryId: ['']
  });
}

loadQuizzes() {
  const token = this.authService.getToken(); // من الخدمة
  if (!token) return;

  this.http.get<any>('https://api.makhekh.com/api/teacher/quizzes', {
    headers: { Authorization: `Bearer ${token}` }
  }).subscribe({
    next: (res) => this.quizzes = res.data || [],
    error: (err) => console.error('Error loading quizzes:', err)
  });
}

openModal1(quiz: any) {
  this.selectedQuiz = quiz;
  this.quizForm.patchValue({
    courseName: quiz.title,
    examDescription: quiz.description,
    quizType: quiz.type === 1 ? 'mcq' : 'essay',
    duration: quiz.timeLimitInMinutes,
    attempts: quiz.attemptsAllowed,
    passingScore: quiz.passingPercentage,
    isFree: quiz.isFree,
    price: quiz.price,
    categoryId: quiz.categoryId
  });

  const modal = document.getElementById('quizModal');
  if (modal) {
    modal.style.display = 'block';
    modal.classList.add('show');
  }
}

closeModal1() {
  const modal = document.getElementById('quizModal');
  if (modal) {
    modal.style.display = 'none';
    modal.classList.remove('show');
  }
}


}
