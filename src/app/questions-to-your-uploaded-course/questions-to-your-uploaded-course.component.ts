import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { QuizService } from '../services/quiz.service';
import { CategoriesService } from '../services/categories.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CourseeService } from '../services/coursee.service';

@Component({
  selector: 'app-questions-to-your-uploaded-course',
  imports: [FormsModule, CommonModule, ReactiveFormsModule, TranslocoPipe],
  templateUrl: './questions-to-your-uploaded-course.component.html',
  styleUrl: './questions-to-your-uploaded-course.component.css'
})
export class QuestionsToYourUploadedCourseComponent {
  @Output() quizData = new EventEmitter<{ data: any; sectionIndex: number; lectureIndex: number }>();
  @Input() sectionIndex!: number;
  @Input() lectureIndex!: number;
  categories: any[] = [];
  teacherCourses: any[] = [];
  availableSections: any[] = [];
  availableLectures: any[] = [];

  quizForm: FormGroup;
  isFormValid = false;
  successMessage = '';
  errorMessages: string[] = [];

  constructor(
    private fb: FormBuilder,
    private translocoService: TranslocoService,
    private quizService: QuizService,
    private categoriesService: CategoriesService,
    private router: Router,
    private authService: AuthService,
    private courseService: CourseeService
  ) {
    this.quizForm = this.fb.group({
      courseName: ['', Validators.required],
      duration: [10, [Validators.required, Validators.min(1)]],
      categoryId: [null, Validators.required],
      examDescription: ['', Validators.required],
      attempts: [1, [Validators.required, Validators.min(1)]],
      passingPercentage: [50, [Validators.required, Validators.min(1), Validators.max(100)]],
      isFree: [true, Validators.required],
      price: [0],
      quizType: ['mcq', Validators.required],
      attachTo: [null, Validators.required],
      questions: this.fb.array([]),
      selectedCourseId: [null],
      selectedSectionId: [null],
      selectedLectureId: [null]
    });

    this.quizForm.statusChanges.subscribe(() => {
      this.checkFormValidity();
    });
  }

  ngOnInit(): void {
    this.loadTeacherCourses();
  }

  loadTeacherCourses(): void {
    this.courseService.getCourses().subscribe({
      next: (res) => {
        this.teacherCourses = res.data || [];
        console.log('✅ Teacher Courses:', this.teacherCourses);

        this.teacherCourses.forEach(course => {
          console.log('📚 Course:', course.title);
          if (course.sections && course.sections.length > 0) {
            course.sections.forEach((section: { title: any; lectures?: any[] }) => {
              console.log('   ➤ Section:', section.title);
              if (section.lectures && section.lectures.length > 0) {
                section.lectures.forEach(lecture => {
                  console.log('     ➤ Lecture:', lecture.title);
                });
              } else {
                console.log('     🔹 No lectures found');
              }
            });
          } else {
            console.log('   🔹 No sections found');
          }
        });
      },
      error: (err) => {
        console.error('❌ Failed to load teacher courses', err);
      }
    });
  }

  onCourseSelectForSections() {
    const selectedCourseId = this.quizForm.get('selectedCourseId')?.value;
    const selectedCourse = this.teacherCourses.find(c => c.id === selectedCourseId);
    this.availableSections = selectedCourse?.sections || [];
    console.log('📂 Sections Loaded:', this.availableSections);
    this.quizForm.get('selectedSectionId')?.setValue(null);
    this.quizForm.get('selectedLectureId')?.setValue(null);
  }

  onCourseSelectForLectures() {
    const selectedCourseId = this.quizForm.get('selectedCourseId')?.value;
    const selectedCourse = this.teacherCourses.find(c => c.id === selectedCourseId);
    this.availableSections = selectedCourse?.sections || [];
    this.availableLectures = [];
    console.log('📂 Sections Loaded for Lectures:', this.availableSections);
    this.quizForm.get('selectedSectionId')?.setValue(null);
    this.quizForm.get('selectedLectureId')?.setValue(null);
    if (this.availableSections.length === 0) {
      this.errorMessages.push('quiz.errors.no_sections_available');
    }
  }

  onSectionSelectForLectures() {
    const selectedSectionId = this.quizForm.get('selectedSectionId')?.value;
    const selectedSection = this.availableSections.find(s => s.id === selectedSectionId);
    this.availableLectures = selectedSection?.lectures || [];
    console.log('📚 Lectures Loaded:', this.availableLectures);
    this.quizForm.get('selectedLectureId')?.setValue(null);
    if (this.availableLectures.length === 0) {
      this.errorMessages.push('quiz.errors.no_lectures_available');
    }
  }

  get questions(): FormArray {
    return this.quizForm.get('questions') as FormArray;
  }

  getOptions(index: number): FormArray {
    return this.questions.at(index).get('options') as FormArray;
  }

  asFormControl(ctrl: AbstractControl | null): FormControl {
    return ctrl as FormControl;
  }

  onQuizTypeChange() {
    this.quizForm.get('quizType')?.updateValueAndValidity();
  }

