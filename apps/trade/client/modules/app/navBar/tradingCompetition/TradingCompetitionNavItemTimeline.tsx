import {
  ValueWithChange,
  formatTimestamp,
  TimeFormatSpecifier,
} from '@vertex-protocol/web-ui';

interface Props {
  startTimeMillis: number;
  endTimeMillis: number;
}

export function TradingCompetitionNavItemTimeline({
  startTimeMillis,
  endTimeMillis,
}: Props) {
  return (
    <ValueWithChange
      sizeVariant="xs"
      currentValue={formatTimestamp(startTimeMillis, {
        formatSpecifier: TimeFormatSpecifier.MONTH_D,
      })}
      newValue={formatTimestamp(endTimeMillis, {
        formatSpecifier: TimeFormatSpecifier.MONTH_D,
      })}
      valueClassName="text-text-tertiary"
    />
  );
}
