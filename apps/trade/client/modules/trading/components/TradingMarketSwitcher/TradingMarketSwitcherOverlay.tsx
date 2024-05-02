import { openMarketSwitcherAtom } from 'client/store/trading/commonTradingStore';
import { useAtom } from 'jotai';

export function TradingMarketSwitcherOverlay() {
  const [open, setOpen] = useAtom(openMarketSwitcherAtom);
  if (!open) return null;

  return (
    <div
      onClick={() => setOpen(false)}
      className="bg-background/10 fixed inset-0 z-10 backdrop-blur-sm"
    />
  );
}
