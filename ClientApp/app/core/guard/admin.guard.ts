import { AuthService } from './../services/auth.service';
import { AuthGuard } from './auth.guard';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AdminGuard extends AuthGuard {

    constructor(auth: AuthService) {
        super(auth);
     }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let isAuthenticated = super.canActivate(route, state);
        return isAuthenticated ? this.auth.isInRole('Admin'): false;

    }
}