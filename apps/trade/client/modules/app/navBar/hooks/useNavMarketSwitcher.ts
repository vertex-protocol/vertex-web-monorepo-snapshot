import { ProductEngineType } from '@vertex-protocol/client';
import {
  UseMarketSwitcher,
  useMarketSwitcher,
} from 'client/modules/trading/hooks/useMarketSwitcher/useMarketSwitcher';
import { useState } from 'react';

interface UseNavMarketSwitcher extends UseMarketSwitcher {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function useNavMarketSwitcher(): UseNavMarketSwitcher {
  const marketSwitcher = useMarketSwitcher(ProductEngineType.PERP);
  const [open, setOpen] = useState(false);

  return {
    open,
    setOpen,
    ...marketSwitcher,
  };
}
