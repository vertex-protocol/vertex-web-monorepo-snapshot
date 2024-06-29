import { BigDecimal } from '@vertex-protocol/client';
import {
  PresetNumberFormatSpecifier,
  formatNumber,
} from '@vertex-protocol/react-client';
import { joinClassNames } from '@vertex-protocol/web-common';
import { Icons } from '@vertex-protocol/web-ui';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { UserActionState } from 'client/hooks/subaccount/useUserActionState';
import { RewardsCard } from 'client/modules/rewards/components/RewardsCard';
import { TOKEN_PAGE_RIGHT_SECTION_CLASSNAMES } from 'client/pages/VertexToken/consts';
import { TOKEN_ICONS } from 'common/productMetadata/tokenIcons';
import { VRTX_TOKEN_INFO } from 'common/productMetadata/vertexTokenInfo';
import Image from 'next/image';
import { TokenStakingActionButtons } from './TokenStakingActionButtons';

interface Props {
  accountAvailableToStake: BigDecimal | undefined;
  accountStaked: BigDecimal | undefined;
  accountStakedValueUsd: BigDecimal | undefined;
  accountScore: BigDecimal | undefined;
  accountScoreMultiplierFraction: BigDecimal | undefined;
  accountMaxScore: BigDecimal | undefined;
  userActionState: UserActionState;
  usdcSymbol: string;
}

export function TokenStakingTopBarItems({
  accountAvailableToStake,
  accountStaked,
  accountStakedValueUsd,
  accountScore,
  accountScoreMultiplierFraction,
  accountMaxScore,
  userActionState,
  usdcSymbol,
}: Props) {
  const iconClassNames = 'h-auto w-5';

  return (
    <div className="flex flex-col gap-y-6 lg:flex-row">
      <div className="flex flex-col gap-y-6 lg:flex-1">
        <p className="text-text-secondary text-xs sm:text-sm">
          Stake {VRTX_TOKEN_INFO.symbol} to earn a share of the protocol&apos;s
          revenue in {usdcSymbol}
        </p>
        <RewardsCard.MetricsPane>
          <ValueWithLabel.Vertical
            label={`Total ${VRTX_TOKEN_INFO.symbol} Staked`}
            valueContent={
              <div className="text-text-primary flex items-center gap-x-1.5">
                <Image
                  src={VRTX_TOKEN_INFO.icon.asset}
                  alt="VRTX"
                  className={iconClassNames}
                />
                <div className="flex items-baseline gap-x-1">
                  <span>
                    {formatNumber(accountStaked, {
                      formatSpecifier: PresetNumberFormatSpecifier.NUMBER_2DP,
                    })}
                  </span>
                  <span className="text-text-tertiary text-xs sm:text-sm">
                    {formatNumber(accountStakedValueUsd, {
                      formatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
                    })}
                  </span>
                </div>
              </div>
            }
          />
          <ValueWithLabel.Vertical
            label="Multiplier"
            tooltip={{ id: 'stakingMultiplier' }}
            valueEndElement="/2.5x"
            value={accountScoreMultiplierFraction}
            numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
          />
          <ValueWithLabel.Vertical
            label="voVRTX Score"
            tooltip={{ id: 'stakingAccountScore' }}
            valueContent={
              <div className="flex items-center gap-x-1">
                <Image
                  src={TOKEN_ICONS.vovrtx.asset}
                  alt="VRTX"
                  className={iconClassNames}
                />
                <div className="text-accent flex items-baseline gap-x-1">
                  {formatNumber(accountScore, {
                    formatSpecifier: PresetNumberFormatSpecifier.NUMBER_2DP,
                  })}
                  <span className="text-text-tertiary text-xs sm:text-sm">
                    /
                    {formatNumber(accountMaxScore, {
                      formatSpecifier: PresetNumberFormatSpecifier.NUMBER_2DP,
                    })}
                  </span>
                </div>
              </div>
            }
          />
        </RewardsCard.MetricsPane>
      </div>
      <div
        className={joinClassNames(
          'flex flex-col justify-between gap-y-4',
          TOKEN_PAGE_RIGHT_SECTION_CLASSNAMES,
        )}
      >
        <ValueWithLabel.Horizontal
          fitWidth
          className="gap-x-2"
          sizeVariantOverrides={{ label: 'lg' }}
          label="Available to stake:"
          labelStartIcon={Icons.BsWallet2}
          tooltip={{ id: 'stakingVrtxInWallet' }}
          value={accountAvailableToStake}
          numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
          valueEndElement={VRTX_TOKEN_INFO.symbol}
        />
        <TokenStakingActionButtons userActionState={userActionState} />
      </div>
    </div>
  );
}
