'use client';

import { VRTX_TOKEN_INFO } from '@vertex-protocol/react-client';
import { CustomNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { AppPage } from 'client/modules/app/AppPage';
import { usePastProgramReferralRewards } from 'client/pages/VertexReferrals/components/ReferralsPageTitle/usePastProgramReferralRewards';

export function ReferralsPageTitle() {
  const pastProgramReferralRewards = usePastProgramReferralRewards();

  return (
    <div className="flex flex-col items-start gap-y-2 sm:flex-row sm:items-end sm:justify-between">
      <AppPage.EarnHeader title="Referrals" />
      <ValueWithLabel.Horizontal
        sizeVariant="sm"
        tooltip={{ id: 'referralsPastProgramRewards' }}
        label="Past program rewards:"
        value={pastProgramReferralRewards}
        numberFormatSpecifier={CustomNumberFormatSpecifier.NUMBER_AUTO}
        valueEndElement={VRTX_TOKEN_INFO.symbol}
      />
    </div>
  );
}
