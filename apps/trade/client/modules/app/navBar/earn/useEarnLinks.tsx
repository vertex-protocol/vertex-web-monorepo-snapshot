import { AVAX_CHAIN_ENVS } from '@vertex-protocol/react-client';
import { NewPill } from 'client/components/NewPill';
import { ROUTES } from 'client/modules/app/consts/routes';
import { LendBorrowEarnLinkCardButton } from 'client/modules/app/navBar/earn/components/LendBorrowEarnLinkCardButton';
import { PoolsEarnLinkCardButton } from 'client/modules/app/navBar/earn/components/PoolsEarnLinkCardButton';
import { ReferralsEarnLinkCardButton } from 'client/modules/app/navBar/earn/components/ReferralsEarnLinkCardButton';
import { TradingRewardsEarnLinkCardButton } from 'client/modules/app/navBar/earn/components/TradingRewardsEarnLinkCardButton';
import { VaultsEarnLinkCardButton } from 'client/modules/app/navBar/earn/components/VaultsEarnLinkCardButton';
import { BaseEarnLinkProps } from 'client/modules/app/navBar/earn/types';
import { BrandSpecificContent } from 'client/modules/envSpecificContent/BrandSpecificContent';
import { ChainEnvSpecificContent } from 'client/modules/envSpecificContent/ChainEnvSpecificContent';
import { useEnabledFeatures } from 'client/modules/envSpecificContent/hooks/useEnabledFeatures';
import { useIsEnabledForBrand } from 'client/modules/envSpecificContent/hooks/useIsEnabledForBrand';
import { BLITZ_SPECIFIC_IMAGES } from 'common/brandMetadata/images';
import Image from 'next/image';
import { ComponentType, useMemo } from 'react';

interface EarnLink extends BaseEarnLinkProps {
  desktopComponent: ComponentType<BaseEarnLinkProps>;
}

export function useEarnLinks() {
  const { isFuulPageEnabled, isVaultsEnabled } = useEnabledFeatures();
  const isTradingRewardsLinkEnabled = useIsEnabledForBrand(['vertex']);

  const showVaultsLink = isVaultsEnabled;

  return useMemo(
    (): EarnLink[] => [
      ...(showVaultsLink
        ? [
            {
              href: ROUTES.vaults,
              pageLabel: (
                <div className="flex items-center gap-x-2">
                  Vaults
                  <BrandSpecificContent enabledBrands={['blitz']}>
                    <Image
                      src={BLITZ_SPECIFIC_IMAGES.blastGoldIcon}
                      alt=""
                      className="h-3 w-auto"
                    />
                  </BrandSpecificContent>
                </div>
              ),
              desktopComponent: VaultsEarnLinkCardButton,
            },
          ]
        : []),
      {
        href: ROUTES.moneyMarkets,
        pageLabel: 'Lend & Borrow',
        desktopComponent: LendBorrowEarnLinkCardButton,
      },
      {
        href: ROUTES.pools,
        pageLabel: 'Pools',
        desktopComponent: PoolsEarnLinkCardButton,
      },
      ...(isTradingRewardsLinkEnabled
        ? [
            {
              href: ROUTES.rewards,
              pageLabel: (
                <div className="flex items-center gap-x-2">
                  Trading Rewards
                  <ChainEnvSpecificContent enabledChainEnvs={AVAX_CHAIN_ENVS}>
                    <NewPill />
                  </ChainEnvSpecificContent>
                </div>
              ),
              desktopComponent: TradingRewardsEarnLinkCardButton,
            },
          ]
        : []),
      ...(isFuulPageEnabled
        ? [
            {
              href: ROUTES.referrals,
              pageLabel: 'Referrals',
              desktopComponent: ReferralsEarnLinkCardButton,
            },
          ]
        : []),
    ],
    [isFuulPageEnabled, showVaultsLink, isTradingRewardsLinkEnabled],
  );
}
