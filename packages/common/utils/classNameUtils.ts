import { ClassNameValue, extendTailwindMerge, twJoin } from 'tailwind-merge';

const twMerge = extendTailwindMerge({});

/**
 * Should be used in circumstances where we want to allow classname overrides
 */
export function mergeClassNames(...classLists: ClassNameValue[]) {
  return twMerge(...classLists);
}

/**
 * Should be used when we want to combine classnames without overrides. This is preferable to mergeClassNames in performance
 */
export function joinClassNames(...classLists: ClassNameValue[]) {
  return twJoin(...classLists);
}
