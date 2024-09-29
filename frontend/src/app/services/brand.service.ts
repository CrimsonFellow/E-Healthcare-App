import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; 

export interface Brand {
  id?: number;
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  // Use environment.apiUrl to construct the API URL dynamically
  private apiUrl = `${environment.apiUrl}/brands`;

  constructor(private http: HttpClient) {}

  // Helper function to get the Basic Auth headers
  private getAuthHeaders(): HttpHeaders {
    const username = localStorage.getItem('username');  // Retrieve username from localStorage
    const password = localStorage.getItem('password');  // Retrieve password from localStorage

    // Encode credentials in Base64 format for Basic Auth
    const basicAuth = 'Basic ' + btoa(`${username}:${password}`);

    // Set the Authorization header with the Basic Auth token
    return new HttpHeaders({
      'Authorization': basicAuth,
      'Content-Type': 'application/json'
    });
  }

  // Get list of brands with authorization headers
  getBrands(): Observable<Brand[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Brand[]>(this.apiUrl, { headers });
  }

  // Add a new brand with authorization headers
  addBrand(brand: Brand): Observable<Brand> {
    const headers = this.getAuthHeaders();
    return this.http.post<Brand>(this.apiUrl, brand, { headers });
  }

  // Update a brand with authorization headers
  updateBrand(brand: Brand): Observable<Brand> {
    const headers = this.getAuthHeaders();
    return this.http.put<Brand>(`${this.apiUrl}/${brand.id}`, brand, { headers });
  }

  // Delete a brand with authorization headers
  deleteBrand(brandId: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.apiUrl}/${brandId}`, { headers });
  }
}



