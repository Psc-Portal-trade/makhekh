import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-quiz-form',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.css']
})
export class QuizFormComponent {

  @Output() quizData = new EventEmitter<string>(); // إنشاء حدث لإرسال البيانات


  quizForm: FormGroup;
  isFormValid = false; // متغير لمراقبة صلاحية النموذج

  constructor(private fb: FormBuilder) {
    this.quizForm = this.fb.group({
      title: ['', Validators.required],
      duration: [10, [Validators.required, Validators.min(1)]],
      questions: this.fb.array([])
    });

    // متابعة أي تغيير في النموذج لتحديث حالة الزر
    this.quizForm.statusChanges.subscribe(() => {
      this.checkFormValidity();
    });
  }

  // ✅ استخدام "get" للحصول على الأسئلة
  get questions(): FormArray {
    return this.quizForm.get('questions') as FormArray;
  }

  // ✅ جلب الخيارات لسؤال معين
  getOptions(index: number): FormArray {
    return this.questions.at(index).get('options') as FormArray;
  }
  

  // ✅ إضافة سؤال جديد
  addQuestion() {
    const optionsArray = this.fb.array([
      this.fb.group({ optionValue: ['', Validators.required] }),
      this.fb.group({ optionValue: ['', Validators.required] }),
      this.fb.group({ optionValue: ['', Validators.required] }),
      this.fb.group({ optionValue: ['', Validators.required] })
    ]);
  
    const questionGroup = this.fb.group({
      text: ['', Validators.required],
      options: optionsArray,
      correctAnswer: ['', Validators.required],
      answerExplanation: [''] // ✅ إضافة خانة شرح الإجابة

    });
  
    this.questions.push(questionGroup);
    this.quizForm.updateValueAndValidity();
    this.checkFormValidity();
  
    console.log("📌 تمت إضافة سؤال جديد، البيانات الحالية:", this.quizForm.value);
  }
  
  
  // ✅ حذف سؤال معين
  removeQuestion(index: number) {
    this.questions.removeAt(index);
    this.quizForm.updateValueAndValidity(); // تحديث الفورم بعد الحذف
    this.checkFormValidity(); // تحديث حالة الزر
  }

  // ✅ تحديث حالة النموذج للتحكم في تفعيل الزر
  checkFormValidity() {
    this.isFormValid =
  !!this.quizForm.get('title')?.valid &&
  !!this.quizForm.get('duration')?.valid &&
  this.questions.length > 0;

  }

  // ✅ عند إرسال النموذج
  onSubmit() {
    if (this.isFormValid) {
      console.log("Quiz Data:", this.quizForm.value);
      this.quizData.emit(this.quizForm.value); // إرسال بيانات الكويز للأب
      this.closeModal();
      alert("this quiz submitted succesfully")
      
    }
  }
  openModal() {
    const modal = document.getElementById('quizModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
    }
  }
  
  closeModal() {
    const modal = document.getElementById('quizModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
    }
  }

}
