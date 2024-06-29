import {
  UseOrderSlippageFormForType,
  useOrderSlippageFormForType,
} from 'client/modules/accountCenter/components/AccountCenterSettingsContent/OrderSlippageForm/useOrderSlippageForm/useOrderSlippageFormForType';
import { OrderSlippageType } from 'client/modules/localstorage/userSettings/types/tradingSettings';

export interface UseOrderSlippageForm {
  forms: Record<OrderSlippageType, UseOrderSlippageFormForType>;
  saveAll: () => void;
}

export function useOrderSlippageForm(): UseOrderSlippageForm {
  const forms: UseOrderSlippageForm['forms'] = {
    market: useOrderSlippageFormForType('market'),
    stopLoss: useOrderSlippageFormForType('stopLoss'),
    stopMarket: useOrderSlippageFormForType('stopMarket'),
    takeProfit: useOrderSlippageFormForType('takeProfit'),
  };

  const saveAll = () => {
    Object.values(forms).forEach((form) => {
      form.save();
    });
  };

  return {
    forms,
    saveAll,
  };
}
