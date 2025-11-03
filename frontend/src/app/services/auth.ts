import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private apiUrl = 'http://localhost:5000/api/users';
  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }
  login(LoginData: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, LoginData);
  }
  // ✅ Save token to localStorage
  saveToken(token: string) {
    localStorage.setItem('authToken', token);
  }

  // ✅ Get token from localStorage
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // ✅ Check logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  // ✅ Logout
  logout() {
    localStorage.removeItem('authToken');
  }
}
