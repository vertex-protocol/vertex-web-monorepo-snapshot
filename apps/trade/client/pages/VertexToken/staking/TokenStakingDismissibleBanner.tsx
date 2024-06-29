import { IconDiscList, Icons } from '@vertex-protocol/web-ui';
import { UserDisclosureDismissibleCard } from 'client/components/Disclosure/UserDisclosureDismissibleCard';
import { LinkButton } from 'client/components/LinkButton';
import { ROUTES } from 'client/modules/app/consts/routes';
import { Token } from 'common/productMetadata/types';
import Link from 'next/link';

export function TokenStakingDismissibleBanner({
  protocolToken,
}: {
  protocolToken: Token;
}) {
  return (
    <UserDisclosureDismissibleCard
      titleClassName="text-text-primary"
      disclosureKey="how_to_stake"
      title={`How to stake ${protocolToken.symbol}`}
      description={
        <IconDiscList.Container>
          <IconDiscList.Item icon={Icons.PiWalletFill}>
            Staking uses {protocolToken.symbol} from your wallet.
          </IconDiscList.Item>
          <IconDiscList.Item icon={Icons.HiArrowsRightLeft}>
            You can purchase {protocolToken.symbol}{' '}
            <LinkButton
              colorVariant="accent"
              as={Link}
              href={ROUTES.spotTrading}
            >
              here
            </LinkButton>
            .
          </IconDiscList.Item>
          <IconDiscList.Item icon={Icons.MdCreditScore}>
            After purchasing {protocolToken.symbol}, you will need to withdraw
            to your wallet to stake.
          </IconDiscList.Item>
        </IconDiscList.Container>
      }
    />
  );
}
