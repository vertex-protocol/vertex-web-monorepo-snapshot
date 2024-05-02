import {
  WithClassnames,
  joinClassNames,
  mergeClassNames,
} from '@vertex-protocol/web-common';
import { Button, Icons } from '@vertex-protocol/web-ui';
import { Input } from 'client/components/Input/Input';

interface Props extends WithClassnames {
  placeholder?: string;
  iconSize: number;
  query: string;
  setQuery: (query: string) => void;
  inputClassName?: string;
}

// Persistent bottom border
const BOTTOM_BORDER_CLASSNAME =
  'before:h-px before:absolute before:bottom-0 before:left-0 before:right-0 before:bg-overlay-divider/5';

// Colored border that animates in on focus of the text input
const ANIMATED_BOTTOM_BORDER_CLASSNAME = joinClassNames(
  'after:h-px after:absolute after:bottom-0 after:left-0 after:right-0',
  'after:transform after:transition after:duration-200 after:origin-left',
  'after:scale-x-0 after:bg-accent after:ease-in-out focus-within:after:scale-x-100',
);

export function SearchBar({
  query,
  setQuery,
  iconSize,
  placeholder,
  className,
  inputClassName,
}: Props) {
  const onClear = () => {
    setQuery('');
  };

  return (
    <div
      className={mergeClassNames(
        'text-text-tertiary flex items-center gap-x-1',
        'text-xs',
        // For the bottom borders
        'relative',
        BOTTOM_BORDER_CLASSNAME,
        ANIMATED_BOTTOM_BORDER_CLASSNAME,
        className,
      )}
    >
      <Icons.RxMagnifyingGlass size={iconSize} />
      <Input
        className={joinClassNames(
          'placeholder:text-text-tertiary text-text-primary flex-1',
          inputClassName,
        )}
        placeholder={placeholder ?? 'Search'}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {query && (
        <Button
          startIcon={<Icons.MdClose size={iconSize} />}
          onClick={onClear}
        />
      )}
    </div>
  );
}
