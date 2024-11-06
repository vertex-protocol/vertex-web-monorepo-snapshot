import {
  LatestOrderFill,
  LatestOrderFillsForProductParams,
  useLatestOrderFillsForProduct,
} from 'client/hooks/query/markets/useLatestOrderFillsForProduct';
import { first } from 'lodash';

interface Params {
  productId?: number;
}

const select: LatestOrderFillsForProductParams<
  LatestOrderFill | undefined
>['select'] = (data) => first(data);

export function useLatestOrderFill({ productId }: Params) {
  return useLatestOrderFillsForProduct({
    productId,
    select,
  });
}
