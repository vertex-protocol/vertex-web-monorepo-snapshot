import {
  ChartingLibraryWidgetOptions,
  Overrides,
} from 'public/charting_library/charting_library';

export interface WidgetConfig {
  // Custom css properties -> colors
  styling: Record<string, string>;
  // Specific overrides for the chart
  overrides: Overrides;
  // Specific options for the chart
  options: Omit<ChartingLibraryWidgetOptions, 'datafeed'>;
}
