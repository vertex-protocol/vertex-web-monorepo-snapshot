import { ChainEnvWithEdge } from '@vertex-protocol/react-client';
import {
  StatsChartConfigByDataKey,
  StatsChartDataItem,
} from 'client/components/charts/StatsChart/types';

type ChainEnvBreakdownStatsChartDataKey = ChainEnvWithEdge | 'edgeCumulative';

export type ChainEnvBreakdownStatsChartDataItem =
  StatsChartDataItem<ChainEnvBreakdownStatsChartDataKey>;

export type ChainEnvBreakdownStatsChartConfigByDataKey =
  StatsChartConfigByDataKey<ChainEnvBreakdownStatsChartDataKey>;
