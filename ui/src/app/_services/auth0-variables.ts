import { environment } from '../../environments/environment';

interface AuthConfig {
    clientID: string;
    domain: string;
    callbackURL: string;
    apiUrl: string;
  }

  export const AUTH_CONFIG: AuthConfig = {
    clientID: environment.auth_clientID,
    domain: environment.auth_domain,
    callbackURL: environment.auth_callbackURL,
    apiUrl: environment.auth_apiUrl
  };
