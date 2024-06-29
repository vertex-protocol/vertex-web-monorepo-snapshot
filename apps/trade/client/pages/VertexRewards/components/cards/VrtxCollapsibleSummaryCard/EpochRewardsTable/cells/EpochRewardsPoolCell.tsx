import { BigDecimal } from '@vertex-protocol/client';
import { StackedTableCell } from 'client/components/DataTable/cells/StackedTableCell';
import { TableCellProps } from 'client/components/DataTable/cells/TableCell';
import {
  CustomNumberFormatSpecifier,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { formatNumber } from '@vertex-protocol/react-client';
import { VRTX_TOKEN_INFO } from 'common/productMetadata/vertexTokenInfo';

interface Props extends TableCellProps {
  subaccountShareFrac: BigDecimal;
  totalRewards: BigDecimal;
}

export function EpochRewardsPoolCell({
  subaccountShareFrac,
  totalRewards,
  ...rest
}: Props) {
  const formattedAmount = formatNumber(totalRewards, {
    formatSpecifier: CustomNumberFormatSpecifier.NUMBER_LARGE_ABBREVIATED,
  });
  const formattedPercentage = formatNumber(subaccountShareFrac, {
    formatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_UPTO_4DP,
  });

  return (
    <StackedTableCell
      top={
        <span className="flex items-center gap-x-1">
          {formattedAmount}
          <span className="text-text-tertiary">{VRTX_TOKEN_INFO.symbol}</span>
        </span>
      }
      bottom={formattedPercentage}
      {...rest}
    />
  );
}
