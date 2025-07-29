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
  quizType: number | null = null;
  profileImg: string = '../../assets/download.jfif';
  quizForm!: FormGroup;
  quizzes: any[] = [];
  selectedQuiz: any = null;
  searchQuery: string = '';
  showDeleteConfirmModal: boolean = false;
  typeMismatchWarning: boolean | undefined;
  sectionData: any;
  courseData: any = null;
  selectedCourseId: number | null = null;
  lectureData: any = null;
  currentSubsectionLectures: any[] = [];
  quizQuestions: any[] = [];
  showModal: boolean = false;
  editMode: boolean = false;
  showQuestionModal: boolean = false;
  currentSubsectionTitle: string = '';

  private _translocoService = inject(TranslocoService);

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

    if (this.selectedQuiz?.courseId) {
      this.fetchCourseData(this.selectedQuiz.courseId);
    }
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
      const sectionLectureId = q.get('sectionLectureId')?.value;
      const subsectionLectureId = q.get('subsectionLectureId')?.value;
      const sectionId = q.get('sectionId')?.value;
      const subsectionId = q.get('subsectionId')?.value || this.selectedQuiz?.subsectionId || null;

      const basePayload: any = {
        quizId: quizId,
        text: q.get('text')?.value,
        marks: q.get('marks')?.value,
        type: type,
        modelAnswer: '',
        answerExplanation: q.get('answerExplanation')?.value || '',
        choices: []
      };

      // Logic for Course Level Quizzes
      if (this.isCourseLevel) {
        if (sectionId) {
          basePayload.sectionId = sectionId;
        }
        basePayload.subSectionId = subsectionId;
        if (subsectionLectureId) {
          basePayload.lectureId = subsectionLectureId;
        } else if (sectionLectureId) {
          basePayload.lectureId = sectionLectureId;
        }
      } else if (this.isSectionLevel) {
        basePayload.sectionId = this.selectedQuiz.sectionId;
        basePayload.subSectionId = subsectionId;
        if (subsectionLectureId) {
          basePayload.lectureId = subsectionLectureId;
        } else if (sectionLectureId) {
          basePayload.lectureId = sectionLectureId;
        }
      } else if (this.isSubsectionLevel) {
        // This logic ensures the user's request is met perfectly.
        basePayload.subSectionId = this.selectedQuiz.subSectionId; // Always send subSectionId
        if (subsectionLectureId) { // Only send lectureId if it has a value
          basePayload.lectureId = subsectionLectureId;
        }
      } else if (this.isLectureLevel) {
        basePayload.lectureId = this.selectedQuiz.lectureId;
        basePayload.subSectionId = subsectionId;
        if (sectionId) {
          basePayload.sectionId = sectionId;
        }
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
    this.http.get('https://api.makhekh.com/api/teacher/quizzes/all-quizzes', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (res: any) => {
        this.quizzes = res.data || [];
        console.log('Quizzes:', this.quizzes);
      },
      error: (err) => console.error('❌ Error fetching quizzes:', err)
    });
  }

  editQuiz(quiz: any): void {
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
      lectureId: quiz.lectureId || null,
      subSectionId: quiz.subSectionId || null,
    });
    console.log('Quiz Type:', this.quizType, 'Form Quiz Type:', this.quizForm.get('quizType')?.value);
    const modal = document.getElementById('quizModal');
    if (modal) {
      modal.style.display = 'block';
      modal.classList.add('show');
    }
    this.editMode = true;
  }

 openModal(quiz: any): void {
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
  console.log('Quiz Type:', this.quizType, 'Form Quiz Type:', this.quizForm.get('quizType')?.value);
  const modal = document.getElementById('quizModal');
  if (modal) {
    modal.style.display = 'block';
    modal.classList.add('show');
  }
  // Add question automatically for standalone quizzes
  if (quiz.isStandalone === true) {
    this.addDynamicQuestion();
  }
}



  closeModal(): void {
    const modal = document.getElementById('quizModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
    }
    this.questions.clear();
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
      subsectionId: [null],
      sectionLectureId: [null],
      subsectionLectureId: [null],
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
        type: [1],
        text: ['', Validators.required],
        options: optionsArray,
        correctOptionIndex: [null, Validators.required],
        correctAnswer: [{ value: '', disabled: true }],
        answerExplanation: [''],
        marks: [1, [Validators.required, Validators.min(1)]]
      });
    } else {
      questionGroup = this.fb.group({
        type: [2],
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
      subsectionId: quiz.subsectionId || null,
      lectureId: quiz.lectureId || null
    });

    if (quiz.courseId) {
      this.fetchCourseData(quiz.courseId);
    }
    if (quiz.sectionId) {
      this.fetchSectionData(quiz.sectionId);
    }
    if (quiz.subsectionId) {
      this.fetchSubsectionData(quiz.subsectionId); // استدعاء بيانات التصنيف الفرعي
    }
    if (quiz.lectureId) {
      this.fetchLectureData(quiz.lectureId);
    }
    const modal = document.getElementById('courseQuizModal');
    if (modal) {
      modal.style.display = 'block';
      modal.classList.add('show');
    }
    this.questions.clear();
  }

  closeQuestionModal(): void {
    this.showQuestionModal = false;
    this.editMode = false;
  }

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

  fetchSectionData(sectionId: string, callback?: () => void): void {
    const token = this.authService.getToken();
    if (!token) {
      console.error('No token available');
      if (callback) callback();
      return;
    }

    this.http.get(`https://api.makhekh.com/api/Teachers/section/${sectionId}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (res: any) => {
        this.sectionData = res.data;
        console.log('Fetched Section Data:', this.sectionData);
        if (callback) callback();
      },
      error: (err) => {
        console.error('Error fetching section data:', err);
        alert(this._translocoService.translate('quiz.errors.section_fetch_failed'));
        if (callback) callback();
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
      answerExplanation: [''],
      marks: [1],
      lectureId: [lectureId]
    });

    this.questions.push(questionGroup);
    console.log(`Added ${type} question for lecture ${lectureId} in course ${this.selectedCourseId}`);
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
      answerExplanation: [''],
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

  addStandaloneQuestion(type: 'mcq' | 'essay'): void {
    const quizTypeRaw = this.quizForm.get('quizType')?.value;
    const actualQuizType = quizTypeRaw === 'mcq' ? 1 : quizTypeRaw === 'essay' ? 2 : +quizTypeRaw;
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
        type: [1],
        text: ['', Validators.required],
        options: optionsArray,
        correctOptionIndex: [null, Validators.required],
        correctAnswer: [{ value: '', disabled: true }],
        answerExplanation: [''],
        marks: [1, [Validators.required, Validators.min(1)]]
      });
    } else {
      questionGroup = this.fb.group({
        type: [2],
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
    const expectedType = quizTypeFromForm === 'mcq' ? 1 : quizTypeFromForm === 'essay' ? 2 : +quizTypeFromForm;

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



  
  getSubsectionsForSection(sectionId: number | string): any[] {
    const section = this.courseData?.sections?.find((s: any) => s.id === sectionId);
    return section?.subSections || [];
  }

  getSectionLectures(sectionId: string): any[] {
    return this.sectionData?.lectures?.filter((l: any) => !l.subSectionId) || [];
  }

  getSubsectionLectures(sectionId: string, subsectionId: string): any[] {
    if (!this.sectionData || !this.sectionData.subSections) {
      console.warn('Section data or subsections not available:', this.sectionData);
      return [];
    }
    const subsection = this.sectionData.subSections.find((ss: any) => ss.id === subsectionId);
    if (!subsection) {
      console.warn('Subsection not found for ID:', subsectionId);
      return [];
    }
    return subsection.lectures || [];
  }

  subsectionTitle: string = ''; // خاصية لاسم التصنيف الفرعي

  addDynamicQuestion(): void {
    console.log('Selected Quiz:', this.selectedQuiz); // للتحقق
    const quizType = this.quizForm.get('quizType')?.value;
    const type = quizType === 'mcq' ? 1 : 2;

    const optionsArray = this.fb.array([
      this.fb.group({ optionValue: ['', Validators.required] }),
      this.fb.group({ optionValue: ['', Validators.required] }),
      this.fb.group({ optionValue: ['', Validators.required] }),
      this.fb.group({ optionValue: ['', Validators.required] })
    ]);

    let questionGroup: FormGroup;
    if (this.selectedQuiz?.isStandalone === true) {
      questionGroup = this.fb.group({
        text: ['', Validators.required],
        type: [type],
        options: type === 1 ? optionsArray : this.fb.array([]),
        correctOptionIndex: type === 1 ? [0, Validators.required] : [null],
        correctAnswer: type === 2 ? ['', Validators.required] : [''],
        answerExplanation: [''],
        marks: [1, [Validators.required, Validators.min(1)]]
      });
    }
    else if (this.isCourseLevel) {
      questionGroup = this.fb.group({
        sectionId: [null, Validators.required],
        subsectionId: [null],
        sectionLectureId: [null],
        subsectionLectureId: [null],
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
        subsectionId: [null], // Subsection is optional for a section-level quiz
        sectionLectureId: [null],
        subsectionLectureId: [null],
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
        correctOptionIndex: type === 1 ? [0, Validators.required] : [null],
        correctAnswer: type === 2 ? ['', Validators.required] : [''],
        answerExplanation: [''],
        marks: [1, [Validators.required, Validators.min(1)]]
      });
    } else if (this.isSubsectionLevel) {
      const subSectionId = this.selectedQuiz?.subSectionId;
      if (!subSectionId) {
        console.error('subSectionId is not available in selectedQuiz.');
        alert('مستوى الاختبار غير محدد. يرجى التأكد من اختيار اختبار صالح.');
        return;
      }

      // استدعاء بيانات التصنيف الفرعي قبل إضافة السؤال
      this.fetchSubsectionData(subSectionId).then(() => {
        questionGroup = this.fb.group({
          sectionId: [this.selectedQuiz.sectionId], // Validator removed as requested
          subsectionId: [subSectionId, Validators.required],
          subsectionLectureId: [null],
          text: ['', Validators.required],
          type: [type],
          options: type === 1 ? optionsArray : this.fb.array([]),
          correctOptionIndex: type === 1 ? [0, Validators.required] : [null],
          correctAnswer: type === 2 ? ['', Validators.required] : [''],
          answerExplanation: [''],
          marks: [1, [Validators.required, Validators.min(1)]]
        });
        this.questions.push(questionGroup);
        this.quizForm.updateValueAndValidity();
      }).catch(err => {
        console.error('Error fetching subsection data:', err);
        alert('فشل في تحميل بيانات التصنيف الفرعي.');
      });
      return; // لمنع إضافة السؤال قبل اكتمال الاستدعاء
    } else {
      console.error('Quiz level is not determined. Cannot add question.');
      alert('مستوى الاختبار غير محدد. يرجى التأكد من اختيار اختبار صالح.');
      return;
    }

    this.questions.push(questionGroup);
    this.quizForm.updateValueAndValidity();
  }

  // تعديل fetchSubsectionData لتعود Promise وتحديث البيانات
  fetchSubsectionData(subSectionId: string): Promise<void> {
    const token = this.authService.getToken();
    if (!token) {
      console.error('No token available');
      return Promise.reject('No token available');
    }

    return new Promise((resolve, reject) => {
      this.http.get(`https://api.makhekh.com/api/courses/section/subsection/${subSectionId}`, {
        headers: { Authorization: `Bearer ${token}` }
      }).subscribe({
        next: (res: any) => {
          this.sectionData = res.data;
          this.subsectionTitle = this.sectionData?.title || 'Unknown Subsection'; // تحديث اسم التصنيف الفرعي
          console.log(this.sectionData?.title);

          this.currentSubsectionLectures = this.sectionData?.lectures || []; // تحديث المحاضرات
          console.log('Fetched Subsection Data:', this.sectionData);
          resolve();
        },
        error: (err) => {
          console.error('Error fetching subsection data:', err);
          alert(this._translocoService.translate('quiz.errors.subsection_fetch_failed'));
          reject(err);
        }
      });
    });
  }

  onSectionChange(index: number): void {
    const questionGroup = this.questions.at(index);
    const selectedSectionId = questionGroup.get('sectionId')?.value;

    if (!selectedSectionId) {
      questionGroup.get('subsectionId')?.setValue(null);
      questionGroup.get('sectionLectureId')?.setValue(null);
      questionGroup.get('subsectionLectureId')?.setValue(null);
      questionGroup.get('subsectionId')?.markAsTouched();
      questionGroup.get('sectionLectureId')?.markAsTouched();
      questionGroup.get('subsectionLectureId')?.markAsTouched();
      return;
    }

    const subSections = this.getSubsectionsForSection(selectedSectionId);
    if (subSections.length === 0) {
      questionGroup.get('subsectionId')?.setValue(null);
      questionGroup.get('sectionLectureId')?.setValue(null);
      questionGroup.get('subsectionLectureId')?.setValue(null);
      questionGroup.get('subsectionId')?.markAsTouched();
      questionGroup.get('sectionLectureId')?.markAsTouched();
      questionGroup.get('subsectionLectureId')?.markAsTouched();
    } else {
      questionGroup.get('subsectionId')?.setValue(null);
      questionGroup.get('sectionLectureId')?.setValue(null);
      questionGroup.get('subsectionLectureId')?.setValue(null);
    }
  }

  onSectionLectureChange(index: number): void {
    const questionGroup = this.questions.at(index) as FormGroup;
    const sectionLectureId = questionGroup.get('sectionLectureId')?.value;

    if (sectionLectureId) {
      questionGroup.get('subsectionId')?.setValue(null, { emitEvent: false });
      questionGroup.get('subsectionLectureId')?.setValue(null, { emitEvent: false });
      questionGroup.get('subsectionId')?.disable();
      questionGroup.get('subsectionLectureId')?.disable();
    } else {
      questionGroup.get('subsectionId')?.enable();
      questionGroup.get('subsectionLectureId')?.enable();
    }
  }

  onSubsectionChange(index: number): void {
    const questionGroup = this.questions.at(index) as FormGroup;
    const subsectionId = questionGroup.get('subsectionId')?.value;
    const sectionId = questionGroup.get('sectionId')?.value || this.selectedQuiz?.sectionId;

    if (subsectionId) {
      questionGroup.get('sectionLectureId')?.setValue(null, { emitEvent: false });
      questionGroup.get('sectionLectureId')?.disable();
      questionGroup.get('subsectionLectureId')?.enable();
      if (!this.sectionData || this.sectionData.id !== sectionId) {
        this.fetchSectionData(sectionId, () => {
          this.updateSubsectionLectureDropdown(index, sectionId, subsectionId);
        });
      } else {
        this.updateSubsectionLectureDropdown(index, sectionId, subsectionId);
      }
    } else {
      questionGroup.get('sectionLectureId')?.enable();
      questionGroup.get('subsectionLectureId')?.disable();
      questionGroup.get('subsectionLectureId')?.setValue(null, { emitEvent: false });
    }
  }

  private updateSubsectionLectureDropdown(index: number, sectionId: string, selectedSubsectionId: string): void {
    const questionGroup = this.questions.at(index);
    const lectures = this.getSubsectionLectures(sectionId, selectedSubsectionId);
    console.log('Lectures for Subsection:', lectures);
    if (lectures.length === 0) {
      questionGroup.get('subsectionLectureId')?.setValue(null);
      questionGroup.get('subsectionLectureId')?.markAsTouched();
    } else {
      questionGroup.get('subsectionLectureId')?.setValue(null);
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

  get isSubsectionLevel(): boolean {
    return !!this.selectedQuiz?.subSectionId && !this.selectedQuiz?.lectureId;
  }

  loadSubsectionDetails(subsectionId: string): void {
    const token = this.authService.getToken();
    if (!token) {
      console.error('Authentication token not found.');
      return;
    }
    const headers = { headers: { Authorization: `Bearer ${token}` } };
    this.http.get(`https://api.makhekh.com/api/courses/section/subsection/${subsectionId}`, headers)
      .subscribe({
        next: (response: any) => {
          const subsectionData = response.data || response;
          this.currentSubsectionLectures = subsectionData.lectures || [];
          // Update the quiz title with the fetched name
          if (subsectionData.title) {
            this.currentSubsectionTitle = subsectionData.title;
          }
          // Now that data is loaded, add the first question form
          this.addDynamicQuestion();
        },
        error: (err) => {
          console.error('Failed to load subsection details:', err);
          alert(this._translocoService.translate('quiz.errors.subsection_fetch_failed'));
          // Still add a question form to not block the user
          this.addDynamicQuestion();
        }
      });
  }

  onSearchChange(): void {
    const query = this.searchQuery.toLowerCase().trim();

    if (!query) {
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

  closeDeleteConfirmModal(): void {
    this.showDeleteConfirmModal = false;
    this.selectedQuiz = null;
    const modal = document.getElementById('deleteConfirmModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
    }
  }

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
        this.quizzes = this.quizzes.filter(quiz => quiz.id !== quizId);
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