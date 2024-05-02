import { mergeClassNames, NextImageSrc } from '@vertex-protocol/web-common';
import { Button, ButtonProps } from '@vertex-protocol/web-ui';
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
  return (
    <Button
      className={mergeClassNames(
        'hover:bg-overlay-hover/5 rounded px-2 py-1.5',
        className,
      )}
      startIcon={<Image src={icon} alt={label} className="h-4 w-auto" />}
      endIcon={active && <ActiveIndicator />}
      {...rest}
    >
      <span className="text-text-primary flex-1 text-left">{label}</span>
    </Button>
  );
}

function ActiveIndicator() {
  return (
    // Flex is required here for `inset-0 m-auto` on children to work
    <span className="relative isolate flex">
      <span className="bg-positive/20 h-2.5 w-2.5 rounded-full" />
      <span className="bg-positive/20 absolute inset-0 m-auto h-2 w-2 rounded-full" />
      <span className="bg-positive absolute inset-0 m-auto h-1.5 w-1.5 rounded-full" />
    </span>
  );
}
