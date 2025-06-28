import { Component, inject, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
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
  standalone: true,
  imports: [SidebarComponent, TranslocoPipe, RouterLink, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css']
})
export class CreateQuizComponent implements OnInit {
  fullName: string = '';
  firstLetter: string = '';
  role: string = '';
  userRole: string = '';
  email: string = '';
  categories: any[] = [];
  userId: string = '';
  logoSrc: string = 'assets/Logo AR.png';
  quizType: number | null = null; // Changed to number to match API
  profileImg: string = '../../assets/download.jfif';
  quizForm!: FormGroup;
  quizzes: any[] = [];
  selectedQuiz: any = null;
  searchQuery: string = '';
  showDeleteConfirmModal: boolean = false; // للتحكم في إظهار/إخفاء مودال التأكيد

  private _translocoService = inject(TranslocoService);
selectedSectionLectures: any;
  typeMismatchWarning: boolean | undefined;
  sectionData: any;

  constructor(
    private langService: LangService,
    private authService: AuthService,
    private router: Router,
    private teacherService: TeacherService,
    private http: HttpClient,
    private fb: FormBuilder,
    private categoriesService: CategoriesService
  ) {
    this.setLogo();
    const userData = this.authService.getUserData();
    if (userData) {
      this.fullName = userData.fullName;
      this.role = userData.role;
      this.email = userData.email || '';
      this.firstLetter = this.fullName.charAt(0).toUpperCase();
    }
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

    this.teacherService.getInstructorProfile().subscribe({
      next: (res) => {
        const profile = res.data;
        this.profileImg = profile.profileImageUrl || this.profileImg;
      },
      error: (err) => console.error('Error loading profile from API', err)
    });
  }

  loadCategories(): void {
    this.categoriesService.getCategories().subscribe({
      next: (res) => {
        this.categories = res.data || res;
        console.log('Categories:', this.categories);
      },
      error: (err) => console.error('فشل في تحميل التصنيفات', err)
    });
  }
  submitQuizQuestions(quizId: string): void {
    if (!this.quizForm.valid) {
      this.quizForm.markAllAsTouched();
      console.log('Form Errors:', this.quizForm.errors);
      this.questions.controls.forEach((question: any, index: number) => {
        console.log(`Question ${index + 1} Errors:`, question.errors);
        Object.keys(question.controls).forEach(key => {
          if (question.get(key)?.errors) {
            console.log(`Field ${key} Errors:`, question.get(key)?.errors);
          }
        });
      });
      alert(this._translocoService.translate('quiz.errors.invalid_form'));
      return;
    }

    const token = this.authService.getToken();
    if (!token) {
      alert('يرجى تسجيل الدخول أولاً');
      return;
    }

    const headers = { headers: { Authorization: `Bearer ${token}` } };

    const questionsToSend = this.questions.controls.map((q: any) => {
      const type = q.get('type')?.value;
      const lectureId = q.get('lectureId')?.value;
      const sectionId = q.get('sectionId')?.value;

      if (this.isCourseLevel && (!sectionId || !lectureId)) {
        throw new Error(`السؤال ${q.get('text')?.value} يحتاج إلى سيكشن ومحاضرة.`);
      } else if (this.isSectionLevel && !sectionId) {
        throw new Error(`السؤال ${q.get('text')?.value} يحتاج إلى سيكشن.`);
      } else if (this.isLectureLevel && !lectureId) {
        throw new Error(`السؤال ${q.get('text')?.value} يحتاج إلى محاضرة.`);
      }

      const basePayload: any = {
        quizId: quizId,
        text: q.get('text')?.value,
        marks: q.get('marks')?.value,
        type: type,
        modelAnswer: '',
        answerExplanation: q.get('answerExplanation')?.value || '',
        choices: []
      };

      if (this.isCourseLevel || this.isSectionLevel) {
        basePayload.sectionId = sectionId;
        if (lectureId) {
          basePayload.lectureId = lectureId;
        }
      } else if (this.isLectureLevel) {
        basePayload.lectureId = lectureId;
      }

      if (type === 1) {
        const options = q.get('options')?.value || [];
        const correctIndex = q.get('correctOptionIndex')?.value;

        basePayload.choices = options.map((opt: any, i: number) => ({
          text: opt.optionValue,
          isCorrect: i === correctIndex,
          order: i
        }));

        basePayload.modelAnswer = options[correctIndex]?.optionValue || '';
      } else if (type === 2) {
        basePayload.modelAnswer = q.get('correctAnswer')?.value;
      }

      return basePayload;
    });

    questionsToSend.forEach((question: any, index: number) => {
      this.http.post('https://api.makhekh.com/api/Questions', question, headers).subscribe({
        next: (res) => {
          console.log(`✅ تم إرسال السؤال ${index + 1}:`, res);
          if (index === questionsToSend.length - 1) {
            alert(this._translocoService.translate('quiz.success.questions_added'));
            this.closeCourseQuizModal();
            this.questions.clear();
          }
        },
        error: (err) => {
          console.error(`❌ خطأ في إرسال السؤال ${index + 1}:`, err);
          alert(`فشل في إرسال السؤال ${index + 1}: ${err.message}`);
        }
      });
    });
  }



