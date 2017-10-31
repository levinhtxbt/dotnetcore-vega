import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from './pagination.component';
import { NgModule } from '@angular/core';


@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        PaginationComponent
    ],
    declarations: [
        PaginationComponent
    ],
    providers: [],
})
export class SharedModule { }
