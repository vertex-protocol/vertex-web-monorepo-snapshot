import { BigDecimal, VLP_PRODUCT_ID } from '@vertex-protocol/client';
import {
  useVertexMetadataContext,
  VLP_TOKEN_INFO,
} from '@vertex-protocol/react-client';
import { PrimaryButton, SecondaryButton } from '@vertex-protocol/web-ui';
import { SpotMoreActionsDropdownMenu } from 'client/components/SpotMoreActionsDropdownMenu';
import { useShowDialogForProduct } from 'client/hooks/ui/navigation/useShowDialogForProduct';
import { useIsConnected } from 'client/hooks/util/useIsConnected';
import { ROUTES } from 'client/modules/app/consts/routes';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { useEnabledFeatures } from 'client/modules/envSpecificContent/hooks/useEnabledFeatures';
import Link from 'next/link';

interface Props {
  productId: number;
  balanceAmount: BigDecimal;
}

export function MobileTradingTabSpotActionButtons({
  productId,
  balanceAmount,
}: Props) {
  const showDialogForProduct = useShowDialogForProduct();
  const { show } = useDialog();
  const isConnected = useIsConnected();

  const { protocolTokenMetadata } = useVertexMetadataContext();
  const { isStakeActionEnabled, isVlpEnabled } = useEnabledFeatures();
  const showStake =
    isStakeActionEnabled && productId === protocolTokenMetadata.productId;
  const showVlp = isVlpEnabled && productId === VLP_PRODUCT_ID;

  return (
    <div className="flex gap-x-1">
      {showStake && (
        <PrimaryButton
          className="flex-1"
          size="xs"
          onClick={() => show({ type: 'stake_v2_vrtx', params: {} })}
          disabled={!isConnected}
        >
          Stake
        </PrimaryButton>
      )}
      {showVlp && (
        <PrimaryButton as={Link} href={ROUTES.vlp} className="flex-1" size="xs">
          {VLP_TOKEN_INFO.symbol} Page
        </PrimaryButton>
      )}
      <SecondaryButton
        className="flex-1"
        size="xs"
        onClick={() =>
          showDialogForProduct({ dialogType: 'deposit', productId })
        }
        disabled={!isConnected}
      >
        Deposit
      </SecondaryButton>
      <SecondaryButton
        className="flex-1"
        size="xs"
        onClick={() =>
          showDialogForProduct({ dialogType: 'withdraw', productId })
        }
        disabled={!isConnected}
      >
        Withdraw
      </SecondaryButton>
      <SpotMoreActionsDropdownMenu
        productId={productId}
        balanceAmount={balanceAmount}
      />
    </div>
  );
}