  changeLang(): void {
    const htmlTag = document.documentElement;
    const lang = localStorage.getItem('lang');
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
  }

  setLogo(): void {
    const lang = localStorage.getItem('lang');
    this.logoSrc = lang === 'ar' ? 'assets/Logo AR.png' : 'assets/Logo EN.png';
  }

 logout() {
  localStorage.removeItem('user');
  this.router.navigate(['explore-courses/logOut']);
}

  getQuizzes(): void {
    const token = this.authService.getToken();
    if (!token) {
      console.error('🚫 لا يوجد توكن، يرجى تسجيل الدخول أولاً');
      return;
    }
    this.http.get('https://api.makhekh.com/api/teacher/quizzes', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (res: any) => {
        this.quizzes = res.data || [];
        console.log('Quizzes:', this.quizzes);
      },
      error: (err) => console.error('❌ Error fetching quizzes:', err)
    });
  }

  openModal(quiz: any): void {
    this.selectedQuiz = quiz;
    this.quizType = quiz.type; // Set as number (1 or 2)
    this.quizForm.patchValue({
      courseName: quiz.title,
      examDescription: quiz.description,
      quizType: quiz.type === 1 ? 'mcq' : 'essay',
      duration: quiz.timeLimitInMinutes,
      attempts: quiz.attemptsAllowed,
      passingPercentage: quiz.passingPercentage ,// ← هنا
      isFree: quiz.isFree,
      price: quiz.price,
      categoryId: quiz.categoryId || null,
    courseId: quiz.courseId || null, // أضفنا courseId
    sectionId: quiz.sectionId || null, // أضفنا sectionId
    lectureId: quiz.lectureId || null // أضفنا lectureId
    });
    console.log('Quiz Type:', this.quizType, 'Form Quiz Type:', this.quizForm.get('quizType')?.value);
    const modal = document.getElementById('quizModal');
    if (modal) {
      modal.style.display = 'block';
      modal.classList.add('show');
    }
  }

  closeModal(): void {
    const modal = document.getElementById('quizModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
    }
    this.questions.clear(); // Clear questions when closing modal
  }

  initForm(): void {

    this.quizForm = this.fb.group({
  courseName: [''],
  examDescription: [''],
  categoryId: [null],
  quizType: [null],
  duration: [null],
  attempts: [null],
  passingPercentage: [null],
  isFree: [true],
  price: [null],
  courseId: [null],
  sectionId: [null],
  lectureId: [null],
  questions: this.fb.array([])
});


  }

  get questions() {
    return this.quizForm.get('questions') as any;
  }

  getOptions(index: number) {
    return this.questions.at(index).get('options');
  }

  addQuestion(type: 'mcq' | 'essay' = 'mcq'): void {
  const selectedType = this.quizForm.get('quizType')?.value;
  const typeValue = type === 'mcq' ? 1 : 2;

  if (typeValue !== selectedType) {
    alert(this._translocoService.translate('quiz.errors.quiz_type_mismatch'));
    return;
  }

  let questionGroup: FormGroup;

  if (type === 'mcq') {
    const optionsArray = this.fb.array([
      this.fb.group({ optionValue: ['', Validators.required] }),
      this.fb.group({ optionValue: ['', Validators.required] }),
      this.fb.group({ optionValue: ['', Validators.required] }),
      this.fb.group({ optionValue: ['', Validators.required] })
    ]);

    questionGroup = this.fb.group({
      type: [1], // ✅ رقم مش سترينج
      text: ['', Validators.required],
      options: optionsArray,
      correctOptionIndex: [null, Validators.required],
      correctAnswer: [{ value: '', disabled: true }],
      answerExplanation: [''],
      marks: [1, [Validators.required, Validators.min(1)]]
    });
  } else {
    questionGroup = this.fb.group({
      type: [2], // ✅ رقم مش سترينج
      text: ['', Validators.required],
      correctAnswer: ['', Validators.required],
      answerExplanation: [''],
      marks: [1, [Validators.required, Validators.min(1)]]
    });
  }

  this.questions.push(questionGroup);
  this.quizForm.updateValueAndValidity();
}


  removeQuestion(index: number): void {
    this.questions.removeAt(index);
  }
  allQuizzes: any[] = [];

  loadQuizzes(): void {
    const token = this.authService.getToken();
    if (!token) return;
    this.http.get<any>('https://api.makhekh.com/api/teacher/quizzes/all-quizzes', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (res) => {
        this.quizzes = res.data || [];
        
        console.log('Loaded Quizzes:', this.quizzes);
        
      },
      error: (err) => console.error('Error loading quizzes:', err)
    });
  }

  asFormControl(control: any): FormControl {
    return control as FormControl;
  }

 submitQuestions(quizId: string): void {
  if (!this.quizForm.valid) {
    alert(this._translocoService.translate('quiz.errors.invalid_form'));
    return;
  }

  const token = this.authService.getToken();
  if (!token) {
    alert('يرجى تسجيل الدخول أولاً');
    return;
  }

  const questionsPayload = this.questions.controls.map((q: any, index: number) => {
    const type = q.get('type')?.value === 'mcq' ? 1 : 2;
    const payload: any = {
      quizId,
      text: q.get('text')?.value,
      marks: q.get('marks')?.value,
      type,
      modelAnswer: '',
      choices: []
    };

    if (type === 1) {
      const options = q.get('options')?.value || [];
      const correctIndex = q.get('correctOptionIndex')?.value;

      payload.choices = options.map((opt: any, i: number) => ({
        text: opt.optionValue,
        isCorrect: i === correctIndex,
        order: i
      }));

      payload.modelAnswer = options[correctIndex]?.optionValue || '';
    } else {
      payload.modelAnswer = q.get('correctAnswer')?.value;
    }

    return payload;
  });

  questionsPayload.forEach((questionPayload: any, i: number) => {
    this.http.post('https://api.makhekh.com/api/Questions', questionPayload, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (res) => {
        console.log(`✅ Question ${i + 1} Response:`, res);
        if (i === questionsPayload.length - 1) {
          alert(this._translocoService.translate('quiz.success.questions_added'));
          this.closeModal();
          this.questions.clear();
        }
      },
      error: (err) => {
        console.error(`❌ Error sending question ${i + 1}:`, err);
      }
    });
  });
}


