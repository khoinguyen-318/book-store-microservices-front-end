import { AuthService } from './../../../components/services/auth.service';
import { CartService } from './../../../components/services/cart.service';
import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../services/app.layout.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  items!: MenuItem[];
  isLoggedIn: boolean = false;
  totalItem: number = 0;
  userId = '';
  userName = '';
  constructor(
    public layoutService: LayoutService,
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn;
    this.items = [
      {
        label: 'Profile',
        icon: 'pi pi-fw pi-user',
        routerLink: 'profile'
      },
      {
        label: 'Logout',
        icon: 'pi pi-fw pi-sign-out',
        command: () => {
          this.logout();
        },
      },
    ];
  }
  handleLogin() {
    this.authService.loggin();
  }
  logout() {
    this.authService.logOut();
  }
}
