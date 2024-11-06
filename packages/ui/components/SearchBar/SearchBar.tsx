import {
  joinClassNames,
  mergeClassNames,
  WithClassnames,
} from '@vertex-protocol/web-common';
import { forwardRef } from 'react';
import { SizeVariant } from '../../types';
import { Button } from '../Button';
import { Icons } from '../Icons';
import { Input } from '../Input';

interface Props extends WithClassnames {
  query: string;
  setQuery: (query: string) => void;
  sizeVariant: Extract<SizeVariant, 'xs' | 'base'>;
  placeholder?: string;
  textAreaClassName?: string;
  hideSearchIcon?: boolean;
}

// Persistent bottom border
const BOTTOM_BORDER_CLASSNAME =
  'before:h-px before:absolute before:bottom-0 before:left-0 before:right-0 before:bg-overlay-divider/10';

// Colored border that animates in on focus of the text input
const ANIMATED_BOTTOM_BORDER_CLASSNAME = joinClassNames(
  'after:h-px after:absolute after:inset-0 after:top-auto',
  'after:transform-gpu after:origin-left after:duration-300',
  'after:bg-accent focus-within:after:scale-x-100 after:scale-x-0',
);

export const SearchBar = forwardRef<HTMLInputElement, Props>(function SearchBar(
  {
    query,
    setQuery,
    placeholder,
    sizeVariant,
    className,
    textAreaClassName,
    hideSearchIcon,
  },
  ref,
) {
  const onClear = () => {
    setQuery('');
  };

  const textClassNames = {
    xs: 'text-xs',
    base: 'text-base',
  }[sizeVariant];

  const iconClassNames = 'text-text-tertiary h-3 w-3 shrink-0';

  return (
    <div
      className={mergeClassNames(
        'relative flex items-center gap-x-1 p-1',
        sizeVariant === 'base' && 'pb-3',
        BOTTOM_BORDER_CLASSNAME,
        ANIMATED_BOTTOM_BORDER_CLASSNAME,
        className,
      )}
    >
      {!hideSearchIcon && <Icons.MagnifyingGlass className={iconClassNames} />}
      <Input.TextArea
        className={joinClassNames(textClassNames, textAreaClassName)}
        type="text"
        value={query}
        placeholder={placeholder ?? 'Search'}
        onChange={(e) => setQuery(e.target.value)}
        ref={ref}
      />
      {!!query && (
        <Button
          startIcon={<Icons.X className={iconClassNames} />}
          onClick={onClear}
        />
      )}
    </div>
  );
});
