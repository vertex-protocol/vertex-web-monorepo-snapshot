import { Icons, IconType, imageToIconComponent } from '@vertex-protocol/web-ui';
import { ROUTES } from 'client/modules/app/consts/routes';
import { LINKS } from 'common/brandMetadata/links/links';
import {
  ARB_CHAIN_IDS,
  MANTLE_CHAIN_IDS,
} from 'client/modules/envSpecificContent/consts/chainIds';
import { useIsEnabledForChainIds } from 'client/modules/envSpecificContent/hooks/useIsEnabledForChainIds';
import { PRIMARY_QUOTE_SYMBOLS } from 'common/productMetadata/primaryQuoteSymbols';
import { useMemo } from 'react';
import elixirIcon from './assets/elixir-logo.svg';

import stakeIcon from './assets/stake-logo.svg';

interface EarnLink {
  label: string;
  description: string;
  icon: IconType;
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
  icon: imageToIconComponent({
    src: stakeIcon,
    alt: '',
  }),
  href: ROUTES.vrtx,
};

const REWARDS_LINK: EarnLink = {
  label: 'Rewards',
  description: 'Trading Rewards',
  icon: Icons.MdDiamond,
  href: ROUTES.rewards,
};

const REFERRALS_LINK: EarnLink = {
  label: 'Referrals',
  description: `Earn ${PRIMARY_QUOTE_SYMBOLS.usdc}`,
  icon: Icons.IoPeopleSharp,
  href: ROUTES.referrals,
};

const ELIXIR_LINK: EarnLink = {
  label: 'Elixir Vaults',
  description: 'Fusion Vaults',
  icon: imageToIconComponent({
    src: elixirIcon,
    alt: '',
  }),
  href: LINKS.elixir,
  external: true,
};

export function useEarnLinks(): UseEarnLinks {
  const showStakeLink = useIsEnabledForChainIds(ARB_CHAIN_IDS);
  const showRewardsLink = useIsEnabledForChainIds([
    ...ARB_CHAIN_IDS,
    ...MANTLE_CHAIN_IDS,
  ]);
  const showReferralsLink = useIsEnabledForChainIds([
    ...ARB_CHAIN_IDS,
    ...MANTLE_CHAIN_IDS,
  ]);
  const showElixirLink = useIsEnabledForChainIds(ARB_CHAIN_IDS);

  return useMemo(() => {
    return {
      products: [
        ...(showStakeLink ? [STAKE_LINK] : []),
        ...(showRewardsLink ? [REWARDS_LINK] : []),
        {
          label: 'Lend & Borrow',
          description: 'Money Markets',
          icon: Icons.HiArrowsRightLeft,
          href: ROUTES.moneyMarkets,
        },
        ...(showReferralsLink ? [REFERRALS_LINK] : []),
        {
          label: 'Pools',
          description: 'Provide Liquidity',
          icon: Icons.PiIntersectLight,
          href: ROUTES.pools,
        },
      ],
      ecosystem: showElixirLink ? [ELIXIR_LINK] : [],
    };
  }, [showElixirLink, showReferralsLink, showRewardsLink, showStakeLink]);
}
