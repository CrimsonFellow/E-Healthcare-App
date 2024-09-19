// prescription.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Import HttpHeaders
import { Observable } from 'rxjs';

export interface Prescription {
  id?: number;
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class PrescriptionService {
  private apiUrl = 'http://localhost:8081/api/prescriptions';

  constructor(private http: HttpClient) {}

  // Helper function to get the Basic Auth headers
  private getAuthHeaders(): { headers: HttpHeaders } {
    const username = localStorage.getItem('username'); // Retrieve username from localStorage
    const password = localStorage.getItem('password'); // Retrieve password from localStorage

    if (!username || !password) {
      console.error('Username or password not found in localStorage');
      // Handle the error appropriately, e.g., redirect to login page
      // this.router.navigate(['/login']);
    }

    // Encode credentials in Base64 format for Basic Auth
    const basicAuth = 'Basic ' + btoa(`${username}:${password}`);

    // Set the Authorization header with the Basic Auth token
    const headers = new HttpHeaders({
      Authorization: basicAuth,
      'Content-Type': 'application/json',
    });

    return { headers };
  }

  // Get all prescriptions
  getPrescriptions(): Observable<Prescription[]> {
    return this.http.get<Prescription[]>(this.apiUrl, this.getAuthHeaders());
  }

  // Add a new prescription
  addPrescription(prescription: Prescription): Observable<Prescription> {
    return this.http.post<Prescription>(
      this.apiUrl,
      prescription,
      this.getAuthHeaders()
    );
  }

  // Update an existing prescription
  updatePrescription(prescription: Prescription): Observable<Prescription> {
    return this.http.put<Prescription>(
      `${this.apiUrl}/${prescription.id}`,
      prescription,
      this.getAuthHeaders()
    );
  }

  // Delete a prescription
  deletePrescription(prescriptionId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${prescriptionId}`,
      this.getAuthHeaders()
    );
  }
}


