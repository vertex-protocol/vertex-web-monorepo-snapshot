import { getResolvedColorValue } from 'client/modules/theme/colorVars';
import { WidgetConfig } from 'client/modules/trading/chart/config/types';
import { SaveLoadAdapter } from 'client/modules/trading/chart/SaveLoadAdapter';
import { ResolutionString } from 'public/charting_library/charting_library';

export const WIDGET_CONTAINER_ID: string = 'default-chart-container';

// https://www.tradingview.com/charting-library-docs/latest/customization/styles/CSS-Color-Themes?_highlight=css
const WIDGET_STYLING: WidgetConfig['styling'] = {
  '--tv-color-pane-background': getResolvedColorValue('surface-card'),
  '--tv-color-platform-background': getResolvedColorValue('surface-card'),
  '--tv-color-toolbar-button-background-hover':
    getResolvedColorValue('surface-card'),
  '--tv-color-toolbar-button-background-active':
    getResolvedColorValue('surface-card'),
  '--tv-color-toolbar-button-background-active-hover':
    getResolvedColorValue('surface-card'),
  '--tv-color-toolbar-button-background-secondary-hover':
    getResolvedColorValue('surface-card'),
  '--tv-color-toolbar-button-background-expanded':
    getResolvedColorValue('background'),
  '--tv-color-toolbar-button-text': getResolvedColorValue('text-secondary'),
  '--tv-color-toolbar-button-text-hover': getResolvedColorValue('text-primary'),
  '--tv-color-toolbar-button-text-active': getResolvedColorValue('accent'),
  '--tv-color-toolbar-button-text-active-hover':
    getResolvedColorValue('accent'),
  '--tv-color-item-active-text': getResolvedColorValue('accent'),
  '--tv-color-toolbar-toggle-button-background-active':
    getResolvedColorValue('text-secondary'),
  '--tv-color-toolbar-toggle-button-background-active-hover':
    getResolvedColorValue('text-secondary'),
  '--tv-color-toolbar-divider-background': getResolvedColorValue('stroke'),
  '--tv-color-toolbar-save-layout-loader':
    getResolvedColorValue('surface-card'),
  '--tv-color-popup-background': getResolvedColorValue('surface-card'),
  '--tv-color-popup-element-text': getResolvedColorValue('text-secondary'),
  '--tv-color-popup-element-text-hover': getResolvedColorValue('text-primary'),
  '--tv-color-popup-element-background-hover':
    getResolvedColorValue('surface-card'),
  '--tv-color-popup-element-divider-background':
    getResolvedColorValue('stroke'),
  '--tv-color-popup-element-secondary-text':
    getResolvedColorValue('text-secondary'),
  '--tv-color-popup-element-hint-text': getResolvedColorValue('text-primary'),
  '--tv-color-popup-element-text-active': getResolvedColorValue('text-primary'),
  '--tv-color-popup-element-background-active':
    getResolvedColorValue('surface-card'),
  '--tv-color-popup-element-toolbox-text':
    getResolvedColorValue('text-primary'),
  '--tv-color-popup-element-toolbox-text-hover':
    getResolvedColorValue('text-primary'),
  '--tv-color-popup-element-toolbox-text-active-hover':
    getResolvedColorValue('text-primary'),
  '--tv-color-popup-element-toolbox-background-hover':
    getResolvedColorValue('surface-card'),
  '--tv-color-popup-element-toolbox-background-active-hover':
    getResolvedColorValue('surface-card'),
};

