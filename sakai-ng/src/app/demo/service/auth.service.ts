import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {
    AuthConfig,
    NullValidationHandler,
    OAuthService,
} from 'angular-oauth2-oidc';


@Injectable()
export class AuthService {
    constructor(private oauthService: OAuthService, private router: Router) {
        this.configure();
        console.log(this.hasValidToken());
    }
    authConfig: AuthConfig = {
        issuer: 'http://localhost:8011/realms/owen-book-store',
        redirectUri: window.location.origin,
        clientId: 'front-end-client',
        scope: 'openid profile email offline_access',
        responseType: 'code',
        // at_hash is not present in JWT token
        disableAtHashCheck: true,
        showDebugInformation: true,
    };

    public login() {
        this.oauthService.initImplicitFlow();
    }

    public logoff() {
        this.oauthService.logOut();
    }

    private configure() {
        this.oauthService.configure(this.authConfig);
        this.oauthService.tokenValidationHandler = new NullValidationHandler();
        this.oauthService.setupAutomaticSilentRefresh();
        // this.oauthService.loadDiscoveryDocumentAndTryLogin();
    }
    public getAccessToken(){
        return this.oauthService.getAccessToken();
    }
    public runInitialLoginSequence(): Promise<void> {
        return this.oauthService
            .loadDiscoveryDocument()
            .then(() => this.oauthService.tryLoginCodeFlow())
            .then(() => {
                // remove query params
                this.router.navigate(['']);
            })
            .catch();
    }
    public hasValidToken() { return this.oauthService.hasValidAccessToken(); }
    public getFullname() {
        let claims: any = this.oauthService.getIdentityClaims();
        if (claims && claims.name) {
          return claims.name;
        }
        return undefined;
      }
}
