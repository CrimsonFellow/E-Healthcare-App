// prescriptions.component.ts
import { Component } from '@angular/core';
import { PrescriptionService, Prescription } from '../../services/prescription.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Import Router for navigation

@Component({
  selector: 'app-prescriptions',
  standalone: true,
  templateUrl: './prescriptions.component.html',
  styleUrls: ['./prescriptions.component.css'],
  imports: [FormsModule, CommonModule],
})
export class PrescriptionsComponent {
  prescriptions: Prescription[] = [];
  newPrescription: Prescription = this.resetNewPrescription();
  isEditing = false; // Flag to determine if we're adding or editing a prescription

  constructor(private prescriptionService: PrescriptionService, private router: Router) {
    this.loadPrescriptions();
  }

  // Reset the newPrescription object
  resetNewPrescription(): Prescription {
    return { id: undefined, name: '', description: '' };
  }

  // Load the list of prescriptions from the service
  loadPrescriptions() {
    this.prescriptionService.getPrescriptions().subscribe({
      next: (data: Prescription[]) => {
        this.prescriptions = data;
      },
      error: (error) => {
        console.error('Failed to load prescriptions:', error);
      },
    });
  }

  // Save a new prescription or update an existing one
  savePrescription() {
    if (this.newPrescription.name && this.newPrescription.description) {
      if (this.isEditing) {
        // Update existing prescription
        this.prescriptionService.updatePrescription(this.newPrescription).subscribe(() => {
          this.loadPrescriptions();
          this.newPrescription = this.resetNewPrescription();
          this.isEditing = false;
        });
      } else {
        // Add new prescription
        this.prescriptionService.addPrescription(this.newPrescription).subscribe(() => {
          this.loadPrescriptions();
          this.newPrescription = this.resetNewPrescription();
        });
      }
    } else {
      alert('Please fill in all required fields.');
    }
  }

  // Edit an existing prescription
  editPrescription(prescription: Prescription) {
    this.newPrescription = { ...prescription };
    this.isEditing = true;
  }

  // Delete a prescription
  deletePrescription(prescription: Prescription) {
    if (confirm(`Are you sure you want to delete ${prescription.name}?`)) {
      this.prescriptionService.deletePrescription(prescription.id!).subscribe(() => {
        this.loadPrescriptions();
      });
    }
  }

  // Cancel editing
  cancelEdit() {
    this.newPrescription = this.resetNewPrescription();
    this.isEditing = false;
  }

  // Navigate back to the admin dashboard
  goBack() {
    this.router.navigate(['/admin/dashboard']);
  }
}


