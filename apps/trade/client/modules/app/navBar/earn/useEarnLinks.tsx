import { PRIMARY_QUOTE_SYMBOLS } from '@vertex-protocol/metadata';
import { ROUTES } from 'client/modules/app/consts/routes';
import { BrandSpecificContent } from 'client/modules/envSpecificContent/BrandSpecificContent';
import { useEnabledFeatures } from 'client/modules/envSpecificContent/hooks/useEnabledFeatures';
import { useIsEnabledForBrand } from 'client/modules/envSpecificContent/hooks/useIsEnabledForBrand';
import { BLITZ_SPECIFIC_IMAGES } from 'common/brandMetadata/images';
import { clientEnv } from 'common/environment/clientEnv';
import Image from 'next/image';
import { ReactNode, useMemo } from 'react';

interface EarnLink {
  label: ReactNode;
  description: string;
  href: string;
  external?: boolean;
}

interface UseEarnLinks {
  products: EarnLink[];
  ecosystem: EarnLink[];
}

const STAKE_LINK: EarnLink = {
  label: 'Stake',
  description: 'Staking Rewards',
  href: ROUTES.vrtx,
};

const VAULTS_LINK: EarnLink = {
  label: (
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
  description:
    clientEnv.base.brandName === 'blitz'
      ? 'Earn yield + Blast Gold'
      : 'Deposit liquidity and earn',
  href: ROUTES.vaults,
};

const REFERRALS_LINK: EarnLink = {
  label: 'Referrals',
  description: `Earn ${PRIMARY_QUOTE_SYMBOLS.usdc}`,
  href: ROUTES.referrals,
};

const REWARDS_LINK: EarnLink = {
  label: 'Rewards',
  description: 'Trading Rewards',
  href: ROUTES.rewards,
};

export function useEarnLinks(): UseEarnLinks {
  const { isStakePageEnabled, isFuulEnabled, isVaultsEnabled } =
    useEnabledFeatures();

  const showVertexRewards = useIsEnabledForBrand(['vertex']);

  return useMemo(() => {
    return {
      products: [
        ...(isStakePageEnabled ? [STAKE_LINK] : []),
        ...(showVertexRewards ? [REWARDS_LINK] : []),
        {
          label: 'Lend & Borrow',
          description: 'Money Markets',
          href: ROUTES.moneyMarkets,
        },
        ...(isFuulEnabled ? [REFERRALS_LINK] : []),
        {
          label: 'Pools',
          description: 'Provide Liquidity',
          href: ROUTES.pools,
        },
      ],
      ecosystem: [...(isVaultsEnabled ? [VAULTS_LINK] : [])],
    };
  }, [isFuulEnabled, isStakePageEnabled, isVaultsEnabled, showVertexRewards]);
}
