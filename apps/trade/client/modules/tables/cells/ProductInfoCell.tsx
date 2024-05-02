import { joinClassNames } from '@vertex-protocol/web-common';

import { NextImageSrc } from '@vertex-protocol/web-common';
import {
  TableCell,
  TableCellProps,
} from 'client/components/DataTable/cells/TableCell';
import { DefinitionTooltip } from 'client/modules/tooltips/DefinitionTooltip/DefinitionTooltip';
import { DefinitionTooltipID } from 'client/modules/tooltips/DefinitionTooltip/definitionTooltipConfig';
import Image from 'next/image';

interface Props extends TableCellProps {
  iconSrc: NextImageSrc;
  symbol: string;
  definitionTooltipId?: DefinitionTooltipID;
}

export function ProductInfoCell({
  symbol,
  iconSrc,
  definitionTooltipId,
  className,
  ...rest
}: Props) {
  return (
    <TableCell
      className={joinClassNames('pointer-events-auto gap-x-2', className)}
      {...rest}
    >
      <Image src={iconSrc} className="h-auto w-6" alt="Asset Icon" />
      {symbol}
      <DefinitionTooltip
        definitionId={definitionTooltipId}
        decoration={{ icon: { size: 14 } }}
        // Allows USDC tooltip to go over overflow-hidden for tables
        portal
      />
    </TableCell>
  );
}
