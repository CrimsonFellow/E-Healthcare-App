import { Injectable } from '@angular/core'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medicine } from './medicine.service';
import { environment } from '../../environments/environment';  

export interface CartItem {
  id: number;             
  medicine: Medicine;      
  quantity: number;   
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // Use environment.apiUrl for dynamic API base URL
  private apiUrl = `${environment.apiUrl}/cart`;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    
    if (username && password) {
      const basicAuth = 'Basic ' + btoa(`${username}:${password}`);
      return new HttpHeaders({
        'Authorization': basicAuth,
        'Content-Type': 'application/json',
      });
    }
    return new HttpHeaders();
  }

  getCart(userId: number): Observable<CartItem[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<CartItem[]>(`${this.apiUrl}?userId=${userId}`, { headers });
  }

  addToCart(userId: number, medicine: Medicine, quantity: number): Observable<void> {
    const headers = this.getAuthHeaders();
    const body = {
      userId,
      medicineId: medicine.id,  
      quantity
    };
    return this.http.post<void>(this.apiUrl, body, { headers });
  }

  removeFromCart(userId: number, cartId: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.apiUrl}/${cartId}?userId=${userId}`, { headers });
  }

  placeOrder(userId: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.post<void>(`${this.apiUrl}/checkout?userId=${userId}`, {}, { headers });
  }

  clearCart(userId: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.apiUrl}/clear?userId=${userId}`, { headers });
  }
}
