import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; 
import { AppComponent } from './app/app.component';

import { DashboardComponent } from './app/admin/dashboard/dashboard.component';
import { MedicinesComponent } from './app/admin/medicines/medicines.component';
import { BrandsComponent } from './app/admin/brands/brands.component';
import { SymptomsComponent } from './app/admin/symptoms/symptoms.component';
import { PrescriptionsComponent } from './app/admin/prescriptions/prescriptions.component';

import { MedicineListComponent } from './app/user/medicine-list/medicine-list.component';
import { MedicineDetailsComponent } from './app/user/medicine-details/medicine-details.component';
import { CartComponent } from './app/user/cart/cart.component';
import { ReceiptComponent } from './app/user/receipt/receipt.component';  

import { LoginComponent } from './app/login/login.component';
import { RegisterComponent } from './app/register/register.component'; 
import { AuthGuard } from './app/auth.guard'; 

const routes: Routes = [

  { path: 'admin/dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'admin/medicines', component: MedicinesComponent, canActivate: [AuthGuard] },
  { path: 'admin/brands', component: BrandsComponent, canActivate: [AuthGuard] },
  { path: 'admin/symptoms', component: SymptomsComponent, canActivate: [AuthGuard] },
  { path: 'admin/prescriptions', component: PrescriptionsComponent, canActivate: [AuthGuard] },

  { path: 'medicine-list', component: MedicineListComponent },
  { path: 'medicine-details/:id', component: MedicineDetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'receipt', component: ReceiptComponent },  

  { path: 'login', component: LoginComponent },  
  { path: 'register', component: RegisterComponent }, 

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),  
    provideHttpClient()    
  ]
});
