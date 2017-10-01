//import * as Raven from 'raven-js';
import { Injectable } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandler, NgZone } from "@angular/core";

@Injectable()
export class CustomErrorHandler implements ErrorHandler {

    constructor(
        private ngZone: NgZone,
        private toastyService : ToastyService) {}

    handleError(error : any) : void {
       // Raven.captureException(error.originalError || error);
        console.log(error);
        this.ngZone.run(() => {         
            if (typeof(window) !== 'undefined') {
                this
                    .toastyService
                    .error({
                        title: 'Error', 
                        msg: 'An unexpected error happened', 
                        theme: ' bootstrap', 
                        showClose: true, 
                        timeout: 5000
                    });
            }
            
        });
        
    }
}