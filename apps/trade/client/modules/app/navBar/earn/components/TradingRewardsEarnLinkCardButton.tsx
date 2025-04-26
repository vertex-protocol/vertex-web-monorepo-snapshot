import { Icons } from '@vertex-protocol/web-ui';
import { EarnLinkCardButton } from 'client/modules/app/navBar/earn/components/EarnLinkCardButton';
import { BaseEarnLinkProps } from 'client/modules/app/navBar/earn/types';

export function TradingRewardsEarnLinkCardButton({
  href,
  pageLabel,
}: BaseEarnLinkProps) {
  return (
    <EarnLinkCardButton
      href={href}
      pageLabel={pageLabel}
      pageIcon={Icons.SketchLogo}
      topOpportunityContent="Incentives 🔥"
    />
  );
}
