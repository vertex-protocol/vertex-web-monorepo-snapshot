import { ProductEngineType } from '@vertex-protocol/contracts';
import { EngineServerExecuteResult } from '@vertex-protocol/engine-client';
import { BigDecimal, BigDecimalish } from '@vertex-protocol/utils';
import { ExecutePlaceOrderParams } from 'client/hooks/execute/placeOrder/types';
import { ExecuteCloseAllPositionsResult } from 'client/hooks/execute/placeOrder/useExecuteCloseAllPositions';
import { NewFeatureDisclosureKey } from 'client/modules/localstorage/userState/types/userDisclosureTypes';
import { OrderType, PlaceOrderPriceType } from 'client/modules/trading/types';
import { TokenIconMetadata } from 'common/productMetadata/tokenIcons';
import { ContractTransactionResponse } from 'ethers';

// Additional data surrounding user/app state required by notification handlers
export interface NotificationDispatchContext {
  isSingleSignature: boolean;
}

interface OnChainExecutionData {
  txResponsePromise: Promise<ContractTransactionResponse>;
}

interface ServerExecutionData {
  serverExecutionResult: Promise<unknown>;
}

export interface OrderNotificationMetadata {
  icon: TokenIconMetadata;
  symbol: string;
  marketName: string;
  priceIncrement: BigDecimal | undefined;
}

interface OrderActionData {
  executeResult: Promise<EngineServerExecuteResult>;
}

export interface ActionErrorHandlerNotificationData {
  executionData: OnChainExecutionData | ServerExecutionData;
  errorNotificationTitle: string;
}

export interface BridgeDepositNotificationData extends OnChainExecutionData {
  amount: BigDecimalish;
  sourceChainName: string;
  sourceTokenSymbol: string;
}

export interface CancelOrderNotificationData extends ServerExecutionData {
  cancelOrderParams: {
    orderType: OrderType;
    decimalAdjustedAmount: BigDecimal;
    metadata: OrderNotificationMetadata;
    type: ProductEngineType;
  };
}

export interface CancelMultiOrdersNotificationData extends ServerExecutionData {
  numOrders: number;
}

export interface ClosePositionNotificationData extends OrderActionData {
  closePositionParams: {
    fraction: number;
    amount: BigDecimal;
    metadata: OrderNotificationMetadata;
  };
}

export interface PlaceOrderNotificationData extends OrderActionData {
  placeOrderParams: ExecutePlaceOrderParams;
  orderMarketType: ProductEngineType;
  orderPriceType: PlaceOrderPriceType;
  metadata: OrderNotificationMetadata;
}

export interface OrderFillNotificationData {
  isTrigger: boolean;
  digest: string;
  productId: number;
  newOrderFilledAmount: BigDecimal;
  totalAmount: BigDecimal;
  orderType: OrderType;
  fillPrice: BigDecimal;
}

export interface LiquidationNotificationData {
  isSpotLiquidated: boolean;
  isPerpLiquidated: boolean;
  isLpLiquidated: boolean;
}

export interface LiquidationRiskNotificationData {
  liquidationRiskFraction: BigDecimal;
}

export interface CloseMultiPositionsNotificationData {
  executeResult: Promise<ExecuteCloseAllPositionsResult>;
}

// All possible notification types
export type DispatchNotificationParams =
  | {
      // Used for generic actions where a pending / success state isn't needed. Instead, we watch for errors
      // and display a detail notification if an error occurs.
      type: 'action_error_handler';
      data: ActionErrorHandlerNotificationData;
    }
  | {
      type: 'bridge_deposit';
      data: BridgeDepositNotificationData;
    }
  | {
      type: 'cancel_order';
      data: CancelOrderNotificationData;
    }
  | {
      type: 'cancel_multi_orders';
      data: CancelMultiOrdersNotificationData;
    }
  | {
      type: 'place_order';
      data: PlaceOrderNotificationData;
    }
  | {
      type: 'order_fill';
      data: OrderFillNotificationData;
    }
  | {
      type: 'close_position';
      data: ClosePositionNotificationData;
    }
  | {
      type: 'liquidation_risk_warning';
      data: LiquidationRiskNotificationData;
    }
  | {
      type: 'margin_usage_warning';
    }
  | {
      type: 'liquidation';
      data: LiquidationNotificationData;
    }
  | {
      type: 'new_feature';
      data: NewFeatureDisclosureKey;
    }
  | {
      type: 'close_multi_positions';
      data: CloseMultiPositionsNotificationData;
    };

export type NotificationType = DispatchNotificationParams['type'];
