import { BigDecimal } from '@vertex-protocol/client';
import { joinClassNames } from '@vertex-protocol/web-common';
import { Card, Divider } from '@vertex-protocol/web-ui';
import {
  CustomNumberFormatSpecifier,
  PresetNumberFormatSpecifier,
} from 'client/utils/formatNumber/NumberFormatSpecifier';
import { formatNumber } from 'client/utils/formatNumber/formatNumber';
import { VRTX_TOKEN_INFO } from 'common/productMetadata/vertexTokenInfo';
import { ReferralMetricsItem } from './ReferralMetricsItem';

export interface ReferralMetricsProps {
  totalReferralCount: number | undefined;
  realizedReferralRewards: BigDecimal | undefined;
}

export function ReferralMetrics({
  totalReferralCount,
  realizedReferralRewards,
}: ReferralMetricsProps) {
  return (
    <Card
      className={joinClassNames(
        'relative flex flex-col overflow-hidden',
        'py-1 lg:gap-y-3 lg:py-3.5',
      )}
    >
      <ReferralMetricsItem
        label="Total Referrals"
        content={
          <span>
            {formatNumber(totalReferralCount, {
              formatSpecifier: PresetNumberFormatSpecifier.NUMBER_INT,
            })}
          </span>
        }
        definitionTooltipId="referralsTotalReferredUsers"
      />
      <Divider />
      <ReferralMetricsItem
        label="Total Earned"
        content={
          <div className="flex items-baseline gap-x-1">
            {formatNumber(realizedReferralRewards, {
              formatSpecifier: CustomNumberFormatSpecifier.NUMBER_AUTO,
            })}
            <span className="text-text-tertiary text-sm">
              {VRTX_TOKEN_INFO.symbol}
            </span>
          </div>
        }
        definitionTooltipId="referralsTotalRewardsEarned"
      />
    </Card>
  );
}
