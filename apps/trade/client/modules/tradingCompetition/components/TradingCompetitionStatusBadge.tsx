import { Pill } from '@vertex-protocol/web-ui';
import { StatusIndicator } from 'client/components/StatusIndicator';

export function TradingCompetitionStatusBadge({
  status,
}: {
  status: 'pending' | 'active' | 'done';
}) {
  const { label, colorVariant } = {
    pending: { label: 'Starting Soon', colorVariant: 'warning' as const },
    active: { label: 'Live', colorVariant: 'positive' as const },
    done: { label: 'Ended', colorVariant: 'negative' as const },
  }[status];

  return (
    <Pill className="lg:text-sm" colorVariant="primary" sizeVariant="xs">
      <StatusIndicator colorVariant={colorVariant} />
      {label}
    </Pill>
  );
}