getSectionTitle(): string {
  const section = this.courseData?.sections?.find((s: any) => s.id === this.selectedQuiz?.sectionId);
  return section?.title || '';
}









quizQuestions: any[] = [];
showQuestionModal: boolean = false;
editMode: boolean = false;

showQuestions(quizId: string): void {
  const token = this.authService.getToken();
  if (!token) {
    alert('يرجى تسجيل الدخول أولاً');
    return;
  }

  this.http.get<any>(`https://api.makhekh.com/api/Questions/${quizId}`, {
    headers: { Authorization: `Bearer ${token}` }
  }).subscribe({
    next: (res) => {
      this.quizQuestions = res.data || [];
      this.showQuestionModal = true;
      this.editMode = false;
    },
    error: (err) => {
      console.error('❌ Error loading quiz questions:', err);
      alert('حدث خطأ أثناء تحميل الأسئلة');
    }
  });
}

closeCourseQuizModal(): void {
  const modal = document.getElementById('courseQuizModal');
  if (modal) {
    modal.classList.remove('show');
    modal.style.display = 'none';
  }
  this.questions.clear();
}
openCourseQuizDetails(quiz: any): void {
  this.selectedQuiz = quiz;
  this.quizType = quiz.type;

  this.quizForm.patchValue({
    courseName: quiz.title,
    examDescription: quiz.description,
    quizType: quiz.type === 1 ? 'mcq' : 'essay',
    duration: quiz.timeLimitInMinutes,
    attempts: quiz.attemptsAllowed,
    passingPercentage: quiz.passingPercentage,
    isFree: quiz.isFree,
    price: quiz.price,
    categoryId: quiz.categoryId || null,
    courseId: quiz.courseId || null,
    sectionId: quiz.sectionId || null,
    lectureId: quiz.lectureId || null
  });

  // إذا الامتحان مرتبط بكورس، نجيب بياناته (لتفصيل المحاضرات/السكاشن)
  if (quiz.courseId) {
    this.fetchCourseData(quiz.courseId);
  }
  // جلب بيانات السكشن إذا كان section-level quiz
  if (quiz.sectionId && this.isSectionLevel) {
    this.fetchSectionData(quiz.sectionId);
  }
  if (quiz.lectureId) {
    this.fetchLectureData(quiz.lectureId);
  }
  // فتح المودال
  const modal = document.getElementById('courseQuizModal');
  if (modal) {
    modal.style.display = 'block';
    modal.classList.add('show');
  }

  // تنظيف الأسئلة القديمة في الفورم (لو فيه)
  this.questions.clear();
}



