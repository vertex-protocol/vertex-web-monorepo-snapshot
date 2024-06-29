import { BigDecimal } from '@vertex-protocol/client';
import { NewPill } from 'client/components/NewPill';
import { formatNumber } from '@vertex-protocol/react-client';
import { PresetNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { TokenIconMetadata } from 'common/productMetadata/tokenIcons';
import Image from 'next/image';
import { TableCell } from 'client/components/DataTable/cells/TableCell';

interface Props {
  marketName: string;
  symbol: string;
  icon: TokenIconMetadata;
  volume24h: BigDecimal | undefined;
  isNew: boolean;
}

export function TradingMarketSwitcherProductInfoCell({
  marketName,
  symbol,
  icon,
  volume24h,
  isNew,
}: Props) {
  return (
    <TableCell className="gap-x-2.5">
      <Image src={icon.asset} className="h-auto w-6" alt={symbol} />
      <div className="flex flex-col items-start leading-4">
        <p className="text-text-secondary text-sm">{marketName}</p>
        <p className="text-text-tertiary text-xs">
          {formatNumber(volume24h, {
            formatSpecifier: PresetNumberFormatSpecifier.NUMBER_INT,
          })}
        </p>
      </div>
      {isNew && <NewPill />}
    </TableCell>
  );
}
