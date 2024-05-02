import { joinClassNames } from '@vertex-protocol/web-common';
import {
  RadioGroup,
  RadioGroupCardProps,
  RadioGroupRootProps,
} from '@vertex-protocol/web-ui';
import {
  RewardsCard,
  RewardsCardLineItemProps,
  RewardsCardMetricStackedItemProps,
} from 'client/modules/rewards/components/RewardsCard';
import { ReactNode } from 'react';

export type ClaimAndStakeRadioID = 'claim' | 'claim_and_stake';

function Root(props: RadioGroupRootProps<ClaimAndStakeRadioID>) {
  return <RadioGroup.Root className="flex flex-col gap-y-2" {...props} />;
}

interface CardProps extends RadioGroupCardProps<ClaimAndStakeRadioID> {
  description: string;
  expandableContent?: ReactNode;
}

function Card({
  description,
  expandableContent,
  value,
  active,
  ...radioItemProps
}: CardProps) {
  return (
    <RadioGroup.Card value={value} active={active} {...radioItemProps}>
      <div className="flex flex-col gap-y-6">
        <p className="whitespace-normal">{description}</p>
        {active && <div className="empty:hidden">{expandableContent}</div>}
      </div>
    </RadioGroup.Card>
  );
}

function LineItem({
  valueClassName,
  labelClassName,
  ...itemProps
}: RewardsCardLineItemProps) {
  return (
    <RewardsCard.LineItem
      labelClassName={joinClassNames(
        'text-text-secondary sm:text-xs',
        labelClassName,
      )}
      valueClassName={joinClassNames(
        'text-text-primary sm:text-xs',
        valueClassName,
      )}
      {...itemProps}
    />
  );
}

function MetricStackedItem({
  valueClassName,
  labelClassName,
  ...itemProps
}: RewardsCardMetricStackedItemProps) {
  return (
    <RewardsCard.MetricStackedItem
      labelClassName={joinClassNames('text-text-secondary', labelClassName)}
      valueClassName={joinClassNames('sm:text-lg', valueClassName)}
      {...itemProps}
    />
  );
}

export const StakingRadioGroup = {
  Root,
  Card,
  LineItem,
  MetricStackedItem,
};
