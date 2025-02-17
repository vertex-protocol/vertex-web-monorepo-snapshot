import { BigDecimal } from '@vertex-protocol/client';
import { SecondaryButton } from '@vertex-protocol/web-ui';
import { useUserStateError } from 'client/hooks/subaccount/useUserStateError';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { useIsSingleSignatureSession } from 'client/modules/singleSignatureSessions/hooks/useIsSingleSignatureSession';

interface Props {
  productId: number;
  isoSubaccountName: string | undefined;
  hasReduceOnlyOrders: boolean;
  isoMarginUsedUsd: BigDecimal | undefined;
}

export function MobileTradingTabPositionsActionButtons({
  productId,
  isoSubaccountName,
  hasReduceOnlyOrders,
  isoMarginUsedUsd,
}: Props) {
  const { show } = useDialog();
  const isSingleSignatureSession = useIsSingleSignatureSession();
  const userStateError = useUserStateError();
  const isIsoPosition = !!isoSubaccountName && !!isoMarginUsedUsd;

  const tpSlButtonProps = (() => {
    if (!isSingleSignatureSession) {
      return {
        children: 'Enable 1CT',
        onClick: () => show({ type: 'signature_mode_settings', params: {} }),
      };
    }

    if (userStateError === 'requires_sign_once_approval') {
      return {
        children: 'Approve 1CT',
        onClick: () =>
          show({ type: 'single_signature_reapproval', params: {} }),
      };
    }

    return {
      children: `${hasReduceOnlyOrders ? 'Edit' : 'Add'} TP/SL`,
      onClick: () =>
        show({
          type: 'tp_sl',
          params: { productId, isoSubaccountName: isoSubaccountName ?? null },
        }),
    };
  })();

  return (
    <div className="grid auto-cols-fr grid-flow-col gap-x-1">
      <SecondaryButton size="xs" {...tpSlButtonProps} />
      {isIsoPosition && (
        <SecondaryButton
          size="xs"
          title="Adjust Margin"
          onClick={() =>
            show({
              type: 'adjust_iso_margin',
              params: {
                isoSubaccountName,
              },
            })
          }
        >
          Adjust Margin
        </SecondaryButton>
      )}
      <SecondaryButton
        destructive
        size="xs"
        title="Close Position"
        onClick={() =>
          show({
            type: 'close_position',
            params: { productId, isoSubaccountName },
          })
        }
      >
        Close
      </SecondaryButton>
    </div>
  );
}
