import { Toaster } from 'react-hot-toast';
import { SubaccountNotificationsEventEmitter } from 'client/modules/notifications/emitters/SubaccountNotificationsEventEmitter';
import { WithChildren } from '@vertex-protocol/web-common';
import { handleLiquidationNotificationDispatch } from 'client/modules/notifications/handlers/handleLiquidationNotificationDispatch';
import { handleOrderFillNotificationDispatch } from 'client/modules/notifications/handlers/handleOrderFillNotificationDispatch';
import {
  DispatchNotificationParams,
  NotificationDispatchContext,
} from 'client/modules/notifications/types';
import { createContext, useCallback, useContext, useMemo } from 'react';

import { NewFeatureNotificationsEmitter } from 'client/modules/notifications/emitters/NewFeatureNotificationsEmitter';
import { handleNewFeatureNotificationDispatch } from 'client/modules/notifications/handlers/handleNewFeatureNotificationDispatch';
import { useIsSingleSignatureSession } from 'client/modules/singleSignatureSessions/hooks/useIsSingleSignatureSession';
import { handleCancelOrderNotificationDispatch } from './handlers/handleCancelOrderNotificationDispatch';
import { handleClosePositionNotificationDispatch } from './handlers/handleClosePositionNotificationDispatch';
import { handleLiquidationRiskNotificationDispatch } from './handlers/handleLiquidationRiskNotificationDispatch';
import { handleMarginUsageWarningNotificationDispatch } from './handlers/handleMarginUsageWarningNotificationDispatch';
import { handlePlaceOrderNotificationDispatch } from './handlers/handlePlaceOrderNotificationDispatch';
import { handleBridgeDepositNotificationDispatch } from './handlers/handleBridgeDepositNotificationDispatch';
import { useLimitVisibleNotifications } from 'client/modules/notifications/hooks/useLimitVisibleNotifications';
import { handleCancelMultiOrdersNotificationDispatch } from 'client/modules/notifications/handlers/handleCancelMultiOrdersNotificationDispatch';
import { handleActionErrorHandlerNotificationDispatch } from 'client/modules/notifications/handlers/handleActionErrorHandlerNotificationDispatch';
import { handleCloseMultiPositionsNotificationDispatch } from 'client/modules/notifications/handlers/handleCloseMultiPositionsNotificationDispatch';
import { useEnableTradingNotifications } from '../trading/hooks/useEnableTradingNotifications';
import { useSyncedRef } from 'client/hooks/util/useSyncedRef';

type NotificationManagerContextData = {
  dispatchNotification(params: DispatchNotificationParams): void;
};

const NotificationManagerContext =
  createContext<NotificationManagerContextData>(
    {} as NotificationManagerContextData,
  );

// Hook to consume context
export const useNotificationManagerContext = () =>
  useContext(NotificationManagerContext);

export function NotificationManagerContextProvider({ children }: WithChildren) {
  useLimitVisibleNotifications();

  const isSingleSignatureSession = useIsSingleSignatureSession({
    requireActive: true,
  });
  const enableTradingNotificationsRef = useSyncedRef(
    useEnableTradingNotifications().enableTradingNotifications,
  );

  const dispatchContext = useMemo((): NotificationDispatchContext => {
    return {
      isSingleSignature: isSingleSignatureSession,
    };
  }, [isSingleSignatureSession]);

  const dispatchNotification = useCallback(
    (params: DispatchNotificationParams) => {
      switch (params.type) {
        case 'action_error_handler':
          handleActionErrorHandlerNotificationDispatch(params.data);
          break;
        case 'bridge_deposit':
          handleBridgeDepositNotificationDispatch(params.data);
          break;
        case 'cancel_order':
          if (enableTradingNotificationsRef.current) {
            handleCancelOrderNotificationDispatch(params.data, dispatchContext);
          }
          break;
        case 'cancel_multi_orders':
          if (enableTradingNotificationsRef.current) {
            handleCancelMultiOrdersNotificationDispatch(
              params.data,
              dispatchContext,
            );
          }
          break;
        case 'close_multi_positions':
          if (enableTradingNotificationsRef.current) {
            handleCloseMultiPositionsNotificationDispatch(params.data);
          }
          break;
        case 'place_order':
          if (enableTradingNotificationsRef.current) {
            handlePlaceOrderNotificationDispatch(params.data, dispatchContext);
          }
          break;
        case 'close_position':
          if (enableTradingNotificationsRef.current) {
            handleClosePositionNotificationDispatch(
              params.data,
              dispatchContext,
            );
          }
          break;
        case 'order_fill':
          if (enableTradingNotificationsRef.current) {
            handleOrderFillNotificationDispatch(params.data);
          }
          break;
        case 'liquidation_risk_warning':
          handleLiquidationRiskNotificationDispatch(params.data);
          break;
        case 'margin_usage_warning':
          handleMarginUsageWarningNotificationDispatch();
          break;
        case 'liquidation':
          handleLiquidationNotificationDispatch(params.data);
          break;
        case 'new_feature':
          handleNewFeatureNotificationDispatch(params.data);
          break;
      }
    },
    [dispatchContext, enableTradingNotificationsRef],
  );

  const data: NotificationManagerContextData = useMemo(() => {
    return {
      dispatchNotification,
    };
  }, [dispatchNotification]);

  return (
    <NotificationManagerContext.Provider value={data}>
      <Toaster position="bottom-right" gutter={8} />
      <SubaccountNotificationsEventEmitter />
      <NewFeatureNotificationsEmitter />
      {children}
    </NotificationManagerContext.Provider>
  );
}
