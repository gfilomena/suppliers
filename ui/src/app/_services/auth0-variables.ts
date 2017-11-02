import { environment } from '../../environments/environment';

interface AuthConfig {
    clientID: string;
    domain: string;
    callbackURL: string;
    apiUrl: string;
  }

  export const AUTH_CONFIG: AuthConfig = {
    clientID: 'chMO60cB8YoeG0PCSisJ6WZA73WOaya7',
    domain: 'producer-account.eu.auth0.com',
    callbackURL: environment.serviceUrl + '/',
    apiUrl: 'https://producer-account.eu.auth0.com/api/v2/'
  };
