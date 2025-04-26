import { BigDecimal } from '@vertex-protocol/client';
import {
  ARB_CHAIN_ENVS,
  BLAST_CHAIN_ENVS,
  CustomNumberFormatSpecifier,
  formatNumber,
  PresetNumberFormatSpecifier,
  signDependentValue,
} from '@vertex-protocol/react-client';
import { joinClassNames } from '@vertex-protocol/web-common';
import { Icons, Pill } from '@vertex-protocol/web-ui';
import { ROUTES } from 'client/modules/app/consts/routes';
import { useIsEnabledForChainEnvs } from 'client/modules/envSpecificContent/hooks/useIsEnabledForChainEnvs';
import { usePrivacySetting } from 'client/modules/privacy/hooks/usePrivacySetting';
import { OverviewInfoBlitzRewardsCardButton } from 'client/pages/Portfolio/subpages/Overview/components/OverviewInfoCardButtons/OverviewInfoBlitzRewardsCardButton';
import { OverviewInfoCardButton } from 'client/pages/Portfolio/subpages/Overview/components/OverviewInfoCardButtons/OverviewInfoCardButton';
import { OverviewInfoVrtxCardButton } from 'client/pages/Portfolio/subpages/Overview/components/OverviewInfoCardButtons/OverviewInfoVrtxCardButton';
import { getSignDependentColorClassName } from 'client/utils/ui/getSignDependentColorClassName';

interface Props {
  totalEstimatedPerpPnlUsd: BigDecimal | undefined;
  totalEstimatedPerpPnlFrac: BigDecimal | undefined;
  averageDepositAPRFraction: BigDecimal | undefined;
  averageBorrowAPRFraction: BigDecimal | undefined;
  totalDepositsValueUsd: BigDecimal | undefined;
  totalBorrowsValueUsd: BigDecimal | undefined;
}

export function OverviewInfoCardButtons({
  averageDepositAPRFraction,
  averageBorrowAPRFraction,
  totalDepositsValueUsd,
  totalBorrowsValueUsd,
  totalEstimatedPerpPnlFrac,
  totalEstimatedPerpPnlUsd,
}: Props) {
  const showVrtxCard = useIsEnabledForChainEnvs(ARB_CHAIN_ENVS);
  const showBlitzCard = useIsEnabledForChainEnvs(BLAST_CHAIN_ENVS);
  const [areAccountValuesPrivate] = usePrivacySetting(
    'areAccountValuesPrivate',
  );

  return (
    <div
      className={joinClassNames(
        'grid w-full grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-4',
        showVrtxCard || showBlitzCard ? 'lg:grid-cols-4' : 'lg:grid-cols-3',
      )}
    >
      <OverviewInfoCardButton
        href={ROUTES.portfolio.balances}
        title="Total Deposits"
        value={formatNumber(totalDepositsValueUsd, {
          formatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
        })}
        pill={
          <Pill colorVariant="tertiary" sizeVariant="xs">
            APR:
            <span className="text-text-primary">
              {formatNumber(averageDepositAPRFraction, {
                formatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_2DP,
              })}
            </span>
          </Pill>
        }
        isPrivate={areAccountValuesPrivate}
      />
      <OverviewInfoCardButton
        href={ROUTES.portfolio.balances}
        title="Total Borrows"
        value={formatNumber(totalBorrowsValueUsd, {
          formatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
        })}
        pill={
          <Pill colorVariant="tertiary" sizeVariant="xs">
            APR:
            <span className="text-text-primary">
              {formatNumber(averageBorrowAPRFraction, {
                formatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_2DP,
              })}
            </span>
          </Pill>
        }
        isPrivate={areAccountValuesPrivate}
      />
      <OverviewInfoCardButton
        href={ROUTES.portfolio.positions}
        title="Total Open Perps PnL"
        titleDefinitionId="overviewPerpPnL"
        value={formatNumber(totalEstimatedPerpPnlUsd, {
          formatSpecifier: CustomNumberFormatSpecifier.SIGNED_CURRENCY_2DP,
        })}
        valueClassName={getSignDependentColorClassName(
          totalEstimatedPerpPnlUsd,
        )}
        pill={
          <Pill
            colorVariant={signDependentValue(totalEstimatedPerpPnlFrac, {
              positive: 'positive',
              negative: 'negative',
              zero: 'tertiary',
            })}
            sizeVariant="xs"
          >
            {signDependentValue(totalEstimatedPerpPnlFrac, {
              positive: <Icons.ArrowUp size={12} />,
              negative: <Icons.ArrowDown size={12} />,
              zero: undefined,
            })}
            {formatNumber(totalEstimatedPerpPnlFrac?.abs(), {
              formatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_2DP,
            })}
          </Pill>
        }
        isPrivate={areAccountValuesPrivate}
      />
      {showVrtxCard && (
        <OverviewInfoVrtxCardButton isPrivate={areAccountValuesPrivate} />
      )}
      {showBlitzCard && (
        <OverviewInfoBlitzRewardsCardButton
          isPrivate={areAccountValuesPrivate}
        />
      )}
    </div>
  );
}
