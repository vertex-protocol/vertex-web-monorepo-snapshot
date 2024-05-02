import { TriggerCriteriaType } from '@vertex-protocol/client';

export function getIsTriggerPriceAbove(
  triggerCriteriaType: TriggerCriteriaType,
): boolean {
  if (
    triggerCriteriaType === 'last_price_above' ||
    triggerCriteriaType === 'oracle_price_above'
  ) {
    return true;
  }

  return false;
}
