import { KeycloakService } from 'keycloak-angular';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;
  userId = '';
  constructor(private readonly keycloakService: KeycloakService) {
    this.keycloakService.isLoggedIn().then((state) => {
      this.isLoggedIn = state;
      console.log(this.isLoggedIn);
    });
    this.loadProfile().then(user => {
      this.userId = user.id;
  })
  }
  loadProfile(): Promise<any>{
    return new Promise<any>(async (resolve, reject) => {
      if(await this.keycloakService.isLoggedIn()){
        this.keycloakService.loadUserProfile()
        .then(data => resolve(data))
        .catch(error => console.log(error))
      } else{
        console.log('user not logged in')
      }
    })
    }
  loggin() {
    this.keycloakService.login();
  }
  logOut() {
    this.keycloakService.logout();
  }
}
