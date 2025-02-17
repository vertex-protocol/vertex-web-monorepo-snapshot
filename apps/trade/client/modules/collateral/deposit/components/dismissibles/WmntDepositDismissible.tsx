import { LinkButton } from '@vertex-protocol/web-ui';
import { UserDisclosureDismissibleCard } from 'client/components/Disclosure/UserDisclosureDismissibleCard';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { DepositInfoCardType } from 'client/modules/collateral/deposit/types';

export function WmntDepositDismissible({
  displayedInfoCardType,
}: {
  displayedInfoCardType: DepositInfoCardType | undefined;
}) {
  const { push } = useDialog();

  if (displayedInfoCardType !== 'wrap_wmnt') {
    return null;
  }

  return (
    <UserDisclosureDismissibleCard
      disclosureKey="swap_wmnt"
      title="Looking to deposit MNT?"
      description={
        <div className="flex flex-col gap-y-2">
          <p>Only wMNT deposits are supported.</p>
          <p>
            Swap MNT to wMNT via the cross-chain deposit dialog by selecting{' '}
            Mantle as the &quot;From&quot; chain.
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
            Swap MNT to wMNT
          </LinkButton>
        </div>
      }
    />
  );
}
