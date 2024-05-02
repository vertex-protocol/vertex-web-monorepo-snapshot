import { StandardButtonSize } from './types';

export const STANDARD_BUTTON_HORIZONTAL_PADDING: Record<
  StandardButtonSize,
  string
> = {
  sm: 'px-3',
  md: 'px-4',
  lg: 'px-5',
};

export const STANDARD_BUTTON_VERTICAL_PADDING: Record<
  StandardButtonSize,
  string
> = {
  sm: 'py-1',
  md: 'py-1.5',
  lg: 'py-2',
};

export const STANDARD_BUTTON_TEXT_SIZE: Record<StandardButtonSize, string> = {
  sm: 'text-xs',
  md: 'text-xs',
  lg: 'text-sm',
};

// Focus & active classes are required to override the CSS to disable outline in globals.css
export const STANDARD_BUTTON_OUTLINE =
  'outline outline-1 -outline-offset-1 focus:-outline-offset-1 active:-outline-offset-1';
