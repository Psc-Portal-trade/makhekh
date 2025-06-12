import { Component, inject, OnInit } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LangService } from '../services/lang.service';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
userId: string = '';


 logoSrc: string = 'assets/Logo AR.png';
  quizType: any;
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
    this.quizType = this.quizForm.value.quizType; // لو أردت تحديده يدويًا لاحقًا
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
  this.quizType = quiz.type; // ✅ ضروري لحساب نوع الزر المعروض

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
    courseName: ['', Validators.required],
    examDescription: ['', Validators.required],
    categoryId: [null, Validators.required],
    quizType: [null, Validators.required],
    duration: [null, [Validators.required, Validators.min(1)]],
    attempts: [null, [Validators.required, Validators.min(1)]],
    passingScore: [null, [Validators.required, Validators.min(0)]],
    isFree: [true],
    price: [null], // تأكد إنه شرطه يظهر فقط لو مش مجاني
    questions: this.fb.array([]),
  });
  
}
get questions() {
  return this.quizForm.get('questions') as any;
}
getOptions(index: number) {
  return this.questions.at(index).get('options');
}
 addQuestion(type: 'mcq' | 'essay' = 'mcq') {
    let questionGroup: FormGroup;
    const selectedType = this.quizForm.get('quizType')?.value;
    if (type !== selectedType) {
      return alert(this._translocoService.translate('quiz.errors.quiz_type_mismatch'));
    }
    if (type === 'mcq') {
      const optionsArray = this.fb.array([
        this.fb.group({ optionValue: ['', Validators.required] }),
        this.fb.group({ optionValue: ['', Validators.required] }),
        this.fb.group({ optionValue: ['', Validators.required] }),
        this.fb.group({ optionValue: ['', Validators.required] }),
      ]);
  
      questionGroup = this.fb.group({
        type: ['mcq'],
        text: ['', Validators.required],
        options: optionsArray,
        correctOptionIndex: [null, Validators.required],
        correctAnswer: [''],
        answerExplanation: [''],
        marks: [0, [Validators.required, Validators.min(1)]], // ✅

      });
    } else {
      questionGroup = this.fb.group({
        type: ['essay'],
        text: ['', Validators.required],
        answerExplanation: [''],
        marks: [0, [Validators.required, Validators.min(1)]], // ✅

      });
    }
  
    this.questions.push(questionGroup);
    this.quizForm.updateValueAndValidity();
  }
  removeQuestion(index: number) {
    this.questions.removeAt(index);
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


extractParams(msg: string): any {
  const parts = msg.split('|');
  if (parts.length < 2) return {};
  const paramStr = parts[1];
  const params = paramStr
    .replace(/[{}]/g, '')
    .split(',')
    .map(pair => pair.split(':'))
    .reduce((acc, [key, val]) => ({ ...acc, [key.trim()]: Number(val) }), {});
  return params;
}


 
  

  // Create option group for MCQ
  createOption(): FormGroup {
    return this.fb.group({
      optionValue: ['', Validators.required]
    });
  }

 

  // Needed to bind the radio button to a FormControl
  asFormControl(control: any): FormControl {
    return control as FormControl;
  }



    



}

















































// import { Component, inject, OnInit } from '@angular/core';
// import { SidebarComponent } from "../sidebar/sidebar.component";
// import { Router, RouterLink } from '@angular/router';
// import { AuthService } from '../services/auth.service';
// import { LangService } from '../services/lang.service';
// import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
// import { CommonModule } from '@angular/common';
// import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
// import { TeacherService } from '../services/teacher.service';
// import { HttpClient } from '@angular/common/http';
// import { CategoriesService } from '../services/categories.service';

// @Component({
//   selector: 'app-create-quiz',
//   imports: [SidebarComponent,TranslocoPipe,RouterLink,CommonModule,FormsModule,ReactiveFormsModule],
//   templateUrl: './create-quiz.component.html',
//   styleUrl: './create-quiz.component.css'
// })
// export class CreateQuizComponent implements OnInit  {

//  fullName: string = '';
//  firstLetter: string = '';
//   role: string = '';
//   userRole: string = '';
// email:string=''
// categories: any[] = [];
// userId: string = '';


//  logoSrc: string = 'assets/Logo AR.png';
//   quizType: any;
//  constructor(private langService: LangService,private authService: AuthService,private router: Router,private teacherService: TeacherService,private http: HttpClient,  private fb: FormBuilder,private categoriesService: CategoriesService // ✅ هنا أضفناه
//  ) {
//     this.setLogo();

