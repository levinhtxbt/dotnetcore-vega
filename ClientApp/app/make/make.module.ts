import { MakeListComponent } from './make-list/make-list.component';
import { MakeRoutes } from './make.routing';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MakeRoutes)
  ],
  declarations: [
    MakeListComponent
  ]
})
export class MakeModule { }
