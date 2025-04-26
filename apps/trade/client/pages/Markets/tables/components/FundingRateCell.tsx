import {
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { TableCell } from 'client/components/DataTable/cells/TableCell';
import { PerpMarketTableItem } from 'client/pages/Markets/hooks/usePerpMarketsTable';
import { getSignDependentColorClassName } from 'client/utils/ui/getSignDependentColorClassName';
import { useFundingRatePeriod } from 'client/modules/trading/hooks/useFundingRatePeriod';

interface Props {
  value: PerpMarketTableItem['fundingRates'];
}

export function FundingRateCell({ value }: Props) {
  const { fundingRatePeriod } = useFundingRatePeriod();

  const color = getSignDependentColorClassName(value?.[fundingRatePeriod]);

  return (
    <TableCell className={color}>
      {formatNumber(value?.[fundingRatePeriod], {
        formatSpecifier: PresetNumberFormatSpecifier.SIGNED_PERCENTAGE_4DP,
      })}
    </TableCell>
  );
}
