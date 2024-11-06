import { WithChildren } from '@vertex-protocol/web-common';
import { useSizeClass } from 'client/hooks/ui/breakpoints';
import { useGetConfirmedTxPromise } from 'client/hooks/util/useGetConfirmedTxPromise';
import { useSyncedRef } from 'client/hooks/util/useSyncedRef';
import { NewFeatureNotificationsEmitter } from 'client/modules/notifications/emitters/NewFeatureNotificationsEmitter';
import { ReferralNotificationsEmitter } from 'client/modules/notifications/emitters/ReferralNotificationsEmitter';
import { SubaccountNotificationsEventEmitter } from 'client/modules/notifications/emitters/SubaccountNotificationsEventEmitter';
import { handleAcceptReferralNotificationDispatch } from 'client/modules/notifications/handlers/handleAcceptReferralNotificationDispatch';
import { handleActionErrorHandlerNotificationDispatch } from 'client/modules/notifications/handlers/handleActionErrorHandlerNotificationDispatch';
import { handleBridgeDepositNotificationDispatch } from 'client/modules/notifications/handlers/handleBridgeDepositNotificationDispatch';
import { handleCancelMultiOrdersNotificationDispatch } from 'client/modules/notifications/handlers/handleCancelMultiOrdersNotificationDispatch';
import { handleCancelOrderNotificationDispatch } from 'client/modules/notifications/handlers/handleCancelOrderNotificationDispatch';
import { handleCloseMultiPositionsNotificationDispatch } from 'client/modules/notifications/handlers/handleCloseMultiPositionsNotificationDispatch';
import { handleClosePositionNotificationDispatch } from 'client/modules/notifications/handlers/handleClosePositionNotificationDispatch';
import { handleLiquidationNotificationDispatch } from 'client/modules/notifications/handlers/handleLiquidationNotificationDispatch';
import { handleLiquidationRiskNotificationDispatch } from 'client/modules/notifications/handlers/handleLiquidationRiskNotificationDispatch';
import { handleMarginUsageWarningNotificationDispatch } from 'client/modules/notifications/handlers/handleMarginUsageWarningNotificationDispatch';
import { handleNewFeatureNotificationDispatch } from 'client/modules/notifications/handlers/handleNewFeatureNotificationDispatch';
import { handleOrderFillNotificationDispatch } from 'client/modules/notifications/handlers/handleOrderFillNotificationDispatch';
import { handlePlaceOrderNotificationDispatch } from 'client/modules/notifications/handlers/handlePlaceOrderNotificationDispatch';
import { useLimitVisibleNotifications } from 'client/modules/notifications/hooks/useLimitVisibleNotifications';
import {
  NotificationManagerContextData,
  NotificationManagerContext,
} from 'client/modules/notifications/NotificationManagerContext';
import {
  DispatchNotificationParams,
  NotificationDispatchContext,
} from 'client/modules/notifications/types';
import { useIsSingleSignatureSession } from 'client/modules/singleSignatureSessions/hooks/useIsSingleSignatureSession';
import { useEnableTradingNotifications } from 'client/modules/trading/hooks/useEnableTradingNotifications';
import { useCallback, useMemo } from 'react';
import { Toaster } from 'react-hot-toast';

export function NotificationManagerContextProvider({ children }: WithChildren) {
  useLimitVisibleNotifications();

  const isSingleSignatureSession = useIsSingleSignatureSession({
    requireActive: true,
  });
  const enableTradingNotificationsRef = useSyncedRef(
    useEnableTradingNotifications().enableTradingNotifications,
  );

  const getConfirmedTxPromise = useGetConfirmedTxPromise();

  const { value: sizeClass } = useSizeClass();

  const dispatchContext = useMemo((): NotificationDispatchContext => {
    return {
      isSingleSignature: isSingleSignatureSession,
      getConfirmedTxPromise,
      sizeClass,
    };
  }, [getConfirmedTxPromise, isSingleSignatureSession, sizeClass]);

  const dispatchNotification = useCallback(
    (params: DispatchNotificationParams) => {
      switch (params.type) {
        case 'action_error_handler':
          handleActionErrorHandlerNotificationDispatch(
            params.data,
            dispatchContext,
          );
          break;
        case 'bridge_deposit':
          handleBridgeDepositNotificationDispatch(params.data, dispatchContext);
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
        case 'accept_referral':
          handleAcceptReferralNotificationDispatch(params.data);
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
      <ReferralNotificationsEmitter />
      {children}
    </NotificationManagerContext.Provider>
  );
}
