import * as Collapsible from '@radix-ui/react-collapsible';
import { joinClassNames } from '@vertex-protocol/web-common';
import { Icons } from '@vertex-protocol/web-ui';
import { UpDownChevronIcon } from 'client/components/Icons/UpDownChevronIcon';
import { LinkButton } from 'client/components/LinkButton';
import { LINKS } from 'client/modules/brand/links';
import Link from 'next/link';
import { useState } from 'react';

export function DelayedWithdrawalWarning() {
  const [showMoreDetails, setShowMoreDetails] = useState(false);

  return (
    <div className="bg-overlay-accent/10 flex flex-col gap-y-4 rounded px-3 py-2">
      <div className="flex flex-col gap-y-2">
        <div className="text-accent flex items-center justify-between">
          <div className="flex items-center gap-x-1.5 text-xs">
            <Icons.BsExclamationTriangle size={14} />
            <span>Gas Warning</span>
          </div>
        </div>
        <p className="text-text-secondary text-xs">
          Gas is high and withdrawals might be slower to process.
        </p>
      </div>
      <Collapsible.Root
        open={showMoreDetails}
        onOpenChange={setShowMoreDetails}
      >
        <Collapsible.Trigger
          className={joinClassNames(
            'active:text-text-primary flex items-center gap-x-1 text-xs duration-300',
            showMoreDetails ? 'text-text-primary' : 'text-text-secondary',
          )}
        >
          <span>{showMoreDetails ? 'Less' : 'More'} Details</span>
          <UpDownChevronIcon open={showMoreDetails} size={14} />
        </Collapsible.Trigger>
        <Collapsible.Content className="text-text-tertiary flex flex-col items-start gap-y-2 text-xs">
          <p className="pt-2">
            On-chain withdrawal requests are submitted when gas fees are below a
            certain threshold. While all transactions are confirmed instantly,
            withdrawals may be delayed during high gas fee periods.
          </p>
          <p>
            To check the status of your withdrawal, go to the Portfolio page and
            look at the Account History section.
          </p>
          <LinkButton
            external
            color="accent"
            as={Link}
            href={LINKS.faqGasFeesDocs}
            className="inline-flex items-center gap-x-0.5"
            withExternalIcon
          >
            Learn More
          </LinkButton>
        </Collapsible.Content>
      </Collapsible.Root>
    </div>
  );
}
