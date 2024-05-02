import { joinClassNames } from '@vertex-protocol/web-common';
import { AppPage } from 'client/modules/app/AppPage';
import { APP_PAGE_PADDING } from 'client/modules/app/consts/padding';
import { useReferralsPage } from './hooks/useReferralsPage';
import { ReferralNewProgram } from './components/ReferralNewProgram/ReferralNewProgram';
import { ReferralsPastProgram } from './components/ReferralPastProgram/ReferralPastProgram';

export function VertexReferralsPage() {
  const { realizedReferralRewards, totalReferralCount } = useReferralsPage();

  return (
    <AppPage.Root
      routeName="Referrals"
      contentWrapperClassName={joinClassNames(
        APP_PAGE_PADDING.horizontal,
        APP_PAGE_PADDING.vertical,
      )}
    >
      <AppPage.Content
        // Max page width from Figma
        className="max-w-[950px] gap-y-6"
      >
        <AppPage.Header title="Referrals" />
        <ReferralNewProgram />
        <ReferralsPastProgram
          realizedReferralRewards={realizedReferralRewards}
          totalReferralCount={totalReferralCount}
        />
      </AppPage.Content>
    </AppPage.Root>
  );
}
