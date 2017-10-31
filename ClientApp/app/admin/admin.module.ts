import { FormsModule } from '@angular/forms';
import { ChartModule } from 'angular2-chartjs';
import { AdminComponent } from './admin.component';
import { AdminRoutes } from './admin.routing';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({

  imports: [
    CommonModule,
    ChartModule,
    FormsModule,
    RouterModule.forChild(AdminRoutes)
  ],
  declarations: [
    AdminComponent
  ]

})
export class AdminModule { }
