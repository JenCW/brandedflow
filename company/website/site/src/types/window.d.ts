import * as Sentry from '@sentry/react';

declare global {
  interface Window {
    Sentry?: typeof Sentry;
    gtag?: (...args: any[]) => void;
    hj?: (...args: any[]) => void;
  }
}

export {};
