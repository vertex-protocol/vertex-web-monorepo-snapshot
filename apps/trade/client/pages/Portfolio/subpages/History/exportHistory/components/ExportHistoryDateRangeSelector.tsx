import { SecondaryButton } from '@vertex-protocol/web-ui';
import { DateInput } from 'client/components/DateInput/DateInput';

interface ExportHistoryDateRangeSelectorProps {
  startDate: Date | undefined;
  endDate: Date | undefined;
  nowDate: Date | undefined;
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
  onLastWeekClick: () => void;
  onLastMonthClick: () => void;
  onLastYearClick: () => void;
}

export function ExportHistoryDateRangeSelector({
  startDate,
  endDate,
  nowDate,
  onStartDateChange,
  onEndDateChange,
  onLastWeekClick,
  onLastMonthClick,
  onLastYearClick,
}: ExportHistoryDateRangeSelectorProps) {
  return (
    <div className="flex flex-col gap-y-2">
      <DateInput
        triggerLabel="Start date"
        triggerPlaceholderText="Choose start date"
        value={startDate}
        onChange={onStartDateChange}
        maxDate={endDate ?? nowDate}
      />
      <DateInput
        triggerLabel="End date"
        triggerPlaceholderText="Choose end date"
        value={endDate}
        onChange={onEndDateChange}
        minDate={startDate}
        maxDate={nowDate}
      />
      <div className="grid grid-cols-3 gap-x-2">
        <SecondaryButton size="xs" onClick={onLastWeekClick}>
          Last Week
        </SecondaryButton>
        <SecondaryButton size="xs" onClick={onLastMonthClick}>
          Last Month
        </SecondaryButton>
        <SecondaryButton size="xs" onClick={onLastYearClick}>
          Last Year
        </SecondaryButton>
      </div>
    </div>
  );
}
