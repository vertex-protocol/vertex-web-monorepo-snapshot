import { toPrintableObject } from '@vertex-protocol/utils';
import { isUserDeniedError } from 'client/utils/errors/isUserDeniedError';

export function logExecuteError(
  identifier: string,
  error: unknown,
  variables: unknown,
) {
  if (isUserDeniedError(error)) {
    return;
  }

  console.error(
    `[Execute Error|${identifier}]`,
    error,
    toPrintableObject(variables),
  );
}
