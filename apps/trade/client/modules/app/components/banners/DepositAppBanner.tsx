'use client';
import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { clientEnv } from 'common/environment/clientEnv';
import { LinkButton } from '@vertex-protocol/web-ui';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { AppBanner } from 'client/modules/app/components/banners/AppBanner/AppBanner';

export function DepositAppBanner({ className }: WithClassnames) {
  const { push } = useDialog();

  return (
    <AppBanner
      className={joinClassNames('gap-x-2', className)}
      variant={clientEnv.base.brandName}
    >
      <h2 className="text-text-primary">Deposit Funds to Start Trading</h2>
      <LinkButton
        colorVariant="primary"
        onClick={() => push({ type: 'deposit', params: {} })}
      >
        Deposit Now
      </LinkButton>
    </AppBanner>
  );
}
