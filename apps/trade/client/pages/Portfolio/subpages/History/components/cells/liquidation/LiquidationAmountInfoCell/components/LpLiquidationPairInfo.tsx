import { PairMetadata } from 'client/modules/pools/types';
import { StackedTokenPairIcon } from 'client/pages/Portfolio/subpages/History/components/cells/liquidation/LiquidationAmountInfoCell/components/StackedTokenPairIcon';

interface Props {
  metadata: PairMetadata;
}

export function LpLiquidationPairInfo({ metadata }: Props) {
  return (
    <div className="flex w-32 items-center gap-x-2">
      <StackedTokenPairIcon metadata={metadata} />
      <div className="flex flex-col gap-y-0.5">
        <p className="text-text-primary text-xs">
          {`${metadata.base.symbol}-${metadata.quote.symbol}`}
        </p>
        <p className="text-text-tertiary text-3xs uppercase">Pool</p>
      </div>
    </div>
  );
}
