import { mergeClassNames } from '@vertex-protocol/web-common';
import { forwardRef } from 'react';
import { Except } from 'type-fest';
import { SizeVariant } from '../../types';
import { getStateOverlayClassNames } from '../../utils';
import { IconComponent } from '../Icons/types';
import { LabelTooltip } from '../Tooltip';
import { Button } from './Button';
import { ButtonProps } from './types';

type Props = Except<ButtonProps, 'loadingIconSize'> & {
  icon: IconComponent;
  size: SizeVariant;
  tooltipLabel?: string;
};

export const IconButton = forwardRef<HTMLButtonElement, Props>(
  function IconButton(
    { icon: Icon, className, iconClassName, size, tooltipLabel, ...rest },
    ref,
  ) {
    const stateOverlayClassNames = getStateOverlayClassNames({
      borderRadiusVariant: 'base',
      disabled: rest.disabled,
      isLoading: rest.isLoading,
    });

    const disabled = rest.disabled || rest.isLoading;

    const { paddingClassName, iconSize } = {
      xs: {
        paddingClassName: 'p-1.5',
        iconSize: 12,
      },
      sm: {
        paddingClassName: 'p-2',
        iconSize: 16,
      },
      base: {
        paddingClassName: 'p-2.5',
        iconSize: 20,
      },
      lg: {
        paddingClassName: 'p-3',
        iconSize: 24,
      },
    }[size];

    const button = (
      <Button
        className={mergeClassNames(
          'text-text-secondary bg-surface-2 aspect-square rounded',
          !disabled && 'hover:text-text-primary transition-colors',
          stateOverlayClassNames,
          paddingClassName,
          className,
        )}
        loadingIconSize={iconSize}
        ref={ref}
        {...rest}
      >
        <Icon size={iconSize} className={iconClassName} />
      </Button>
    );

    if (!tooltipLabel) {
      return button;
    }

    return (
      <LabelTooltip label={tooltipLabel} asChild noHelpCursor>
        {button}
      </LabelTooltip>
    );
  },
);
