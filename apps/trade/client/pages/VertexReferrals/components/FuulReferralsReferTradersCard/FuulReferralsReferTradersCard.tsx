import { KeyFeatures } from 'client/components/KeyFeatures';
import { FuulReferralLinkBar } from 'client/modules/referrals/fuul/FuulReferralLinkBar';
import { FuulReferralsCard } from 'client/pages/VertexReferrals/components/FuulReferralsCard';
import { FuulReferralsCustomizeLinkTextButton } from 'client/pages/VertexReferrals/components/FuulReferralsReferTradersCard/FuulReferralsCustomizeLinkTextButton';

export function FuulReferralsReferTradersCard() {
  return (
    <FuulReferralsCard
      title="Refer Traders"
      titleEndElement={<FuulReferralsCustomizeLinkTextButton />}
    >
      <FuulReferralLinkBar />
      <KeyFeatures className="gap-2 text-xs" />
    </FuulReferralsCard>
  );
}
