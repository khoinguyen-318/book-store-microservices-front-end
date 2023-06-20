import { AuthService } from './../../../components/services/auth.service';
import { KeycloakService } from 'keycloak-angular';
import { CartService } from './../../../components/services/cart.service';
import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../services/app.layout.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  totalItem: number = 0;
  userId= '';
  constructor(
    public layoutService: LayoutService,
    private cartService: CartService,
    private authService:AuthService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn;
    if(this.isLoggedIn){
      this.calculateItem();
    }
  }
  handleLogin() {
      this.authService.loggin();
  }
  logout() {
    this.authService.logOut();
  }
  calculateItem() {
    this.cartService
      .getAllItemsInCart(this.authService.userId)
      .subscribe((data:any) => {
        for(let iterator of data.items) {
          this.totalItem += iterator.quantity;
        }
      });
  }
}
