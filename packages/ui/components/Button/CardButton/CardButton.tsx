import { mergeClassNames } from '@vertex-protocol/web-common';
import { Button, ButtonProps, CARD_CLASSNAMES } from '@vertex-protocol/web-ui';
import { forwardRef } from 'react';

export type CardButtonBaseProps = Exclude<ButtonProps, 'isLoading'>;

export const CardButton = forwardRef(function CardButton(
  { className, children, ...buttonProps }: CardButtonBaseProps,
  ref,
) {
  return (
    <Button
      className={mergeClassNames(
        CARD_CLASSNAMES,
        'flex items-center gap-x-3 p-3',
        buttonProps.disabled
          ? 'brightness-75'
          : 'hover:bg-overlay-hover/5 hover:ring-accent',
        className,
      )}
      ref={ref}
      {...buttonProps}
    >
      {children}
    </Button>
  );
});
