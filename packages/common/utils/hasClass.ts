import { intersectionWith, startsWith } from 'lodash';

/**
 We should be using mergeClassNames to resolve classnames conflicts. Only use hasClass when there's limitations to tailwind merge (i.e. h-0 doesn't override sm:h-4) and we want to improve DX.
 */
export const hasClass = (classNames: string = '', ...withPrefixes: string[]) =>
  intersectionWith(classNames.split(' '), withPrefixes, startsWith).length > 0;