closeQuestionModal(): void {
  this.showQuestionModal = false;
  this.editMode = false;
}


courseData: any = null; // لتخزين بيانات الكورس (sections و lectures)
selectedCourseId: number | null = null; // لتخزين معرف الكورس المختار
lectureData: any = null;
// دالة لجلب بيانات الكورس من الـ API
fetchCourseData(courseId: number) {
  this.http.get(`https://api.makhekh.com/api/courses/${courseId}`, {
    headers: { Authorization: `Bearer ${this.authService.getToken()}` }
  }).subscribe({
    next: (res: any) => {
      this.courseData = res.data;
      this.selectedCourseId = courseId;
      console.log('Course Data:', this.courseData);
    },
    error: (err) => {
      console.error('Error fetching course data:', err);
    }
  });
}
// دالة جديدة لجلب بيانات السكشن من الـ API
fetchSectionData(sectionId: number | string): void {
  const token = this.authService.getToken();
  if (!token) {
    console.error('No token available');
    return;
  }

  this.http.get(`https://api.makhekh.com/api/Teachers/section/${sectionId}`, {
    headers: { Authorization: `Bearer ${token}` }
  }).subscribe({
    next: (res: any) => {
      this.sectionData = res.data;
      console.log('Section Data:', this.sectionData);
    },
    error: (err) => {
      console.error('Error fetching section data:', err);
      alert(this._translocoService.translate('quiz.errors.section_fetch_failed'));
    }
  });
}
fetchLectureData(lectureId: string): void {
  const token = this.authService.getToken();
  if (!token) return;

  this.http.get(`https://api.makhekh.com/api/Teachers/lecture/${lectureId}`, {
    headers: { Authorization: `Bearer ${token}` }
  }).subscribe({
    next: (res: any) => {
      this.lectureData = res.data;
      console.log('Lecture Data:', this.lectureData);
    },
    error: (err) => {
      console.error('Error fetching lecture data:', err);
      alert('فشل في تحميل بيانات المحاضرة');
    }
  });
}
addQuestionForCourse(lectureId: number, type: string): void {
  const optionsArray = this.fb.array([
    this.fb.group({ optionValue: [''] }),
    this.fb.group({ optionValue: [''] }),
    this.fb.group({ optionValue: [''] }),
    this.fb.group({ optionValue: [''] })
  ]);

  const questionGroup = this.fb.group({
    text: [''],
    type: [1],
    correctOptionIndex: [0],
    options: optionsArray,
    correctAnswer: [''],
    answerExplanation: [''], // ✅ تم إضافته هنا
    marks: [1],
    lectureId: [lectureId]
  });

  // إضافة السؤال لـ questions FormArray
  this.questions.push(questionGroup);

  // ربط السؤال بالكورس (يمكن تستخدمي lectureId أو selectedCourseId حسب التصميم)
  console.log(`Added ${type} question for lecture ${lectureId} in course ${this.selectedCourseId}`);
}
  createOption(): any {
    throw new Error('Method not implemented.');
  }


