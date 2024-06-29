import { mergeClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { Icons } from '@vertex-protocol/web-ui';

interface Props extends WithClassnames {
  size: number;
}

export function CheckmarkIcon({ size, className }: Props) {
  return (
    <div
      className={mergeClassNames('bg-accent/20 rounded-full p-4', className)}
      style={{
        width: size,
        height: size,
      }}
    >
      <Icons.PiCheckBold className="h-full w-full" />
    </div>
  );
}
