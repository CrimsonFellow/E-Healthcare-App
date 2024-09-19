// symptoms.component.ts
import { Component } from '@angular/core';
import { SymptomService, Symptom } from '../../services/symptom.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Import Router for navigation

@Component({
  selector: 'app-symptoms',
  standalone: true,
  templateUrl: './symptoms.component.html',
  styleUrls: ['./symptoms.component.css'],
  imports: [FormsModule, CommonModule],
})
export class SymptomsComponent {
  symptoms: Symptom[] = [];
  newSymptom: Symptom = this.resetNewSymptom();
  isEditing = false; // Flag to determine if we're adding or editing a symptom

  constructor(private symptomService: SymptomService, private router: Router) {
    this.loadSymptoms();
  }

  // Reset the newSymptom object
  resetNewSymptom(): Symptom {
    return { id: undefined, name: '', description: '' };
  }

  // Load the list of symptoms from the service
  loadSymptoms() {
    this.symptomService.getSymptoms().subscribe({
      next: (data: Symptom[]) => {
        this.symptoms = data;
      },
      error: (error) => {
        console.error('Failed to load symptoms:', error);
      },
    });
  }

  // Save a new symptom or update an existing one
  saveSymptom() {
    if (this.newSymptom.name && this.newSymptom.description) {
      if (this.isEditing) {
        // Update existing symptom
        this.symptomService.updateSymptom(this.newSymptom).subscribe(() => {
          this.loadSymptoms();
          this.newSymptom = this.resetNewSymptom();
          this.isEditing = false;
        });
      } else {
        // Add new symptom
        this.symptomService.addSymptom(this.newSymptom).subscribe(() => {
          this.loadSymptoms();
          this.newSymptom = this.resetNewSymptom();
        });
      }
    } else {
      alert('Please fill in all required fields.');
    }
  }

  // Edit an existing symptom
  editSymptom(symptom: Symptom) {
    this.newSymptom = { ...symptom };
    this.isEditing = true;
  }

  // Delete a symptom
  deleteSymptom(symptom: Symptom) {
    if (confirm(`Are you sure you want to delete ${symptom.name}?`)) {
      this.symptomService.deleteSymptom(symptom.id!).subscribe(() => {
        this.loadSymptoms();
      });
    }
  }

  // Cancel editing
  cancelEdit() {
    this.newSymptom = this.resetNewSymptom();
    this.isEditing = false;
  }

  // Navigate back to the admin dashboard
  goBack() {
    this.router.navigate(['/admin/dashboard']);
  }
}