addQuestionForLecture(lectureId: number): void {
  const quizType = this.quizForm.get('quizType')?.value;
  const type = quizType === 'mcq' ? 1 : 2;

  const optionsArray = this.fb.array([
    this.fb.group({ optionValue: [''] }),
    this.fb.group({ optionValue: [''] }),
    this.fb.group({ optionValue: [''] }),
    this.fb.group({ optionValue: [''] })
  ]);

  const questionGroup = this.fb.group({
    text: [''],
    type: [type],
    correctOptionIndex: [0],
    options: quizType === 'mcq' ? optionsArray : this.fb.array([]),
    correctAnswer: [''],
    answerExplanation: [''], // ← لازم تضيفه لو هتبعت للإجابة شرح
    marks: [1],
    lectureId: [lectureId]
  });

  this.questions.push(questionGroup);
}

getQuestionsForLecture(lectureId: number) {
  return this.questions.controls.filter((q: any) => q.get('lectureId')?.value === lectureId);
}

getLectureTitle(): string {
  return this.lectureData?.title || '';
}
  

submitQuestionsss(quizId: string): void {
  if (!this.quizForm.valid) {
    alert(this._translocoService.translate('quiz.errors.invalid_form'));
    return;
  }

  const token = this.authService.getToken();
  if (!token) {
    alert('يرجى تسجيل الدخول أولاً');
    return;
  }

  const questionsPayload = this.questions.controls.map((q: any) => {
    const type = q.get('type')?.value;
    const basePayload: any = {
      quizId,
      text: q.get('text')?.value,
      marks: q.get('marks')?.value,
      type,
      modelAnswer: '',
      choices: [],
      answerExplanation: q.get('answerExplanation')?.value || ''
    };

    if (type === 1) { // MCQ
      const options = q.get('options')?.value || [];
      const correctIndex = q.get('correctOptionIndex')?.value;

      basePayload.choices = options.map((opt: any, i: number) => ({
        text: opt.optionValue,
        isCorrect: i === correctIndex,
        order: i
      }));

      basePayload.modelAnswer = options[correctIndex]?.optionValue || '';
    } else if (type === 2) { // Essay
      basePayload.modelAnswer = q.get('correctAnswer')?.value;
    }

    // إضافة lectureId و sectionId حسب حالة الاختبار
    const lectureId = q.get('lectureId')?.value;
    const sectionId = this.selectedQuiz?.sectionId;

    if (lectureId) basePayload.lectureId = lectureId;
    if (sectionId) basePayload.sectionId = sectionId;

    return basePayload;
  });

  questionsPayload.forEach((questionPayload: any, i: number) => {
    this.http.post('https://api.makhekh.com/api/Questions', questionPayload, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (res) => {
        console.log(`✅ Question ${i + 1} Response:`, res);
        if (i === questionsPayload.length - 1) {
          alert(this._translocoService.translate('quiz.success.questions_added'));
          this.closeCourseQuizModal();
          this.questions.clear();
        }
      },
      error: (err) => {
        console.error(`❌ Error sending question ${i + 1}:`, err);
      }
    });
  });
}












addStandaloneQuestion(type: 'mcq' | 'essay'): void {
  const quizTypeRaw = this.quizForm.get('quizType')?.value;

  // نحول النوع اللي في الفورم لرقم موحد
  const actualQuizType = quizTypeRaw === 'mcq' ? 1
                       : quizTypeRaw === 'essay' ? 2
                       : +quizTypeRaw;

  const questionType = type === 'mcq' ? 1 : 2;

  if (actualQuizType !== questionType) {
    this.typeMismatchWarning = true;
    alert("⚠️ نوع السؤال لا يتطابق مع نوع الكويز المحدد (اختيارات أو مقالي).");
    return;
  }

  this.typeMismatchWarning = false;

  let questionGroup: FormGroup;

  if (type === 'mcq') {
    const optionsArray = this.fb.array([
      this.fb.group({ optionValue: ['', Validators.required] }),
      this.fb.group({ optionValue: ['', Validators.required] }),
      this.fb.group({ optionValue: ['', Validators.required] }),
      this.fb.group({ optionValue: ['', Validators.required] })
    ]);

    questionGroup = this.fb.group({
      type: [1], // نوع MCQ
      text: ['', Validators.required],
      options: optionsArray,
      correctOptionIndex: [null, Validators.required],
      correctAnswer: [{ value: '', disabled: true }],
      answerExplanation: [''],
      marks: [1, [Validators.required, Validators.min(1)]]
    });
  } else {
    questionGroup = this.fb.group({
      type: [2], // نوع Essay
      text: ['', Validators.required],
      correctAnswer: ['', Validators.required],
      answerExplanation: [''],
      marks: [1, [Validators.required, Validators.min(1)]]
    });
  }

  this.questions.push(questionGroup);
  this.quizForm.updateValueAndValidity();
}


