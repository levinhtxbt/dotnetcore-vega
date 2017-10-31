import { ToastyModule } from 'ng2-toasty';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'angular2-chartjs';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        ToastyModule.forRoot(),
    ],
    exports: [
        CommonModule,
        FormsModule,
        HttpModule,
        ToastyModule
    ],
    declarations: [],
    providers: [],
})
export class CoreModule { }
