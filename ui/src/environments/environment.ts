// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  serviceUrl: 'http://localhost:9000/api/v1',
  auth_clientID: 'chMO60cB8YoeG0PCSisJ6WZA73WOaya7',
  auth_domain: 'producer-account.eu.auth0.com',
  auth_apiUrl: 'https://producer-account.eu.auth0.com/api/v2/',
  auth_callbackURL: 'http://localhost:4200/callback',
  vimeo_clientID: '81300b8b6457c4c8da7935e2cbee238f2a756cd5',
  vimeo_client_secret: 'T7olulWMgGe0C73zPL63ALBckCsQ6ZoEreNcwoLcCPU0HyQjFEiEtLhvE2pi9iqpNFwjRwr7+wZGiT1QtoBIHBBoqHe/LevVt1PByXZYiOydM5CzmSkmkRMu+MWIcb1o',
  vimeo_callbackURL: 'http://localhost:4200/',
  auth_logoutUrl: 'http://localhost:4200/'
};
