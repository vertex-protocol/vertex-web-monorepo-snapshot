import { toBigDecimal } from '@vertex-protocol/client';
import { useSetPriceInput } from 'client/modules/trading/hooks/useSetPriceInput';
import { debounce } from 'lodash';
import {
  CrossHairMovedEventParams,
  IChartingLibraryWidget,
} from 'public/charting_library/charting_library';
import { useEffect, useRef } from 'react';

interface Params {
  tvWidget: IChartingLibraryWidget | undefined;
  productId: number | undefined;
}

export function useUpdateLimitPriceOnCrosshairClick({
  tvWidget,
  productId,
}: Params) {
  const limitPriceRef = useRef<number>(null);
  const baseSetPriceInput = useSetPriceInput();

  useEffect(() => {
    if (!tvWidget) {
      return;
    }

    const crossHairMovedSubscription = tvWidget.activeChart().crossHairMoved();

    const onMouseDown = () => {
      if (!productId || !limitPriceRef.current) {
        return;
      }

      baseSetPriceInput(productId, toBigDecimal(limitPriceRef.current));
    };

    // Debounce the crosshair moved event to prevent updating limitPriceRef too frequently
    // Doesn't necessarily offer CPU improvements, but prevents unnecessary updates to limitPriceRef
    const onCrosshairMoved = debounce((params: CrossHairMovedEventParams) => {
      limitPriceRef.current = params.price;
    }, 100);

    crossHairMovedSubscription.subscribe(null, onCrosshairMoved);
    tvWidget.subscribe('mouse_down', onMouseDown);

    return () => {
      try {
        crossHairMovedSubscription.unsubscribe(null, onCrosshairMoved);
        tvWidget.unsubscribe('mouse_down', onMouseDown);
      } catch (err) {
        console.debug(
          '[useUpdateLimitPriceOnCrosshairClick] Failed to unsubscribe',
          err,
        );
      }
    };
  }, [baseSetPriceInput, productId, tvWidget]);
}
