import { joinClassNames, mergeClassNames } from '@vertex-protocol/web-common';
import { ReactNode } from 'react';
import { SizeVariant } from '../../types';
import { Icons } from '../Icons';
import { Value, ValueProps } from './Value';

export interface ValueWithChangeProps
  extends Pick<ValueProps, 'className' | 'endElement' | 'isValuePrivate'> {
  sizeVariant: SizeVariant;
  currentValue: ReactNode;
  newValue?: ReactNode;
  valueClassName?: string;
  /** When overriding icon size use `size-` className. ex. `size-4`  */
  arrowClassName?: string;
}

export function ValueWithChange({
  sizeVariant,
  currentValue,
  newValue,
  valueClassName,
  arrowClassName,
  endElement,
  isValuePrivate,
  className,
}: ValueWithChangeProps) {
  const iconSizeClassNames = {
    xs: 'size-3',
    sm: 'size-3.5',
    base: 'size-4',
    lg: 'size-5',
    xl: 'size-5',
  }[sizeVariant];

  return (
    <div className={mergeClassNames('flex items-center gap-x-1', className)}>
      <Value
        sizeVariant={sizeVariant}
        className={joinClassNames(
          newValue ? 'text-text-secondary' : 'text-text-primary',
          valueClassName,
        )}
        endElement={newValue ? undefined : endElement}
        isValuePrivate={isValuePrivate}
      >
        {currentValue}
      </Value>
      {newValue && (
        <>
          <Icons.ArrowRight
            className={mergeClassNames(
              'text-text-tertiary',
              iconSizeClassNames,
              arrowClassName,
            )}
          />
          <Value
            sizeVariant={sizeVariant}
            endElement={endElement}
            className={valueClassName}
            isValuePrivate={isValuePrivate}
          >
            {newValue}
          </Value>
        </>
      )}
    </div>
  );
}
