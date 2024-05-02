// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';
import { sentryEnv } from 'common/environment/sentryEnv';

Sentry.init({
  dsn: sentryEnv.dsn,
  environment: sentryEnv.envName,
  enabled: sentryEnv.enabled,
  sampleRate: 0.1,
  tracesSampleRate: 0.01,
  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
