import { BigDecimal } from '@vertex-protocol/client';
import { PresetNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { Divider, LinkButton, Pill } from '@vertex-protocol/web-ui';

import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { StakingCard } from 'client/pages/Staking/components/StakingCard';
import { StakingUsdValueEndElement } from 'client/pages/Staking/components/StakingUsdValueEndElement';
import Link from 'next/link';

interface Props {
  currentBalance: BigDecimal | undefined;
  currentBalanceValueUsd: BigDecimal | undefined;
  amountStaked: BigDecimal | undefined;
  amountStakedValueUsd: BigDecimal | undefined;
  currentAmountEarned: BigDecimal | undefined;
  currentAmountEarnedUsd: BigDecimal | undefined;
  shareOfPool: BigDecimal | undefined;
  protocolTokenSymbol: string;
  stakingV2HistoryUrl: string;
}

export function StakingV2PositionCard({
  amountStaked,
  amountStakedValueUsd,
  currentBalance,
  currentBalanceValueUsd,
  currentAmountEarned,
  currentAmountEarnedUsd,
  protocolTokenSymbol,
  shareOfPool,
  stakingV2HistoryUrl,
}: Props) {
  return (
    <StakingCard
      titleContent={
        <div className="flex items-center justify-between gap-x-2">
          Your Position
          <LinkButton
            as={Link}
            colorVariant="primary"
            className="text-xs"
            href={stakingV2HistoryUrl}
            external
            withExternalIcon
          >
            Staking History
          </LinkButton>
        </div>
      }
    >
      <ValueWithLabel.Vertical
        labelClassName="flex items-center justify-between"
        label={
          <>
            Balance
            <GradientTextPill />
          </>
        }
        sizeVariant="xl"
        value={currentBalance}
        valueEndElement={
          <StakingUsdValueEndElement
            protocolTokenSymbol={protocolTokenSymbol}
            usdValue={currentBalanceValueUsd}
          />
        }
        numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
      />
      <Divider />
      <div className="flex flex-col gap-y-2">
        <ValueWithLabel.Horizontal
          tooltip={{ id: 'stakingV2AmountStaked' }}
          sizeVariant="sm"
          label="Amount Staked"
          value={amountStaked}
          numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
          valueEndElement={
            <StakingUsdValueEndElement
              protocolTokenSymbol={protocolTokenSymbol}
              usdValue={amountStakedValueUsd}
            />
          }
        />
        <ValueWithLabel.Horizontal
          tooltip={{ id: 'stakingV2AmountEarned' }}
          sizeVariant="sm"
          label="Amount Earned"
          value={currentAmountEarned}
          numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
          valueEndElement={
            <StakingUsdValueEndElement
              protocolTokenSymbol={protocolTokenSymbol}
              usdValue={currentAmountEarnedUsd}
              usdValueClassName="text-positive"
            />
          }
        />
        <ValueWithLabel.Horizontal
          tooltip={{ id: 'stakingV2ShareOfPool' }}
          sizeVariant="sm"
          label="Share of Pool"
          value={shareOfPool}
          numberFormatSpecifier={
            PresetNumberFormatSpecifier.PERCENTAGE_UPTO_4DP
          }
        />
      </div>
    </StakingCard>
  );
}

function GradientTextPill() {
  return (
    <Pill colorVariant="accent" borderRadiusVariant="sm" sizeVariant="xs">
      <div className="text-vertex-gradient-highlight text-xs">
        Auto-compounding
      </div>
    </Pill>
  );
}
