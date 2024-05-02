import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { BrandIconLoadingIndicator } from 'client/components/BrandIconLoadingIndicator';
import { useTradingViewChart } from 'client/modules/trading/chart/hooks/useTradingViewChart';
import { WIDGET_CONTAINER_ID } from './config/widgetConfig';

interface Props {
  productId?: number;
}

export function TradingViewChart({
  className,
  productId,
}: WithClassnames<Props>) {
  const { isReady, chartContainerRef } = useTradingViewChart(productId);

  return (
    <div
      className={joinClassNames(
        'relative flex items-center justify-center',
        className,
      )}
    >
      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center">
          <BrandIconLoadingIndicator
            size={72}
            className="opacity-10 saturate-0"
          />
        </div>
      )}
      <div
        id={WIDGET_CONTAINER_ID}
        ref={chartContainerRef}
        className={joinClassNames(
          'flex h-full flex-1 delay-100 duration-200',
          isReady ? 'opacity-100' : 'opacity-0',
          className,
        )}
      />
    </div>
  );
}
