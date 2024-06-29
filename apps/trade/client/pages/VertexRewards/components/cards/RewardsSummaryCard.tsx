import {
  CollapsibleContent,
  Root as CollapsibleRoot,
  CollapsibleTrigger,
} from '@radix-ui/react-collapsible';
import {
  NextImageSrc,
  WithChildren,
  WithClassnames,
  joinClassNames,
  mergeClassNames,
} from '@vertex-protocol/web-common';
import { Button, getStateOverlayClassNames } from '@vertex-protocol/web-ui';
import { UpDownChevronIcon } from 'client/components/Icons/UpDownChevronIcon';
import { Countdown } from 'client/components/Countdown';
import { RewardsCard } from 'client/modules/rewards/components/RewardsCard';
import Image from 'next/image';
import { ReactNode, useState } from 'react';

interface ContainerProps extends WithClassnames<WithChildren> {
  collapsibleContent?: ReactNode;
  collapsibleTriggerClassName?: string;
}

function Container({
  children,
  className,
  collapsibleTriggerClassName,
  collapsibleContent,
}: ContainerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const hoverStateOverlayClassNames = getStateOverlayClassNames({
    stateClassNameOverrides: 'before:rounded-b-lg',
  });

  return (
    <CollapsibleRoot className="flex flex-col" onOpenChange={setIsOpen}>
      <RewardsCard.Container
        className={mergeClassNames('relative overflow-hidden', className)}
      >
        {children}
        {!!collapsibleContent && (
          <CollapsibleContent
            className={joinClassNames(
              'bg-background flex flex-col',
              'gap-y-5 rounded p-4 empty:hidden lg:px-5',
            )}
          >
            {collapsibleContent}
          </CollapsibleContent>
        )}
      </RewardsCard.Container>
      {!!collapsibleContent && (
        <CollapsibleTrigger asChild>
          <Button
            className={mergeClassNames(
              'bg-surface-card flex items-center self-center',
              'gap-x-2 rounded-b-lg px-4 py-1.5',
              'text-text-secondary text-xs lg:text-sm',
              // Adding 1px of top margin to prevent overlap with the `ring` stroke
              'mt-px',
              hoverStateOverlayClassNames,
              collapsibleTriggerClassName,
            )}
          >
            Summary
            <UpDownChevronIcon open={isOpen} />
          </Button>
        </CollapsibleTrigger>
      )}
    </CollapsibleRoot>
  );
}

interface ContentProps extends WithClassnames {
  header: ReactNode;
  metricItems: ReactNode;
  footer: ReactNode;
  action: ReactNode;
  actionMetric: ReactNode;
}

function Content({
  header,
  metricItems,
  footer,
  action,
  actionMetric,
  className,
}: ContentProps) {
  return (
    <div className={mergeClassNames('flex flex-col gap-y-6', className)}>
      {header}
      <RewardsCard.MetricsPane>
        {metricItems}
        {/*On desktop, this takes 1/3 of width on the right side of the card*/}
        <div className="lg:ml-auto lg:w-1/3">{actionMetric}</div>
      </RewardsCard.MetricsPane>
      <div className="flex flex-col gap-y-4 lg:flex-row lg:items-end lg:justify-between">
        {footer}
        {/*This is aligned with the action button metric on desktop*/}
        {/* `flex-col` is being used to stretch children to this container's width */}
        <div className="flex flex-col lg:w-1/3">{action}</div>
      </div>
    </div>
  );
}

function CollapsibleTitle({ children }: WithChildren) {
  return (
    <div className="text-text-primary text-base sm:text-lg">{children}</div>
  );
}

function IconHeader({
  iconSrc,
  title,
  className,
  iconClassName,
}: WithClassnames<{
  iconSrc: NextImageSrc;
  title: string;
  iconClassName?: string;
}>) {
  return (
    <RewardsCard.Header
      contentWrapperClassName={joinClassNames(
        'flex items-center gap-x-2',
        className,
      )}
    >
      <Image src={iconSrc} alt={title} className={iconClassName} />
      {title}
    </RewardsCard.Header>
  );
}

function FooterCountdown({
  countdownTimeMillis,
  label,
}: {
  countdownTimeMillis: number | undefined;
  label: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-y-1.5 text-sm sm:flex-row sm:items-center sm:gap-x-2.5">
      {label}
      <Countdown
        endTimeMillis={countdownTimeMillis}
        unitClassName="text-xs text-text-secondary"
        valueClassName="text-base text-text-primary"
      />
    </div>
  );
}

function ActionWithHelperText({
  helperText,
  children,
}: WithChildren<{ helperText: string }>) {
  return (
    <div className="flex flex-col gap-y-1.5">
      <span className="text-text-secondary text-xs">{helperText}</span>
      {children}
    </div>
  );
}

export const RewardsSummaryCard = {
  Container,
  IconHeader,
  Content,
  FooterCountdown,
  CollapsibleTitle,
  ActionWithHelperText,
};
