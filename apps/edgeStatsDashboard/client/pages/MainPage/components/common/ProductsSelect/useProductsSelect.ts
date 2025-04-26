import { ProductEngineType } from '@vertex-protocol/client';
import {
  ChainEnvWithEdge,
  TokenIconMetadata,
} from '@vertex-protocol/react-client';
import { SelectValueWithIdentifier, useSelect } from '@vertex-protocol/web-ui';
import { EdgeAnnotatedMarket } from 'client/hooks/types';
import { getMarketName } from 'client/utils/getMarketName';
import { getSpotMarketTokenName } from 'client/utils/getSpotMarketTokenName';
import { first } from 'lodash';
import { useEffect, useMemo, useState } from 'react';

export interface ProductSelectValue extends SelectValueWithIdentifier {
  displayName: string;
  icon: TokenIconMetadata;
  symbol: string;
  productId: number;
  chainEnv: ChainEnvWithEdge;
}

interface Params {
  markets: EdgeAnnotatedMarket[] | undefined;
}

function getProductOptionId(product: EdgeAnnotatedMarket) {
  return `${product.chainEnv}_${product.productId}`;
}

function getProductSelectValue(
  market: EdgeAnnotatedMarket,
): ProductSelectValue {
  if (market.type === ProductEngineType.SPOT) {
    return {
      selectId: getProductOptionId(market),
      displayName: getSpotMarketTokenName(market),
      icon: market.metadata.token.icon,
      symbol: market.metadata.token.symbol,
      productId: market.productId,
      chainEnv: market.chainEnv,
    };
  }

  return {
    selectId: getProductOptionId(market),
    displayName: getMarketName(market),
    icon: market.metadata.icon,
    symbol: market.metadata.symbol,
    productId: market.productId,
    chainEnv: market.chainEnv,
  };
}

export function useProductsSelect({ markets }: Params) {
  const [selectedProduct, setSelectedProduct] = useState<
    ProductSelectValue | undefined
  >();

  const productOptions = useMemo(() => {
    return (
      markets?.map((market) => {
        const productSelectValue = getProductSelectValue(market);

        return {
          label: productSelectValue.displayName,
          value: productSelectValue,
        };
      }) ?? []
    );
  }, [markets]);

  /* If there is no selected product, default to first */
  useEffect(() => {
    if (selectedProduct || !productOptions?.length) {
      return;
    }

    const firstProductOption = first(productOptions);

    setSelectedProduct(firstProductOption?.value);
  }, [productOptions, productOptions?.length, selectedProduct]);

  const {
    selectOptions,
    selectedOption,
    open,
    onValueChange,
    value,
    onOpenChange,
  } = useSelect({
    selectedValue: selectedProduct,
    onSelectedValueChange: setSelectedProduct,
    options: productOptions,
  });

  return {
    selectOptions,
    selectedOption,
    open,
    onValueChange,
    value,
    onOpenChange,
  };
}
