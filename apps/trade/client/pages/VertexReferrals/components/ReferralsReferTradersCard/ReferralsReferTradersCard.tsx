import { TextButton } from '@vertex-protocol/web-ui';
import { KeyFeatures } from 'client/components/KeyFeatures';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { ReferralsCard } from 'client/pages/VertexReferrals/components/ReferralsCard';
import { VertexReferralLinkBar } from 'client/pages/VertexReferrals/components/ReferralsReferTradersCard/VertexReferralLinkBar';
import { Token } from 'common/productMetadata/types';

interface Props {
  referralCode: string | undefined | null;
  disableCustomizeLink: boolean;
  payoutToken: Token;
}

export function ReferralsReferTradersCard({
  referralCode,
  disableCustomizeLink,
  payoutToken,
}: Props) {
  const { show } = useDialog();

  const customizeLinkButton = (
    <TextButton
      disabled={disableCustomizeLink}
      onClick={() =>
        show({
          type: 'customize_referral_link',
          params: {},
        })
      }
    >
      Customize
    </TextButton>
  );

  return (
    <ReferralsCard title="Refer Traders" titleEndElement={customizeLinkButton}>
      <VertexReferralLinkBar
        referralCode={referralCode}
        payoutToken={payoutToken}
      />
      <KeyFeatures />
    </ReferralsCard>
  );
}
