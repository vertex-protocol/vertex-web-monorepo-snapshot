import { BigDecimal } from '@vertex-protocol/client';
import { joinClassNames } from '@vertex-protocol/web-common';
import { Icons, Pill } from '@vertex-protocol/web-ui';
import { ROUTES } from 'client/modules/app/consts/routes';
import {
  ARB_CHAIN_IDS,
  BLAST_CHAIN_IDS,
} from 'client/modules/chainSpecificContent/consts/chainIds';
import { useIsEnabledForChainIds } from 'client/modules/chainSpecificContent/hooks/useIsEnabledForChainIds';
import { usePrivacySetting } from 'client/modules/privacy/hooks/usePrivacySetting';
import { OverviewInfoPointsCardButton } from 'client/pages/Portfolio/subpages/Overview/components/OverviewInfoCardButtons/OverviewInfoPointsCardButton';
import {
  CustomNumberFormatSpecifier,
  PresetNumberFormatSpecifier,
} from 'client/utils/formatNumber/NumberFormatSpecifier';
import { formatNumber } from 'client/utils/formatNumber/formatNumber';
import { signDependentValue } from 'client/utils/signDependentValue';
import { OverviewInfoCardButton } from './OverviewInfoCardButton';
import { OverviewInfoVrtxCardButton } from './OverviewInfoVrtxCardButton';

export interface Props {
  totalEstimatedPerpPnlUsd: BigDecimal | undefined;
  totalEstimatedPerpPnlFrac: BigDecimal | undefined;
  netBalance: BigDecimal | undefined;
  averageSpotAPRFraction: BigDecimal | undefined;
  lpTotalValueUsd: BigDecimal | undefined;
  lpAverageYieldFraction: BigDecimal | undefined;
}

export function OverviewInfoCardButtons({
  averageSpotAPRFraction,
  lpAverageYieldFraction,
  lpTotalValueUsd,
  netBalance,
  totalEstimatedPerpPnlFrac,
  totalEstimatedPerpPnlUsd,
}: Props) {
  const showVrtxCard = useIsEnabledForChainIds(ARB_CHAIN_IDS);
  const showBlitzCard = useIsEnabledForChainIds(BLAST_CHAIN_IDS);
  const [areAccountValuesPrivate] = usePrivacySetting(
    'areAccountValuesPrivate',
  );

  const pillClassName = 'flex items-center gap-x-1';

  return (
    <div
      className={joinClassNames(
        'grid w-full grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-4',
        showVrtxCard || showBlitzCard ? 'lg:grid-cols-4' : 'lg:grid-cols-3',
      )}
    >
      <OverviewInfoCardButton
        href={ROUTES.portfolio.balances}
        title="Net Balance"
        value={formatNumber(netBalance, {
          formatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
        })}
        pill={
          <Pill color="white" className={pillClassName}>
            APR:
            <span className="text-text-primary font-medium">
              {formatNumber(averageSpotAPRFraction, {
                formatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_2DP,
              })}
            </span>
          </Pill>
        }
        isPrivate={areAccountValuesPrivate}
      />
      <OverviewInfoCardButton
        href={ROUTES.portfolio.positions}
        title="Perps PnL"
        titleDefinitionId="overviewPerpPnL"
        value={formatNumber(totalEstimatedPerpPnlUsd, {
          formatSpecifier: CustomNumberFormatSpecifier.SIGNED_CURRENCY_2DP,
        })}
        valueClassName={signDependentValue(totalEstimatedPerpPnlUsd, {
          positive: 'text-positive',
          negative: 'text-negative',
          zero: 'text-text-primary',
        })}
        pill={
          <Pill
            color={signDependentValue(totalEstimatedPerpPnlFrac, {
              positive: 'green',
              negative: 'red',
              zero: 'white',
            })}
            className={pillClassName}
          >
            {signDependentValue(totalEstimatedPerpPnlFrac, {
              positive: <Icons.MdArrowUpward size={12} />,
              negative: <Icons.MdArrowDownward size={12} />,
              zero: undefined,
            })}
            {formatNumber(totalEstimatedPerpPnlFrac?.abs(), {
              formatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_2DP,
            })}
          </Pill>
        }
        isPrivate={areAccountValuesPrivate}
      />
      <OverviewInfoCardButton
        href={ROUTES.portfolio.pools}
        title="Pools"
        value={formatNumber(lpTotalValueUsd, {
          formatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
        })}
        pill={
          <Pill color="white" className={pillClassName}>
            APR:
            <span className="text-text-primary font-medium">
              {formatNumber(lpAverageYieldFraction, {
                formatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_2DP,
              })}
            </span>
          </Pill>
        }
        isPrivate={areAccountValuesPrivate}
      />
      {showVrtxCard && (
        <OverviewInfoVrtxCardButton
          pillClassName={pillClassName}
          isPrivate={areAccountValuesPrivate}
        />
      )}
      {showBlitzCard && (
        <OverviewInfoPointsCardButton isPrivate={areAccountValuesPrivate} />
      )}
    </div>
  );
}
