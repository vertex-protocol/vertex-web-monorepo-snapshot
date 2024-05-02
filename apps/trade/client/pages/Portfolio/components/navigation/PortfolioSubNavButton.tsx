import { joinClassNames } from '@vertex-protocol/web-common';
import { Button, CounterPill } from '@vertex-protocol/web-ui';
import { PortfolioNavItem } from 'client/pages/Portfolio/components/navigation/types';
import Link from 'next/link';

type PortfolioSubNavProps = PortfolioNavItem;

export function PortfolioSubNavButton({
  label,
  href,
  disabled,
  selected,
  associatedCount,
}: PortfolioSubNavProps) {
  const stateClassNames = (() => {
    if (disabled) {
      return;
    }

    if (selected) {
      return 'bg-surface-1 border-accent text-text-primary';
    }

    return [
      'text-text-tertiary border-transparent',
      'hover:bg-overlay-hover/5 hover:text-text-primary',
    ];
  })();

  return (
    <Button
      as={Link}
      href={href}
      disabled={disabled}
      className={joinClassNames(
        'flex items-center justify-start',
        'title-text border-l-[3px] px-5 py-3 text-xs',
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
