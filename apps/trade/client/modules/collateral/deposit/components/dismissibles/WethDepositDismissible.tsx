import { useEVMContext } from '@vertex-protocol/react-client';
import { LinkButton } from '@vertex-protocol/web-ui';
import { UserDisclosureDismissibleCard } from 'client/components/Disclosure/UserDisclosureDismissibleCard';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { DepositInfoCardType } from 'client/modules/collateral/deposit/types';

export function WethDepositDismissible({
  displayedInfoCardType,
}: {
  displayedInfoCardType: DepositInfoCardType | undefined;
}) {
  const { push } = useDialog();
  const { primaryChain } = useEVMContext();

  if (displayedInfoCardType !== 'wrap_weth') {
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
            {/*We can't hardcode the chain name as this dismissible is also used on Blast*/}
            {primaryChain.name} as the &quot;From&quot; chain.
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
            Swap ETH to wETH
          </LinkButton>
        </div>
      }
    />
  );
}
