import { StandardButtonSize } from './types';

export const STANDARD_BUTTON_HORIZONTAL_PADDING_CLASSNAME: Record<
  StandardButtonSize,
  string
> = {
  sm: 'px-3',
  md: 'px-4',
  lg: 'px-5',
};

export const STANDARD_BUTTON_VERTICAL_PADDING_CLASSNAME: Record<
  StandardButtonSize,
  string
> = {
  sm: 'py-1',
  md: 'py-1.5',
  lg: 'py-2',
};

export const STANDARD_BUTTON_TEXT_SIZE_CLASSNAME: Record<
  StandardButtonSize,
  string
> = {
  sm: 'text-xs',
  md: 'text-xs',
  lg: 'text-sm',
};

// Focus & active classes are required to override the CSS to disable outline in globals.css
export const BUTTON_RING_CLASSNAME = 'ring ring-1 ring-inset';

export const BUTTON_NO_RING_OVERRIDE_CLASSNAME = 'ring-0';
