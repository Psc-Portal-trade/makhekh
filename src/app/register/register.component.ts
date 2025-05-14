import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { TranslocoPipe } from '@ngneat/transloco';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    RouterLink,
    NavbarComponent,
    TranslocoPipe,
    CommonModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/),
    ]),
    confirmationCode: new FormControl(''),
  });

  codeError: string = '';
  countdown: number = 600;
  countdownMinutes: number = 10;
  countdownSeconds: number = 0;
  emailForConfirmation: string = '';
  private timerId: any;

  constructor(private authService: AuthService, private router: Router) {}

onRegister(): void {
  if (this.registerForm.valid) {
    const { name, email, password } = this.registerForm.value;
    const payload = {
      fullName: name,
      email,
      password,
      userType: 1,
    };

    this.authService.register(payload).subscribe({
      next: () => {
        this.emailForConfirmation = email;

        // ✅ فقط لما التسجيل ينجح نفتح المودال
        this.openModal();
        this.startTimer();
      },
      error: (err) => {
        console.error('❌ فشل التسجيل:', err);

        const msg =
          err?.error?.message === 'Email already exists'
            ? 'البريد الإلكتروني مستخدم من قبل.'
            : 'حدث خطأ أثناء التسجيل.';

        alert(msg);
      },
    });
  }
}
openModal(): void {
  const modalEl = document.getElementById('loginModal');
  if (modalEl) {
    const modal = new (window as any).bootstrap.Modal(modalEl);
    modal.show();
  }
}


startTimer(): void {
  clearInterval(this.timerId); // عشان ما يتكررش لو حصل تسجيل مرتين

  this.countdown = 600;
  this.updateCountdownDisplay();

  this.timerId = setInterval(() => {
    this.countdown--;
    this.updateCountdownDisplay();

    if (this.countdown <= 0) {
      clearInterval(this.timerId);
      this.router.navigate(['/register']);
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

    this.authService.confirmEmail(payload).subscribe({
      next: () => {
        this.codeError = '';
        clearInterval(this.timerId);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.codeError = 'الكود غير صحيح. حاول مرة أخرى.';
        console.error(err);
      },
    });
  }
}
