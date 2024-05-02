import {
  EngineServerFailureError,
  TriggerServerFailureError,
} from '@vertex-protocol/client'; // Takes an error and returns some debuggable-ish text

// Takes an error and returns some debuggable-ish text
export function getExecuteErrorMessage(err?: any): string {
  // Handle backend errors
  if (
    err instanceof EngineServerFailureError ||
    err instanceof TriggerServerFailureError
  ) {
    return err.responseData.error;
  }
  // Handle generic errors
  if (err instanceof Error || typeof err?.message === 'string') {
    return err.message ? err.message : 'Unknown error';
  }
  // Fallback to the entire error
  try {
    return JSON.stringify(err);
  } catch (e) {
    return `Non-serializable error (${e})`;
  }
}
