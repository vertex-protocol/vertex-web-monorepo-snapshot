import { NextImageSrc, joinClassNames } from '@vertex-protocol/web-common';
import {
  TableCell,
  TableCellProps,
} from 'client/components/DataTable/cells/TableCell';
import { NewPill } from 'client/components/NewPill';
import Image from 'next/image';

interface Props extends TableCellProps {
  iconSrc: NextImageSrc;
  name: string;
  isNewMarket: boolean;
}

export function MarketProductInfoCell({
  name,
  iconSrc,
  isNewMarket,
  className,
}: Props) {
  return (
    <TableCell className={joinClassNames('gap-x-2.5', className)}>
      <Image src={iconSrc} className="h-6 w-auto" alt={name} />
      {/* If there is a "new" pill next to the name, the row may not have enough space, */}
      {/* so render the name and pill as a column on small screens. */}
      <div className="flex flex-col items-start gap-1.5 lg:flex-row lg:items-center">
        {name}
        {isNewMarket && <NewPill />}
      </div>
    </TableCell>
  );
}
