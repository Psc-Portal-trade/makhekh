import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

// ✅ تعريف شكل الاستجابات من الـ API
interface AuthResponse {
  success: boolean;
  data: {
    fullName: string;
    userType: number;
    token: string;
  };
  message?: string;
}

interface ConfirmEmailResponse {
  success: boolean;
  message?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'https://api.makhekh.com/api/Auth';

  constructor(private http: HttpClient) {}

  // ✅ تسجيل دخول
  login(email: string, password: string) {
    return this.http.post<AuthResponse>(`${this.baseUrl}/signin`, { email, password }).pipe(
      tap((res: AuthResponse) => {
        if (res.success && res.data?.token) {
          const userRole = res.data.userType === 1 ? 'student' : 'teacher';
          const data = {
            fullName: res.data.fullName,
            userRole: userRole,
            token: res.data.token,
            email: email,
          };
          localStorage.setItem('user', JSON.stringify(data));
        }
      })
    );
  }

  // ✅ تسجيل مستخدم جديد
  register(payload: { fullName: string; email: string; password: string; userType: number }) {
    return this.http.post<AuthResponse>(`${this.baseUrl}/signup`, payload);
  }

  // ✅ تأكيد كود الإيميل
  confirmEmail(payload: { email: string; code: string }) {
    return this.http.post<ConfirmEmailResponse>(`${this.baseUrl}/confirm-email`, payload);
  }

  // ✅ قراءة بيانات المستخدم المخزنة
  getUserData() {
    const data = localStorage.getItem('user');
    return data ? JSON.parse(data) : null;
  }
}
