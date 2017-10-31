import { AppRoutes } from './app.routing';
import { VehicleModule } from './vehicle/vehicle.module';
import { CustomErrorHandler } from './core/common/app.error-handle';
import { PhotoService } from './core/services/photo.service';
import { VehicleService } from './core/services/vehicle.service';
import { AuthService } from './core/services/auth.service';
import { AuthGuard } from './core/guard/auth.guard';
import { AdminGuard } from './core/guard/admin.guard';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { CallbackComponent } from './components/callback/callback.component';
import { BrowserXhr } from '@angular/http';
//import * as Raven from 'raven-js';
import { ErrorHandler } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { AUTH_PROVIDERS } from 'angular2-jwt';
import { AppComponent } from './app/app.component';
//Raven.config('https://6c62dd47cfae446191762248e67cce1e@sentry.io/224357').install();

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    CallbackComponent,
  ],
  imports: [
    RouterModule.forRoot(AppRoutes),
    CoreModule
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
