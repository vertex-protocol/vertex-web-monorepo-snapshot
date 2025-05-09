import {
  WithClassnames,
  WithRef,
  joinClassNames,
} from '@vertex-protocol/web-common';
import { Button } from '@vertex-protocol/web-ui';
import { ReactNode } from 'react';

export interface AvatarTypeButtonProps extends WithClassnames {
  icon: ReactNode;
  label: string;
  isSelected: boolean;
  disabled?: boolean;
  onClick: () => void;
}

export function AvatarTypeButton({
  icon,
  label,
  disabled,
  isSelected,
  onClick,
  className,
  ...rest
}: WithRef<AvatarTypeButtonProps, HTMLButtonElement>) {
  const bgColorByState = (() => {
    if (disabled) return 'bg-surface-card';
    if (isSelected) return 'bg-surface-card';

    return 'bg-surface-card';
  })();

  const borderColorByState = (() => {
    if (disabled) return 'border-stroke';
    if (isSelected) return 'border-primary';

    return 'border-stroke hover:border-primary';
  })();

  const textColorByState = (() => {
    if (disabled) return 'text-disabled';
    if (isSelected) return 'text-text-primary';

    return 'text-text-secondary';
  })();

  const cardClasses = joinClassNames(
    'flex flex-col items-center',
    'gap-y-1.5 px-2 py-4',
    'border rounded-sm',
    bgColorByState,
    borderColorByState,
    textColorByState,
  );

  const iconClasses = joinClassNames(
    'rounded-full border border-disabled',
    disabled && 'opacity-80',
  );

  return (
    <Button
      id="avatar"
      className={joinClassNames(cardClasses, className)}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      <div className={iconClasses}>{icon}</div>
      <p className="text-xs">{label}</p>
    </Button>
  );
}
