import { Icons } from '@vertex-protocol/web-ui';
import { EarnLinkCardButton } from 'client/modules/app/navBar/earn/components/EarnLinkCardButton';
import { BaseEarnLinkProps } from 'client/modules/app/navBar/earn/types';
import { FUUL_REFERRALS_REWARDS_CONFIG } from 'client/modules/referrals/fuul/consts';

export function ReferralsEarnLinkCardButton({
  href,
  pageLabel,
}: BaseEarnLinkProps) {
  return (
    <EarnLinkCardButton
      href={href}
      pageLabel={pageLabel}
      pageIcon={Icons.Users}
      topOpportunityContent={
        <div>
          <span className="text-text-tertiary">up to</span>{' '}
          {FUUL_REFERRALS_REWARDS_CONFIG.tierCommissionPercentages.tierFive}%
          commissions
        </div>
      }
    />
  );
}
