import {
  joinClassNames,
  mergeClassNames,
  WithChildren,
  WithClassnames,
} from '@vertex-protocol/web-common';
import { Card } from '@vertex-protocol/web-ui';
import { LineItem as BaseLineItem } from 'client/components/LineItem/LineItem';
import { LinkButton, LinkButtonProps } from 'client/components/LinkButton';
import { DefinitionTooltip } from 'client/modules/tooltips/DefinitionTooltip/DefinitionTooltip';
import { DefinitionTooltipID } from 'client/modules/tooltips/DefinitionTooltip/definitionTooltipConfig';
import { formatNumber } from 'client/utils/formatNumber/formatNumber';
import { NumberFormatSpecifier } from 'client/utils/formatNumber/NumberFormatSpecifier';
import { NumberFormatValue } from 'client/utils/formatNumber/types';
import { ReactNode } from 'react';

function Container({ children, className }: WithClassnames<WithChildren>) {
  return (
    <Card
      className={mergeClassNames('flex flex-col gap-y-5 p-4 sm:p-6', className)}
    >
      {children}
    </Card>
  );
}

interface HeaderProps extends WithClassnames<WithChildren> {
  contentWrapperClassName?: string;
  endElement?: ReactNode;
}

function Header({
  children,
  className,
  contentWrapperClassName,
  endElement,
}: HeaderProps) {
  return (
    <div
      className={mergeClassNames(
        'flex items-center justify-between gap-1',
        className,
      )}
    >
      <div
        className={mergeClassNames(
          'text-text-primary text-base font-medium sm:text-xl',
          contentWrapperClassName,
        )}
      >
        {children}
      </div>
      {endElement ? endElement : null}
    </div>
  );
}

function HeaderLinkButton({ endIcon, className, ...rest }: LinkButtonProps) {
  return (
    <LinkButton
      className={mergeClassNames('gap-x-1.5 text-xs sm:text-sm', className)}
      {...rest}
    />
  );
}

function LineItems({ children, className }: WithClassnames<WithChildren>) {
  return (
    <div className={mergeClassNames('flex flex-col gap-y-3.5', className)}>
      {children}
    </div>
  );
}

function NestedLineItems({
  children,
  className,
}: WithClassnames<WithChildren>) {
  return (
    <div
      className={mergeClassNames(
        // ml- is to offset the border
        'border-accent ml-px flex flex-col gap-y-3 border-l pl-4',
        className,
      )}
    >
      {children}
    </div>
  );
}

export interface RewardsCardLineItemProps extends WithClassnames {
  label: ReactNode;
  value: ReactNode;
  symbol?: string;
  valueClassName?: string;
  labelClassName?: string;
  definitionId?: DefinitionTooltipID;
}

function LineItem({
  label,
  value,
  symbol,
  labelClassName,
  valueClassName,
  definitionId,
  className,
}: RewardsCardLineItemProps) {
  return (
    <BaseLineItem.Base
      className={mergeClassNames('items-baseline', className)}
      label={label}
      labelClassName={mergeClassNames('text-xs sm:text-base', labelClassName)}
      value={
        <div className="flex items-baseline gap-x-1">
          <span
            className={mergeClassNames(
              'text-text-primary text-sm sm:text-lg',
              valueClassName,
            )}
          >
            {value}
          </span>
          {symbol && (
            <span className="text-text-tertiary text-2xs sm:text-xs">
              {symbol}
            </span>
          )}
        </div>
      }
      tooltip={definitionId ? { id: definitionId } : undefined}
    />
  );
}

type StackedItemProps = Omit<RewardsCardLineItemProps, 'symbol'>;

function StackedItem({
  className,
  label,
  value,
  valueClassName,
  labelClassName,
  definitionId,
}: StackedItemProps) {
  return (
    <div
      className={mergeClassNames(
        'flex flex-col gap-y-1 whitespace-nowrap',
        className,
      )}
    >
      <DefinitionTooltip
        contentWrapperClassName={mergeClassNames(
          'text-text-tertiary text-xs sm:text-sm',
          labelClassName,
        )}
        definitionId={definitionId}
      >
        {label}
      </DefinitionTooltip>
      <span
        className={mergeClassNames(
          'text-text-primary flex items-baseline gap-x-1.5 sm:text-xl',
          valueClassName,
        )}
      >
        {value}
      </span>
    </div>
  );
}

export interface RewardsCardMetricStackedItemProps
  extends Omit<RewardsCardLineItemProps, 'value'> {
  value: NumberFormatValue | undefined;
  formatSpecifier: NumberFormatSpecifier | string;
}

function MetricStackedItem({
  className,
  label,
  symbol,
  value,
  formatSpecifier,
  valueClassName,
  labelClassName,
  definitionId,
}: RewardsCardMetricStackedItemProps) {
  return (
    <StackedItem
      className={className}
      labelClassName={labelClassName}
      label={label}
      definitionId={definitionId}
      value={
        <>
          <span>
            {formatNumber(value, {
              formatSpecifier,
            })}
          </span>
          {!!symbol && (
            <span className="text-text-secondary text-sm">{symbol}</span>
          )}
        </>
      }
      valueClassName={valueClassName}
    />
  );
}

function MetricsPane({ children, className }: WithClassnames<WithChildren>) {
  return (
    <div
      className={joinClassNames(
        'grid grid-cols-2 gap-x-10 gap-y-4 lg:flex lg:gap-y-6',
        className,
      )}
    >
      {children}
    </div>
  );
}

export const RewardsCard = {
  Container,
  Header,
  HeaderLinkButton,
  LineItem,
  StackedItem,
  LineItems,
  NestedLineItems,
  MetricStackedItem,
  MetricsPane,
};
