import { useIsClient } from '@vertex-protocol/web-common';
import {
  SizeClass,
  useSizeClass,
} from 'client/hooks/ui/breakpoints/useSizeClass';
import { useSyncedRef } from 'client/hooks/util/useSyncedRef';
import { TradingViewSymbolInfo } from 'client/modules/trading/chart/config/datafeedConfig';
import { WIDGET_CONFIG } from 'client/modules/trading/chart/config/widgetConfig';
import { cloneDeep } from 'lodash';
import {
  ChartingLibraryWidgetConstructor,
  IBasicDataFeed,
  IChartingLibraryWidget,
  Timezone,
} from 'public/charting_library';
import { MutableRefObject, useEffect, useRef, useState } from 'react';

interface UseTradingViewWidget {
  tvWidget: IChartingLibraryWidget | undefined;
  chartContainerRef: MutableRefObject<HTMLDivElement | null>;
}

interface Params {
  selectedSymbolInfo: TradingViewSymbolInfo | undefined;
  datafeed: IBasicDataFeed | undefined;
}

// Cached import for the TV charting library widget
let _widgetConstructor: ChartingLibraryWidgetConstructor | undefined;

async function getImportedWidgetConstructor() {
  if (_widgetConstructor) {
    return _widgetConstructor;
  }
  const constructor = (await import('public/charting_library')).widget;
  _widgetConstructor = constructor;
  return constructor;
}

function getWidgetOptions({
  symbol,
  datafeed,
  sizeClass,
}: {
  symbol: string;
  datafeed: IBasicDataFeed;
  sizeClass: SizeClass;
}) {
  const options = {
    ...cloneDeep(WIDGET_CONFIG.options),
    symbol: symbol,
    // Tradingview expects olsendb as the timezone, which is close to, but not the same, as IANA
    // This is good enough for most cases
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone as
      | Timezone
      | undefined,
    datafeed,
  };

  // default hide drawing tools on mobile
  if (sizeClass === 'mobile') {
    options.enabled_features?.push('hide_left_toolbar_by_default');
  }

  return options;
}

export function useTradingViewWidget({
  selectedSymbolInfo,
  datafeed,
}: Params): UseTradingViewWidget {
  const isClient = useIsClient();
  const { value: sizeClass } = useSizeClass();
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const [isReady, setIsReady] = useState<boolean>();
  const [tvWidget, setTvWidget] = useState<IChartingLibraryWidget>();

  // Use synced refs as we don't want to reload the widget on changes of these data
  const selectedSymbolRef = useSyncedRef(selectedSymbolInfo);
  // However, we want reloads when selected symbol goes from undefined -> defined
  const hasSymbol = !!selectedSymbolRef.current;

  useEffect(() => {
    const initialTicker = selectedSymbolRef.current?.ticker;
    if (
      !chartContainerRef.current ||
      !hasSymbol ||
      !datafeed ||
      !initialTicker ||
      !isClient
    ) {
      return;
    }

    // Create an async fn to call for better readability
    const createWidget = async () => {
      const ChartWidget = await getImportedWidgetConstructor();

      const options = getWidgetOptions({
        symbol: selectedSymbolRef.current?.ticker ?? initialTicker,
        datafeed,
        sizeClass,
      });
      const widget = new ChartWidget(options);

      console.debug('[useCreateWidget] Chart widget created');

      await new Promise<void>((resolve) => {
        widget.onChartReady(() => {
          console.debug('[useCreateWidget] onChartReady called');
          resolve();
        });
      });

      // Listen to save requests & call save on the save load adapter
      widget.subscribe('onAutoSaveNeeded', () => {
        widget?.saveChartToServer(undefined, undefined, {
          defaultChartName: 'Default',
        });
      });

      return widget;
    };

    let isCancelled = false;
    setIsReady(false);
    console.debug('[useCreateWidget] Creating chart widget');

    createWidget().then((widget) => {
      if (isCancelled) {
        return;
      }
      setTvWidget(widget);
      setIsReady(true);
    });

    return () => {
      isCancelled = true;
    };
  }, [
    chartContainerRef,
    datafeed,
    hasSymbol,
    isClient,
    selectedSymbolRef,
    sizeClass,
  ]);

  const prevWidgetRef = useRef<IChartingLibraryWidget>();
  useEffect(() => {
    if (prevWidgetRef.current !== tvWidget) {
      prevWidgetRef.current?.remove();
      prevWidgetRef.current = tvWidget;
    }
  }, [tvWidget]);

  return {
    tvWidget: isReady ? tvWidget : undefined,
    chartContainerRef,
  };
}
