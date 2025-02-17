import { BigDecimal } from '@vertex-protocol/client';
import { useVertexMetadataContext } from '@vertex-protocol/react-client';
import {
  CustomNumberFormatSpecifier,
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { StackedTableCell } from 'client/components/DataTable/cells/StackedTableCell';
import { TableCellProps } from 'client/components/DataTable/cells/TableCell';

interface Props extends TableCellProps {
  subaccountShareFrac: BigDecimal;
  totalRewards: BigDecimal;
}

export function EpochRewardsPoolCell({
  subaccountShareFrac,
  totalRewards,
  ...rest
}: Props) {
  const {
    protocolTokenMetadata: {
      token: { symbol: protocolTokenSymbol },
    },
  } = useVertexMetadataContext();

  const formattedAmount = formatNumber(totalRewards, {
    formatSpecifier: CustomNumberFormatSpecifier.NUMBER_LARGE_ABBREVIATED,
  });
  const formattedPercentage = formatNumber(subaccountShareFrac, {
    formatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_UPTO_4DP,
  });

  return (
    <StackedTableCell
      top={
        <span className="flex items-center">
          {formattedAmount} {protocolTokenSymbol}
        </span>
      }
      bottom={formattedPercentage}
      {...rest}
    />
  );
}