submitStandaloneQuestions(quizId: string): void {
  if (!this.quizForm.valid) {
    this.quizForm.markAllAsTouched();
    alert(this._translocoService.translate('quiz.errors.invalid_form'));
    return;
  }

  const token = this.authService.getToken();
  if (!token) {
    alert('يرجى تسجيل الدخول أولاً');
    return;
  }

  const quizTypeFromForm = this.quizForm.get('quizType')?.value;

  // نترجم نوع الكويز لفورم رقمي موحد
  const expectedType = quizTypeFromForm === 'mcq' ? 1
                     : quizTypeFromForm === 'essay' ? 2
                     : +quizTypeFromForm;

  // ✅ تحقق إن كل الأسئلة من نفس نوع الكويز
  const hasMismatch = this.questions.controls.some((q: any) => q.get('type')?.value !== expectedType);

  if (hasMismatch) {
    alert('⚠️ جميع الأسئلة يجب أن تتطابق مع نوع الكويز المحدد (اختيارات أو مقالي)');
    return;
  }

  const headers = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const questionsPayload = this.questions.controls.map((q: any) => {
    const type = q.get('type')?.value;
    const basePayload: any = {
      quizId,
      text: q.get('text')?.value,
      marks: q.get('marks')?.value,
      type,
      modelAnswer: '',
      choices: [],
      answerExplanation: q.get('answerExplanation')?.value || ''
    };

    if (type === 1) {
      const options = q.get('options')?.value || [];
      const correctIndex = q.get('correctOptionIndex')?.value;

      basePayload.choices = options.map((opt: any, i: number) => ({
        text: opt.optionValue,
        isCorrect: i === correctIndex,
        order: i
      }));

      basePayload.modelAnswer = options[correctIndex]?.optionValue || '';
    } else if (type === 2) {
      basePayload.modelAnswer = q.get('correctAnswer')?.value;
    }

    return basePayload;
  });

  questionsPayload.forEach((question: any, index: number) => {
    this.http.post('https://api.makhekh.com/api/Questions', question, headers).subscribe({
      next: (res) => {
        console.log(`✅ تم إرسال السؤال ${index + 1}:`, res);
        if (index === questionsPayload.length - 1) {
          alert(this._translocoService.translate('quiz.success.questions_added'));
          this.closeModal();
          this.questions.clear();
        }
      },
      error: (err) => {
        console.error(`❌ خطأ في إرسال السؤال ${index + 1}:`, err);
      }
    });
  });
}




getLecturesForSection(sectionId: number | string): any[] {
  const section = this.courseData?.sections?.find((s: any) => s.id === sectionId);
  return section?.lectures || [];
}

