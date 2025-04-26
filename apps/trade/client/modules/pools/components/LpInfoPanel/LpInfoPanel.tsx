import {
  CustomNumberFormatSpecifier,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { BigDecimal } from '@vertex-protocol/utils';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { LpBalanceItem } from 'client/hooks/subaccount/useLpBalances';
import { LpInfoPanelTokenPairHeader } from 'client/modules/pools/components/LpInfoPanel/LpInfoPanelTokenPairHeader';
import { PairMetadata } from 'client/modules/pools/types';

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
    <div className="bg-surface-1 flex flex-col gap-y-3.5 rounded-sm px-3.5 py-3">
      <LpInfoPanelTokenPairHeader metadata={metadata} />
      <div className="flex flex-col gap-y-1">
        <ValueWithLabel.Horizontal
          sizeVariant="xs"
          label="Liquidity Provided"
          value={currentLpBalance?.lpValueUsd}
          numberFormatSpecifier={PresetNumberFormatSpecifier.CURRENCY_2DP}
        />
        <ValueWithLabel.Horizontal
          sizeVariant="xs"
          label="LP Tokens"
          value={currentLpBalance?.lpAmount}
          numberFormatSpecifier={CustomNumberFormatSpecifier.NUMBER_AUTO}
        />
        <ValueWithLabel.Horizontal
          sizeVariant="xs"
          label="APR"
          value={currentYield}
          valueClassName="text-positive"
          numberFormatSpecifier={PresetNumberFormatSpecifier.PERCENTAGE_2DP}
        />
      </div>
    </div>
  );
}
