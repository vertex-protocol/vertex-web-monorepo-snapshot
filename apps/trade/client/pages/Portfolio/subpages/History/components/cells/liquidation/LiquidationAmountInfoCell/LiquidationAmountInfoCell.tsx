import { ProductEngineType } from '@vertex-protocol/contracts';
import {
  TableCell,
  TableCellProps,
} from 'client/components/DataTable/cells/TableCell';
import { HistoricalLiquidationEvent } from 'client/pages/Portfolio/subpages/History/hooks/useHistoricalLiquidationsTable';
import { LiquidationInfo } from 'client/pages/Portfolio/subpages/History/components/cells/liquidation/LiquidationAmountInfoCell/components/LiquidationInfo';
import { LpLiquidationInfo } from 'client/pages/Portfolio/subpages/History/components/cells/liquidation/LiquidationAmountInfoCell/components/LpLiquidationInfo';
import { LIQUIDATION_MULTI_BALANCE_CELL_CONTAINER_CLASSNAME } from 'client/pages/Portfolio/subpages/History/components/cells/liquidation/consts';
import { joinClassNames } from '@vertex-protocol/web-common';

type LiquidationAmountInfoCellProps = TableCellProps &
  Pick<HistoricalLiquidationEvent, 'spot' | 'perp' | 'decomposedLps'>;

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
          key={decomposedLp.baseMetadata.symbol}
          metadata={{
            base: decomposedLp.baseMetadata,
            quote: decomposedLp.quoteToken,
          }}
          amountLp={decomposedLp.amountLpDecomposed}
          lpValueUsd={decomposedLp.lpValueUsd}
          sizeFormatSpecifier={decomposedLp.sizeFormatSpecifier}
        />
      ))}
      {spot && (
        <LiquidationInfo
          productType={ProductEngineType.SPOT}
          productLabel={spot.baseMetadata.symbol}
          iconSrc={spot.baseMetadata.icon.asset}
          amountLiquidated={spot.amountLiquidated}
          sizeFormatSpecifier={spot.sizeFormatSpecifier}
          amountLiquidatedValueUsd={spot.liquidatedValueUsd}
          symbol={spot.baseMetadata.symbol}
        />
      )}
      {perp && (
        <LiquidationInfo
          productType={ProductEngineType.PERP}
          productLabel={perp.baseMetadata.name}
          iconSrc={perp.baseMetadata.icon.asset}
          amountLiquidated={perp.amountLiquidated}
          sizeFormatSpecifier={perp.sizeFormatSpecifier}
          amountLiquidatedValueUsd={perp.liquidatedValueUsd}
          symbol={perp.baseMetadata.name}
        />
      )}
    </TableCell>
  );
}
