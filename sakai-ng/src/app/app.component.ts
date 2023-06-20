import { AuthService } from './demo/service/auth.service';
import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    constructor(private primengConfig: PrimeNGConfig,private authService:AuthService) {
        this.authService.runInitialLoginSequence();
     }

    ngOnInit() {
        this.primengConfig.ripple = true;
    }
}
