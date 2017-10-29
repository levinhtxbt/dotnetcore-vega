import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthService {

  auth0 = new auth0.WebAuth({
    clientID: 'KP6ZGvMn3UjbsA3CkHgRUR5vwNbdeAbh',
    domain: 'levinh.auth0.com',
    responseType: 'token',
    // Move to hosted page 
    // audience: 'htts://levinh.net',
    // redirectUri: 'http://localhost:5000/callback',
    // scope: 'openid email profile'
  });
  public profile: any;
  private roles: string[] = [];

  constructor(public router: Router) {
    this.readUserFromLocalStorage();
  }

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {

      if (authResult && authResult.accessToken) {

        window.location.hash = '';
        this.setSession(authResult);
        this.router.navigate(['/home']);
        this.getProfile((err, profile) => {
          this.readUserFromLocalStorage();    
        });
      } else if (err) {
        this.router.navigate(['/home']);
        console.log(err);
      }
    });
  }

  private readUserFromLocalStorage() {

    this.profile = JSON.parse(localStorage.getItem('profile'));

    var accessToken = localStorage.getItem('access_token');

    if (accessToken) {
      let jwtHelper = new JwtHelper();
      var decodedToken = jwtHelper.decodeToken(accessToken);
      if (decodedToken['https://levinh.net/roles']) {
        this.roles = decodedToken['https://levinh.net/roles'];  
      } else 
        this.roles = [];
    } else
      this.roles = [];
  }

  public getProfile(cb): void {

    const accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
      throw new Error('Access token must exist to fetch profile');
    }

    this.auth0.client.userInfo(accessToken, (err, profile) => {

      if (profile) {
        localStorage.setItem('profile', JSON.stringify(profile));
      }
      cb(err, profile);
    });
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    // localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    // localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('profile');
    this.profile = null;
    this.roles = [];
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  public isInRole(role: string): boolean {
    return this.roles.indexOf(role) > -1;
  }
}