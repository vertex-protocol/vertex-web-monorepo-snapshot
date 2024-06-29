import { nowInSeconds, toPrintableObject } from '@vertex-protocol/utils';
import { usePrimaryChainVertexClient } from '@vertex-protocol/react-client';
import { useAllMarketsStaticData } from 'client/hooks/markets/useAllMarketsStaticData';
import { useOperationTimeLogger } from 'client/hooks/util/useOperationTimeLogger';
import {
  DATAFEED_CONFIGURATION,
  getTradingViewSymbolInfo,
  RESOLUTIONS_TO_INTERVALS,
  TradingViewSymbolInfo,
} from 'client/modules/trading/chart/config/datafeedConfig';
import { first, last, mapValues } from 'lodash';
import type { Bar, IBasicDataFeed } from 'public/charting_library';
import { useMemo, useRef } from 'react';
import { BarSubscriber } from './types';
import { useUpdateLatestBar } from './useUpdateLatestBar';
import {
  getLastBarMapKey,
  syncBarOpenWithValue,
  toTVCandlestick,
  toTVCandlesticks,
} from './utils';

interface UseTradingViewData {
  symbolInfoByProductId?: Record<number, TradingViewSymbolInfo>;
  datafeed: IBasicDataFeed | undefined;
}

interface UseTradingViewDataParams {
  currentProductId: number | undefined;
}

