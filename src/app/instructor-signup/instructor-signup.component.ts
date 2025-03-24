import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { NgClass } from '@angular/common';

import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-instructor-signup',
  imports: [ReactiveFormsModule, RouterLink,CommonModule,FormsModule,TranslocoPipe],
  templateUrl: './instructor-signup.component.html',
  styleUrls: ['./instructor-signup.component.css']
})
export class InstructorSignupComponent {
  step: number = 0; // تحديد الخطوة الحالية

  // نموذج التسجيل
  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/)
    ])
  });

  // بيانات الاستبيان
  knowledge: string = '';
  otherKnowledge: string = ''; // لتخزين قيمة الإدخال عند اختيار "Others"
  level:string = '';
  audience:string = '';


  // بيانات المُعلم
  instructorData = {
    name: '',
    email: '',
    password: '',
    knowledge: '',
    level: '',
    audience:''
  };

  openModal() {
    this.step = 1; // إعادة تعيين الخطوة الأولى
    const modal = document.getElementById('signupModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
    }
  }


  // إغلاق المودال
  closeModal() {
    const modal = document.getElementById('signupModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
    }
  }

  // تعيين قيمة `knowledge` وعند اختيار "Others" يتم تفعيل الإدخال اليدوي
  setKnowledge(value: string): void {
    this.knowledge = value;
    if (value !== 'Others') {
      this.otherKnowledge = ''; // إعادة تعيين الحقل إذا لم يكن "Others"
    }
  }

  continue(): void {
    if (this.step === 1) {
      if (this.registerForm.valid) {
        // حفظ البيانات في instructorData قبل الانتقال
        this.instructorData.name = this.registerForm.value.name;
        this.instructorData.email = this.registerForm.value.email;
        this.instructorData.password = this.registerForm.value.password;
        this.step++;
      } else {
        alert('⚠️ Please fill all required fields correctly.');
      }
    }
    else if (this.step === 2) {
      if (this.knowledge.trim() !== '') {
        if (this.knowledge === 'Others' && this.otherKnowledge.trim() === '') {
          alert('⚠️ Please specify your teaching experience.');
          return;
        }
        this.instructorData.knowledge = this.knowledge === 'Others' ? this.otherKnowledge : this.knowledge;
        this.step++;
      } else {
        alert('⚠️ Please select a knowledge option.');
      }
    }
    else if (this.step === 3) {
      if (this.level.trim() !== '') {
        this.instructorData.level = this.level;
        this.step++;
      } else {
        alert('⚠️ Please select a level option.');
      }
    }
    else if (this.step === 4) {
      if (this.audience.trim() !== '') {
        this.instructorData.audience = this.audience;
        this.submitData();
      } else {
        alert('⚠️ Please select your target audience.');
      }
    }
  }


  previous(): void {
    if (this.step > 1) {
      this.step--;
      if (this.step === 1) {
        // إعادة تعبئة الفورم بالقيم المخزنة عند الرجوع للخطوة الأولى
        this.registerForm.setValue({
          name: this.instructorData.name,
          email: this.instructorData.email,
          password: this.instructorData.password
        });
      }
      if (this.step === 2) {
        this.knowledge = this.instructorData.knowledge;
        this.otherKnowledge = this.knowledge === 'Others' ? this.otherKnowledge : '';
      }
      if (this.step === 3) {
        this.level = this.instructorData.level;
      }
      if (this.step === 4) {
        this.audience = this.instructorData.audience;
      }
    }
  }


  submitData(): void {
    this.instructorData = {
      name: this.registerForm.value.name,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      knowledge: this.knowledge === 'Others' ? this.otherKnowledge : this.knowledge,
      level: this.level,
      audience:this.audience

    };

    console.log('✅ Instructor Data Submitted:', this.instructorData);
    this.closeModal();


  }


}
