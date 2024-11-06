import { LinkButton } from '@vertex-protocol/web-ui';
import { WarningPanel } from 'client/components/WarningPanel';
import { BrandSpecificContent } from 'client/modules/envSpecificContent/BrandSpecificContent';
import { LINKS } from 'common/brandMetadata/links/links';
import Link from 'next/link';

export function DelayedWithdrawalWarning() {
  return (
    <WarningPanel title="Possible Delay">
      <p>
        Withdrawals may be delayed due to high on-chain gas costs.
        <BrandSpecificContent enabledBrands={['vertex']}>
          If <span className="text-text-primary">Fast Withdraw</span> is
          available for this asset, you can execute processing withdrawals
          instantly on the History page.
        </BrandSpecificContent>
      </p>
      <LinkButton
        className="text-xs"
        external
        colorVariant="primary"
        as={Link}
        href={LINKS.fastWithdrawalsLearnMore}
        withExternalIcon
      >
        Learn More
      </LinkButton>
    </WarningPanel>
  );
}
