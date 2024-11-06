import { WithClassnames, joinClassNames } from '@vertex-protocol/web-common';
import { Button, ButtonProps, Icons } from '@vertex-protocol/web-ui';

type FavoriteButtonProps = ButtonProps & {
  size: number;
  isFavorited: boolean;
};

export function FavoriteButton({
  className,
  size,
  disabled,
  isFavorited,
  ...rest
}: WithClassnames<FavoriteButtonProps>) {
  const Icon = isFavorited ? Icons.StarFill : Icons.Star;

  const iconStyle = (() => {
    if (disabled) {
      return 'text-disabled';
    }
    if (isFavorited) {
      return 'text-accent';
    }
    return 'text-text-tertiary hover:text-accent';
  })();

  return (
    <Button
      className={joinClassNames('p-3', iconStyle, className)}
      startIcon={<Icon size={size} />}
      disabled={disabled}
      {...rest}
    />
  );
}