export function useTradingViewData({
  currentProductId,
}: UseTradingViewDataParams): UseTradingViewData {
  const { startProfiling, endProfiling } = useOperationTimeLogger(
    'tvCharts',
    false,
  );
  const vertexClient = usePrimaryChainVertexClient();
  const { data: staticMarketData } = useAllMarketsStaticData();

  const symbolInfoByProductId = useMemo(
    () => {
      return mapValues(staticMarketData?.all, (market) => {
        return getTradingViewSymbolInfo(market);
      });
    },
    // We want this to run ONCE when market data is loaded, not more often
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [staticMarketData == null],
  );

  const subscriberUIDToBarSubscriber = useRef<Map<string, BarSubscriber>>(
    new Map(),
  );
  const productIdToSubscriberUIDs = useRef<Map<number, Set<string>>>(new Map());
  // The keys for this map are a concatenation of the product id, a separator, and
  // the resolution interval in seconds. E.g. `${productId}_#_${chartIntervalSeconds}`.
  const chartKeyToLastBar = useRef<Map<string, Bar>>(new Map());

  useUpdateLatestBar({
    currentProductId,
    subscriberUIDToBarSubscriber,
    productIdToSubscriberUIDs,
    chartKeyToLastBar,
  });

  const datafeed = useMemo((): IBasicDataFeed | undefined => {
    if (!vertexClient || !symbolInfoByProductId) {
      return;
    }
    console.debug('[useTradingViewData] Reconstructing TV Datafeed');

    return {
      onReady: (callback) => {
        setTimeout(() => callback(DATAFEED_CONFIGURATION), 0);
      },
      // Not being used, as the symbol can't be switched from the chart itself
      searchSymbols: async () => {},
      // Given a symbol name (from search), return the symbol info
      resolveSymbol: async (
        ticker,
        onSymbolResolvedCallback,
        onResolveErrorCallback,
      ) => {
        // Symbol name is the ticker, which is the stringified product ID
        const marketInfo = symbolInfoByProductId[Number(ticker)];
        if (marketInfo) {
          setTimeout(() => onSymbolResolvedCallback(marketInfo), 0);
        } else {
          setTimeout(() => onResolveErrorCallback('Symbol not found'), 0);
        }
      },
      // Get price data for the given period
      getBars: async (
        symbolInfo,
        resolution,
        periodParams,
        onHistoryCallback,
        onErrorCallback,
      ) => {
        const marketInfo = symbolInfoByProductId[Number(symbolInfo.ticker)];
        if (!marketInfo) {
          onErrorCallback(`Symbol not found: ${JSON.stringify(symbolInfo)}`);
          return;
        }

        const { to, firstDataRequest, countBack } = periodParams;

        console.debug(
          '[useTradingViewData] Requesting bars',
          resolution,
          to,
          countBack,
          firstDataRequest,
        );

        // `to` is in seconds
        const beforeTime = firstDataRequest ? nowInSeconds() : to;

        startProfiling();

        const chartIntervalSeconds = RESOLUTIONS_TO_INTERVALS[resolution];

        vertexClient?.market
          .getCandlesticks({
            productId: marketInfo.productId,
            maxTimeInclusive: beforeTime,
            period: chartIntervalSeconds,
            limit: countBack,
          })
          .then((candlesticks) => {
            console.debug('Fetched candlesticks', candlesticks.length);
            endProfiling();

            const tvCandlesticks = toTVCandlesticks(candlesticks);
            onHistoryCallback(tvCandlesticks, {
              noData: candlesticks.length === 0,
            });

            const bar = last(tvCandlesticks);
            if (!bar || !firstDataRequest) {
              return;
            }

            const lastBarKey = getLastBarMapKey(
              marketInfo.productId,
              chartIntervalSeconds,
            );
            chartKeyToLastBar.current.set(lastBarKey, bar);
          })
          .catch((err) => {
            console.error(
              '[useTradingViewData] Error fetching candlesticks',
              err,
            );
            onErrorCallback(
              `Error fetching data for product ${marketInfo.productId}`,
            );
          });
      },
      // Subscribe to latest price updates
      subscribeBars: (
        symbolInfo,
        resolution,
        onRealtimeCallback,
        subscribeUID,
        onResetCacheNeededCallback,
      ) => {
        const marketInfo = symbolInfoByProductId[Number(symbolInfo.ticker)];
        if (!marketInfo) {
          console.error(
            `[useTradingViewData] Symbol not found for subscribeBars: ${JSON.stringify(
              symbolInfo,
            )}`,
          );
          return;
        }

        console.debug(
          '[useTradingViewData] Subscribing to bars for symbol',
          symbolInfo.name,
          'resolution',
          resolution,
        );

        const chartIntervalSeconds = RESOLUTIONS_TO_INTERVALS[resolution];

        const refetchLatestBar = () => {
          vertexClient?.market
            .getCandlesticks({
              productId: marketInfo.productId,
              maxTimeInclusive: nowInSeconds(),
              period: RESOLUTIONS_TO_INTERVALS[resolution],
              limit: 1,
            })
            .then((candlesticks) => {
              const barSubscriber =
                subscriberUIDToBarSubscriber.current.get(subscribeUID);
              if (!barSubscriber) {
                return;
              }

              const bar = first(candlesticks);
              if (!bar) {
                return;
              }

              const lastBarKey = getLastBarMapKey(
                marketInfo.productId,
                chartIntervalSeconds,
              );
              const lastBar = chartKeyToLastBar.current.get(lastBarKey);

              const tvBar = (() => {
                const fetchedBar = toTVCandlestick(bar);

                if (!lastBar) {
                  console.warn(
                    '[useTradingViewData] No last bar was found for',
                    lastBarKey,
                  );
                  return fetchedBar;
                }

                // If our bar is considered stale, overwrite it with a zero-volume bar.
                const nowTimeSeconds = nowInSeconds();
                if (bar.time.lt(nowTimeSeconds - chartIntervalSeconds * 2)) {
                  // Our overwritten bar should have its time set to the previous period
                  // so that any subsequent bars are guaranteed to have a more recent time
                  // (thus avoiding time violation errors). The only case this won't hold
                  // for is when the indexer is catching up, but this is acceptable for now.
                  // To get to the previous period we:
                  //   1) Take the current time.
                  //   2) Subtract by the ellapsed time of the current period (now % interval).
                  //   3) Subtract by the interval itself.
                  // E.g. given a time of 12:17 and a 15m interval: 12:17 - 2m - 15m = 12:00.
                  const tvBarTimeSeconds =
                    nowTimeSeconds -
                    (nowTimeSeconds % chartIntervalSeconds) -
                    chartIntervalSeconds;

                  return {
                    time: tvBarTimeSeconds * 1000,
                    open: fetchedBar.close,
                    close: fetchedBar.close,
                    high: fetchedBar.close,
                    low: fetchedBar.close,
                    volume: 0,
                  };
                }

                const valueToSync =
                  lastBar.time === fetchedBar.time
                    ? // If we already have a cached bar for the same period, use the
                      // last bar's open for syncing so we don't create an invalid bar.
                      lastBar.open
                    : // Else, sync our fetched bar's open with the previous bar's close
                      // so as to avoid gaps between candles.
                      lastBar.close;

                return syncBarOpenWithValue(fetchedBar, valueToSync);
              })();

              chartKeyToLastBar.current.set(lastBarKey, tvBar);

              barSubscriber.updateLatestBar(
                tvBar,
                'from subscribeBars interval',
              );
            })
            .catch((err) => {
              console.error(
                `[subscribeBars] Error fetching candlesticks in subscriber for product ${marketInfo.productId}`,
                err,
              );
            });
        };

        const updateLatestBar = (bar: Bar, callContext: string) => {
          console.debug(
            '[useTradingViewData] invoking `onRealtimeCallback` with bar',
            toPrintableObject(bar),
            'for product',
            marketInfo.name,
            'resolution',
            resolution,
            callContext,
          );

          onRealtimeCallback(bar);
        };

        const refreshInterval = setInterval(
          refetchLatestBar,
          30 * 1000, // 30s
        );

        subscriberUIDToBarSubscriber.current.set(subscribeUID, {
          chartIntervalSeconds,
          refreshInterval,
          updateLatestBar,
          productId: marketInfo.productId,
        });

        const subscriberUIDs =
          productIdToSubscriberUIDs.current.get(marketInfo.productId) ??
          new Set();
        subscriberUIDs.add(subscribeUID);
        productIdToSubscriberUIDs.current.set(
          marketInfo.productId,
          subscriberUIDs,
        );
      },
      // Unsubscribe to latest price updates
      unsubscribeBars: (subscriberUID) => {
        console.debug(
          '[useTradingViewData] Unsubscribing from bars for ID',
          subscriberUID,
        );

        const barSubscriber =
          subscriberUIDToBarSubscriber.current.get(subscriberUID);
        if (!barSubscriber) {
          return;
        }

        subscriberUIDToBarSubscriber.current.delete(subscriberUID);
        clearInterval(barSubscriber.refreshInterval);

        const subscriberUIDs = productIdToSubscriberUIDs.current.get(
          barSubscriber.productId,
        );

        subscriberUIDs?.delete(subscriberUID);

        if (subscriberUIDs?.size === 0) {
          productIdToSubscriberUIDs.current.delete(barSubscriber.productId);
        }

        const lastBarKey = getLastBarMapKey(
          barSubscriber.productId,
          barSubscriber.chartIntervalSeconds,
        );
        chartKeyToLastBar.current.delete(lastBarKey);
      },
    };
  }, [endProfiling, startProfiling, symbolInfoByProductId, vertexClient]);

  return {
    datafeed,
    symbolInfoByProductId,
  };
}
