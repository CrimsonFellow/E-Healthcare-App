import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from '../../services/cart.service';  
import { UserService } from '../../services/user.service';  
import { FormsModule } from '@angular/forms';  
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.component.html',  
  styleUrls: ['./cart.component.css'],
  imports: [FormsModule, RouterModule, CommonModule]
})
export class CartComponent implements OnInit {
  cart: CartItem[] = [];  // Array of CartItems
  totalPrice: number = 0;
  userId: number | null = null; 
  isLoading: boolean = true; // Flag to show loading spinner

  constructor(
    private cartService: CartService, 
    private userService: UserService, 
    private router: Router  // Inject the Router for navigation
  ) { }

  ngOnInit(): void {
    this.userId = this.getUserId();  
    if (this.userId) {
      this.loadCart();  
    } else {
      // Redirect to login if userId is not found
      this.router.navigate(['/login']);
    }
  }

  // Retrieve userId from localStorage safely
  getUserId(): number | null {
    const userIdStr = localStorage.getItem('userId');  
    const userId = userIdStr ? Number(userIdStr) : null;
    return userId && !isNaN(userId) ? userId : null;
  }

  // Load cart items from the service
  loadCart(): void {
    this.isLoading = true;
    this.cartService.getCart(this.userId!).subscribe({
      next: (data: CartItem[]) => {
        this.cart = data;  
        this.calculateTotal(); 
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Failed to load cart:', error);
        this.isLoading = false;
      }
    });
  }

  // Calculate the total price of the cart
  calculateTotal(): void {
    this.totalPrice = this.cart.reduce((total, item) => 
      total + (item.medicine.price * item.quantity), 0
    );  
  }

  // Remove an item from the cart without pop-ups
  removeFromCart(cartId: number | undefined): void {
    if (cartId !== undefined && this.userId !== null) {
      this.cartService.removeFromCart(this.userId, cartId).subscribe({
        next: () => {
          // Remove the item from the cart array locally
          this.cart = this.cart.filter(item => item.id !== cartId);
          this.calculateTotal();  // Recalculate total price
        },
        error: (error: any) => {
          console.error('Failed to remove cart item:', error);
        }
      });
    } else {
      console.error('Cart ID is undefined or user not logged in, cannot remove item.');
    }
  }

  // Navigate to receipt page after placing the order
  placeOrder(): void {
    if (this.cart.length === 0) {
      alert('Your cart is empty.');
      return;
    }
    // Navigate to the receipt page, passing the cart and total price
    this.router.navigate(['/receipt'], {
      state: { cart: this.cart, totalPrice: this.totalPrice }
    });
  }

  // Navigate back to the medicine list
  backToMenu(): void {
    this.router.navigate(['/medicine-list']);
  }
}






