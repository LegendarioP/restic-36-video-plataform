import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAuth0 } from '@auth0/auth0-angular';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAuth0({
        domain: 'dev-36072cqof35cvd75.us.auth0.com',
        clientId: 'sgtUhg2u5Smp7siKL8MvSmg2KefBYXgf',
        authorizationParams: {
            redirect_uri: window.location.origin,
            audience: 'https://dev-36072cqof35cvd75.us.auth0.com/api/v2/',
            scope: 'openid profile email offline_access',
        },
        useRefreshTokens: true,
        cacheLocation: 'localstorage',
    }),
    provideStore()
]
};
