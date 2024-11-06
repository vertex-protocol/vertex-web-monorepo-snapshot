import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { mergeClassNames } from '@vertex-protocol/web-common';
import {
  Button,
  ButtonProps,
  getStateOverlayClassNames,
} from '@vertex-protocol/web-ui';
import { StatusIndicator } from 'client/components/StatusIndicator';
import { ReactNode } from 'react';

type Props = Exclude<ButtonProps, 'children' | 'startIcon' | 'endIcon'> & {
  startIcon?: ReactNode;
  label: string;
  sublabel?: string;
  /** Renders an active indicator as the end icon. */
  active?: boolean;
};

export function SwitcherDropdownItemButton({
  className,
  label,
  sublabel,
  active,
  startIcon,
  ...rest
}: Props) {
  const stateOverlayClassNames = getStateOverlayClassNames({
    borderRadiusVariant: 'base',
    disabled: rest.disabled,
  });

  return (
    <DropdownMenu.Item asChild>
      <Button
        className={mergeClassNames(
          'rounded px-2 py-1.5',
          stateOverlayClassNames,
          className,
        )}
        startIcon={startIcon}
        endIcon={
          active && <StatusIndicator sizeVariant="sm" colorVariant="positive" />
        }
        {...rest}
      >
        <div className="flex-1 overflow-hidden text-left">
          <div className="text-text-primary truncate">{label}</div>
          <div className="text-text-tertiary truncate text-xs">{sublabel}</div>
        </div>
      </Button>
    </DropdownMenu.Item>
  );
}
