import { AdminGuard } from './services/admin.guard';
import { AuthGuard } from './services/auth.guard';
import { AdminComponent } from './components/admin/admin.component';
import { CallbackComponent } from './components/callback/callback.component';
import { AuthService } from './services/auth.service';
import { BrowserXhr } from '@angular/http';
import { BrowserXhrWithProgress, ProgressService } from './services/progress.service';
//import * as Raven from 'raven-js';
import { ErrorHandler } from '@angular/core';
import { CustomErrorHandler } from './services/app.error-handle';
import { FormsModule } from '@angular/forms';
import { RouterModule, CanActivate } from '@angular/router';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { ToastyModule } from 'ng2-toasty';
import { VehicleService } from './services/vehicle.service';
import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';
import { PaginationComponent } from './components/shared/pagination.component';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { ViewVehicleComponent } from './components/view-vehicle/view-vehicle.component';
import { PhotoService } from './services/photo.service';
import { AUTH_PROVIDERS } from 'angular2-jwt';

//Raven.config('https://6c62dd47cfae446191762248e67cce1e@sentry.io/224357').install();

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    CounterComponent,
    FetchDataComponent,
    HomeComponent,
    VehicleFormComponent,
    VehicleListComponent,
    PaginationComponent,
    ViewVehicleComponent,
    CallbackComponent,
    AdminComponent
  ],
  imports: [
    CommonModule,
    ToastyModule.forRoot(),
    HttpModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'vehicles', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'vehicles', component: VehicleListComponent },
      { path: 'vehicles/new', component: VehicleFormComponent },
      { path: 'vehicles/edit/:id', component: VehicleFormComponent },
      { path: 'vehicles/:id', component: ViewVehicleComponent },
      { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
      { path: 'callback', component: CallbackComponent },
      { path: '**', redirectTo: 'home' }
    ])
  ],
  providers: [
    { provide: ErrorHandler, useClass: CustomErrorHandler },
    
    AuthService,
    AUTH_PROVIDERS,
    VehicleService,
    PhotoService,
    AuthGuard,
    AdminGuard
  ]
})
export class AppModuleShared {
}
