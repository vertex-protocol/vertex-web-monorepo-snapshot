import { useEnabledFeatures } from 'client/modules/envSpecificContent/hooks/useEnabledFeatures';
import { LINKS } from 'common/brandMetadata/links/links';
import { useMemo } from 'react';

interface MoreLink {
  label: string;
  description: string;
  href: string;
  external: boolean;
}

const STATS_LINK = {
  label: 'Stats',
  description: 'Trading & market statistics',
  href: LINKS.stats,
  external: true,
};

// Shared between mobile and desktop more links. Mobile is a Collapsible whereas Desktop is a Popover component.
export function useMoreLinks(): MoreLink[] {
  const { isStatsLinkEnabled } = useEnabledFeatures();

  return useMemo(
    () => [
      ...(isStatsLinkEnabled ? [STATS_LINK] : []),
      {
        label: 'Docs',
        description: 'Get started building',
        href: LINKS.docs,
        external: true,
      },
      {
        label: 'Status',
        description: 'Check service status',
        href: LINKS.appStatus,
        external: true,
      },
      {
        label: 'Report a Bug',
        description: 'Help us improve',
        href: LINKS.hacken,
        external: true,
      },
      {
        label: 'Website',
        description: 'Visit the official landing page',
        href: LINKS.marketingSite,
        external: true,
      },
      {
        label: 'Discord',
        description: 'Connect with the community',
        href: LINKS.discord,
        external: true,
      },
      {
        label: 'Twitter',
        description: 'Stay up to date',
        href: LINKS.twitter,
        external: true,
      },
      {
        label: 'Terms of Use',
        description: 'Legal terms and conditions',
        href: LINKS.termsOfUse,
        external: true,
      },
    ],
    [isStatsLinkEnabled],
  );
}
