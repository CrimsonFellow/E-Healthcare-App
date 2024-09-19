import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService, CartItem } from '../../services/cart.service';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-receipt',
  standalone: true,
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css'],
  imports: [CommonModule]
})
export class ReceiptComponent {
  cartItems: CartItem[] = [];
  totalPrice = 0;
  userId: number;
  receiptNumber: string; // Receipt number
  requiresPrescription = false; // Flag to indicate if any item requires a prescription
  currentDate = new Date(); // Current date

  constructor(private cartService: CartService, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state as { cart: CartItem[], totalPrice: number };
    
    if (state) {
      this.cartItems = state.cart || [];
      this.totalPrice = state.totalPrice || 0;
      this.checkForPrescription(); // Check if any medicine requires a prescription
    }

    this.userId = Number(localStorage.getItem('userId'));
    this.receiptNumber = this.generateReceiptNumber(); // Generate receipt number
  }

  // Generate a random receipt number
  generateReceiptNumber(): string {
    const now = Date.now().toString();  // Current timestamp
    const randomNum = Math.floor(Math.random() * 1000);  // Random number
    return `${now}-${randomNum}`;  // Format: timestamp-randomNumber
  }

  // Check if any medicine in the cart requires a prescription
  checkForPrescription() {
    // If any medicine has a non-null prescriptionId, set the flag to true
    this.requiresPrescription = this.cartItems.some(item => item.medicine.prescriptionId !== null);
  }

  // Confirm the order and clear the entire cart for the user
  confirmOrder() {
    if (this.cartItems.length > 0) {
      this.cartService.clearCart(this.userId).subscribe({
        next: () => {
          alert('Order confirmed! Thank you for your purchase.');
          this.router.navigate(['/medicine-list']);
        },
        error: (error) => { 
          console.error('Failed to clear cart:', error);
          alert('Failed to confirm the order. Please try again.');
        },
        complete: () => {
          console.log('Cart cleared successfully.');
        }
      });
    } else {
      console.error('No items in the cart to clear.');
    }
  }
}



