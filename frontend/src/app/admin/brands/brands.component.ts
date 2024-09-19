// brands.component.ts
import { Component } from '@angular/core';
import { BrandService, Brand } from '../../services/brand.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Import Router for navigation

@Component({
  selector: 'app-brands',
  standalone: true,
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css'],
  imports: [FormsModule, CommonModule],
})
export class BrandsComponent {
  brands: Brand[] = [];
  newBrand: Brand = this.resetNewBrand();
  isEditing = false; // Flag to determine if we're adding or editing a brand

  constructor(private brandService: BrandService, private router: Router) {
    this.loadBrands();
  }

  // Reset the newBrand object
  resetNewBrand(): Brand {
    return { id: undefined, name: '', description: '' };
  }

  // Load the list of brands from the service
  loadBrands() {
    this.brandService.getBrands().subscribe({
      next: (data: Brand[]) => {
        this.brands = data;
      },
      error: (error) => {
        console.error('Failed to load brands:', error);
      },
    });
  }

  // Save a new brand or update an existing one
  saveBrand() {
    if (this.newBrand.name && this.newBrand.description) {
      if (this.isEditing) {
        // Update existing brand
        this.brandService.updateBrand(this.newBrand).subscribe(() => {
          this.loadBrands();
          this.newBrand = this.resetNewBrand();
          this.isEditing = false;
        });
      } else {
        // Add new brand
        this.brandService.addBrand(this.newBrand).subscribe(() => {
          this.loadBrands();
          this.newBrand = this.resetNewBrand();
        });
      }
    }
  }

  // Edit an existing brand
  editBrand(brand: Brand) {
    this.newBrand = { ...brand };
    this.isEditing = true;
  }

  // Delete a brand
  deleteBrand(brand: Brand) {
    if (confirm(`Are you sure you want to delete ${brand.name}?`)) {
      this.brandService.deleteBrand(brand.id!).subscribe(() => {
        this.loadBrands();
      });
    }
  }

  // Cancel editing
  cancelEdit() {
    this.newBrand = this.resetNewBrand();
    this.isEditing = false;
  }

  // Navigate back to the admin dashboard
  goBack() {
    this.router.navigate(['/admin/dashboard']);
  }
}





