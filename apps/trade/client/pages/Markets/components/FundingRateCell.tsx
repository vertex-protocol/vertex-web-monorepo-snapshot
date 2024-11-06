import {
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { TableCell } from 'client/components/DataTable/cells/TableCell';
import { PerpMarketTableItem } from 'client/pages/Markets/hooks/usePerpMarketsTable';
import { marketsPageFundingRatePeriodAtom } from 'client/store/marketsPageStore';
import { signDependentValue } from 'client/utils/signDependentValue';
import { useAtom } from 'jotai';

interface Props {
  value: PerpMarketTableItem['fundingRates'];
}

export function FundingRateCell({ value }: Props) {
  const [fundingRatePeriod] = useAtom(marketsPageFundingRatePeriodAtom);

  const color = signDependentValue(value?.[fundingRatePeriod], {
    positive: 'text-positive',
    negative: 'text-negative',
    zero: 'text-text-primary',
  });

  return (
    <TableCell className={color}>
      {formatNumber(value?.[fundingRatePeriod], {
        formatSpecifier: PresetNumberFormatSpecifier.SIGNED_PERCENTAGE_4DP,
      })}
    </TableCell>
  );
}