//     const userData = this.authService.getUserData();
//     if (userData) {
//       this.fullName = userData.fullName;
//       this.role = userData.role;
//   }
//   }

//   _translocoService = inject(TranslocoService);
// profileImg: string = '../../assets/download.jfif';

// quizForm!: FormGroup;
// quizzes: any[] = [];
// selectedQuiz: any = null;
// loadCategories(): void {
//   this.categoriesService.getCategories().subscribe({
//     next: (res) => {
//       this.categories = res.data || res; // حسب شكل الاستجابة
//       console.log(this.categories)
//     },
//     error: (err) => {
//       console.error('فشل في تحميل التصنيفات', err);
//     }
//   });
// }
//   ngOnInit(): void {
//       window.scrollTo(0, 0);
//       this.loadCategories();

//     this.langService.lang$.subscribe((lang) => {
//       this.logoSrc = lang === 'ar' ? 'assets/Logo AR.png' : 'assets/Logo EN.png';
//     });
    
//     this.getQuizzes();
//     this.initForm();
//     this.quizType = this.quizForm.value.quizType; // لو أردت تحديده يدويًا لاحقًا
//     this.loadQuizzes();

//   const user = this.authService.getUserData(); // هنا بنجيب الداتا من السيرفيس
//   this.userRole = user?.userRole || ''; // هنا بنستخرج الرول
//   this.fullName = user?.fullName || '';
//   this.email = user?.email || '';
// this.firstLetter = this.fullName.charAt(0).toUpperCase();

// this.teacherService.getInstructorProfile().subscribe({
//   next: (res) => {
//     const profile = res.data;
//     this.profileImg = profile.profileImageUrl || this.profileImg;
//   },
//   error: (err) => {
//     console.error('Error loading profile from API', err);
//   }
// });


//   }

//   changeLang(): void {
//     const htmlTag = document.documentElement;
//     let lang = localStorage.getItem('lang');
//     if (lang === 'ar') {
//       htmlTag.setAttribute('dir', 'ltr');
//       htmlTag.setAttribute('lang', 'en');
//       this._translocoService.setActiveLang('en');
//       this.langService.setLang('en');
//     } else {
//       htmlTag.setAttribute('dir', 'rtl');
//       htmlTag.setAttribute('lang', 'ar');
//       this._translocoService.setActiveLang('ar');
//       this.langService.setLang('ar');
//     }
//     console.log('active lang', lang);
//   }

//   setLogo(): void {
//     const lang = localStorage.getItem('lang');
//     this.logoSrc = lang === 'ar' ? 'assets/Logo AR.png' : 'assets/Logo EN.png';
//   }


// logout() {
//   localStorage.removeItem('user');
//   this.router.navigate(['/logOut']);
// }





// getQuizzes() {
//   const token = this.authService.getToken();

// if (!token) {
//   console.error('🚫 لا يوجد توكن، يرجى تسجيل الدخول أولاً');
//   return;
// }

// this.http.get('https://api.makhekh.com/api/teacher/quizzes', {
//   headers: {
//     Authorization: `Bearer ${token}`
//   }
// }).subscribe({
//   next: (res: any) => {
//     this.quizzes = res.data || [];
//   },
//   error: (err) => {
//     console.error('❌ Error fetching quizzes:', err);
//   }
// });

// }



// modalVisible = false;
// openModal(quiz: any) {
//   this.selectedQuiz = quiz;
//   this.quizForm.patchValue({
//     courseName: quiz.title,
//     examDescription: quiz.description,
//     quizType: quiz.type === 1 ? 'mcq' : 'essay',
//     duration: quiz.timeLimitInMinutes,
//     attempts: quiz.attemptsAllowed,
//     passingScore: quiz.passingPercentage,
//     isFree: quiz.isFree,
//     price: quiz.price,
//     categoryId: quiz.categoryId
//   });
//   this.quizType = quiz.type; // ✅ ضروري لحساب نوع الزر المعروض

//   const modal = document.getElementById('quizModal');
//   if (modal) {
//     modal.style.display = 'block';
//     modal.classList.add('show');
//   }
// }

// closeModal() {
//   const modal = document.getElementById('quizModal');
//   if (modal) {
//     modal.classList.remove('show');
//     modal.style.display = 'none';
//   }
// }




