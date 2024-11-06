import { ProductEngineType } from '@vertex-protocol/contracts';
import { joinClassNames } from '@vertex-protocol/web-common';
import {
  TableCell,
  TableCellProps,
} from 'client/components/DataTable/cells/TableCell';
import { LIQUIDATION_MULTI_BALANCE_CELL_CONTAINER_CLASSNAME } from 'client/pages/Portfolio/subpages/History/components/cells/liquidation/consts';
import { LiquidationInfo } from 'client/pages/Portfolio/subpages/History/components/cells/liquidation/LiquidationAmountInfoCell/components/LiquidationInfo';
import { LpLiquidationInfo } from 'client/pages/Portfolio/subpages/History/components/cells/liquidation/LiquidationAmountInfoCell/components/LpLiquidationInfo';
import { HistoricalLiquidationsTableItem } from 'client/pages/Portfolio/subpages/History/hooks/useHistoricalLiquidationsTable';

type LiquidationAmountInfoCellProps = TableCellProps &
  Pick<HistoricalLiquidationsTableItem, 'spot' | 'perp' | 'decomposedLps'>;

export function LiquidationAmountInfoCell({
  spot,
  perp,
  decomposedLps,
  className,
  ...rest
}: LiquidationAmountInfoCellProps) {
  return (
    <TableCell
      className={joinClassNames(
        LIQUIDATION_MULTI_BALANCE_CELL_CONTAINER_CLASSNAME,
        className,
      )}
      {...rest}
    >
      {decomposedLps.map((decomposedLp) => (
        <LpLiquidationInfo
          key={decomposedLp.sharedMetadata.symbol}
          metadata={{
            base: decomposedLp.sharedMetadata,
            quote: decomposedLp.primaryQuoteToken,
          }}
          amountLp={decomposedLp.amountLpDecomposed}
          lpValueUsd={decomposedLp.lpValueUsd}
          sizeFormatSpecifier={decomposedLp.sizeFormatSpecifier}
        />
      ))}
      {spot && (
        <LiquidationInfo
          productType={ProductEngineType.SPOT}
          productLabel={spot.sharedMetadata.symbol}
          iconSrc={spot.sharedMetadata.icon.asset}
          amountLiquidated={spot.amountLiquidated}
          sizeFormatSpecifier={spot.sizeFormatSpecifier}
          amountLiquidatedValueUsd={spot.liquidatedValueUsd}
          symbol={spot.sharedMetadata.symbol}
        />
      )}
      {perp && (
        <LiquidationInfo
          productType={ProductEngineType.PERP}
          productLabel={perp.sharedMetadata.marketName}
          iconSrc={perp.sharedMetadata.icon.asset}
          amountLiquidated={perp.amountLiquidated}
          sizeFormatSpecifier={perp.sizeFormatSpecifier}
          amountLiquidatedValueUsd={perp.liquidatedValueUsd}
          symbol={perp.sharedMetadata.marketName}
        />
      )}
    </TableCell>
  );
}
