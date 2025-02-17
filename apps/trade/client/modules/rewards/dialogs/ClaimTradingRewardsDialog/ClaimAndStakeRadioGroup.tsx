import {
  RadioGroup,
  RadioGroupCardProps,
  RadioGroupRootProps,
} from '@vertex-protocol/web-ui';
import { ValueWithLabelProps } from 'client/components/ValueWithLabel/types';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
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
      <div className="flex flex-col gap-y-4">
        <p className="whitespace-normal">{description}</p>
        {active && <div className="empty:hidden">{expandableContent}</div>}
      </div>
    </RadioGroup.Card>
  );
}

function LineItem({ ...itemProps }: ValueWithLabelProps) {
  return <ValueWithLabel.Horizontal sizeVariant="xs" {...itemProps} />;
}

function MetricStackedItem(itemProps: ValueWithLabelProps) {
  return <ValueWithLabel.Vertical {...itemProps} />;
}

export const ClaimAndStakeRadioGroup = {
  Root,
  Card,
  LineItem,
  MetricStackedItem,
};
