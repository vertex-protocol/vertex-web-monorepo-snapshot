import { LinkButton } from '@vertex-protocol/web-ui';
import { AppPage } from 'client/modules/app/AppPage';
import { RedeemElectionTokensCard } from 'client/pages/RedeemElectionTokens/RedeemElectionTokensCard';
import Link from 'next/link';

export function RedeemElectionTokensPage() {
  return (
    <AppPage.Content layoutWidth="sm">
      <AppPage.Header
        title="Redeem Election Tokens"
        description={
          <>
            Redeem your HARRISWIN and TRUMPWIN tokens for USDC after the
            election has ended.{' '}
            <LinkButton
              colorVariant="primary"
              as={Link}
              href=""
              withExternalIcon
            >
              Learn More
            </LinkButton>
          </>
        }
      />
      <RedeemElectionTokensCard className="sm:w-1/2" />
    </AppPage.Content>
  );
}
