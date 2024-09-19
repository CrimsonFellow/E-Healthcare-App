import { Component, OnInit } from '@angular/core';
import { MedicineService, Medicine } from '../../services/medicine.service';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service'; // Ensure correct path

@Component({
  selector: 'app-medicine-list',
  standalone: true,
  templateUrl: './medicine-list.component.html',
  styleUrls: ['./medicine-list.component.css'],
  imports: [FormsModule, CommonModule, RouterModule]
})
export class MedicineListComponent implements OnInit {
  medicines: Medicine[] = [];
  successMessage: string = ''; // Property to hold the success message

  constructor(
    private medicineService: MedicineService,
    private router: Router,
    private route: ActivatedRoute, // Inject ActivatedRoute to access query parameters
    private userService: UserService // Injected UserService
  ) {}

  ngOnInit(): void {
    this.loadMedicines();
    this.handleSuccessMessage();
  }

  // Method to load medicines from the service
  loadMedicines(): void {
    this.medicineService.getMedicines().subscribe({
      next: (data: Medicine[]) => {
        this.medicines = data;
      },
      error: (error: any) => {
        console.error("Error fetching medicines:", error);
        alert("Failed to load medicines. Please try again later.");
      }
    });
  }

  // Method to handle the success message based on query parameters
  handleSuccessMessage(): void {
    this.route.queryParams.subscribe(params => {
      if (params['added'] === 'true') {
        this.successMessage = 'Medicine added to cart successfully!';
        // Optionally, clear the message after a few seconds
        setTimeout(() => {
          this.successMessage = '';
        }, 5000); // Clears message after 5 seconds
      }
    });
  }

  // Method to navigate to the medicine details page
  viewDetails(medicine: Medicine): void {
    this.router.navigate(['/medicine-details', medicine.id]);
  }

  // Method to handle user logout
  logout(): void {
    this.userService.logout().subscribe({
      next: () => {
        // Optionally, replace alert with a more user-friendly notification
        alert('Successfully logged out.');
        this.router.navigate(['/login']);
      },
      error: (err: any) => { // Explicitly typed 'err'
        console.error('Logout failed:', err);
        alert('Logout failed. Please try again.');
      }
    });
  }
}



