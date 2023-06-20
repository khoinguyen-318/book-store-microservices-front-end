import { AuthService } from './../demo/service/auth.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LayoutService } from "./service/app.layout.service";

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit{

    userName!:string;

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService,private authService:AuthService) {
        this.userName = this.authService.getFullname();
    }
    ngOnInit(): void {
    }
    logout(){
        this.authService.logoff();
    }
}
