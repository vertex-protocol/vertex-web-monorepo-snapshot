import { KeyFeatures } from 'client/components/KeyFeatures';
import { VertexReferralLinkBar } from 'client/modules/referrals/components/VertexReferralLinkBar';
import { ReferralsCard } from 'client/pages/VertexReferrals/components/ReferralsCard';
import { ReferralsCustomizeLinkTextButton } from 'client/pages/VertexReferrals/components/ReferralsReferTradersCard/ReferralsCustomizeLinkTextButton';

export function ReferralsReferTradersCard() {
  return (
    <ReferralsCard
      title="Refer Traders"
      titleEndElement={<ReferralsCustomizeLinkTextButton />}
    >
      <VertexReferralLinkBar />
      <KeyFeatures />
    </ReferralsCard>
  );
}
