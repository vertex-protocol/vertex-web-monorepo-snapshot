import { WIDGET_CONFIG } from '../config/widgetConfig';
import { IChartingLibraryWidget } from 'public/charting_library/charting_library';
import { useEffect } from 'react';

export function useApplyWidgetOverrides(tvWidget?: IChartingLibraryWidget) {
  useEffect(() => {
    if (!tvWidget) {
      return;
    }

    tvWidget.applyOverrides(WIDGET_CONFIG.overrides);

    Object.entries(WIDGET_CONFIG.styling).forEach(([property, color]) => {
      tvWidget.setCSSCustomProperty(property, color);
    });

    console.debug(
      '[useApplyWidgetOverrides] Overrides and styling applied to chart',
    );
  }, [tvWidget]);
}
