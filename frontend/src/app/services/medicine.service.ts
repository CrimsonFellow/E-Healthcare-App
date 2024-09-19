import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Brand {
  id?: number;
  name: string;
}

// medicine.service.ts
export interface Medicine {
  id?: number;
  name: string;
  brand: Brand | null; 
  description: string;
  price: number;
  prescriptionId: number | null;
}


@Injectable({
  providedIn: 'root',
})
export class MedicineService {
  private apiUrl = 'http://localhost:8081/api/medicines';
  private brandApiUrl = 'http://localhost:8081/api/brands';  // URL for brand service

  constructor(private http: HttpClient) {}

  // Helper function to get the Basic Auth headers
  private getAuthHeaders(): HttpHeaders {
    const username = localStorage.getItem('username');  // Store username in localStorage after login
    const password = localStorage.getItem('password');  // Store password in localStorage after login
    const role = localStorage.getItem('role');  // Fetch user role
    const userId = localStorage.getItem('userId');  // Fetch user ID

    // Encode credentials in Base64 format for Basic Auth
    const basicAuth = 'Basic ' + btoa(`${username}:${password}`);

    // Set the Authorization header with the Basic Auth token
    return new HttpHeaders({
      'Authorization': basicAuth,
      'Content-Type': 'application/json'
    });
  }

  // Fetch all medicines
  getMedicines(): Observable<Medicine[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Medicine[]>(this.apiUrl, { headers });
  }

  // Fetch a single medicine by ID
  getMedicineById(id: number): Observable<Medicine> {
    const headers = this.getAuthHeaders();
    return this.http.get<Medicine>(`${this.apiUrl}/${id}`, { headers });
  }

  // Add a new medicine
  addMedicine(medicine: Medicine): Observable<Medicine> {
    const headers = this.getAuthHeaders();
    return this.http.post<Medicine>(this.apiUrl, medicine, { headers });
  }

  // Update an existing medicine
  updateMedicine(medicine: Medicine): Observable<Medicine> {
    const headers = this.getAuthHeaders();
    return this.http.put<Medicine>(`${this.apiUrl}/${medicine.id}`, medicine, { headers });
  }

  // Delete a medicine by ID
  deleteMedicine(medicineId: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.apiUrl}/${medicineId}`, { headers });
  }

  // Add a medicine to the cart (Assuming this will be handled by CartController)
  addToCart(medicine: Medicine): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.post<void>(`http://localhost:8081/api/cart`, medicine, { headers });
  }

  // Fetch all brands
  getBrands(): Observable<Brand[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Brand[]>(this.brandApiUrl, { headers });
  }
}


