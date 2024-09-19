import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service'; 
import { Observable } from 'rxjs';  // Ensure this is imported for handling observables

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],  
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  showPassword: boolean = false;  // Toggle for password visibility

  constructor(private router: Router, private userService: UserService) {}  // Inject UserService

  // Handle form submission
  onSubmit(): void {
    // Use UserService to handle login
    this.userService.login(this.username, this.password).subscribe({
      next: (response) => {
        console.log('Login response:', response);  // Log the response to inspect the structure

        if (response && response.role) {
          // Save user credentials (username and password) in localStorage
          localStorage.setItem('username', this.username);
          localStorage.setItem('password', this.password);
          localStorage.setItem('userRole', response.role);
          localStorage.setItem('userId', response.userId);  

          // Save user role to local storage
          this.userService.saveUserRole(response.role);

          // Navigate based on the role
          if (response.role === 'ROLE_ADMIN') {
            this.router.navigate(['/admin/dashboard']);  // Admin role redirects to dashboard
          } else if (response.role === 'ROLE_USER') {
            this.router.navigate(['/medicine-list']);    // User role redirects to medicine list
          }
        } else {
          // Handle login failure
          alert('Login failed! Please check your credentials.');
        }
      },
      error: (error) => {
        // Handle login error (e.g., 401 Unauthorized)
        console.error('Login error:', error);
        alert('Login failed due to server error. Please try again.');
      }
    });
  }

  // Toggle password visibility
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  // Navigate to registration page
  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }

  // Navigate to forgot password page
  navigateToForgotPassword(): void {
    this.router.navigate(['/forgot-password']);
  }
}







