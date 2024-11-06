'use client';

import {
  CustomNumberFormatSpecifier,
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import {
  Card,
  Pill,
  ValueWithChange,
  TimeFormatSpecifier,
  formatTimestamp,
  LinkButton,
} from '@vertex-protocol/web-ui';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { PrivateContent } from 'client/modules/privacy/components/PrivateContent';
import { useBlitzRewardsOverviewCard } from 'client/pages/BlitzRewards/components/BlitzRewardsOverviewCard/useBlitzRewardsOverviewCard';
import { BLITZ_SPECIFIC_IMAGES, IMAGES } from 'common/brandMetadata/images';
import { BLITZ_SPECIFIC_LINKS } from 'common/brandMetadata/links/blitzLinks';
import Image from 'next/image';
import Link from 'next/link';

export function BlitzRewardsOverviewCard() {
  const {
    currentPhase,
    currentEpoch,
    nextGoldDistributionMillis,
    totalEpochBlastGold,
    totalEpochBlitzPoints,
  } = useBlitzRewardsOverviewCard();

  const epochStartMonthDay = formatTimestamp(currentEpoch?.startTimeMillis, {
    formatSpecifier: TimeFormatSpecifier.MONTH_D,
  });
  const epochEndMonthDay = formatTimestamp(currentEpoch?.endTimeMillis, {
    formatSpecifier: TimeFormatSpecifier.MONTH_D,
  });

  const nextGoldDistributionMonthDay = formatTimestamp(
    nextGoldDistributionMillis,
    {
      formatSpecifier: TimeFormatSpecifier.MONTH_D,
    },
  );

  return (
    <Card className="flex flex-col gap-y-6 p-4">
      <div className="flex items-center gap-x-4 text-sm">
        <Pill colorVariant="accent" borderRadiusVariant="base" sizeVariant="sm">
          Epoch{' '}
          {formatNumber(currentEpoch?.epoch, {
            formatSpecifier: PresetNumberFormatSpecifier.NUMBER_INT,
          })}
        </Pill>
        <p className="text-text-primary text-base">Phase {currentPhase}</p>
        <LinkButton
          className="ml-auto"
          colorVariant="primary"
          href={BLITZ_SPECIFIC_LINKS.pointsEpochSchedule}
          external
          withExternalIcon
          as={Link}
        >
          Epoch Schedule
        </LinkButton>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <ValueWithLabel.Vertical
          label="Start & End"
          valueContent={
            <ValueWithChange
              currentValue={epochStartMonthDay}
              newValue={epochEndMonthDay}
              sizeVariant="base"
              valueClassName="text-text-primary"
            />
          }
        />
        <ValueWithLabel.Vertical
          label="Total Blitz Points"
          value={totalEpochBlitzPoints}
          numberFormatSpecifier={
            CustomNumberFormatSpecifier.NUMBER_LARGE_ABBREVIATED
          }
          valueEndElement={
            <Image
              className="bg-surface-2 size-4 rounded p-0.5"
              src={IMAGES.brandIcon}
              alt=""
            />
          }
        />
        <ValueWithLabel.Vertical
          label="Total Blast Gold"
          valueContent={
            <PrivateContent isPrivate={!totalEpochBlastGold}>
              {formatNumber(totalEpochBlastGold, {
                formatSpecifier:
                  CustomNumberFormatSpecifier.NUMBER_LARGE_ABBREVIATED,
                defaultFallback: 'Gold',
              })}
            </PrivateContent>
          }
          valueEndElement={
            <Image
              src={BLITZ_SPECIFIC_IMAGES.blastGoldIcon}
              alt=""
              className="h-3 w-auto"
            />
          }
        />
        <ValueWithLabel.Vertical
          sizeVariant="base"
          label="Next Gold Distribution"
          valueContent={nextGoldDistributionMonthDay}
          numberFormatSpecifier={
            CustomNumberFormatSpecifier.NUMBER_LARGE_ABBREVIATED
          }
        />
      </div>
    </Card>
  );
}
