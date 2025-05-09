import { joinClassNames, NextImageSrc } from '@vertex-protocol/web-common';
import {
  TableCell,
  TableCellProps,
} from 'client/components/DataTable/cells/TableCell';
import { NewPill } from 'client/components/NewPill';
import Image from 'next/image';
import { ReactNode } from 'react';

interface Props extends TableCellProps {
  iconSrc: NextImageSrc;
  symbol: string;
  /**
   * Renders a `NEW` pill next to the symbol.
   */
  isNewMarket?: boolean;
  /**
   * Renders an element at the end of the cell
   */
  endElement?: ReactNode;
}

export function MarketProductInfoCell({
  symbol,
  iconSrc,
  isNewMarket,
  endElement,
  className,
}: Props) {
  return (
    <TableCell className={joinClassNames('gap-x-2', className)}>
      <Image src={iconSrc} className="h-6 w-auto" alt={symbol} />
      {/* If there is a "new" pill next to the name, the row may not have enough space, */}
      {/* so render the name and pill as a column on small screens. */}
      <div className="flex flex-col items-start gap-x-1.5 gap-y-0.5 lg:flex-row lg:items-center">
        <p className="font-medium">{symbol}</p>
        {isNewMarket && <NewPill />}
      </div>
      {endElement}
    </TableCell>
  );
}
