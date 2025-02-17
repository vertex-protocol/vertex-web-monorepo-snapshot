import { BigDecimal, toBigDecimal } from '@vertex-protocol/client';
import {
  formatNumber,
  getMarketSizeFormatSpecifier,
} from '@vertex-protocol/react-client';
import { asyncResult, removeDecimals } from '@vertex-protocol/utils';
import {
  CancelOrdersResult,
  CancelOrdersWithNotificationParams,
} from 'client/hooks/execute/cancelOrder/types';
import { useExecuteCancelOrdersWithNotification } from 'client/hooks/execute/cancelOrder/useExecuteCancelOrdersWithNotification';
import { useExecuteModifyOrder } from 'client/hooks/execute/modifyOrder/useExecuteModifyOrder';
import { StaticMarketData } from 'client/hooks/markets/marketsStaticData/types';
import { useAllMarketsStaticData } from 'client/hooks/markets/marketsStaticData/useAllMarketsStaticData';
import { useSubaccountOpenEngineOrders } from 'client/hooks/query/subaccount/useSubaccountOpenEngineOrders';
import { useSubaccountOpenTriggerOrders } from 'client/hooks/query/subaccount/useSubaccountOpenTriggerOrders';
import { useCanUserExecute } from 'client/hooks/subaccount/useCanUserExecute';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { DialogParams } from 'client/modules/app/dialogs/types';
import { useNotificationManagerContext } from 'client/modules/notifications/NotificationManagerContext';
import { DispatchNotificationParams } from 'client/modules/notifications/types';
import { TradingViewSymbolInfo } from 'client/modules/trading/chart/config/datafeedConfig';
import { isChartSyncedToSymbolInfo } from 'client/modules/trading/chart/utils/isChartSyncedToSymbolInfo';
import { useEnableTradingOrderLines } from 'client/modules/trading/hooks/useEnableTradingOrderLines';
import { OrderType } from 'client/modules/trading/types';
import { getOrderTypeLabel } from 'client/modules/trading/utils/getOrderTypeLabel';
import { getTriggerOrderType } from 'client/modules/trading/utils/getTriggerOrderType';
import {
  getIsIsoEngineOrder,
  getIsIsoTriggerOrder,
} from 'client/modules/trading/utils/isoOrderChecks';
import { COLORS } from 'common/theme/colors';
import { FONTS } from 'common/theme/fonts';
import { debounce, random } from 'lodash';
import {
  IChartingLibraryWidget,
  IChartWidgetApi,
  IOrderLineAdapter,
} from 'public/charting_library/charting_library';
import { useCallback, useEffect, useMemo, useRef } from 'react';

interface Params {
  tvWidget: IChartingLibraryWidget | undefined;
  loadedSymbolInfo: TradingViewSymbolInfo | undefined;
}

interface OrderInfo {
  price: BigDecimal;
  totalAmount: BigDecimal;
  isTrigger: boolean;
  productId: number;
  digest: string;
  orderType: OrderType;
  isIso: boolean;
}

type OrderLineByDigest = Map<string, IOrderLineAdapter>;

// A nested mapping of product ID -> order digest -> order line
type OrderLinesByProductId = Map<number, OrderLineByDigest>;

// Mapping from digest to position, we use this to inherit the position of
// the original digest for the new digest when an order has been modified
const orderLinePositionByDigest = new Map<string, number>();

// Debounce delay when dragging to edit order
const MODIFY_DEBOUNCE_DELAY = 500;

