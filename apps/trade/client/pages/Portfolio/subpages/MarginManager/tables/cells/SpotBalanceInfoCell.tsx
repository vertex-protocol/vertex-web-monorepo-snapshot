import { BigDecimal } from '@vertex-protocol/client';
import { NextImageSrc, joinClassNames } from '@vertex-protocol/web-common';
import {
  TableCell,
  TableCellProps,
} from 'client/components/DataTable/cells/TableCell';
import { signDependentValue } from '@vertex-protocol/react-client';
import Image from 'next/image';

interface Props extends TableCellProps {
  iconSrc: NextImageSrc;
  symbol: string;
  amount: BigDecimal;
}

export function SpotBalanceInfoCell({
  symbol,
  iconSrc,
  amount,
  className,
  ...rest
}: Props) {
  return (
    <TableCell
      className={joinClassNames('pointer-events-auto gap-x-2', className)}
      {...rest}
    >
      <Image src={iconSrc} width={24} height={24} alt="Asset Icon" />
      <div className="flex flex-col gap-y-0.5">
        <p className="font-medium">{symbol}</p>
        <div className="text-text-tertiary text-2xs">
          {signDependentValue(amount, {
            positive: 'Deposit',
            zero: '',
            negative: 'Borrow',
          })}
        </div>
      </div>
    </TableCell>
  );
}
