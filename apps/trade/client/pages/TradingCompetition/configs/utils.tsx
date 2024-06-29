import {
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { AmountWithSymbol } from 'client/components/AmountWithSymbol';

/**
 * Helper function that returns an `AmountWithSymbol` with the given params.
 * Useful for adding basic prize elements when creating configs.
 */
export function getParticipantPrizeTableElement(
  amount: number,
  symbol: string,
) {
  return (
    <AmountWithSymbol
      formattedSize={formatNumber(amount, {
        formatSpecifier: PresetNumberFormatSpecifier.NUMBER_INT,
      })}
      symbol={symbol}
    />
  );
}