  checkFormValidity() {
    this.isFormValid =
      !!this.quizForm.get('courseName')?.valid &&
      !!this.quizForm.get('examDescription')?.valid &&
      !!this.quizForm.get('duration')?.valid &&
      !!this.quizForm.get('attempts')?.valid &&
      !!this.quizForm.get('attachTo')?.valid &&
      !!this.quizForm.get('passingPercentage')?.valid &&
      this.questions.length > 0;
  }

  onSubmit() {
    this.errorMessages = [];

    const controls = this.quizForm.controls;

    const selectedQuizType = this.quizForm.get('quizType')?.value;
    const questionTypes = this.questions.controls.map(q => q.get('type')?.value);
    const hasTypeMismatch = questionTypes.some(type => type !== selectedQuizType);
    if (hasTypeMismatch) {
      this.errorMessages.push('quiz.errors.quiz_type_mismatch');
    }

    if (!controls['quizType'].value) {
      this.errorMessages.push('quiz.errors.quiz_type_required');
    }

    if (controls['isFree'].value === null || controls['isFree'].value === undefined) {
      this.errorMessages.push('quiz.errors.is_free_required');
    }

    if (!controls['attachTo'].valid || !controls['attachTo'].value) {
      this.errorMessages.push('quiz.errors.attach_to_required');
    }



    if (controls['isFree'].value === false) {
      const price = controls['price']?.value;
      if (price === null || price === undefined || price === '') {
        this.errorMessages.push('quiz.errors.price_required_if_paid');
      } else if (price <= 0) {
        this.errorMessages.push('quiz.errors.price_must_be_positive');
      }
    }

    if (!controls['courseName'].valid) this.errorMessages.push('quiz.errors.course_name');
    if (!controls['examDescription'].valid) this.errorMessages.push('quiz.errors.description');
    if (!controls['duration'].valid || controls['duration'].value <= 0) {
      this.errorMessages.push('quiz.errors.duration');
    }
    if (!controls['attempts'].valid) this.errorMessages.push('quiz.errors.attempts');
    if (!controls['passingPercentage'].valid ||
        controls['passingPercentage'].value < 1 ||
        controls['passingPercentage'].value > 100) {
      this.errorMessages.push('quiz.errors.passing_score');
    }

    if (this.errorMessages.length > 0) {
      this.quizForm.markAllAsTouched();
      return;
    }

    const formValue = this.quizForm.getRawValue();

    formValue.questions.forEach((question: any) => {
      if (question.type === 'mcq') {
        const index = question.correctOptionIndex;
        const value =
          index !== null && question.options && question.options[index]
            ? question.options[index].optionValue
            : '';
        question.correctAnswer = {
          optionIndex: index,
          optionValue: value,
        };
      } else {
        question.correctAnswer = null;
      }
    });

    const quiz = formValue;
    console.log('📋 Quiz Data:', quiz);

    const payload = {
      title: formValue.courseName,
      description: formValue.examDescription,
      type: formValue.quizType === 'mcq' ? 1 : 2,
      passingPercentage: formValue.passingPercentage,
      isFree: formValue.isFree,
      price: formValue.isFree ? 0 : formValue.price,
      categoryId: formValue.categoryId,
      subCategoryId: null, // افتراضيًا null لأننا مش بنستخدمه حاليًا
      isStandalone: formValue.attachTo === null, // إذا كان attachTo فاضي، الكويز مستقل
      attemptsAllowed: formValue.attempts,
      timeLimitInMinutes: formValue.duration,
      courseId: formValue.attachTo === 'course' ? formValue.selectedCourseId : null,
      sectionId: formValue.attachTo === 'section' ? formValue.selectedSectionId : null,
      lectureId: formValue.attachTo === 'lecture' ? formValue.selectedLectureId : null
    };
    console.log('📤 Payload:', payload);

    this.quizService.createQuiz(payload).subscribe({
      next: (res: any) => {
        console.log('✅ Quiz created:', res);
        this.successMessage = 'quiz.created_successfully';
        this.closeLectureQuizModal();
      },
      error: (err: any) => {
        console.error('❌ Error creating quiz:', err);
        this.errorMessages.push('quiz.errors.api_error');
      }
    });

    this.closeLectureQuizModal();
    this.router.navigate(['/create-quiz']);
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

  resetForm() {
    this.quizForm = this.fb.group({
      courseName: ['', Validators.required],
      duration: [10, [Validators.required, Validators.min(1)]],
      categoryId: [null, Validators.required],
      examDescription: ['', Validators.required],
      attempts: [1, [Validators.required, Validators.min(1)]],
      passingPercentage: [50, [Validators.required, Validators.min(1), Validators.max(100)]],
      isFree: [true, Validators.required],
      price: [0],
      quizType: ['mcq', Validators.required],
      questions: this.fb.array([]),
      selectedCourseId: [null],
      selectedSectionId: [null],
      selectedLectureId: [null]
    });
    this.isFormValid = false;
    this.errorMessages = [];
  }

  openLectureQuizModal() {
    const modal = document.getElementById('lectureQuizModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
      modal.removeAttribute('aria-hidden');
    }
  }

  closeLectureQuizModal() {
    const modal = document.getElementById('lectureQuizModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      modal.setAttribute('aria-hidden', 'true');
    }
  }
}