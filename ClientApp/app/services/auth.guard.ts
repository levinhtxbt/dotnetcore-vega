import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(protected auth: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        if (this.auth.isAuthenticated()) {    
            return true;
        }
        // Redirect to login page
        // window.location.href = "https://levinh.auth0.com/login?client=KP6ZGvMn3UjbsA3CkHgRUR5vwNbdeAbh"
        this.auth.login();
        return false;
    }
}