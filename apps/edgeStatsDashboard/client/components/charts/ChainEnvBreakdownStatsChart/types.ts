import {
  StatsChartConfigByDataKey,
  StatsChartDataItem,
} from 'client/components/charts/StatsChart/types';
import { ChainEnvWithEdge } from 'client/hooks/types';

type ChainEnvBreakdownStatsChartDataKey = ChainEnvWithEdge | 'edgeCumulative';

export type ChainEnvBreakdownStatsChartDataItem =
  StatsChartDataItem<ChainEnvBreakdownStatsChartDataKey>;

export type ChainEnvBreakdownStatsChartConfigByDataKey =
  StatsChartConfigByDataKey<ChainEnvBreakdownStatsChartDataKey>;
