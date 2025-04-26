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
  if (err && typeof err.message === 'string' && !!err.message) {
    return err.message;
  }
  // Fallback to the entire error
  try {
    return JSON.stringify(err);
  } catch (e) {
    return `Unknown Error: ${e}`;
  }
}
