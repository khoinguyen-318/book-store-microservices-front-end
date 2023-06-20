import { KeycloakService } from "keycloak-angular";

export function initializeKeycloak(
  keycloak: KeycloakService
  ) {
    return () =>
      keycloak.init({
        config: {
          url: 'http://localhost:8011',
          realm: 'owen-book-store',
          clientId: 'customer-client',
        },
        initOptions: {

          pkceMethod: 'S256',
          // must match to the configured value in keycloak
          redirectUri: 'http://localhost:4300',
          // this will solved the error
          checkLoginIframe: false
        }
      });
}
