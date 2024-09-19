import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private loginApiUrl = 'http://localhost:8081/api/auth/login';
  private registerApiUrl = 'http://localhost:8081/api/auth/register';
  private logoutApiUrl = 'http://localhost:8081/api/auth/logout'; // Define logout API URL

  constructor(private http: HttpClient) {}

  // Login method
  login(username: string, password: string): Observable<any> {
    const loginData = { username, password };
    return this.http.post<any>(this.loginApiUrl, loginData).pipe(
      catchError((error) => {
        console.error('Login failed', error);
        return of(null);
      })
    );
  }

  // User Registration method
  registerUser(
    username: string,
    password: string,
    name: string,
    email: string
  ): Observable<any> {
    const registerData = {
      username,
      password,
      name,
      email,
      role: 'user', 
    };
    return this.http.post<any>(this.registerApiUrl, registerData).pipe(
      catchError((error) => {
        console.error('User registration failed', error);
        return of(null);
      })
    );
  }

  // Admin Registration method
  registerAdmin(username: string, password: string): Observable<any> {
    const registerData = {
      username,
      password,
      role: 'admin', 
    };
    return this.http.post<any>(this.registerApiUrl, registerData).pipe(
      catchError((error) => {
        console.error('Admin registration failed', error);
        return of(null);
      })
    );
  }

  // Save the user role locally
  saveUserRole(role: string): void {
    localStorage.setItem('userRole', role);
  }

  // Get the user role from local storage
  getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }

  // Log the user out
  logout(): Observable<any> {
    return this.http.post<any>(`${this.logoutApiUrl}`, {}).pipe( // Use logoutApiUrl
      tap(() => {
        // Clear user session data, tokens, etc.
        localStorage.removeItem('authToken');
        localStorage.removeItem('userRole'); // Also remove userRole if stored
      }),
      catchError(this.handleError<any>('logout'))
    );
  }

  // Check if the user is logged in based on role presence
  isLoggedIn(): boolean {
    return !!this.getUserRole();
  }

  // Generic error handler
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      // Optionally, send the error to remote logging infrastructure
      return of(result as T);
    };
  }
}




