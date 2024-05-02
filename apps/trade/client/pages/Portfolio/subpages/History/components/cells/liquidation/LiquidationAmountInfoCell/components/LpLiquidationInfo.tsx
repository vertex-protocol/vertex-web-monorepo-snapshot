import { BigDecimal } from '@vertex-protocol/utils';
import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { PairMetadata } from 'client/modules/pools/types';
import { LpLiquidationPairInfo } from 'client/pages/Portfolio/subpages/History/components/cells/liquidation/LiquidationAmountInfoCell/components/LpLiquidationPairInfo';
import { LpStackedSizeInfo } from 'client/pages/Portfolio/subpages/History/components/cells/liquidation/LiquidationAmountInfoCell/components/LpStackedSizeInfo';

interface LpLiquidationInfoProps extends WithClassnames {
  metadata: PairMetadata;
  amountLp: BigDecimal;
  lpValueUsd: BigDecimal;
  sizeFormatSpecifier: string;
}

export function LpLiquidationInfo({
  className,
  metadata,
  amountLp,
  lpValueUsd,
  sizeFormatSpecifier,
}: LpLiquidationInfoProps) {
  return (
    <div className={joinClassNames('grid w-full grid-cols-2', className)}>
      <LpLiquidationPairInfo metadata={metadata} />
      <LpStackedSizeInfo
        amount={amountLp}
        amountFormatSpecifier={sizeFormatSpecifier}
        valueUsd={lpValueUsd}
        symbol={metadata.base.symbol}
      />
    </div>
  );
}
