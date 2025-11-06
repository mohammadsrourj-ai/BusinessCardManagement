import { Routes } from '@angular/router';
import { BusinessCardManagementComponent } from './pages/business-card-management/business-card-management.component';

export const routes: Routes = [
  { path: 'business-card-management', component: BusinessCardManagementComponent },
  { path: '', redirectTo: '/business-card-management', pathMatch: 'full' },
  { path: '**', redirectTo: '/business-card-management' }
];
