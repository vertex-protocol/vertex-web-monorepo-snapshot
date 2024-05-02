import { ProductEngineType } from '@vertex-protocol/contracts';
import {
  TableCell,
  TableCellProps,
} from 'client/components/DataTable/cells/TableCell';
import { MarketInfoCellData } from 'client/modules/tables/types/MarketInfoCellData';
import { MarketInfoWithSide } from 'client/components/MarketInfoWithSide';

interface Props extends TableCellProps {
  marketInfo: MarketInfoCellData;
  alwaysShowOrderDirection: boolean;
}

export function MarketInfoWithSideCell({
  className,
  alwaysShowOrderDirection,
  marketInfo,
  ...rest
}: Props) {
  const { marketName, icon, amountForSide, productType } = marketInfo;

  const isPerp = productType === ProductEngineType.PERP;

  return (
    <TableCell {...rest}>
      <MarketInfoWithSide
        className={className}
        isPerp={isPerp}
        alwaysShowOrderDirection={alwaysShowOrderDirection}
        marketName={marketName}
        iconSrc={icon.asset}
        amountForSide={amountForSide}
      />
    </TableCell>
  );
}
