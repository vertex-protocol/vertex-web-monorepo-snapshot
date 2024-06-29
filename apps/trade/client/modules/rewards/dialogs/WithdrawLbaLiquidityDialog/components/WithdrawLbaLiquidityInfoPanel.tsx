import {
  CustomNumberFormatSpecifier,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { BigDecimal } from '@vertex-protocol/utils';
import { joinClassNames } from '@vertex-protocol/web-common';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { LpInfoPanelTokenPairHeader } from 'client/modules/pools/components/LpInfoPanel/LpInfoPanelTokenPairHeader';
import { PairMetadata } from 'client/modules/pools/types';

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
        <ValueWithLabel.Horizontal
          sizeVariant="xs"
          label="Total Liquidity"
          value={totalLiquidityUsd}
          numberFormatSpecifier={PresetNumberFormatSpecifier.CURRENCY_2DP}
        />
        <ValueWithLabel.Horizontal
          sizeVariant="xs"
          label="Unlocked Liquidity"
          value={unlockedLiquidityUsd}
          numberFormatSpecifier={PresetNumberFormatSpecifier.CURRENCY_2DP}
        />
        <ValueWithLabel.Horizontal
          sizeVariant="xs"
          label="Unlocked LP Tokens"
          value={unlockedLpTokens}
          numberFormatSpecifier={CustomNumberFormatSpecifier.NUMBER_AUTO}
        />
      </div>
    </div>
  );
}
