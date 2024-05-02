import { useTradingConsolePosition } from 'client/modules/trading/hooks/useTradingConsolePosition';
import { OrderConsoleLocationButton } from './OrderConsoleLocationButton';

export function TradingConsolePosition() {
  const { consolePosition, setConsolePosition } = useTradingConsolePosition();

  return (
    <div className="flex flex-col gap-y-2">
      <div className="text-text-primary text-sm font-medium">
        Trading Console Position
      </div>
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
