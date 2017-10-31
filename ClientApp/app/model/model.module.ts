import { ModelListComponent } from './model-list/model-list.component';
import { RouterModule } from '@angular/router';
import { ModelRoutes } from './model.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ModelRoutes)
  ],
  declarations: [
    ModelListComponent
  ]
})
export class ModelModule { }
