import { OrderConsoleLocationButton } from 'client/modules/settings/components/OrderConsoleLocationButton';
import { useTradingConsolePosition } from 'client/modules/trading/hooks/useTradingConsolePosition';

export function TradingConsolePosition() {
  const { consolePosition, setConsolePosition } = useTradingConsolePosition();

  return (
    <div className="flex flex-col gap-y-3">
      <div className="text-text-primary">Trading Console Position</div>
      <div className="flex gap-x-5">
        <OrderConsoleLocationButton
          onSelect={() => {
            setConsolePosition('left');
          }}
          active={consolePosition === 'left'}
          side="left"
        />
        <OrderConsoleLocationButton
          onSelect={() => {
            setConsolePosition('right');
          }}
          active={consolePosition === 'right'}
          side="right"
        />
      </div>
    </div>
  );
}
