import { mergeClassNames } from '@vertex-protocol/web-common';
import { Except } from 'type-fest';
import { BorderRadiusVariant, SizeVariant } from '../../types';
import { getStateOverlayClassNames } from '../../utils';
import { IconComponent } from '../Icons/types';
import { LabelTooltip } from '../Tooltip';
import { Button } from './Button';
import { ButtonProps } from './types';

type Props = Except<ButtonProps, 'loadingIconSize'> & {
  icon: IconComponent;
  size: SizeVariant;
  tooltipLabel?: string;
  borderRadiusVariant?: BorderRadiusVariant;
};

export function IconButton({
  icon: Icon,
  className,
  iconClassName,
  size,
  tooltipLabel,
  borderRadiusVariant = 'sm',
  ...rest
}: Props) {
  const stateOverlayClassNames = getStateOverlayClassNames({
    borderRadiusVariant,
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
    xl: {
      paddingClassName: 'p-3',
      iconSize: 24,
    },
  }[size];

  const roundedClassNames = {
    xs: 'rounded-xs',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  }[borderRadiusVariant];

  const stateClassNames = (() => {
    if (disabled) {
      return 'border-disabled';
    }
    return 'border-transparent transition-colors';
  })();

  const button = (
    <Button
      className={mergeClassNames(
        'text-text-primary bg-surface-2 aspect-square border',
        stateOverlayClassNames,
        stateClassNames,
        roundedClassNames,
        paddingClassName,
        className,
      )}
      loadingIconSize={iconSize}
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
}
