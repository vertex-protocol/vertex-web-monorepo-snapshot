import { IconType, Icons } from '@vertex-protocol/web-ui';
import { LINKS } from 'common/brandMetadata/links/links';
import { useMemo } from 'react';
import {
  ARB_CHAIN_IDS,
  BLAST_CHAIN_IDS,
} from 'client/modules/envSpecificContent/consts/chainIds';
import { useIsEnabledForChainIds } from 'client/modules/envSpecificContent/hooks/useIsEnabledForChainIds';

interface MoreLink {
  label: string;
  description: string;
  href: string;
  icon: IconType;
  external: boolean;
}

const STATS_LINK = {
  label: 'Stats',
  description: 'Spot and Perpetual trading statistics',
  href: LINKS.stats,
  icon: Icons.BiSolidBarChartAlt2,
  external: true,
};

// Shared between mobile and desktop more links. Mobile is a Collapsible whereas Desktop is a Popover component.
export function useMoreLinks(): MoreLink[] {
  const showStatsLink = useIsEnabledForChainIds([
    ...ARB_CHAIN_IDS,
    ...BLAST_CHAIN_IDS,
  ]);

  return useMemo(
    () => [
      ...(showStatsLink ? [STATS_LINK] : []),
      {
        label: 'Docs',
        description: 'Get started building',
        href: LINKS.docs,
        icon: Icons.BiCodeCurly,
        external: true,
      },
      {
        label: 'Status',
        description: 'Check downtime and planned maintenances',
        href: LINKS.appStatus,
        icon: Icons.TbActivityHeartbeat,
        external: true,
      },
      {
        label: 'Report a Bug',
        description: 'Help us improve',
        href: LINKS.hacken,
        icon: Icons.BiBug,
        external: true,
      },
      {
        label: 'Website',
        description: 'The official landing page',
        href: LINKS.marketingSite,
        icon: Icons.FiGlobe,
        external: true,
      },
      {
        label: 'Discord',
        description: 'Connect with the team and community',
        href: LINKS.discord,
        icon: Icons.BsDiscord,
        external: true,
      },
      {
        label: 'Twitter',
        description: 'Stay up to date with news and updates',
        href: LINKS.twitter,
        icon: Icons.BsTwitterX,
        external: true,
      },
      {
        label: 'Terms of Use',
        description: 'Legal terms and conditions',
        href: LINKS.termsOfUse,
        icon: Icons.BsShieldCheck,
        external: true,
      },
    ],
    [showStatsLink],
  );
}
