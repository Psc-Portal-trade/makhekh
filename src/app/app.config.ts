import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withHashLocation, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideTranslocoConfig } from './core/transloco.provider';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
  provideHttpClient(),provideTranslocoConfig(),



  provideRouter(
    routes,
    withHashLocation(),
    withViewTransitions(),
    withComponentInputBinding(),
    withInMemoryScrolling({ anchorScrolling: 'enabled' }),

  )
  ]
};
