import {
  CustomNumberFormatSpecifier,
  formatNumber,
} from '@vertex-protocol/react-client';
import { BigDecimal } from '@vertex-protocol/utils';
import { Icons } from '@vertex-protocol/web-ui';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';

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
    <ValueWithLabel.Horizontal
      fitWidth
      sizeVariant="xs"
      labelStartIcon={Icons.AiOutlineDollarCircle}
      label="Minimum initial deposit:"
      valueContent={`${formattedAmount} ${symbol}`}
    />
  );
}
