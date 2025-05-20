import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { NgClass } from '@angular/common';

import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslocoPipe } from '@ngneat/transloco';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-instructor-signup',
  imports: [ReactiveFormsModule, RouterLink, CommonModule, FormsModule, TranslocoPipe],
  templateUrl: './instructor-signup.component.html',
  styleUrls: ['./instructor-signup.component.css']
})
export class InstructorSignupComponent {
  step: number = 0; // تحديد الخطوة الحالية
  constructor(private authService: AuthService, private router: Router) {}

  // نموذج التسجيل
  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/)]),
    confirmationCode: new FormControl('') // ✅ مضاف لتفادي الخطأ
  });

  // بيانات الاستبيان
  knowledge: string = '';
  otherKnowledge: string = ''; // لتخزين قيمة الإدخال عند اختيار "Others"
  level: string = '';
  audience: string = '';

  // بيانات المُعلم
  instructorData = {
    name: '',
    email: '',
    password: '',
    knowledge: '',
    level: '',
    audience: ''
  };

  emailError: string = ''; // ✅ لعرض رسالة الخطأ

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

  // تعيين قيمة `knowledge`
  setKnowledge(value: string): void {
    this.knowledge = value;
    if (value !== 'Others') {
      this.otherKnowledge = '';
    }
  }

  continue(): void {
    if (this.step === 1) {
      if (this.registerForm.valid) {
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
        this.registerForm.setValue({
          name: this.instructorData.name,
          email: this.instructorData.email,
          password: this.instructorData.password,
          confirmationCode: ''
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
      audience: this.audience
    };

    console.log('✅ Instructor Data Submitted:', this.instructorData);
    this.closeModal();
  }

  codeError: string = '';
  countdown: number = 600;
  countdownMinutes: number = 10;
  countdownSeconds: number = 0;
  emailForConfirmation: string = '';
  private timerId: any;

  onRegister(): void {
    if (this.registerForm.valid) {
      const { name, email, password } = this.registerForm.value;
      const payload = {
        fullName: name,
        email,
        password,
        userType: 2,
      };

      this.authService.register(payload).subscribe({
        next: () => {
          this.emailError = '';
          this.emailForConfirmation = email;
          this.openEmailConfirmationModal();
          this.startTimer();
        },
        error: (err) => {
          console.error(err);
          if (err?.error?.message === 'Email already exists') {
            this.emailError = '❗ هذا البريد الإلكتروني مسجل بالفعل.';
          } else {
            this.emailError = '❌ حدث خطأ أثناء التسجيل. تأكد من صحة البيانات.';
          }
        }
      });
    }
  }

 openEmailConfirmationModal(): void {
  const modalEl = document.getElementById('confirmEmailModal');
  if (modalEl) {
    this.emailModalInstance = new (window as any).bootstrap.Modal(modalEl);
    this.emailModalInstance.show();
  }
}

 closeEmailConfirmationModal(): void {
  if (this.emailModalInstance) {
    this.emailModalInstance.hide();
  }

  document.querySelector('.modal-backdrop')?.remove();
  document.body.classList.remove('modal-open');
  document.body.style.removeProperty('padding-right');
}

  startTimer(): void {
    clearInterval(this.timerId);
    this.countdown = 600;
    this.updateCountdownDisplay();

    this.timerId = setInterval(() => {
      this.countdown--;
      this.updateCountdownDisplay();

      if (this.countdown <= 0) {
        clearInterval(this.timerId);
        this.closeEmailConfirmationModal();
        this.router.navigate(['/instructor-signup']);
      }
    }, 1000);
  }

  updateCountdownDisplay(): void {
    this.countdownMinutes = Math.floor(this.countdown / 60);
    this.countdownSeconds = this.countdown % 60;
  }

  confirmEmail(): void {
    const code = this.registerForm.get('confirmationCode')?.value;
    const payload = {
      email: this.emailForConfirmation,
      code: code,
    };

    console.log('✅ Sending confirmation:', payload);

    this.authService.confirmEmail(payload).subscribe({
      next: () => {
        this.codeError = '';
        clearInterval(this.timerId);
        this.closeEmailConfirmationModal();
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.codeError = 'الكود غير صحيح. حاول مرة أخرى.';
        console.error(err);
      }
    });
  }





private emailModalInstance: any = null;








}
