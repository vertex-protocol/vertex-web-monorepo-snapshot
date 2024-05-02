import { ProductEngineType } from '@vertex-protocol/client';
import {
  UseTradeSwitcher,
  useTradeSwitcher,
} from 'client/modules/trading/hooks/useTradeSwitcher/useTradeSwitcher';
import { useState } from 'react';

interface UseNavTradeSwitcher extends UseTradeSwitcher {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function useNavTradeSwitcher(): UseNavTradeSwitcher {
  const tradeSwitcher = useTradeSwitcher(ProductEngineType.PERP);
  const [open, setOpen] = useState(false);

  return {
    open,
    setOpen,
    ...tradeSwitcher,
  };
}
