import {
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { Pill } from '@vertex-protocol/web-ui';

interface Props {
  isoLeverage: number | undefined;
}

export function MarginInfoPill({ isoLeverage }: Props) {
  const pillContent = isoLeverage ? (
    <>
      Isolated{' '}
      <span className="text-accent">
        {formatNumber(isoLeverage, {
          formatSpecifier: PresetNumberFormatSpecifier.NUMBER_1DP,
        })}
        x
      </span>
    </>
  ) : (
    'Cross'
  );

  return (
    <Pill
      colorVariant="tertiary"
      sizeVariant="xs"
      borderRadiusVariant="base"
      // Override default Pill background color because `bg-surface-1` blends in with the background of metrics cards in TpSl and Close position dialog.
      className="bg-surface-2 px-1 py-0.5"
    >
      {pillContent}
    </Pill>
  );
}
