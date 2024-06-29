import { TableCell } from 'client/components/DataTable/cells/TableCell';
import { marketsPageFundingRatePeriodAtom } from 'client/store/marketsPageStore';
import { PresetNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { formatNumber } from '@vertex-protocol/react-client';
import { signDependentValue } from 'client/utils/signDependentValue';
import { useAtom } from 'jotai';
import { PerpMarketTableItem } from '../hooks/usePerpMarketsTable';

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
