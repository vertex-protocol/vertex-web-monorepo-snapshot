import { OrderSlippageType } from 'client/modules/localstorage/userSettings/types/tradingSettings';
import {
  useOrderSlippageFormForType,
  UseOrderSlippageFormForType,
} from 'client/modules/settings/components/OrderSlippageForm/useOrderSlippageForm/useOrderSlippageFormForType';

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
