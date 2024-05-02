import { useMarket } from 'client/hooks/markets/useMarket';
import { AnnotatedSpotMarket } from 'common/productMetadata/types';
import { QUOTE_PRODUCT_ID } from '@vertex-protocol/contracts';
import { RepayConvertProduct } from 'client/modules/collateral/repay/hooks/useRepayConvertForm/types';

interface Params {
  selectedSourceProduct: RepayConvertProduct | undefined;
  selectedRepayProduct: RepayConvertProduct | undefined;
}

// The market product is the product, either repay or source, with an associated market
export function useRepayConvertMarketData({
  selectedRepayProduct,
  selectedSourceProduct,
}: Params) {
  const isSellOrder = selectedRepayProduct?.productId === QUOTE_PRODUCT_ID;

  // If the repay product is quote, then the market product is the source product
  // If the repay product is NOT quote, then this is the market asset
  const marketProduct = isSellOrder
    ? selectedSourceProduct
    : selectedRepayProduct;

  const { data: market } = useMarket<AnnotatedSpotMarket>({
    productId: marketProduct?.productId,
  });

  return {
    marketProduct,
    market,
    isSellOrder,
  };
}
