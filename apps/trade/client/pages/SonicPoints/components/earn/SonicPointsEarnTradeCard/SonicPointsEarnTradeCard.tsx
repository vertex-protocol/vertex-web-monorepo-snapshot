import { SecondaryButton } from '@vertex-protocol/web-ui';
import { ROUTES } from 'client/modules/app/consts/routes';
import { SonicPointsCard } from 'client/pages/SonicPoints/components/SonicPointsCard';
import { SonicPointsEarnTradeCardVolumeItem } from 'client/pages/SonicPoints/components/earn/SonicPointsEarnTradeCard/SonicPointsEarnTradeCardVolumeItem';
import Link from 'next/link';

export function SonicPointsEarnTradeCard() {
  return (
    <SonicPointsCard titleContent="Trade" contentClassName="gap-y-4">
      <p>
        Both{' '}
        <span className="text-text-secondary">market and limit orders</span>{' '}
        earn credits.
      </p>
      <SonicPointsEarnTradeCardVolumeItem />
      <SecondaryButton className="mt-auto" as={Link} href={ROUTES.perpTrading}>
        Trade
      </SecondaryButton>
    </SonicPointsCard>
  );
}
