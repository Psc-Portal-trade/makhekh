import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

interface AuthResponse {
  success: boolean;
  data: {
    fullName: string;
    userType: number;
    token: string;
  };
  message?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'https://api.makhekh.com/api/Auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<AuthResponse>(`${this.baseUrl}/signin`, { email, password }).pipe(
      tap((res: AuthResponse) => {
        if (res.success && res.data?.token) {
          const userRole = res.data.userType === 1 ? 'student' : 'teacher';
          const data = {
            fullName: res.data.fullName,
            userRole,
            token: res.data.token,
            email,
          };
          localStorage.setItem('user', JSON.stringify(data));
        }
      })
    );
  }

  register(payload: { fullName: string; email: string; password: string; userType: number }) {
    return this.http.post<AuthResponse>(`${this.baseUrl}/signup`, payload);
  }

confirmEmail(payload: { email: string; code: string }) {
  return this.http.post(`${this.baseUrl}/confirm-email`, payload, {
    headers: { 'Content-Type': 'application/json' }
  });
}


  getUserData() {
    const data = localStorage.getItem('user');
    return data ? JSON.parse(data) : null;
  }

  getToken(): string | null {
    const user = this.getUserData();
    return user?.token || null;
  }

forgotPassword(email: string) {
  return this.http.post('https://api.makhekh.com/api/Auth/forgot-password', { email });
}

resetPassword(data: { email: string; code: string; newPassword: string }) {
  return this.http.post('https://api.makhekh.com/api/Auth/reset-password', data);
}


}
