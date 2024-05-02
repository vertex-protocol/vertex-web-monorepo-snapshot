import { BigDecimal } from '@vertex-protocol/utils';
import { joinClassNames } from '@vertex-protocol/web-common';
import { LineItem } from 'client/components/LineItem/LineItem';
import { LpInfoPanelTokenPairHeader } from 'client/modules/pools/components/LpInfoPanel/LpInfoPanelTokenPairHeader';
import { PairMetadata } from 'client/modules/pools/types';
import {
  CustomNumberFormatSpecifier,
  PresetNumberFormatSpecifier,
} from 'client/utils/formatNumber/NumberFormatSpecifier';

interface Props {
  metadata: PairMetadata | undefined;
  totalLiquidityUsd: BigDecimal | undefined;
  unlockedLiquidityUsd: BigDecimal | undefined;
  unlockedLpTokens: BigDecimal | undefined;
}

export function WithdrawLbaLiquidityInfoPanel({
  metadata,
  totalLiquidityUsd,
  unlockedLiquidityUsd,
  unlockedLpTokens,
}: Props) {
  return (
    <div
      className={joinClassNames(
        'flex flex-col gap-y-3.5 px-3.5 py-3',
        'bg-surface-card text-xs',
        'border-stroke rounded border',
      )}
    >
      <LpInfoPanelTokenPairHeader metadata={metadata} />
      <div className="flex flex-col gap-y-1">
        <LineItem.Metric
          label="Total Liquidity"
          value={totalLiquidityUsd}
          renderValue={PresetNumberFormatSpecifier.CURRENCY_2DP}
        />
        <LineItem.Metric
          label="Unlocked Liquidity"
          value={unlockedLiquidityUsd}
          renderValue={PresetNumberFormatSpecifier.CURRENCY_2DP}
        />
        <LineItem.Metric
          label="Unlocked LP Tokens"
          value={unlockedLpTokens}
          renderValue={CustomNumberFormatSpecifier.NUMBER_AUTO}
        />
      </div>
    </div>
  );
}
