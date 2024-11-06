import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { BrandLoadingWrapper } from 'client/components/BrandIconLoadingWrapper/BrandLoadingWrapper';
import { WIDGET_CONTAINER_ID } from 'client/modules/trading/chart/config/widgetConfig';
import { useTradingViewChart } from 'client/modules/trading/chart/hooks/useTradingViewChart';

interface Props extends WithClassnames {
  productId: number | undefined;
}

export function TradingViewChart({ className, productId }: Props) {
  const { isReady, chartContainerRef } = useTradingViewChart(productId);

  return (
    <div
      className={joinClassNames(
        'relative flex items-center justify-center',
        className,
      )}
    >
      {/* We don't wrap the chart container here because it needs to be present in the DOM for `isReady` to trigger */}
      <BrandLoadingWrapper
        isLoading={!isReady}
        indicatorContainerClassName="absolute inset-0"
        grayscale
      />
      <div
        id={WIDGET_CONTAINER_ID}
        ref={chartContainerRef}
        className={joinClassNames(
          'flex h-full flex-1 delay-100',
          isReady ? 'opacity-100' : 'opacity-0',
          className,
        )}
      />
    </div>
  );
}
