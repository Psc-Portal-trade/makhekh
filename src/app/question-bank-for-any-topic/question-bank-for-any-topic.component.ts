import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormArray, AbstractControl, FormControl } from '@angular/forms';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { QuizService } from '../services/quiz.service';
import { CategoriesService } from '../services/categories.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-question-bank-for-any-topic',
  imports: [FormsModule, CommonModule, ReactiveFormsModule, TranslocoPipe],
  templateUrl: './question-bank-for-any-topic.component.html',
  styleUrl: './question-bank-for-any-topic.component.css'
})
export class QuestionBankForAnyTopicComponent {


  @Output() quizData = new EventEmitter<{ data: any; sectionIndex: number; lectureIndex: number }>();
  @Input() sectionIndex!: number;
  @Input() lectureIndex!: number;
  categories: any[] = [];

  quizForm: FormGroup;
  isFormValid = false;
  successMessage = '';
  errorMessages: string[] = [];


  constructor(private fb: FormBuilder, private translocoService: TranslocoService,private quizService: QuizService,  private categoriesService: CategoriesService, private router: Router, private authService: AuthService
  ) {
    this.quizForm = this.fb.group({
      courseName: ['', Validators.required],
      duration: [10, [Validators.required, Validators.min(1)]],
      categoryId: [null, Validators.required], // ✅ أضف ده
      examDescription: ['', Validators.required], // ← أضيفي Validators.required هنا
      attempts: [1, [Validators.required, Validators.min(1)]],
      passingPercentage: [0, [Validators.required, Validators.min(1), Validators.max(100)]],
      isFree: [true, Validators.required], // أو false لو عاوزة الافتراضي يكون مدفوع
      price: [0],
      quizType: ['mcq', Validators.required],
    });

    this.quizForm.statusChanges.subscribe(() => {
      this.checkFormValidity();
    });
  }
  ngOnInit(): void {
    this.loadCategories();
  }
  
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
    // لإجبار Angular على إعادة تقييم الـ *ngIf
    this.quizForm.get('quizType')?.updateValueAndValidity();
  }
  

 
  checkFormValidity() {
    this.isFormValid =
      !!this.quizForm.get('courseName')?.valid &&
      !!this.quizForm.get('examDateTime')?.valid &&
      !!this.quizForm.get('examDescription')?.valid &&
      !!this.quizForm.get('duration')?.valid &&
      !!this.quizForm.get('attempts')?.valid &&
      !!this.quizForm.get('passingPercentage')?.valid &&
      this.questions.length > 0;
  }

  onSubmit() {
    this.errorMessages = [];
  // 🔐 التحقق من أن كل الأسئلة من نفس النوع المختار
 const selectedQuizType = this.quizForm.get('quizType')?.value;
 const questionTypes = this.questions.controls.map(q => q.get('type')?.value);

const hasTypeMismatch = questionTypes.some(type => type !== selectedQuizType);
if (hasTypeMismatch) {
  this.errorMessages.push('quiz.errors.quiz_type_mismatch');
}

    const controls = this.quizForm.controls;
  
    // ✅ التحقق من نوع الاختبار
    if (!controls['quizType'].value) {
      this.errorMessages.push('quiz.errors.quiz_type_required');
    }
  
    // ✅ التحقق من اختيار مجاني/مدفوع
    if (controls['isFree'].value === null || controls['isFree'].value === undefined) {
      this.errorMessages.push('quiz.errors.is_free_required');
    }
    if (!controls['categoryId'].valid) {
      this.errorMessages.push('quiz.errors.category_required');
    }
    
    // ✅ التحقق من السعر إذا كان مدفوعًا
    if (controls['isFree'].value === false) {
      const price = controls['price']?.value;
      if (price === null || price === undefined || price === '') {
        this.errorMessages.push('quiz.errors.price_required_if_paid');
      } else if (price <= 0) {
        this.errorMessages.push('quiz.errors.price_must_be_positive');
      }
    }
  
    // ✅ التحقق من الحقول الأساسية
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
        question.correctAnswer = null; // سؤال مقالي
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
      categoryId:formValue.categoryId,
      isStandalone: true, // ← غيّريها لو الكويز مرتبط بكورس حسب اختيار المستخدم
      attemptsAllowed: formValue.attempts,
      timeLimitInMinutes: formValue.duration
    };
    console.log('Passing Score:', formValue.passingPercentage); 

    this.quizService.createQuiz(payload).subscribe({
      next: (res:any) => {
        console.log('✅ Quiz created:', res);
        this.successMessage = 'quiz.created_successfully';
        this.closeModal();
      },
      error: (err:any) => {
        console.error('❌ Error creating quiz:', err);
        this.errorMessages.push('quiz.errors.api_error');
      }
    });
    const quizData = this.quizForm.value;

    this.closeModal();
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

  openModal() {
    this.resetForm();
    const modal = document.getElementById('quizModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
    }
  }

  resetForm() {
    this.quizForm = this.fb.group({
      courseName: ['', Validators.required],
      duration: [10, [Validators.required, Validators.min(1)]],
      categoryId: [null, Validators.required], // ← أضيفي ده هنا
      examDescription: ['', Validators.required],      
      attempts: [1, [Validators.required, Validators.min(1)]],
      passingPercentage: [50, [Validators.required, Validators.min(1), Validators.max(100)]],
      isFree: [true, Validators.required],
      price: [0],
      quizType: ['mcq', Validators.required],
      questions: this.fb.array([]),
    });
    this.isFormValid = false;
    this.errorMessages = [];
  }
  closeModal() {
    const modal = document.getElementById('quizModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
    }
  }


}
