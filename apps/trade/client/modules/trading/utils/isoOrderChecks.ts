import { EngineOrder } from '@vertex-protocol/engine-client';
import { TriggerOrderInfo } from '@vertex-protocol/trigger-client';
import { isIsoSubaccountHex } from 'client/utils/isIsoSubaccount';

export function getIsIsoEngineOrder(order: EngineOrder) {
  return !!order.margin;
}

export function getIsIsoTriggerOrder(orderInfo: TriggerOrderInfo) {
  return isIsoSubaccountHex(orderInfo.serverOrder.order.sender);
}
