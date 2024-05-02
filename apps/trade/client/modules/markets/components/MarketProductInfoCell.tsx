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
  subtitle: string;
  isNewMarket: boolean;
}

export function MarketProductInfoCell({
  name,
  subtitle,
  iconSrc,
  isNewMarket,
  className,
}: Props) {
  return (
    <TableCell className={joinClassNames('gap-x-2.5', className)}>
      <Image src={iconSrc} width={24} height={24} alt={name} />
      <div className="flex flex-col">
        <div className="flex items-center gap-x-1.5">
          {name}
          {isNewMarket && <NewPill />}
        </div>
        <span className="text-text-tertiary">{subtitle}</span>
      </div>
    </TableCell>
  );
}
