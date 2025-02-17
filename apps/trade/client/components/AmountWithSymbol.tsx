import { mergeClassNames, WithClassnames } from '@vertex-protocol/web-common';

export function AmountWithSymbol({
  className,
  formattedSize,
  symbol,
}: WithClassnames<{
  formattedSize: string;
  symbol: string | undefined;
}>) {
  return (
    <div
      className={mergeClassNames(
        'text-text-primary flex items-baseline gap-x-1',
        className,
      )}
    >
      {formattedSize}
      <div className="text-2xs empty:hidden">{symbol ?? ''}</div>
    </div>
  );
}
