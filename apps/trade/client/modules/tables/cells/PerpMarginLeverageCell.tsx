import {
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { Icons, TextButton } from '@vertex-protocol/web-ui';
import { StackedTableCell } from 'client/components/DataTable/cells/StackedTableCell';
import { TableCellProps } from 'client/components/DataTable/cells/TableCell';
import { MarginInfoPill } from 'client/components/MarginInfoPill';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { PerpPositionsTableItem } from 'client/modules/tables/hooks/usePerpPositionsTable';
import { getTableButtonOnClickHandler } from 'client/modules/tables/utils/getTableButtonOnClickHandler';

interface Props extends TableCellProps {
  margin: PerpPositionsTableItem['margin'];
  isoSubaccountName: string | undefined;
}

export function PerpMarginLeverageCell({
  margin: { crossMarginUsedUsd, isoMarginUsedUsd, isoLeverage },
  isoSubaccountName,
  ...rest
}: Props) {
  const { show } = useDialog();

  const isIsoPosition = !!isoSubaccountName && !!isoMarginUsedUsd;

  const topContent = (
    <div className="flex items-center">
      {formatNumber(crossMarginUsedUsd ?? isoMarginUsedUsd, {
        formatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
      })}
      {/*Edit margin button for iso positions*/}
      {isIsoPosition && (
        <TextButton
          colorVariant="secondary"
          // Padding to increase hit area
          className="pointer-events-auto pl-1 pr-2"
          onClick={getTableButtonOnClickHandler(() => {
            show({
              type: 'adjust_iso_margin',
              params: { isoSubaccountName },
            });
          })}
        >
          <Icons.PencilSimple />
        </TextButton>
      )}
    </div>
  );

  return (
    <StackedTableCell
      top={topContent}
      bottom={<MarginInfoPill isoLeverage={isoLeverage} />}
      {...rest}
    />
  );
}
