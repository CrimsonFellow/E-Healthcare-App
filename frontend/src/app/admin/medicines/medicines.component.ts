// medicines.component.ts
import { Component } from '@angular/core';
import { MedicineService, Medicine, Brand } from '../../services/medicine.service';  
import { FormsModule } from '@angular/forms';  
import { CommonModule } from '@angular/common';  
import { Router } from '@angular/router'; // Import Router for navigation

@Component({
  selector: 'app-medicines',
  standalone: true,
  templateUrl: './medicines.component.html',
  styleUrls: ['./medicines.component.css'],
  imports: [FormsModule, CommonModule]
})
export class MedicinesComponent {
  medicines: Medicine[] = []; 
  brands: Brand[] = [];  
  newMedicine: Medicine = this.resetNewMedicine();
  isEditing = false; // Flag to determine if we're editing or adding

  constructor(private medicineService: MedicineService, private router: Router) {
    this.loadMedicines();  
    this.loadBrands();  
  }

  // Reset the newMedicine object
  resetNewMedicine(): Medicine {
    return { 
      id: undefined,
      name: '', 
      brand: null,  
      description: '', 
      price: 0,
      prescriptionId: null 
    };
  }

  // Load the list of medicines
  loadMedicines() {
    this.medicineService.getMedicines().subscribe((data: Medicine[]) => {
      this.medicines = data;  
    });
  }

  // Load the list of brands
  loadBrands() {
    this.medicineService.getBrands().subscribe((data: Brand[]) => {
      this.brands = data;
    });
  }

  // Save a new or existing medicine
  saveMedicine() {
    if (
      this.newMedicine.name &&
      this.newMedicine.brand && // Ensure brand is not null
      this.newMedicine.description &&
      this.newMedicine.price > 0
    ) {
      if (this.isEditing) {
        // Update existing medicine
        this.medicineService.updateMedicine(this.newMedicine).subscribe(() => {
          this.loadMedicines();
          this.newMedicine = this.resetNewMedicine();
          this.isEditing = false;
        });
      } else {
        // Add new medicine
        this.medicineService.addMedicine(this.newMedicine).subscribe(() => {
          this.loadMedicines();
          this.newMedicine = this.resetNewMedicine();
        });
      }
    } else {
      alert('Please fill in all required fields and select a brand.');
    }
  }

  // Edit an existing medicine
  editMedicine(medicine: Medicine) {
    // Create a copy to avoid modifying the original before saving
    this.newMedicine = { ...medicine, brand: medicine.brand };  
    this.isEditing = true;
  }

  // Delete a medicine
  deleteMedicine(medicine: Medicine) {
    if (confirm(`Are you sure you want to delete ${medicine.name}?`)) {
      this.medicineService.deleteMedicine(medicine.id!).subscribe(() => {
        this.loadMedicines();  // Reload the medicine list after deletion
      });
    }
  }

  // Cancel editing
  cancelEdit() {
    this.newMedicine = this.resetNewMedicine();
    this.isEditing = false;
  }

  // Navigate back to the admin dashboard
  goBack() {
    this.router.navigate(['/admin/dashboard']);
  }
}





