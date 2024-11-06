'use client';

import {
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { BaseDefinitionTooltip, Icons } from '@vertex-protocol/web-ui';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { useAddressBlitzPoints } from 'client/hooks/query/points/useAddressBlitzPoints';
import { BlitzEarningsBulletItem } from 'client/pages/BlitzRewards/components/earnings/BlitzEarningsBulletItem';

export function BlitzPointsEarningsCardFooter() {
  const { data: blitzPointsData } = useAddressBlitzPoints();

  const summaryTooltipContent = (
    <div className="flex flex-col gap-y-1.5">
      <p>
        Referral Points:{' '}
        {formatNumber(blitzPointsData?.blitz.referralPoints, {
          formatSpecifier: PresetNumberFormatSpecifier.NUMBER_INT,
        })}
      </p>
      <p>
        Trading Points:{' '}
        {formatNumber(blitzPointsData?.blitz.tradingPoints, {
          formatSpecifier: PresetNumberFormatSpecifier.NUMBER_INT,
        })}
      </p>
    </div>
  );

  return (
    <div className="flex flex-col gap-y-4">
      <BlitzEarningsBulletItem
        icon={Icons.ArrowDownLeft}
        iconClassName="text-accent"
      >
        Blitz Points are updated every 3 hours.
      </BlitzEarningsBulletItem>
      <div className="flex items-center justify-between text-xs">
        <ValueWithLabel.Horizontal
          sizeVariant="xs"
          label="Total Points:"
          value={blitzPointsData?.blitz.totalPoints}
          numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_INT}
        />
        <BaseDefinitionTooltip
          title="Your Summary"
          content={summaryTooltipContent}
          decoration="underline"
        >
          Your Summary
        </BaseDefinitionTooltip>
      </div>
    </div>
  );
}
