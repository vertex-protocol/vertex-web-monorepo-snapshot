import { useEVMContext } from '@vertex-protocol/react-client';
import { UserDisclosureDismissibleCard } from 'client/components/Disclosure/UserDisclosureDismissibleCard';
import { LinkButton } from 'client/components/LinkButton';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { DepositInfoCardType } from '../../types';

export function WethDepositDismissible({
  displayedInfoCardType,
}: {
  displayedInfoCardType: DepositInfoCardType | undefined;
}) {
  const { show } = useDialog();
  const { primaryChain } = useEVMContext();

  if (displayedInfoCardType !== 'weth') {
    return null;
  }

  return (
    <UserDisclosureDismissibleCard
      disclosureKey="swap_weth"
      title="Looking to deposit ETH?"
      description={
        <div className="flex flex-col gap-y-2">
          <p>Only wETH deposits are supported.</p>
          <p>
            Swap ETH to wETH via the cross-chain deposit dialog by selecting{' '}
            {primaryChain.name} as the originating chain.
          </p>
          <LinkButton
            colorVariant="primary"
            className="w-fit"
            onClick={() => {
              show({
                type: 'bridge',
                params: {},
              });
            }}
          >
            Swap ETH to wETH
          </LinkButton>
        </div>
      }
    />
  );
}
