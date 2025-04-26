import { LinkButton } from '@vertex-protocol/web-ui';
import { UserDisclosureDismissibleCard } from 'client/components/Disclosure/UserDisclosureDismissibleCard';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { DepositInfoCardType } from 'client/modules/collateral/deposit/types';

export function WavaxDepositDismissible({
  displayedInfoCardType,
}: {
  displayedInfoCardType: DepositInfoCardType | undefined;
}) {
  const { push } = useDialog();

  if (displayedInfoCardType !== 'wrap_wavax') {
    return null;
  }

  return (
    <UserDisclosureDismissibleCard
      disclosureKey="swap_wavax"
      title="Looking to deposit AVAX?"
      description={
        <div className="flex flex-col gap-y-2">
          <p>Only wAVAX deposits are supported.</p>
          <p>
            Swap AVAX to wAVAX via the cross-chain deposit dialog by selecting{' '}
            Avalanche as the &quot;From&quot; chain.
          </p>
          <LinkButton
            colorVariant="primary"
            className="w-fit"
            onClick={() => {
              push({
                type: 'bridge',
                params: {},
              });
            }}
          >
            Swap AVAX to wAVAX
          </LinkButton>
        </div>
      }
    />
  );
}
