import * as Collapsible from '@radix-ui/react-collapsible';
import { GetIndexerBlitzInitialDropConditionsResponse } from '@vertex-protocol/client';
import { BigDecimal } from '@vertex-protocol/utils';
import { joinClassNames } from '@vertex-protocol/web-common';
import {
  Card,
  Divider,
  Icons,
  PrimaryButton,
  TextButton,
} from '@vertex-protocol/web-ui';
import { Countdown } from 'client/modules/rewards/components/Countdown';
import { RewardsCard } from 'client/modules/rewards/components/RewardsCard';
import { ClaimStepsAccordion } from 'client/pages/BlitzPoints/components/ClaimInitialPointsCollapsible/ClaimStepsAccordion';
import { formatNumber } from 'client/utils/formatNumber/formatNumber';
import { PresetNumberFormatSpecifier } from 'client/utils/formatNumber/NumberFormatSpecifier';
import { safeDiv } from 'client/utils/safeDiv';
import Image from 'next/image';
import { useState } from 'react';

import initialClaimCompleteImg from '../../assets/initial-claim-complete-check.png';
import initialClaimIncompleteImg from '../../assets/initial-claim-incomplete-question.png';

interface Props {
  hasClaimedInitialPoints: boolean;
  blitzInitialPoints: BigDecimal | undefined;
  initialDropConditionsResponse:
    | GetIndexerBlitzInitialDropConditionsResponse
    | undefined;
  numCompletedSteps: number;
  numTotalSteps: number;
  onDismiss: () => void;
}

export function ClaimInitialPointsCard({
  blitzInitialPoints,
  hasClaimedInitialPoints,
  initialDropConditionsResponse,
  numCompletedSteps,
  numTotalSteps,
  onDismiss,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const header = (
    <div className="flex flex-col items-start gap-y-2 text-sm">
      <div className="text-accent flex w-full items-center justify-between">
        Congrats!
        {hasClaimedInitialPoints && (
          <TextButton onClick={onDismiss}>
            <Icons.MdClose className="h-auto w-4 sm:w-6" />
          </TextButton>
        )}
      </div>
      <h2 className="text-text-primary text-xl sm:text-3xl">
        You&apos;re eligible for the Initial Points Drop
      </h2>
      <span className="text-text-secondary">
        Claim the points by completing the required steps.
      </span>
    </div>
  );

  const completionProgress = (
    <RewardsCard.StackedItem
      className="gap-y-2"
      label={`Completed Steps: ${formatNumber(numCompletedSteps, {
        formatSpecifier: PresetNumberFormatSpecifier.NUMBER_INT,
      })} / ${formatNumber(numTotalSteps, {
        formatSpecifier: PresetNumberFormatSpecifier.NUMBER_INT,
      })}`}
      value={
        <div
          className={joinClassNames(
            'relative isolate overflow-hidden rounded-sm',
            'h-[18px] w-full',
          )}
        >
          <div
            className="bg-accent absolute inset-0 origin-left"
            style={{
              width: `${formatNumber(
                safeDiv(numCompletedSteps, numTotalSteps),
                {
                  formatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_INT,
                },
              )}`,
            }}
          />
        </div>
      }
    />
  );

  const collapsibleTrigger = (
    <Collapsible.Trigger asChild>
      <PrimaryButton size="lg" className="w-52">
        {isOpen ? 'Hide Claim Steps' : 'Claim Points'}
      </PrimaryButton>
    </Collapsible.Trigger>
  );

  return (
    <Collapsible.Root open={isOpen} onOpenChange={setIsOpen} asChild>
      <Card className="bg-surface-1 flex flex-col gap-y-8 p-6 ring-0">
        {header}
        <div
          className={joinClassNames(
            'flex flex-col items-start gap-y-8',
            'sm:flex-row sm:items-end sm:justify-between',
          )}
        >
          {completionProgress}
          {collapsibleTrigger}
        </div>
        <Collapsible.Content className="flex gap-x-8 empty:hidden lg:gap-x-16">
          {/*Image & copy shown only on larger screens, use a fixed width to constrain the image*/}
          <div
            className={joinClassNames(
              'hidden',
              // Min height to prevent accordion opening from changing height of the card
              'min-h-[250px]',
              'sm:flex sm:w-[150px] sm:flex-col sm:items-center sm:justify-center sm:gap-y-6 sm:px-4',
              'lg:w-[250px] lg:px-8',
            )}
          >
            <Image
              src={
                hasClaimedInitialPoints
                  ? initialClaimCompleteImg
                  : initialClaimIncompleteImg
              }
              alt="initial points graphic"
              className="h-auto w-full"
            />
            {hasClaimedInitialPoints && (
              <RewardsCard.MetricStackedItem
                label="Initial Points Claimed"
                value={blitzInitialPoints}
                valueClassName="text-6xl justify-center"
                formatSpecifier={PresetNumberFormatSpecifier.NUMBER_INT}
              />
            )}
          </div>
          <Divider vertical className="hidden h-auto sm:block" />
          <ClaimStepsAccordion
            className="flex-1"
            initialDropConditionsResponse={initialDropConditionsResponse}
          />
        </Collapsible.Content>
      </Card>
    </Collapsible.Root>
  );
}
