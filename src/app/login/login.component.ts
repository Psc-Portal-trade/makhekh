import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@ngneat/transloco';
import { NavbarComponent } from "../navbar/navbar.component";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, TranslocoPipe, NavbarComponent, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent { loginForm: FormGroup;
  emailForm: FormGroup;
  resetForm: FormGroup;

  errorMessage: string = '';
  forgetErrorMsg: string = '';
  forgetSuccessMsg: string = '';

  forgetPasswordStep = 1;
  storedEmail = '';
isForgetModalOpen = false;

  constructor(private authService: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%?&]).{6,}$/)
      ])
    });

    this.emailForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });

    this.resetForm = new FormGroup({
      code: new FormControl('', Validators.required),
      newPassword: new FormControl('', Validators.required)
    });
  }

  login() {
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe({
      next: () => {
        const userData = this.authService.getUserData();
        if (userData?.userRole === 'teacher' || userData?.userRole === 'student') {
          this.router.navigate(['/studentHome']);
        } else {
          this.errorMessage = 'بيانات غير صحيحة، حاول مرة أخرى';
        }
      },
      error: () => {
        this.errorMessage = 'حدث خطأ في تسجيل الدخول';
      }
    });
  }

  openForgetPasswordModal() {
    this.isForgetModalOpen = true;

    const modal = new (window as any).bootstrap.Modal(document.getElementById('loginModal'));
    modal.show();
  }

  sendResetEmail() {
    this.forgetErrorMsg = '';
    const email = this.emailForm.value.email;
    this.storedEmail = email;

    this.authService.forgotPassword(email).subscribe({
      next: () => {
        this.forgetPasswordStep = 2;
      },
      error: () => {
        this.forgetErrorMsg = 'حدثت مشكلة. تأكد من البريد الإلكتروني';
      }
    });
  }

  resetPassword() {
    this.forgetErrorMsg = '';
    this.forgetSuccessMsg = '';

    const data = {
      email: this.storedEmail,
      code: this.resetForm.value.code,
      newPassword: this.resetForm.value.newPassword
    };

    this.authService.resetPassword(data).subscribe({
      next: () => {
        this.forgetSuccessMsg = 'تم تغيير كلمة المرور بنجاح';
      },
      error: () => {
        this.forgetErrorMsg = 'حدثت مشكلة في البيانات المرسلة';
      }
    });
  }

}
