import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { ExportHistoryDateRangeSelector } from 'client/pages/Portfolio/subpages/History/exportHistory/components/ExportHistoryDateRangeSelector';
import { ExportHistorySubmitButton } from 'client/pages/Portfolio/subpages/History/exportHistory/components/ExportHistorySubmitButton';
import { ExportHistoryTypeSelect } from 'client/pages/Portfolio/subpages/History/exportHistory/components/ExportHistoryTypeSelect';
import { useExportHistoryDialog } from 'client/pages/Portfolio/subpages/History/exportHistory/hooks/useExportHistoryDialog';

export function ExportHistoryDialog() {
  const { hide } = useDialog();
  const {
    buttonState,
    endDate,
    nowDate,
    onLastMonthClick,
    onLastWeekClick,
    onLastYearClick,
    onSubmit,
    selectedExportType,
    setEndDate,
    setSelectedExportType,
    setStartDate,
    startDate,
  } = useExportHistoryDialog();

  return (
    <BaseAppDialog.Container onClose={hide}>
      <BaseAppDialog.Title onClose={hide}>Export History</BaseAppDialog.Title>
      <BaseAppDialog.Body>
        <div className="flex flex-col gap-y-8">
          <div className="flex flex-col gap-y-2">
            <div className="text-text-primary text-base">Select date range</div>
            <ExportHistoryDateRangeSelector
              startDate={startDate}
              endDate={endDate}
              nowDate={nowDate}
              onStartDateChange={setStartDate}
              onEndDateChange={setEndDate}
              onLastWeekClick={onLastWeekClick}
              onLastMonthClick={onLastMonthClick}
              onLastYearClick={onLastYearClick}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-text-primary text-base">
              Select history type
            </span>
            <ExportHistoryTypeSelect
              selectedValue={selectedExportType}
              onSelectedValueChange={setSelectedExportType}
            />
          </div>
        </div>
        <ExportHistorySubmitButton state={buttonState} onClick={onSubmit} />
      </BaseAppDialog.Body>
    </BaseAppDialog.Container>
  );
}