export function useDrawChartOrderLines({ tvWidget, loadedSymbolInfo }: Params) {
  const productId = loadedSymbolInfo?.productId;
  const existingLinesByProductId = useRef<OrderLinesByProductId>(new Map());

  const { enableTradingOrderLines } = useEnableTradingOrderLines();

  const canUserExecute = useCanUserExecute();
  const disableTradingOrderLineActions = !canUserExecute;

  const { data: openEngineOrders } = useSubaccountOpenEngineOrders();
  const { data: openTriggerOrders } = useSubaccountOpenTriggerOrders();

  const { cancelOrdersWithNotification } =
    useExecuteCancelOrdersWithNotification();
  const { mutateAsync: modifyOrderAsync } = useExecuteModifyOrder();

  const { dispatchNotification } = useNotificationManagerContext();

  const { data: marketsStaticData } = useAllMarketsStaticData();

  // When TV Widget reloads, clear any cached lines as they are all removed
  useEffect(() => {
    existingLinesByProductId.current.clear();
  }, [tvWidget]);

  // When a user disables showing order lines, remove all existing lines
  useEffect(() => {
    if (!enableTradingOrderLines) {
      existingLinesByProductId.current.forEach((orderLines) => {
        orderLines.forEach((line) => line.remove());
      });
      existingLinesByProductId.current.clear();
    }
  }, [enableTradingOrderLines]);

  // When order line actions are toggled on or off (eg. due to a chain switch),
  // remove all existing lines so we can recreate them with/without actions.
  useEffect(() => {
    existingLinesByProductId.current.forEach((orderLines) => {
      orderLines.forEach((line) => line.remove());
    });
    existingLinesByProductId.current.clear();
  }, [disableTradingOrderLineActions]);

  // Closest long & closest short, but return an array for extensibility in case we want to change this behavior in the future
  const relevantOrders = useMemo((): OrderInfo[] => {
    // We can skip the expensive computation if order lines are not enabled
    // No components rely on enableTradingOrderLines, only the callback does
    if (!productId || !enableTradingOrderLines) {
      return [];
    }

    const mappedEngineOrders: OrderInfo[] =
      openEngineOrders?.[productId]?.map((engineOrder) => {
        const { price, totalAmount, productId, digest } = engineOrder;

        return {
          isTrigger: false,
          price,
          totalAmount,
          productId,
          digest,
          orderType: 'limit',
          isIso: getIsIsoEngineOrder(engineOrder),
        };
      }) ?? [];

    const mappedTriggerOrders: OrderInfo[] =
      openTriggerOrders?.[productId]?.map((openTriggerOrder) => {
        const { order } = openTriggerOrder;

        return {
          isTrigger: true,
          price: toBigDecimal(order.triggerCriteria.triggerPrice),
          totalAmount: order.amount,
          productId: order.productId,
          digest: order.digest,
          orderType: getTriggerOrderType(openTriggerOrder),
          isIso: getIsIsoTriggerOrder(openTriggerOrder),
        };
      }) ?? [];

    const mappedOrders = [...mappedEngineOrders, ...mappedTriggerOrders];

    // Disable order line drawing if user has more than 20 open orders, this should never really happen for retail, so more relevant
    // for MM's (We want to bound the number of lines drawn on the chart to prevent UI freezing)
    if (mappedOrders.length > 20) {
      return [];
    }

    return mappedOrders;
  }, [enableTradingOrderLines, openEngineOrders, openTriggerOrders, productId]);

  // Upon moving a line, we show a dialog to the user about editing orders via the chart.
  // These values are used qithin `attachOrderLineActions` to show the dialog.
  const { show } = useDialog();

  return useCallback(() => {
    const selectedProductId = loadedSymbolInfo?.productId;

    if (
      !tvWidget ||
      !selectedProductId ||
      !marketsStaticData?.all[selectedProductId]
    ) {
      return;
    }

    const activeChart = tvWidget.activeChart();
    const activeChartSymbol = activeChart.symbol();

    if (!isChartSyncedToSymbolInfo(activeChartSymbol, loadedSymbolInfo)) {
      return;
    }

    const existingOrderLines: OrderLineByDigest =
      existingLinesByProductId.current.get(selectedProductId) ?? new Map();

    const newOrderLines: OrderLineByDigest = new Map();

    // Draw lines for relevant orders if needed
    relevantOrders.forEach((relevantOrder: OrderInfo) => {
      const { digest, price } = relevantOrder;

      const existingLine = existingOrderLines.get(digest);
      if (existingLine) {
        // Replace the line if it already exists
        newOrderLines.set(digest, existingLine);
      } else {
        // Create a new line if it doesn't exist
        console.debug(
          '[useDrawChartOrderLines]: Creating order line:',
          digest,
          price.toNumber(),
        );

        // Create the TV orderline and add it to the map
        const line = createOrderLine(
          activeChart,
          relevantOrder,
          marketsStaticData.all[selectedProductId],
        );

        // Order line positions are spaced out randomly to minimize chances of overlap.
        // Use previously saved value if available, or generate a new one.
        // This is in % units. Starts from 10 and caps out at 100, in increments of 5%.
        const lineHorizontalPosition =
          orderLinePositionByDigest.get(digest) ?? random(18) * 5 + 10;
        orderLinePositionByDigest.set(digest, lineHorizontalPosition);

        // Set distance from orderbox to right-most side of chart
        line.setLineLength(lineHorizontalPosition);

        if (!disableTradingOrderLineActions) {
          attachOrderLineActions({
            line,
            relevantOrder,
            modifyOrderAsync,
            cancelOrdersWithNotification,
            show,
            dispatchNotification,
          });
        }

        newOrderLines.set(digest, line);
      }
    });

    // Remove lines no longer relevant ie) those in existingOrderLines but not in newOrderLines
    existingOrderLines.forEach((line, digest) => {
      if (!newOrderLines.has(digest)) {
        console.debug('[useDrawChartOrderLines]: Removing order line:', digest);
        line.remove();
      }
    });

    existingLinesByProductId.current.set(selectedProductId, newOrderLines);
  }, [
    cancelOrdersWithNotification,
    modifyOrderAsync,
    marketsStaticData?.all,
    relevantOrders,
    disableTradingOrderLineActions,
    loadedSymbolInfo,
    tvWidget,
    show,
    dispatchNotification,
  ]);
}

