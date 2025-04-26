'use client';

import {
  CustomNumberFormatSpecifier,
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import {
  Card,
  formatTimestamp,
  LinkButton,
  Pill,
  TimeFormatSpecifier,
  ValueWithChange,
} from '@vertex-protocol/web-ui';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
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
        <Pill colorVariant="accent" borderRadiusVariant="sm" sizeVariant="sm">
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
          sizeVariant="lg"
          label="Start & End"
          valueContent={
            <ValueWithChange
              currentValue={epochStartMonthDay}
              newValue={epochEndMonthDay}
              sizeVariant="lg"
              valueClassName="text-text-primary"
            />
          }
        />
        <ValueWithLabel.Vertical
          sizeVariant="lg"
          label="Total Blitz Points"
          value={totalEpochBlitzPoints}
          numberFormatSpecifier={
            CustomNumberFormatSpecifier.NUMBER_LARGE_ABBREVIATED
          }
          valueClassName="items-center"
          valueEndElement={
            <Image
              className="bg-surface-2 h-4 w-auto rounded-sm p-0.5"
              src={IMAGES.brandIcon}
              alt=""
            />
          }
        />
        <ValueWithLabel.Vertical
          sizeVariant="lg"
          label="Total Blast Gold"
          value={totalEpochBlastGold}
          defaultValue="Gold"
          valueClassName="items-center"
          valueEndElement={
            <Image
              src={BLITZ_SPECIFIC_IMAGES.blastGoldIcon}
              alt=""
              className="h-3 w-auto"
            />
          }
          numberFormatSpecifier={
            CustomNumberFormatSpecifier.NUMBER_LARGE_ABBREVIATED
          }
          isValuePrivate={!totalEpochBlastGold}
        />
        <ValueWithLabel.Vertical
          sizeVariant="lg"
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