// initForm() {
//   this.quizForm = this.fb.group({
//     courseName: [''],
//     examDescription: [''],
//     quizType: [''],
//     duration: [''],
//     attempts: [''],
//     passingScore: [''],
//     isFree: [true],
//     price: [''],
//     categoryId: [''],
//     questions: this.fb.array([]) // ✅ أضفنا الأسئلة هنا

//   });
// }
// get questions() {
//   return this.quizForm.get('questions') as any;
// }
// getOptions(index: number) {
//   return this.questions.at(index).get('options');
// }
//  addQuestion(type: 'mcq' | 'essay' = 'mcq') {
//     let questionGroup: FormGroup;
//     const selectedType = this.quizForm.get('quizType')?.value;
//     if (type !== selectedType) {
//       return alert(this._translocoService.translate('quiz.errors.quiz_type_mismatch'));
//     }
//     if (type === 'mcq') {
//       const optionsArray = this.fb.array([
//         this.fb.group({ optionValue: ['', Validators.required] }),
//         this.fb.group({ optionValue: ['', Validators.required] }),
//         this.fb.group({ optionValue: ['', Validators.required] }),
//         this.fb.group({ optionValue: ['', Validators.required] }),
//       ]);
  
//       questionGroup = this.fb.group({
//         type: ['mcq'],
//         text: ['', Validators.required],
//         options: optionsArray,
//         correctOptionIndex: [null, Validators.required],
//         correctAnswer: [''],
//         answerExplanation: [''],
//       });
//     } else {
//       questionGroup = this.fb.group({
//         type: ['essay'],
//         text: ['', Validators.required],
//         answerExplanation: [''],
//       });
//     }
  
//     this.questions.push(questionGroup);
//     this.quizForm.updateValueAndValidity();
//   }
//   removeQuestion(index: number) {
//     this.questions.removeAt(index);
//   }
  
// loadQuizzes() {
//   const token = this.authService.getToken(); // من الخدمة
//   if (!token) return;

//   this.http.get<any>('https://api.makhekh.com/api/teacher/quizzes', {
//     headers: { Authorization: `Bearer ${token}` }
//   }).subscribe({
//     next: (res) => this.quizzes = res.data || [],
//     error: (err) => console.error('Error loading quizzes:', err)
//   });
// }


// extractParams(msg: string): any {
//   const parts = msg.split('|');
//   if (parts.length < 2) return {};
//   const paramStr = parts[1];
//   const params = paramStr
//     .replace(/[{}]/g, '')
//     .split(',')
//     .map(pair => pair.split(':'))
//     .reduce((acc, [key, val]) => ({ ...acc, [key.trim()]: Number(val) }), {});
//   return params;
// }
// asFormControl(control: any) {
//   return control as import('@angular/forms').FormControl;
// }


// }
  // private transformQuestion(question: any, index: number): any {
  //   const base = {
  //     text: question.text,
  //     marks: question.marks,
  //     type: question.type === 'mcq' ? 1 : 2,
  //   };
  
  //   if (question.type === 'mcq') {
  //     return {
  //       ...base,
  //       choices: question.options.map((opt: any, i: number) => ({
  //         text: opt.optionValue,
  //         isCorrect: i === question.correctOptionIndex,
  //         order: i
  //       })),
  //       modelAnswer: '' // لا يوجد إجابة نموذجية للاختياري
  //     };
  //   } else {
  //     return {
  //       ...base,
  //       modelAnswer: question.answerExplanation,
  //       choices: [] // لا يوجد اختيارات في المقالي
  //     };
  //   }
  // }
  // submitQuiz() {
  //   if (!this.quizForm.value.isFree && !this.quizForm.value.price) {
  //     console.error('❌ السعر مطلوب لأن الاختبار غير مجاني');
  //     return;
  //   }
    
  
  //   const token = this.authService.getToken();
  //   if (!token) {
  //     alert('Unauthorized');
  //     return;
  //   }
  
  //   const quizId = this.selectedQuiz?.id || 'YOUR_QUIZ_ID_HERE';
  //   const transformedQuestions = this.questions.controls.map((q: any, index: number) =>
  //     this.transformQuestion(q.value, index)
  //   );
  
  //   transformedQuestions.forEach((question: any) => {
  //     this.http.post('https://api.makhekh.com/api/Questions', {
  //       quizId,
  //       ...question
  //     }, {
  //       headers: { Authorization: `Bearer ${token}` }
  //     }).subscribe({
  //       next: res => console.log('✅ Question saved:', res),
  //       error: err => console.error('❌ Error saving question:', err)
  //     });
  //   });
  // }