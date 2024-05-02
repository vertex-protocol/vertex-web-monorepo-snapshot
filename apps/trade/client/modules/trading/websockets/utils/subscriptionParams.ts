import { VertexClient } from '@vertex-protocol/client';

export function getBookDepthSubscriptionParams(
  vertexClient: VertexClient,
  productId: number,
) {
  return vertexClient.ws.subscription.buildSubscriptionParams('book_depth', {
    product_id: productId,
  });
}

export function getMarketTradeSubscriptionParams(
  vertexClient: VertexClient,
  productId: number,
) {
  return vertexClient.ws.subscription.buildSubscriptionParams('trade', {
    product_id: productId,
  });
}
