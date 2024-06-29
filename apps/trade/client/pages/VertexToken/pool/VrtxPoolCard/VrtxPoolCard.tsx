import {
  CustomNumberFormatSpecifier,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import {
  WithChildren,
  WithClassnames,
  joinClassNames,
} from '@vertex-protocol/web-common';
import {
  Divider,
  PrimaryButton,
  SecondaryButton,
} from '@vertex-protocol/web-ui';
import { TokenPairIcons } from 'client/components/TokenPairIcons';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { ROUTES } from 'client/modules/app/consts/routes';
import { RewardsCard } from 'client/modules/rewards/components/RewardsCard';
import { DefinitionTooltip } from 'client/modules/tooltips/DefinitionTooltip/DefinitionTooltip';
import { DefinitionTooltipID } from 'client/modules/tooltips/DefinitionTooltip/definitionTooltipConfig';
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
          <ValueWithLabel.Horizontal
            sizeVariant="xs"
            label="Pool APR"
            value={pool?.apr}
            tooltip={{ id: 'lpPoolAPR' }}
            numberFormatSpecifier={PresetNumberFormatSpecifier.PERCENTAGE_2DP}
            valueClassName="text-positive"
          />
          <ValueWithLabel.Horizontal
            sizeVariant="xs"
            label="TVL"
            tooltip={{ id: 'lpTVL' }}
            value={pool?.tvlUsd}
            numberFormatSpecifier={PresetNumberFormatSpecifier.CURRENCY_2DP}
          />
        </Items>
      </Section>
      <Divider />
      {/*Spot Pool Position*/}
      <Section title="Your Position">
        <Items>
          <ValueWithLabel.Horizontal
            sizeVariant="xs"
            label="Liquidity Supplied"
            value={lpBalance?.lpValueUsd}
            numberFormatSpecifier={PresetNumberFormatSpecifier.CURRENCY_2DP}
          />
          <ValueWithLabel.Horizontal
            sizeVariant="xs"
            label={protocolToken.symbol}
            value={lpBalance?.amountBase}
            numberFormatSpecifier={CustomNumberFormatSpecifier.NUMBER_AUTO}
            valueEndElement={protocolToken.symbol}
          />
          <ValueWithLabel.Horizontal
            sizeVariant="xs"
            label={primaryQuoteToken.symbol}
            value={lpBalance?.amountQuote}
            numberFormatSpecifier={CustomNumberFormatSpecifier.NUMBER_AUTO}
            valueEndElement={primaryQuoteToken.symbol}
          />
        </Items>
        <div className="flex flex-col gap-y-3">
          <PrimaryButton
            onClick={onProvideLiquidityClick}
            disabled={disableProvide}
          >
            Provide Liquidity
          </PrimaryButton>
          <SecondaryButton
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
          <ValueWithLabel.Horizontal
            sizeVariant="xs"
            label="Liquidity Supplied"
            value={lbaPosition?.lpValueUsd}
            numberFormatSpecifier={PresetNumberFormatSpecifier.CURRENCY_2DP}
          />
          <ValueWithLabel.Horizontal
            sizeVariant="xs"
            label={`${protocolToken.symbol} Rewards`}
            value={lbaPosition?.vrtxRewards}
            numberFormatSpecifier={CustomNumberFormatSpecifier.NUMBER_AUTO}
            valueEndElement={protocolToken.symbol}
          />
        </Items>
        <div className="flex flex-col gap-y-3">
          <p className="text-text-tertiary text-xs">
            Claim LBA rewards and manage your position via the Rewards
            Dashboard.
          </p>
          <SecondaryButton size="sm" as={Link} href={ROUTES.rewards}>
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
