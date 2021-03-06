import { Component } from '@angular/core';
import { AuthService } from '../core/services/auth.service';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(public auth: AuthService) {
        auth.handleAuthentication();
        
    }
}
