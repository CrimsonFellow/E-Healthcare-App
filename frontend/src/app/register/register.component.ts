import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private router: Router, private userService: UserService) {}

  onSubmit() {
    this.userService.registerUser(this.username, this.password, this.name, this.email).subscribe({
      next: (response: any) => {
        alert('Registration successful!');
        this.router.navigate(['/login']); // Redirect to login
      },
      error: (error: any) => {
        alert('Registration failed. Please try again.');
      },
      complete: () => {
        console.log('Registration process completed.');
      }
    });
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}


