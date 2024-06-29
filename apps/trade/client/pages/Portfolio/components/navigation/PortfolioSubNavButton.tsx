import { joinClassNames } from '@vertex-protocol/web-common';
import {
  Button,
  CounterPill,
  getStateOverlayClassNames,
} from '@vertex-protocol/web-ui';
import { PortfolioNavItem } from 'client/pages/Portfolio/components/navigation/types';
import Link from 'next/link';

type PortfolioSubNavProps = PortfolioNavItem;

export function PortfolioSubNavButton({
  label,
  href,
  selected,
  associatedCount,
}: PortfolioSubNavProps) {
  const stateClassNames = (() => {
    if (selected) {
      return 'border-accent text-text-primary';
    }

    return [
      'text-text-tertiary border-transparent',
      'hover:text-text-secondary hover:border-overlay-divider/20',
    ];
  })();

  const stateOverlayClassNames = getStateOverlayClassNames({
    active: selected,
  });

  return (
    <Button
      as={Link}
      href={href}
      className={joinClassNames(
        'flex items-center justify-start',
        'title-text border-l-[3px] px-5 py-3 text-xs',
        stateOverlayClassNames,
        stateClassNames,
      )}
      endIcon={
        !!associatedCount && (
          <CounterPill>{associatedCount.toFixed()}</CounterPill>
        )
      }
    >
      {label}
    </Button>
  );
}
