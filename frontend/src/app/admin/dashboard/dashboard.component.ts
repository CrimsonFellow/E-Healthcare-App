// dashboard.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule, RouterLink],
})
export class DashboardComponent {
  constructor(private router: Router) {}

  // Logout method
  logout() {
    // Clear user data from localStorage
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    // Optionally, clear other stored data
    // localStorage.clear();

    // Navigate to the login page
    this.router.navigate(['/login']);
  }
}
