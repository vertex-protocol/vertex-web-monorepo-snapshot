import { BigDecimal } from '@vertex-protocol/client';
import {
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { NextImageSrc } from '@vertex-protocol/web-common';
import {
  TableCellProps,
  TableCell,
} from 'client/components/DataTable/cells/TableCell';
import Image from 'next/image';

interface Props extends TableCellProps {
  rank: BigDecimal;
  iconSrc: NextImageSrc | undefined;
}

export function RankCell({ rank, iconSrc, className }: Props) {
  const rankFormatted = formatNumber(rank, {
    formatSpecifier: PresetNumberFormatSpecifier.NUMBER_INT,
  });

  const content = !!iconSrc ? (
    <Image
      src={iconSrc}
      className="h-7 w-auto"
      alt={`Rank #${rankFormatted}`}
    />
  ) : (
    <span className="pl-2.5">{rankFormatted}</span>
  );

  return <TableCell className={className}>{content}</TableCell>;
}
