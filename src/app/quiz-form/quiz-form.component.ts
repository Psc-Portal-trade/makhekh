// ✅ Angular Quiz Form with Transloco-integrated error messages

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-quiz-form',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, TranslocoPipe],
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.css'],
})
export class QuizFormComponent {
  @Output() quizData = new EventEmitter<{ data: any; sectionIndex: number; lectureIndex: number }>();
  @Input() sectionIndex!: number;
  @Input() lectureIndex!: number;

  quizForm: FormGroup;
  isFormValid = false;
  successMessage = '';
  errorMessages: string[] = [];

  constructor(private fb: FormBuilder, private translocoService: TranslocoService) {
    this.quizForm = this.fb.group({
      courseName: ['', Validators.required],
      instructorName: ['', Validators.required],
      examDateTime: ['', Validators.required],
      duration: [10, [Validators.required, Validators.min(1)]],
      examDescription: [''],
      attempts: [1, [Validators.required, Validators.min(1)]],
      passingScore: [50, [Validators.required, Validators.min(1), Validators.max(100)]],
      questions: this.fb.array([]),
    });

    this.quizForm.statusChanges.subscribe(() => {
      this.checkFormValidity();
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
  addQuestion(type: 'mcq' | 'essay' = 'mcq') {
    let questionGroup: FormGroup;
  
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
      });
    } else {
      questionGroup = this.fb.group({
        type: ['essay'],
        text: ['', Validators.required],
        answerExplanation: [''],
      });
    }
  
    this.questions.push(questionGroup);
    this.quizForm.updateValueAndValidity();
    this.checkFormValidity();
  }
  

  removeQuestion(index: number) {
    this.questions.removeAt(index);
    this.quizForm.updateValueAndValidity();
    this.checkFormValidity();
  }

  checkFormValidity() {
    this.isFormValid =
      !!this.quizForm.get('courseName')?.valid &&
      !!this.quizForm.get('instructorName')?.valid &&
      !!this.quizForm.get('examDateTime')?.valid &&
      !!this.quizForm.get('duration')?.valid &&
      !!this.quizForm.get('attempts')?.valid &&
      !!this.quizForm.get('passingScore')?.valid &&
      this.questions.length > 0;
  }

  onSubmit() {
    this.errorMessages = [];
  
    if (this.quizForm.invalid) {
      this.quizForm.markAllAsTouched();
  
      const controls = this.quizForm.controls;
      if (!controls['courseName'].valid) this.errorMessages.push('quiz.errors.course_name');
      if (!controls['instructorName'].valid) this.errorMessages.push('quiz.errors.instructor_name');
      if (!controls['examDateTime'].valid) this.errorMessages.push('quiz.errors.exam_datetime');
      if (!controls['duration'].valid) this.errorMessages.push('quiz.errors.duration');
      if (!controls['attempts'].valid) this.errorMessages.push('quiz.errors.attempts');
      if (!controls['passingScore'].valid) this.errorMessages.push('quiz.errors.passing_score');
  
      this.questions.controls.forEach((questionGroup, i) => {
        const q = questionGroup as FormGroup;
        const type = q.get('type')?.value;
  
        if (!q.get('text')?.valid) {
          this.errorMessages.push(`quiz.errors.question_text_required|{index:${i + 1}}`);
        }
  
        if (type === 'mcq') {
          const options = q.get('options') as FormArray;
  
          options.controls.forEach((opt, j) => {
            if (!opt.get('optionValue')?.valid) {
              this.errorMessages.push(`quiz.errors.option_required|{index:${i + 1}, optionIndex:${j + 1}}`);
            }
          });
  
          if (q.get('correctOptionIndex')?.value === null) {
            this.errorMessages.push(`quiz.errors.correct_answer_required|{index:${i + 1}}`);
          }
        }
      });
  
      return;
    }
  
    if (this.questions.length === 0) {
      this.errorMessages.push('quiz.errors.questions_required');
      return;
    }
  
    const formValue = this.quizForm.getRawValue();
  
    // 🔐 تأمين المعالجة على حسب نوع السؤال
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
        question.correctAnswer = null; // مقالي
      }
    });
  
    const quiz = formValue;
  
    console.log('📋 Quiz Data:', quiz);
  
    this.quizData.emit({
      data: quiz,
      sectionIndex: this.sectionIndex,
      lectureIndex: this.lectureIndex,
    });
  
    this.closeModal();
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
      instructorName: ['', Validators.required],
      examDateTime: ['', Validators.required],
      duration: [10, [Validators.required, Validators.min(1)]],
      examDescription: [''],
      attempts: [1, [Validators.required, Validators.min(1)]],
      passingScore: [50, [Validators.required, Validators.min(1), Validators.max(100)]],
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
