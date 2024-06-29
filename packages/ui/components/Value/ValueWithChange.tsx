import {
  WithClassnames,
  joinClassNames,
  mergeClassNames,
} from '@vertex-protocol/web-common';
import { ReactNode } from 'react';
import { SizeVariant } from '../../types';
import { Icons } from '../Icons';
import { Value } from './Value';

export interface ValueWithChangeProps extends WithClassnames {
  sizeVariant?: SizeVariant;
  endElement?: ReactNode;
  currentValue: ReactNode;
  newValue?: ReactNode;
  valueClassName?: string;
  arrowClassName?: string;
}

export function ValueWithChange({
  sizeVariant,
  currentValue,
  newValue,
  valueClassName,
  arrowClassName,
  endElement,
  className,
}: ValueWithChangeProps) {
  return (
    <div className={mergeClassNames('flex items-center gap-x-1', className)}>
      <Value
        sizeVariant={sizeVariant}
        className={joinClassNames(
          newValue ? 'text-text-secondary' : 'text-text-primary',
          valueClassName,
        )}
        endElement={newValue ? undefined : endElement}
      >
        {currentValue}
      </Value>
      {newValue && (
        <>
          <Icons.MdArrowRightAlt
            size={16}
            className={mergeClassNames('text-text-tertiary', arrowClassName)}
          />
          <Value
            sizeVariant={sizeVariant}
            endElement={endElement}
            className={valueClassName}
          >
            {newValue}
          </Value>
        </>
      )}
    </div>
  );
}
