import { BigDecimal } from '@vertex-protocol/utils';
import { LineItem } from 'client/components/LineItem/LineItem';
import { LpBalanceItem } from 'client/hooks/subaccount/useLpBalances';
import { LpInfoPanelTokenPairHeader } from 'client/modules/pools/components/LpInfoPanel/LpInfoPanelTokenPairHeader';
import { PairMetadata } from 'client/modules/pools/types';
import {
  CustomNumberFormatSpecifier,
  PresetNumberFormatSpecifier,
} from 'client/utils/formatNumber/NumberFormatSpecifier';

interface Props {
  metadata: PairMetadata | undefined;
  currentLpBalance: LpBalanceItem | undefined;
  currentYield: BigDecimal;
}

export function LpInfoPanel({
  metadata,
  currentLpBalance,
  currentYield,
}: Props) {
  return (
    <div className="bg-surface-1 flex flex-col gap-y-3.5 rounded px-3.5 py-3 text-xs">
      <LpInfoPanelTokenPairHeader metadata={metadata} />
      <div className="flex flex-col gap-y-1">
        <LineItem.Metric
          label="Liquidity Provided"
          value={currentLpBalance?.lpValueUsd}
          renderValue={PresetNumberFormatSpecifier.CURRENCY_2DP}
        />
        <LineItem.Metric
          label="LP Tokens"
          value={currentLpBalance?.lpAmount}
          renderValue={CustomNumberFormatSpecifier.NUMBER_AUTO}
        />
        <LineItem.Metric
          label="APR"
          value={currentYield}
          valueClassName="text-positive"
          renderValue={PresetNumberFormatSpecifier.PERCENTAGE_2DP}
        />
      </div>
    </div>
  );
}
