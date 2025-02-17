import {
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { TableCell } from 'client/components/DataTable/cells/TableCell';
import { PerpMarketTableItem } from 'client/pages/Markets/hooks/usePerpMarketsTable';
import { marketsPageFundingRatePeriodAtom } from 'client/store/marketsPageStore';
import { getSignDependentColorClassName } from 'client/utils/ui/getSignDependentColorClassName';
import { useAtom } from 'jotai';

interface Props {
  value: PerpMarketTableItem['fundingRates'];
}

export function FundingRateCell({ value }: Props) {
  const [fundingRatePeriod] = useAtom(marketsPageFundingRatePeriodAtom);

  const color = getSignDependentColorClassName(value?.[fundingRatePeriod]);

  return (
    <TableCell className={color}>
      {formatNumber(value?.[fundingRatePeriod], {
        formatSpecifier: PresetNumberFormatSpecifier.SIGNED_PERCENTAGE_4DP,
      })}
    </TableCell>
  );
}
