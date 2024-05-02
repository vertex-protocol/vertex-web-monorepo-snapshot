import { random } from 'lodash';

export function createToastId(prefix: string) {
  return `${prefix}-${Date.now().toFixed()}-${random(1000, false).toFixed()}`;
}
