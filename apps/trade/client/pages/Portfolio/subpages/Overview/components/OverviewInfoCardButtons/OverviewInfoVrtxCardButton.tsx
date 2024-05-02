import { Pill } from '@vertex-protocol/web-ui';
import { ROUTES } from 'client/modules/app/consts/routes';
import { useTokenStaking } from 'client/modules/rewards/hooks/useTokenStaking';
import { OverviewInfoCardButton } from 'client/pages/Portfolio/subpages/Overview/components/OverviewInfoCardButtons/OverviewInfoCardButton';
import { formatNumber } from 'client/utils/formatNumber/formatNumber';
import { PresetNumberFormatSpecifier } from 'client/utils/formatNumber/NumberFormatSpecifier';
import { VRTX_TOKEN_INFO } from 'common/productMetadata/vertexTokenInfo';
import Image from 'next/image';

interface Props {
  isPrivate: boolean;
  pillClassName: string;
}

/**
 * This is extracted from OverviewInfoCardButtons so that VRTX specific logic only runs when this is rendered (i.e. within Vertex and not Blitz)
 */
export function OverviewInfoVrtxCardButton({
  isPrivate,
  pillClassName,
}: Props) {
  const { accountStaked, accountStakedValueUsd, accountCurrentApr } =
    useTokenStaking();

  return (
    <OverviewInfoCardButton
      href={ROUTES.vrtx}
      title={`${VRTX_TOKEN_INFO.symbol} Staked`}
      value={
        <>
          <div className="flex items-center gap-x-1">
            <Image
              src={VRTX_TOKEN_INFO.icon.asset}
              alt={VRTX_TOKEN_INFO.symbol}
              className="h-auto w-4"
            />
            <span>
              {formatNumber(accountStaked, {
                formatSpecifier: PresetNumberFormatSpecifier.NUMBER_2DP,
              })}
            </span>
          </div>
          <span className="text-text-tertiary text-sm leading-4">
            {formatNumber(accountStakedValueUsd, {
              formatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
            })}
          </span>
        </>
      }
      valueClassName="gap-x-2 items-end"
      pill={
        <Pill color="accent" className={pillClassName}>
          APR:
          <span className="font-medium">
            {formatNumber(accountCurrentApr, {
              formatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_2DP,
            })}
          </span>
        </Pill>
      }
      isPrivate={isPrivate}
    />
  );
}
