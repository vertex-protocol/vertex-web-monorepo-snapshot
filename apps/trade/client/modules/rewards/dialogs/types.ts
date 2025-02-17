import { BigDecimal } from '@vertex-protocol/client';
import { ClaimAndStakeRadioID } from 'client/modules/rewards/dialogs/ClaimTradingRewardsDialog/ClaimAndStakeRadioGroup';
import { BaseActionButtonState } from 'client/types/BaseActionButtonState';

export interface BaseClaimAndStakeHookReturn {
  selectedRadioId: ClaimAndStakeRadioID | undefined;
  disableRadioButtons: boolean;
  currentAmountStaked: BigDecimal | undefined;
  estimatedAmountStaked: BigDecimal | undefined;
  actionButtonState: BaseActionButtonState;
  usdcSymbol: string;
  protocolTokenSymbol: string;
  setSelectedRadioId: (id: ClaimAndStakeRadioID) => void;
  onSubmit: () => void;
  onClose: () => void;
}
