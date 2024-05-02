import { BigDecimal } from '@vertex-protocol/utils';
import { Icons } from '@vertex-protocol/web-ui';
import { LineItem } from 'client/components/LineItem/LineItem';
import { formatNumber } from 'client/utils/formatNumber/formatNumber';
import { CustomNumberFormatSpecifier } from 'client/utils/formatNumber/NumberFormatSpecifier';

interface Props {
  amount: BigDecimal | undefined;
  symbol: string | undefined;
}

export function MinimumInitialDepositAmount({ amount, symbol }: Props) {
  if (!amount || !symbol) {
    return null;
  }

  const formattedAmount = formatNumber(amount, {
    formatSpecifier: CustomNumberFormatSpecifier.NUMBER_PRECISE,
  });

  return (
    <LineItem.Base
      className="justify-start gap-x-1 px-0.5"
      label={
        <>
          <Icons.AiOutlineDollarCircle size={16} className="shrink-0" />
          <span>Minimum initial deposit:</span>
        </>
      }
      labelClassName="flex items-center gap-x-1"
      value={`${formattedAmount} ${symbol}`}
    />
  );
}
