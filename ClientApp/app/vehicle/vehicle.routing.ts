import { AuthGuard } from './../core/guard/auth.guard';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { Router, Routes } from '@angular/router';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';
import { ViewVehicleComponent } from './view-vehicle/view-vehicle.component';

export const VehicleRoutes: Routes = [
    { path: '', component: VehicleListComponent },
    { path: 'new', component: VehicleFormComponent, canActivate: [AuthGuard] },
    { path: 'edit/:id', component: VehicleFormComponent, canActivate: [AuthGuard] },
    { path: ':id', component: ViewVehicleComponent },
]
