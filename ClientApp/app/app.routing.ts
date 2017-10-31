import { MakeModule } from './make/make.module';
import { ModelModule } from './model/model.module';
import { AdminModule } from './admin/admin.module';
import { AdminGuard } from './core/guard/admin.guard';
import { CallbackComponent } from './components/callback/callback.component';
import { Routes } from '@angular/router';
import { VehicleModule } from './vehicle/vehicle.module';


export const AppRoutes: Routes = [
    { path: '', redirectTo: 'vehicles', pathMatch: 'full' },
    { path: 'make', loadChildren: () => MakeModule },
    { path: 'model', loadChildren: () => ModelModule },
    { path: 'vehicles', loadChildren: () => VehicleModule },
    { path: 'admin', loadChildren: () => AdminModule, canActivate: [AdminGuard] },
    { path: 'callback', component: CallbackComponent },
    { path: '**', redirectTo: 'home' }
]