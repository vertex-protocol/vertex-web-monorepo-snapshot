import { VertexTx } from '@vertex-protocol/client';

const MAX_UINT32 = 4294967295;

// Finalization events don't represent a liquidation of the user's original balance
// but is rather an adjustment from insurance
// Finalization events have health group == MAX_UINT32
export function isLiquidationFinalizationTx(tx: VertexTx) {
  if ('liquidate_subaccount' in tx) {
    // Health group defined for V1, product ID defined for V2
    return (
      tx.liquidate_subaccount.health_group === MAX_UINT32 ||
      tx.liquidate_subaccount.product_id === MAX_UINT32
    );
  }
  return false;
}