// https://www.tradingview.com/charting-library-docs/latest/customization/overrides/chart-overrides
const WIDGET_OVERRIDES: WidgetConfig['overrides'] = {
  'mainSeriesProperties.style': 1, // Candles = 1 by default
  // Pane properties
  'paneProperties.background': getResolvedColorValue('surface-card'),
  'paneProperties.vertGridProperties.color': getResolvedColorValue('surface-2'),
  'paneProperties.horzGridProperties.color': getResolvedColorValue('surface-2'),
  'paneProperties.backgroundType': 'solid',
  'paneProperties.vertGridProperties.style': 2, // Dashed = 2
  'paneProperties.horzGridProperties.style': 2, // Dashed = 2
  'paneProperties.topMargin': 12,
  'paneProperties.bottomMargin': 12,

  // Candle chart
  'mainSeriesProperties.candleStyle.upColor': getResolvedColorValue('positive'),
  'mainSeriesProperties.candleStyle.borderUpColor':
    getResolvedColorValue('positive'),
  'mainSeriesProperties.candleStyle.wickUpColor':
    getResolvedColorValue('positive'),
  'mainSeriesProperties.candleStyle.downColor':
    getResolvedColorValue('negative'),
  'mainSeriesProperties.candleStyle.borderDownColor':
    getResolvedColorValue('negative'),
  'mainSeriesProperties.candleStyle.wickDownColor':
    getResolvedColorValue('negative'),

  // Hollow Candles chart
  'mainSeriesProperties.hollowCandleStyle.upColor':
    getResolvedColorValue('positive'),
  'mainSeriesProperties.hollowCandleStyle.borderUpColor':
    getResolvedColorValue('positive'),
  'mainSeriesProperties.hollowCandleStyle.downColor':
    getResolvedColorValue('negative'),
  'mainSeriesProperties.hollowCandleStyle.borderDownColor':
    getResolvedColorValue('negative'),
  'mainSeriesProperties.hollowCandleStyle.wickUpColor':
    getResolvedColorValue('positive'),
  'mainSeriesProperties.hollowCandleStyle.wickDownColor':
    getResolvedColorValue('negative'),

  // Heikin Ashi chart
  'mainSeriesProperties.haStyle.upColor': getResolvedColorValue('positive'),
  'mainSeriesProperties.haStyle.downColor': getResolvedColorValue('negative'),
  'mainSeriesProperties.haStyle.borderUpColor':
    getResolvedColorValue('positive'),
  'mainSeriesProperties.haStyle.borderDownColor':
    getResolvedColorValue('negative'),
  'mainSeriesProperties.haStyle.wickUpColor': getResolvedColorValue('positive'),
  'mainSeriesProperties.haStyle.wickDownColor':
    getResolvedColorValue('negative'),

  // Hi-Low chart
  'mainSeriesProperties.hiloStyle.color': getResolvedColorValue('accent'),
  'mainSeriesProperties.hiloStyle.borderColor': getResolvedColorValue('accent'),

  // Bar chart
  'mainSeriesProperties.barStyle.upColor': getResolvedColorValue('positive'),
  'mainSeriesProperties.barStyle.downColor': getResolvedColorValue('negative'),

  // Columns chart
  'mainSeriesProperties.columnStyle.upColor': getResolvedColorValue('positive'),
  'mainSeriesProperties.columnStyle.downColor':
    getResolvedColorValue('negative'),

  // Line & Line with markers chart
  'mainSeriesProperties.lineStyle.color': getResolvedColorValue('accent'),
  'mainSeriesProperties.lineWithMarkersStyle.color':
    getResolvedColorValue('accent'),

  // Step Line chart
  'mainSeriesProperties.steplineStyle.color': getResolvedColorValue('accent'),

  // Area Line chart
  'mainSeriesProperties.areaStyle.color1': getResolvedColorValue('accent'),
  'mainSeriesProperties.areaStyle.color2':
    getResolvedColorValue('surface-card'),
  'mainSeriesProperties.areaStyle.linecolor': getResolvedColorValue('accent'),
  'mainSeriesProperties.areaStyle.transparency': 80,

  // HLC Area chart
  'mainSeriesProperties.hlcAreaStyle.highLineColor':
    getResolvedColorValue('positive'),
  'mainSeriesProperties.hlcAreaStyle.lowLineColor':
    getResolvedColorValue('negative'),
  'mainSeriesProperties.hlcAreaStyle.closeLineColor':
    getResolvedColorValue('accent'),

  // Baseline chart
  'mainSeriesProperties.baselineStyle.topLineColor':
    getResolvedColorValue('positive'),
  'mainSeriesProperties.baselineStyle.bottomLineColor':
    getResolvedColorValue('negative'),

  // Scale properties
  'scalesProperties.fontSize': 10,
};

const WIDGET_OPTIONS: WidgetConfig['options'] = {
  library_path: '/charting_library/',
  container: WIDGET_CONTAINER_ID,
  fullscreen: false,
  autosize: true,
  locale: 'en',
  theme: 'dark',
  interval: '30' as ResolutionString,
  header_widget_buttons_mode: 'fullsize',
  enabled_features: [
    'lock_visible_time_range_on_resize',
    'iframe_loading_compatibility_mode',
  ],
  favorites: {
    intervals: ['1W', '1h', '4h', '1D'] as ResolutionString[],
  },
  disabled_features: [
    'header_compare',
    'show_interval_dialog_on_key_press',
    'header_symbol_search',
    'symbol_search_hot_key',
    'symbol_info',
    'display_market_status',
  ],
  save_load_adapter: new SaveLoadAdapter(), // Save/load technical analysis
  load_last_chart: true,
  auto_save_delay: 5, // In seconds, the minimum recommended is 5
};

export const WIDGET_CONFIG: WidgetConfig = {
  styling: WIDGET_STYLING,
  overrides: WIDGET_OVERRIDES,
  options: WIDGET_OPTIONS,
};
