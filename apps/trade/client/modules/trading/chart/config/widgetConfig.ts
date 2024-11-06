import { WidgetConfig } from 'client/modules/trading/chart/config/types';
import { SaveLoadAdapter } from 'client/modules/trading/chart/SaveLoadAdapter';
import { COLORS } from 'common/theme/colors';
import { ResolutionString } from 'public/charting_library/charting_library';

export const WIDGET_CONTAINER_ID: string = 'default-chart-container';

// https://www.tradingview.com/charting-library-docs/latest/customization/styles/CSS-Color-Themes?_highlight=css
const WIDGET_STYLING: WidgetConfig['styling'] = {
  '--tv-color-pane-background': COLORS.surface.card,
  '--tv-color-platform-background': COLORS.surface.card,
  '--tv-color-toolbar-button-background-hover': COLORS.surface.card,
  '--tv-color-toolbar-button-background-active': COLORS.surface.card,
  '--tv-color-toolbar-button-background-active-hover': COLORS.surface.card,
  '--tv-color-toolbar-button-background-secondary-hover': COLORS.surface.card,
  '--tv-color-toolbar-button-background-expanded': COLORS.background.DEFAULT,
  '--tv-color-toolbar-button-text': COLORS.text.secondary,
  '--tv-color-toolbar-button-text-hover': COLORS.text.primary,
  '--tv-color-toolbar-button-text-active': COLORS.accent.DEFAULT,
  '--tv-color-toolbar-button-text-active-hover': COLORS.accent.DEFAULT,
  '--tv-color-item-active-text': COLORS.accent.DEFAULT,
  '--tv-color-toolbar-toggle-button-background-active': COLORS.text.secondary,
  '--tv-color-toolbar-toggle-button-background-active-hover':
    COLORS.text.secondary,
  '--tv-color-toolbar-divider-background': COLORS.stroke.DEFAULT,
  '--tv-color-toolbar-save-layout-loader': COLORS.surface.card,
  '--tv-color-popup-background': COLORS.surface.card,
  '--tv-color-popup-element-text': COLORS.text.secondary,
  '--tv-color-popup-element-text-hover': COLORS.text.primary,
  '--tv-color-popup-element-background-hover': COLORS.surface.card,
  '--tv-color-popup-element-divider-background': COLORS.stroke.DEFAULT,
  '--tv-color-popup-element-secondary-text': COLORS.text.secondary,
  '--tv-color-popup-element-hint-text': COLORS.text.primary,
  '--tv-color-popup-element-text-active': COLORS.text.primary,
  '--tv-color-popup-element-background-active': COLORS.surface.card,
  '--tv-color-popup-element-toolbox-text': COLORS.text.primary,
  '--tv-color-popup-element-toolbox-text-hover': COLORS.text.primary,
  '--tv-color-popup-element-toolbox-text-active-hover': COLORS.text.primary,
  '--tv-color-popup-element-toolbox-background-hover': COLORS.surface.card,
  '--tv-color-popup-element-toolbox-background-active-hover':
    COLORS.surface.card,
};

// https://www.tradingview.com/charting-library-docs/latest/customization/overrides/chart-overrides
const WIDGET_OVERRIDES: WidgetConfig['overrides'] = {
  'mainSeriesProperties.style': 1, // Candles = 1 by default
  // Pane properties
  'paneProperties.background': COLORS.surface.card,
  'paneProperties.vertGridProperties.color': COLORS.surface[2],
  'paneProperties.horzGridProperties.color': COLORS.surface[2],
  'paneProperties.backgroundType': 'solid',
  'paneProperties.vertGridProperties.style': 2, // Dashed = 2
  'paneProperties.horzGridProperties.style': 2, // Dashed = 2
  'paneProperties.topMargin': 12,
  'paneProperties.bottomMargin': 12,

  // Candle chart
  'mainSeriesProperties.candleStyle.upColor': COLORS.positive.DEFAULT,
  'mainSeriesProperties.candleStyle.borderUpColor': COLORS.positive.DEFAULT,
  'mainSeriesProperties.candleStyle.wickUpColor': COLORS.positive.DEFAULT,
  'mainSeriesProperties.candleStyle.downColor': COLORS.negative.DEFAULT,
  'mainSeriesProperties.candleStyle.borderDownColor': COLORS.negative.DEFAULT,
  'mainSeriesProperties.candleStyle.wickDownColor': COLORS.negative.DEFAULT,

  // Hollow Candles chart
  'mainSeriesProperties.hollowCandleStyle.upColor': COLORS.positive.DEFAULT,
  'mainSeriesProperties.hollowCandleStyle.borderUpColor':
    COLORS.positive.DEFAULT,
  'mainSeriesProperties.hollowCandleStyle.downColor': COLORS.negative.DEFAULT,
  'mainSeriesProperties.hollowCandleStyle.borderDownColor':
    COLORS.negative.DEFAULT,
  'mainSeriesProperties.hollowCandleStyle.wickUpColor': COLORS.positive.DEFAULT,
  'mainSeriesProperties.hollowCandleStyle.wickDownColor':
    COLORS.negative.DEFAULT,

  // Heikin Ashi chart
  'mainSeriesProperties.haStyle.upColor': COLORS.positive.DEFAULT,
  'mainSeriesProperties.haStyle.downColor': COLORS.negative.DEFAULT,
  'mainSeriesProperties.haStyle.borderUpColor': COLORS.positive.DEFAULT,
  'mainSeriesProperties.haStyle.borderDownColor': COLORS.negative.DEFAULT,
  'mainSeriesProperties.haStyle.wickUpColor': COLORS.positive.DEFAULT,
  'mainSeriesProperties.haStyle.wickDownColor': COLORS.negative.DEFAULT,

  // Hi-Low chart
  'mainSeriesProperties.hiloStyle.color': COLORS.accent.DEFAULT,
  'mainSeriesProperties.hiloStyle.borderColor': COLORS.accent.DEFAULT,

  // Bar chart
  'mainSeriesProperties.barStyle.upColor': COLORS.positive.DEFAULT,
  'mainSeriesProperties.barStyle.downColor': COLORS.negative.DEFAULT,

  // Columns chart
  'mainSeriesProperties.columnStyle.upColor': COLORS.positive.DEFAULT,
  'mainSeriesProperties.columnStyle.downColor': COLORS.negative.DEFAULT,

  // Line & Line with markers chart
  'mainSeriesProperties.lineStyle.color': COLORS.accent.DEFAULT,
  'mainSeriesProperties.lineWithMarkersStyle.color': COLORS.accent.DEFAULT,

  // Step Line chart
  'mainSeriesProperties.steplineStyle.color': COLORS.accent.DEFAULT,

  // Area Line chart
  'mainSeriesProperties.areaStyle.color1': COLORS.accent.DEFAULT,
  'mainSeriesProperties.areaStyle.color2': COLORS.surface.card,
  'mainSeriesProperties.areaStyle.linecolor': COLORS.accent.DEFAULT,
  'mainSeriesProperties.areaStyle.transparency': 80,

  // HLC Area chart
  'mainSeriesProperties.hlcAreaStyle.highLineColor': COLORS.positive.DEFAULT,
  'mainSeriesProperties.hlcAreaStyle.lowLineColor': COLORS.negative.DEFAULT,
  'mainSeriesProperties.hlcAreaStyle.closeLineColor': COLORS.accent.DEFAULT,

  // Baseline chart
  'mainSeriesProperties.baselineStyle.topLineColor': COLORS.positive.DEFAULT,
  'mainSeriesProperties.baselineStyle.bottomLineColor': COLORS.negative.DEFAULT,

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
