//import * as Raven from 'raven-js';
import { ErrorHandler } from '@angular/core';
import { CustomErrorHandler } from './services/app.error-handle';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { ToastyModule} from 'ng2-toasty';
import { VehicleService } from './services/vehicle.service';
import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';

//Raven.config('https://6c62dd47cfae446191762248e67cce1e@sentry.io/224357').install();

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        VehicleFormComponent
    ],
    imports: [
        CommonModule,
        ToastyModule.forRoot(),
        HttpModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'vehicles/new', component: VehicleFormComponent },
            { path: 'vehicles/:id', component: VehicleFormComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers: [
        { provide: ErrorHandler, useClass: CustomErrorHandler },
        VehicleService
    ]
})
export class AppModuleShared {
}
