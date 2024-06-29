import { ChainEnv } from '@vertex-protocol/client';
import { getPrimaryChain, useEVMContext } from '@vertex-protocol/react-client';
import { PrimaryButton, SecondaryButton } from '@vertex-protocol/web-ui';
import { LinkButton } from 'client/components/LinkButton';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { VERTEX_SPECIFIC_LINKS } from 'common/brandMetadata/links/vertexLinks';
import Link from 'next/link';

interface Props {
  disableClaim: boolean;
  rewardsChainEnv: ChainEnv;
}

export function ClaimEarnings({ disableClaim, rewardsChainEnv }: Props) {
  const { show } = useDialog();
  const {
    primaryChainEnv,
    setPrimaryChainEnv,
    chainStatus: { isIncorrectChain },
    switchChain,
  } = useEVMContext();

  const requiresAppChainSwitch = rewardsChainEnv !== primaryChainEnv;
  const requiresWalletChainSwitch = isIncorrectChain;

  if (requiresAppChainSwitch || requiresWalletChainSwitch) {
    const primaryChain = getPrimaryChain(rewardsChainEnv);

    return (
      <div className="flex flex-col gap-y-3">
        <PrimaryButton
          onClick={() => {
            if (requiresAppChainSwitch) {
              setPrimaryChainEnv(rewardsChainEnv);
            } else if (requiresWalletChainSwitch) {
              switchChain(primaryChain.id);
            }
          }}
        >
          Switch to {primaryChain.name}
        </PrimaryButton>
        <div className="text-text-tertiary text-sm">
          Referral commissions and rebates are tracked across chains, but
          claiming happens on {primaryChain.name}.{' '}
          <LinkButton
            as={Link}
            colorVariant="primary"
            href={VERTEX_SPECIFIC_LINKS.fuulReferralsDocs}
            external
          >
            Learn more
          </LinkButton>
        </div>
      </div>
    );
  }

  return (
    <SecondaryButton
      disabled={disableClaim}
      onClick={() => {
        show({ type: 'claim_referral_earnings', params: {} });
      }}
    >
      Claim Earnings
    </SecondaryButton>
  );
}
