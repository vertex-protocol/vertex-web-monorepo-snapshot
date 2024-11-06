'use client';

import {
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { Icons, LabelTooltip } from '@vertex-protocol/web-ui';
import { useServerTime } from 'client/hooks/query/useServerTime';

export function LatencyMonitor() {
  const { data, isError, isLoading } = useServerTime();

  const latencyMillis = data?.latencyMillis;
  const icon = (() => {
    if (isError || !latencyMillis) {
      return <Icons.CellSignalSlash size={16} className="text-negative" />;
    }
    if (latencyMillis > 1000) {
      return <Icons.CellSignalLow size={16} className="text-negative" />;
    }
    if (latencyMillis > 500) {
      return <Icons.CellSignalMedium size={16} className="text-warning" />;
    }
    return <Icons.CellSignalFull size={16} className="text-positive" />;
  })();

  const labelContent = (() => {
    if (isError) {
      return `Connection Error`;
    }
    if (isLoading) {
      return `Loading...`;
    }
    return `Latency: ${formatNumber(latencyMillis, {
      formatSpecifier: PresetNumberFormatSpecifier.NUMBER_INT,
    })}ms`;
  })();

  return <LabelTooltip label={labelContent}>{icon}</LabelTooltip>;
}
