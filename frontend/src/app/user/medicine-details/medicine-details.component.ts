import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';  
import { MedicineService, Medicine } from '../../services/medicine.service';  
import { ActivatedRoute, Router, RouterModule } from '@angular/router';  
import { FormsModule } from '@angular/forms';  
import { CommonModule } from '@angular/common';  

@Component({
  selector: 'app-medicine-details',
  standalone: true,
  templateUrl: './medicine-details.component.html',
  styleUrls: ['./medicine-details.component.css'],
  imports: [FormsModule, CommonModule, RouterModule]
})
export class MedicineDetailsComponent {
  medicine: Medicine | undefined;  
  quantity: number = 1;  
  userId: number | null;  
  username: string | null;
  password: string | null;

  constructor(
    private cartService: CartService,
    private medicineService: MedicineService,
    private route: ActivatedRoute,
    private router: Router  
  ) {
    this.username = localStorage.getItem('username');
    this.password = localStorage.getItem('password');
    this.userId = this.getUserId();  
    this.loadMedicine();  
  }

  // Retrieve userId from localStorage
  getUserId(): number | null {
    const userId = localStorage.getItem('userId');  
    return userId ? Number(userId) : null;
  }

  // Load the selected medicine details
  loadMedicine(): void {
    const medicineIdParam = this.route.snapshot.paramMap.get('id');
    const medicineId = medicineIdParam ? Number(medicineIdParam) : null;

    if (medicineId && !isNaN(medicineId)) {
      this.medicineService.getMedicineById(medicineId).subscribe({
        next: (data: Medicine) => {
          this.medicine = data;
        },
        error: (error: any) => {
          console.error("Error fetching medicine details:", error);
          alert("Failed to load medicine details. Please try again later.");
        }
      });
    } else {
      console.error("Medicine ID is not available or invalid.");
      alert("Invalid medicine ID.");
      this.router.navigate(['/medicine-list']); // Redirect to medicine list if ID is invalid
    }
  }

  // Add medicine to the cart
  addToCart(): void {
    // Ensure the user is logged in
    if (!this.userId || !this.username || !this.password) {
      alert('Please log in to add items to the cart.');
      this.router.navigate(['/login']);  // Redirect to login page if userId is missing
      return;
    }

    if (this.medicine && this.quantity > 0) {
      // Pass userId, medicine object, and quantity to the addToCart method
      this.cartService.addToCart(this.userId, this.medicine, this.quantity).subscribe({
        next: () => {
          // Navigate back to the medicine list with a success message
          this.router.navigate(
            ['/medicine-list'],
            { queryParams: { added: 'true' } }
          );
        },
        error: (error: any) => { // Explicitly type 'error' as 'any'
          console.error('Failed to add to cart:', error);
          alert('Failed to add medicine to the cart. Please try again.');
        },
        complete: () => {
          console.log('Add to cart completed');
        }
      });
    } else {
      alert('Please enter a valid quantity.');
    }
  }

  // Navigate back to the medicine list
  backToMenu(): void {
    this.router.navigate(['/medicine-list']);
  }
}








