import { FunkitProvider } from '@funkit/connect';
import {
  DirectDepositDialog,
  DirectDepositDialogParams,
} from 'client/modules/collateral/deposit/components/DirectDepositDialog';
import {
  FUNKIT_CONFIG,
  FUNKIT_THEME,
} from 'client/modules/collateral/deposit/funkitDeposit/consts';
import { FunkitDepositDialog } from 'client/modules/collateral/deposit/funkitDeposit/FunkitDepositDialog';
import { useEnabledFeatures } from 'client/modules/envSpecificContent/hooks/useEnabledFeatures';

export function DepositDialogWithFunkit(
  directDepositDialogProps: DirectDepositDialogParams,
) {
  const { isFunkitEnabled } = useEnabledFeatures();

  return isFunkitEnabled ? (
    <FunkitProvider
      funkitConfig={FUNKIT_CONFIG}
      theme={FUNKIT_THEME}
      modalSize="medium"
    >
      <FunkitDepositDialog />
    </FunkitProvider>
  ) : (
    <DirectDepositDialog {...directDepositDialogProps} />
  );
}
