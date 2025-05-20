import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withHashLocation,
  withInMemoryScrolling,
  withViewTransitions
} from '@angular/router';
import { routes } from './app.routes';

import {
  provideHttpClient,
  withInterceptors
} from '@angular/common/http';

import { provideTranslocoConfig } from './core/transloco.provider';
import { authInterceptor } from './services/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withHashLocation(),
      withViewTransitions(),
      withComponentInputBinding(),
      withInMemoryScrolling()
    ),
   provideHttpClient(
  withInterceptors([authInterceptor])
)
,
    provideTranslocoConfig()
  ]
};
