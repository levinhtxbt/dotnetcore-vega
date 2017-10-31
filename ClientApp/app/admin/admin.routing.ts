import { AdminComponent } from './admin.component';
import { Routes } from '@angular/router';

export const AdminRoutes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: AdminComponent }
]