function createOrderLine(
  activeChart: IChartWidgetApi,
  order: OrderInfo,
  market: StaticMarketData,
): IOrderLineAdapter {
  const { orderType, isIso } = order;
  const price = order.price.toNumber();
  const amount = order.totalAmount;

  // To be rendered in orderbox - ie) 0.1 wETH, 0.4 BTC-PERP.
  // Don't show for TP/SL as they use a max amount.
  const isTpSl = orderType === 'take_profit' || orderType === 'stop_loss';
  const amountText = isTpSl
    ? ''
    : formatNumber(removeDecimals(amount).abs(), {
        formatSpecifier: getMarketSizeFormatSpecifier(market.sizeIncrement),
      });

  const contentText = getOrderTypeLabel(
    orderType,
    isIso ? 'isolated' : 'cross',
  );

  const sideColor = amount.gt(0)
    ? COLORS.positive.DEFAULT
    : COLORS.negative.DEFAULT;

  const sideTextColor = amount.gt(0)
    ? COLORS.positive.muted
    : COLORS.negative.muted;

  return (
    activeChart
      .createOrderLine()
      .setPrice(price)
      // Styling
      .setBodyTextColor(sideTextColor)
      .setBodyBackgroundColor(sideColor)
      .setBodyBorderColor('')
      .setLineStyle(2) // we use 0 (solid) for entry lines, 2 (dashed) for order lines
      .setLineColor(sideColor)
      .setBodyFont(`11px var(${FONTS.default.variable})`)
      .setText(contentText)
      .setQuantity(amountText)
      .setQuantityFont(`11px var(${FONTS.default.variable})`)
      .setQuantityTextColor(sideTextColor)
      .setQuantityBackgroundColor(sideColor)
      .setQuantityBorderColor('')
      .setCancelButtonBackgroundColor(sideColor)
      .setCancelButtonBorderColor('')
      .setCancelButtonIconColor(sideTextColor)
      .setTooltip('Drag to adjust price')
  );
}

interface AttachOrderLineActionsParams {
  line: IOrderLineAdapter;
  relevantOrder: OrderInfo;
  modifyOrderAsync: ReturnType<typeof useExecuteModifyOrder>['mutateAsync'];
  cancelOrdersWithNotification: (
    params: CancelOrdersWithNotificationParams,
  ) => Promise<CancelOrdersResult>;
  show: (dialog: DialogParams) => void;
  dispatchNotification: (params: DispatchNotificationParams) => void;
}

function attachOrderLineActions({
  line,
  relevantOrder,
  modifyOrderAsync,
  cancelOrdersWithNotification,
  show,
  dispatchNotification,
}: AttachOrderLineActionsParams) {
  // Append Drag-to-Edit action to the line
  line.onMove(
    // we debounce here to send the request when the user has stopped dragging
    debounce(async () => {
      // Show the edit order dialog, if the user has already seen it once, the dialog
      // will just return null and the promise will be immediately resolved
      await new Promise<void>((res) => {
        show({ type: 'edit_order_via_chart', params: { onClose: res } });
      });

      const newPrice = toBigDecimal(line.getPrice());
      const {
        productId,
        digest,
        isTrigger,
        orderType,
        price: orderPrice,
      } = relevantOrder;

      const originalLabel = line.getText();
      line.setText('Updating…'); // inline feedback

      const serverExecutionResult = modifyOrderAsync(
        {
          newPrice,
          productId,
          digest,
          orderType,
          isTrigger,
        },
        {
          onSuccess: (result) => {
            // 'modified' order line inherits same position as original order line
            orderLinePositionByDigest.set(result.digest, line.getLineLength());
          },
          onError: () => {
            // modification failed, snap the line back to original price
            line.setPrice(orderPrice.toNumber());
          },
          onSettled: () => {
            line.setText(originalLabel); // revert inline feedback
          },
        },
      );

      dispatchNotification({
        type: 'action_error_handler',
        data: {
          errorNotificationTitle: 'Order Modification Failed',
          executionData: { serverExecutionResult },
        },
      });
    }, MODIFY_DEBOUNCE_DELAY),
  );

  // Append Cancel action to the line
  line.onCancel(async () => {
    const { productId, digest, isTrigger, orderType } = relevantOrder;
    const decimalAdjustedAmount = removeDecimals(relevantOrder.totalAmount);

    const originalLabel = line.getText();
    line.setText('Cancelling…'); // inline feedback

    const result = cancelOrdersWithNotification({
      orders: [
        {
          isTrigger,
          orderType,
          decimalAdjustedTotalAmount: decimalAdjustedAmount,
          productId,
          digest,
        },
      ],
    });

    const [, error] = await asyncResult(result);
    // Revert inline feedback only when there is an error. If the order is successfully cancelled, the line will be removed in a separate event.
    if (error) {
      line.setText(originalLabel);
    }
  });
}
