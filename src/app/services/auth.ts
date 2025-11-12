import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user';
import { User } from '@app/types/users';

export interface RegisterRequest {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  country: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth';

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) {}

  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, data);
  }

  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, data);
  }

  getInfoUser() {
    (this.userService.getMe()).subscribe({
      next: (data) => {
        this.saveUser(data);
      }
    })
  }

  saveToken(token: string): void {
    // Guardar token en cookie que expira en 24 horas
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 24);
    document.cookie = `auth_token=${token}; expires=${expirationDate.toUTCString()}; path=/; SameSite=Strict`;
  }

  getToken(): string | null {
    const name = 'auth_token=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split(';');
    
    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return null;
  }

  logout(): void {
    document.cookie = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    localStorage.removeItem('user');
    this.router.navigate(['/auth/login']);
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  navigateToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  saveUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): User | null {
    const data = localStorage.getItem('user');
    return data ? JSON.parse(data) : null;
  }
}