addDynamicQuestion(): void {
  const quizType = this.quizForm.get('quizType')?.value;
  const type = quizType === 'mcq' ? 1 : 2;

  const optionsArray = this.fb.array([
    this.fb.group({ optionValue: ['', Validators.required] }),
    this.fb.group({ optionValue: ['', Validators.required] }),
    this.fb.group({ optionValue: ['', Validators.required] }),
    this.fb.group({ optionValue: ['', Validators.required] })
  ]);

  let questionGroup!: FormGroup;

  if (this.isCourseLevel) {
    questionGroup = this.fb.group({
      sectionId: [null, Validators.required],
      lectureId: [null, Validators.required],
      text: ['', Validators.required],
      type: [type],
      options: type === 1 ? optionsArray : this.fb.array([]),
      correctOptionIndex: type === 1 ? [0, Validators.required] : [null],
      correctAnswer: type === 2 ? ['', Validators.required] : [''],
      answerExplanation: [''],
      marks: [1, [Validators.required, Validators.min(1)]]
    });
  } else if (this.isSectionLevel) {
    questionGroup = this.fb.group({
      sectionId: [this.selectedQuiz.sectionId, Validators.required],
      lectureId: [null], // اختياري، ممكن تضيفي Validators.required لو لازم
      text: ['', Validators.required],
      type: [type],
      options: type === 1 ? optionsArray : this.fb.array([]),
      correctOptionIndex: type === 1 ? [0, Validators.required] : [null],
      correctAnswer: type === 2 ? ['', Validators.required] : [''],
      answerExplanation: [''],
      marks: [1, [Validators.required, Validators.min(1)]]
    });
  } else if (this.isLectureLevel) {
    questionGroup = this.fb.group({
      lectureId: [this.selectedQuiz.lectureId, Validators.required],
      text: ['', Validators.required],
      type: [type],
      options: type === 1 ? optionsArray : this.fb.array([]),
      correctOptionIndex: type === 1 ? [null, Validators.required] : [null],
      correctAnswer: type === 2 ? ['', Validators.required] : [''],
      answerExplanation: [''],
      marks: [1, [Validators.required, Validators.min(1)]]
    });
  }

  this.questions.push(questionGroup!);
  this.quizForm.updateValueAndValidity();
}
onSectionChange(index: number): void {
  const questionGroup = this.questions.at(index);
  const selectedSectionId = questionGroup.get('sectionId')?.value;

  if (!selectedSectionId) {
    questionGroup.get('lectureId')?.setValue(null);
    questionGroup.get('lectureId')?.markAsTouched();
    return;
  }

  const section = this.courseData?.sections?.find((s: any) => s.id === selectedSectionId);
  const lectures = section?.lectures || [];

  if (lectures.length === 0) {
    questionGroup.get('lectureId')?.setValue(null);
    questionGroup.get('lectureId')?.markAsTouched();
    alert(this._translocoService.translate('quiz.errors.no_lectures_in_section'));
  }
}


get isCourseLevel(): boolean {
  return !!this.selectedQuiz?.courseId && !this.selectedQuiz?.sectionId && !this.selectedQuiz?.lectureId;
}

get isSectionLevel(): boolean {
  return !!this.selectedQuiz?.sectionId && !this.selectedQuiz?.lectureId;
}

get isLectureLevel(): boolean {
  return !!this.selectedQuiz?.lectureId;
}


onSearchChange(): void {
  const query = this.searchQuery.toLowerCase().trim();

  if (!query) {
    // لو فاضي رجّع كل الكويزات
    this.loadQuizzes();
    return;
  }

  this.quizzes = this.quizzes.filter(quiz =>
    quiz.title?.toLowerCase().includes(query) ||
    this.removeArabicDiacritics(quiz.title || '').toLowerCase().includes(query)
  );
}
removeArabicDiacritics(text: string): string {
  return text.replace(/[\u064B-\u065F]/g, '');
}


openDeleteConfirmModal(quizId: string): void {
  this.selectedQuiz = quizId;
  this.showDeleteConfirmModal = true;
  const modal = document.getElementById('deleteConfirmModal');
  if (modal) {
    modal.style.display = 'block';
    modal.classList.add('show');
  }
}

// دالة لإغلاق مودال التأكيد
closeDeleteConfirmModal(): void {
  this.showDeleteConfirmModal = false;
  this.selectedQuiz = null;
  const modal = document.getElementById('deleteConfirmModal');
  if (modal) {
    modal.classList.remove('show');
    modal.style.display = 'none';
  }
}
// دالة لحذف الاختبار
deleteQuiz(quizId: string): void {
  const token = this.authService.getToken();
  if (!token) {
    alert(this._translocoService.translate('quiz.errors.no_token'));
    this.closeDeleteConfirmModal();
    return;
  }

  this.http.delete(`https://api.makhekh.com/api/teacher/quizzes/${quizId}`, {
    headers: { Authorization: `Bearer ${token}` }
  }).subscribe({
    next: () => {
      console.log(`✅ تم حذف الاختبار ${quizId}`);
      alert(this._translocoService.translate('quiz.success.quiz_deleted'));
      this.quizzes = this.quizzes.filter(quiz => quiz.id !== quizId); // إزالة الاختبار من القائمة
      this.closeDeleteConfirmModal();
    },
    error: (err) => {
      console.error(`❌ خطأ في حذف الاختبار ${quizId}:`, err);
      alert(this._translocoService.translate('quiz.errors.delete_failed'));
      this.closeDeleteConfirmModal();
    }
  });
}

}






