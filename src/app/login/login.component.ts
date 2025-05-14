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
export class LoginComponent {
loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%?&]).{6,}$/)
      ])
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
}
