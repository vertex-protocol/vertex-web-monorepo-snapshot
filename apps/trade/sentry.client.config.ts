// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';
import { sentryEnv } from 'common/environment/sentryEnv';

Sentry.init({
  dsn: sentryEnv.dsn,
  environment: sentryEnv.envName,
  enabled: sentryEnv.enabled,
  // This is for errors
  sampleRate: 0.1,
  // This is for traces, which aren't that important
  tracesSampleRate: 0.01,
  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
  ignoreErrors: [
    // Origin of this error seems to be from a wallet connection dependency
    "TypeError: Cannot read properties of undefined (reading 'providerType')",
    "TypeError: Cannot read properties of undefined (reading 'code')",
    // Seems like an iOS Webview error
    "Can't find variable: bytecode",
    // Walletconnect
    'Error: WebSocket connection failed for host: wss://relay.walletconnect.org',
    'Socket stalled when trying to connect to wss://relay.walletconnect.org',
    // Weird sentry SDK issue: https://github.com/getsentry/sentry-javascript/issues/2546
    /UnhandledRejection: Object captured as promise rejection with keys:.*/,
    // Another sentry issue: https://github.com/getsentry/sentry-javascript/issues/3440
    /Non-Error promise rejection captured with value: Object Not Found Matching Id.*/,
    // Seems to be from injected connector when talking to RPC - not sure why this is unhandled
    'Request limit exceeded.',
  ],
  denyUrls: [
    // Chrome extensions
    /extensions\//i,
    /^chrome:\/\//i,
    /^chrome-extension:\/\//i,
  ],
  // replaysOnErrorSampleRate: 0.1,
  // replaysSessionSampleRate: 0.01,
  integrations: [
    // Sentry.replayIntegration({
    //   // Additional Replay configuration goes in here, for example:
    //   maskAllText: true,
    //   blockAllMedia: true,
    // }),
  ],
});
