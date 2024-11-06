import {
  NumberFormatSpecifier,
  PresetNumberFormatSpecifier,
  formatNumber,
} from '@vertex-protocol/react-client';
import { AmountWithSymbol } from 'client/components/AmountWithSymbol';

interface Props {
  amount: number;
  symbol: string;
  formatSpecifier?: NumberFormatSpecifier;
}

export function TradingCompetitionTablePrize({
  amount,
  symbol,
  formatSpecifier = PresetNumberFormatSpecifier.NUMBER_INT,
}: Props) {
  return (
    <AmountWithSymbol
      formattedSize={formatNumber(amount, { formatSpecifier })}
      symbol={symbol}
    />
  );
}
