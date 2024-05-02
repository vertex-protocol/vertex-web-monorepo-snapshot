import {
  joinClassNames,
  WithChildren,
  WithClassnames,
} from '@vertex-protocol/web-common';
import {
  Divider,
  PrimaryButton,
  SecondaryButton,
} from '@vertex-protocol/web-ui';
import { LineItem } from 'client/components/LineItem/LineItem';
import { LineItemMetricProps } from 'client/components/LineItem/types';
import { TokenPairIcons } from 'client/components/TokenPairIcons';
import { ROUTES } from 'client/modules/app/consts/routes';
import { RewardsCard } from 'client/modules/rewards/components/RewardsCard';
import { DefinitionTooltip } from 'client/modules/tooltips/DefinitionTooltip/DefinitionTooltip';
import { DefinitionTooltipID } from 'client/modules/tooltips/DefinitionTooltip/definitionTooltipConfig';
import { formatNumber } from 'client/utils/formatNumber/formatNumber';
import {
  CustomNumberFormatSpecifier,
  NumberFormatSpecifier,
  PresetNumberFormatSpecifier,
} from 'client/utils/formatNumber/NumberFormatSpecifier';
import { NumberFormatValue } from 'client/utils/formatNumber/types';
import Link from 'next/link';
import { useVrtxPoolCard } from './useVrtxPoolCard';

export function VrtxPoolCard({ className }: WithClassnames) {
  const {
    lbaTokens: { primaryQuoteToken, protocolToken },
    pool,
    lpBalance,
    lbaPosition,
    disableProvide,
    onProvideLiquidityClick,
    disableWithdraw,
    onWithdrawLiquidityClick,
  } = useVrtxPoolCard();

  return (
    <RewardsCard.Container className={className}>
      <RewardsCard.Header contentWrapperClassName="flex items-center gap-x-2">
        <TokenPairIcons
          first={{
            src: protocolToken.icon.asset,
            alt: protocolToken.symbol,
          }}
          second={{
            src: primaryQuoteToken.icon.asset,
            alt: primaryQuoteToken.symbol,
          }}
          size={24}
        />
        {protocolToken.symbol}-{primaryQuoteToken.symbol} Pool
      </RewardsCard.Header>
      <Divider />
      {/*Pool data*/}
      <Section>
        <Items>
          <Item
            label="Pool APR"
            value={pool?.apr}
            definitionId="lpPoolAPR"
            formatSpecifier={PresetNumberFormatSpecifier.PERCENTAGE_2DP}
            valueClassName="text-positive"
          />
          <Item
            label="TVL"
            definitionId="lpTVL"
            value={pool?.tvlUsd}
            formatSpecifier={PresetNumberFormatSpecifier.CURRENCY_2DP}
          />
        </Items>
      </Section>
      <Divider />
      {/*Spot Pool Position*/}
      <Section title="Your Position">
        <Items>
          <Item
            label="Liquidity Supplied"
            value={lpBalance?.lpValueUsd}
            formatSpecifier={PresetNumberFormatSpecifier.CURRENCY_2DP}
          />
          <Item
            label={protocolToken.symbol}
            value={lpBalance?.amountBase}
            formatSpecifier={CustomNumberFormatSpecifier.NUMBER_AUTO}
            symbol={protocolToken.symbol}
          />
          <Item
            label={primaryQuoteToken.symbol}
            value={lpBalance?.amountQuote}
            formatSpecifier={CustomNumberFormatSpecifier.NUMBER_AUTO}
            symbol={primaryQuoteToken.symbol}
          />
        </Items>
        <div className="flex flex-col gap-y-3">
          <PrimaryButton
            size="lg"
            onClick={onProvideLiquidityClick}
            disabled={disableProvide}
          >
            Provide Liquidity
          </PrimaryButton>
          <SecondaryButton
            size="lg"
            onClick={onWithdrawLiquidityClick}
            disabled={disableWithdraw}
          >
            Withdraw Liquidity
          </SecondaryButton>
        </div>
      </Section>
      <Divider />
      {/*LBA Position*/}
      <Section title="LBA Position" titleDefinitionId="stakingLbaPosition">
        <Items>
          <Item
            label="Liquidity Supplied"
            value={lbaPosition?.lpValueUsd}
            formatSpecifier={PresetNumberFormatSpecifier.CURRENCY_2DP}
          />
          <Item
            label={`${protocolToken.symbol} Rewards`}
            value={lbaPosition?.vrtxRewards}
            formatSpecifier={CustomNumberFormatSpecifier.NUMBER_AUTO}
            symbol={protocolToken.symbol}
          />
        </Items>
        <div className="flex flex-col gap-y-3">
          <p className="text-text-tertiary text-xs">
            Claim LBA rewards and manage your position via the Rewards
            Dashboard.
          </p>
          <SecondaryButton size="lg" as={Link} href={ROUTES.rewards}>
            Go to Rewards Dashboard
          </SecondaryButton>
        </div>
      </Section>
    </RewardsCard.Container>
  );
}

interface SectionProps extends WithClassnames, WithChildren {
  title?: string;
  titleDefinitionId?: DefinitionTooltipID;
}

function Section({
  title,
  titleDefinitionId,
  className,
  children,
}: SectionProps) {
  return (
    <div className={joinClassNames('flex flex-col gap-y-4', className)}>
      {title && (
        <DefinitionTooltip
          definitionId={titleDefinitionId}
          contentWrapperClassName="text-text-primary text-sm"
        >
          {title}
        </DefinitionTooltip>
      )}
      {children}
    </div>
  );
}

function Items({ children, className }: WithClassnames<WithChildren>) {
  return (
    <div className={joinClassNames('flex flex-col gap-y-1', className)}>
      {children}
    </div>
  );
}

function Item<TValue extends NumberFormatValue>({
  className,
  valueClassName,
  formatSpecifier,
  definitionId,
  symbol,
  ...rest
}: Omit<LineItemMetricProps<TValue>, 'renderValue'> & {
  symbol?: string;
  formatSpecifier: NumberFormatSpecifier;
  definitionId?: DefinitionTooltipID;
}) {
  return (
    <LineItem.Metric
      className={joinClassNames('text-sm', className)}
      valueClassName={joinClassNames('text-sm', valueClassName)}
      tooltip={definitionId ? { id: definitionId } : undefined}
      renderValue={(val) => {
        return (
          <div className="flex items-end gap-x-1">
            {formatNumber(val, { formatSpecifier })}
            {symbol && (
              <span className="text-text-tertiary text-xs">{symbol}</span>
            )}
          </div>
        );
      }}
      {...rest}
    />
  );
}
