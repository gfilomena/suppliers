import { environment } from '../../environments/environment';

interface AuthConfig {
    clientID: string;
    domain: string;
    callbackURL: string;
    apiUrl: string;
  }

  export const AUTH_CONFIG: AuthConfig = {
    clientID: 'XYQEF1J7DXFJYD2gOkpjz5ZsuNAbZ0o7',
    domain: 'pasquydomain.eu.auth0.com',
    callbackURL: environment.serviceUrl + '/',
    apiUrl: 'https://pasquydomain.eu.auth0.com/api/v2/'
  };
