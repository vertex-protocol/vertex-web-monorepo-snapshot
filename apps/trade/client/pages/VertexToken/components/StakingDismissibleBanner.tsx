'use client';

import { useVertexMetadataContext } from '@vertex-protocol/metadata';
import { IconDiscList, Icons, LinkButton } from '@vertex-protocol/web-ui';
import { UserDisclosureDismissibleCard } from 'client/components/Disclosure/UserDisclosureDismissibleCard';
import { useProductTradingLinks } from 'client/hooks/ui/navigation/useProductTradingLinks';
import { useSwitchToProtocolTokenChainEnv } from 'client/hooks/util/useSwitchToProtocolTokenChainEnv';
import { get } from 'lodash';
import Link from 'next/link';

export function StakingDismissibleBanner() {
  const { isOnProtocolTokenChainEnv } = useSwitchToProtocolTokenChainEnv();
  const { protocolTokenMetadata } = useVertexMetadataContext();
  const productTradingLinks = useProductTradingLinks();

  if (!isOnProtocolTokenChainEnv) {
    return null;
  }

  return (
    <UserDisclosureDismissibleCard
      disclosureKey="how_to_stake"
      title={`How to stake ${protocolTokenMetadata.token.symbol}`}
      description={
        <IconDiscList.Container>
          <IconDiscList.Item icon={Icons.WalletFill}>
            Staking uses {protocolTokenMetadata.token.symbol} from your wallet.
          </IconDiscList.Item>
          <IconDiscList.Item icon={Icons.ArrowsLeftRight}>
            You can purchase {protocolTokenMetadata.token.symbol}{' '}
            <LinkButton
              as={Link}
              colorVariant="primary"
              href={
                get(
                  productTradingLinks,
                  protocolTokenMetadata.productId,
                  undefined,
                )?.link ?? ''
              }
            >
              here
            </LinkButton>
            .
          </IconDiscList.Item>
          <IconDiscList.Item icon={Icons.CreditCard}>
            After purchasing {protocolTokenMetadata.token.symbol}, you will need
            to withdraw to your wallet to stake.
          </IconDiscList.Item>
        </IconDiscList.Container>
      }
    />
  );
}
