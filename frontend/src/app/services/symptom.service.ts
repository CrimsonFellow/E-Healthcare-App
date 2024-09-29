// symptom.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';  

export interface Symptom {
  id?: number;
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class SymptomService {
  // Use environment.apiUrl for dynamic API base URL
  private apiUrl = `${environment.apiUrl}/symptoms`;

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

  // Get all symptoms
  getSymptoms(): Observable<Symptom[]> {
    return this.http.get<Symptom[]>(this.apiUrl, this.getAuthHeaders());
  }

  // Add a new symptom
  addSymptom(symptom: Symptom): Observable<Symptom> {
    return this.http.post<Symptom>(
      this.apiUrl,
      symptom,
      this.getAuthHeaders()
    );
  }

  // Update an existing symptom
  updateSymptom(symptom: Symptom): Observable<Symptom> {
    return this.http.put<Symptom>(
      `${this.apiUrl}/${symptom.id}`,
      symptom,
      this.getAuthHeaders()
    );
  }

  // Delete a symptom
  deleteSymptom(symptomId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${symptomId}`,
      this.getAuthHeaders()
    );
  }
}


