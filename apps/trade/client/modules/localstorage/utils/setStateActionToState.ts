import { SetStateAction } from 'react';
import { cloneDeep } from 'lodash';

export function setStateActionToState<T>(
  prev: T,
  setState: SetStateAction<T>,
): T {
  const newState = setState instanceof Function ? setState(prev) : setState;
  return cloneDeep(newState);
}
