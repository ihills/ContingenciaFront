import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api';
  private tokenKey = 'auth_token';
  private user: any;

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) {
    this.user = { username, email: 'user@example.com' };
    return this.http.post(`${this.apiUrl}/login`, { username, password });
  }

  saveToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
  getUser() {
    return this.user;  // Obtener el usuario actual (si está autenticado)
  }
  logout() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }
}
