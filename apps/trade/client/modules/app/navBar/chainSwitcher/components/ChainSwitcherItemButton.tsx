import { mergeClassNames, NextImageSrc } from '@vertex-protocol/web-common';
import {
  Button,
  ButtonProps,
  getStateOverlayClassNames,
} from '@vertex-protocol/web-ui';
import { StatusIndicator } from 'client/components/StatusIndicator';
import Image from 'next/image';

type ChainSwitcherItemButtonProps = Exclude<
  ButtonProps,
  'children' | 'startIcon' | 'endIcon'
> & {
  icon: NextImageSrc;
  label: string;
  // Renders an active indicator
  active?: boolean;
};

export function ChainSwitcherItemButton({
  className,
  icon,
  label,
  active,
  ...rest
}: ChainSwitcherItemButtonProps) {
  const stateOverlayClassNames = getStateOverlayClassNames({
    borderRadiusVariant: 'base',
    disabled: rest.disabled,
  });

  return (
    <Button
      className={mergeClassNames(
        'rounded px-2 py-1.5',
        stateOverlayClassNames,
        className,
      )}
      startIcon={<Image src={icon} alt={label} className="h-4 w-auto" />}
      endIcon={
        active && <StatusIndicator sizeVariant="sm" colorVariant="positive" />
      }
      {...rest}
    >
      <span className="text-text-primary flex-1 text-left">{label}</span>
    </Button>
  );
}
