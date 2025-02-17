import {
  formatNumber,
  NumberFormatSpecifier,
  NumberFormatValue,
} from '@vertex-protocol/react-client';

interface Props {
  label: string;
  value: NumberFormatValue | undefined;
  valueFormatSpecifier: NumberFormatSpecifier;
}

export function StatsPieChartCenterMetric({
  label,
  value,
  valueFormatSpecifier,
}: Props) {
  return (
    <>
      <div className="text-text-secondary text-sm font-medium">{label}</div>
      <div className="text-text-primary text-4xl font-semibold">
        {formatNumber(value, {
          formatSpecifier: valueFormatSpecifier,
        })}
      </div>
    </>
  );
}
