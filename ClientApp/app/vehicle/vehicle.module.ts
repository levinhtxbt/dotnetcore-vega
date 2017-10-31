import { SharedModule } from './../shared/shared.module';
import { VehicleRoutes } from './vehicle.routing';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ViewVehicleComponent } from './view-vehicle/view-vehicle.component';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';
import { NgModule } from '@angular/core';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(VehicleRoutes),
        SharedModule
    ],
    exports: [],
    declarations: [
        VehicleListComponent,
        VehicleFormComponent,
        ViewVehicleComponent
    ],
    providers: [],
})
export class VehicleModule { }
