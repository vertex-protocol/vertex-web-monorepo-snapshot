import { WithClassnames, joinClassNames } from '@vertex-protocol/web-common';
import { TokenIconLabel } from 'client/modules/pools/components/TokenIconLabel';
import { PairMetadata } from 'client/modules/pools/types';

interface Props {
  metadata?: PairMetadata;
  tokenIconSize?: number;
}

// To properly stack the token icons, we need to use an absolute position
// for the top icon label. This is because the top icon label needs
// to be positioned on top of the bottom token icon label, but the bottom token
// icon label needs to be positioned at the bottom of the parent container to establish a width.
// We add `20px` of padding to the top of the parent container to give us 8px of overlap (28px - 20px).
// We shift both towards the center by 1px to get the desired effect (10px overlap).
export function StackedTokenPairLabel({
  className,
  metadata,
  tokenIconSize,
}: WithClassnames<Props>) {
  return (
    <div
      className={joinClassNames('relative flex h-fit flex-col pt-5', className)}
    >
      <TokenIconLabel
        className="relative bottom-px"
        tokenIconSize={tokenIconSize}
        iconSrc={metadata?.quote.icon.asset}
        symbol={metadata?.quote.symbol}
      />
      {/* Width and height of the icons default to 28px */}
      {/* This component is ordered last so we don't need to worry about z-index causing issues elsewhere */}
      <TokenIconLabel
        className="absolute top-px"
        tokenIconSize={tokenIconSize}
        iconSrc={metadata?.base.icon.asset}
        symbol={metadata?.base.symbol}
      />
    </div>
  );
}
