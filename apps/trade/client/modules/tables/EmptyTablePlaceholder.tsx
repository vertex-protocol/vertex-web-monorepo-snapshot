import { WithClassnames } from '@vertex-protocol/web-common';
import { TablePlaceholder } from 'client/components/DataTable/TablePlaceholder';
import { LinkButton } from 'client/components/LinkButton';
import { useVertexMetadataContext } from 'client/context/vertexMetadata/VertexMetadataContext';
import { ROUTES } from 'client/modules/app/consts/routes';
import Link from 'next/link';
import { TriggerOrderEnableOneClickTradingInfo } from '../trading/components/TriggerOrderEnableOneClickTradingInfo';

type TableType =
  | 'trades_history'
  | 'deposits_history'
  | 'withdrawals_history'
  | 'liquidations_history'
  | 'settlements_history'
  | 'trigger_orders_history'
  | 'pools_history'
  | 'realized_pnl_history'
  | 'funding_history'
  | 'rewards_history'
  | 'spot_balances'
  | 'interest_payments'
  | 'perp_positions'
  | 'funding_payments'
  | 'open_limit_orders'
  | 'open_trigger_orders'
  | 'pool_positions'
  | 'spreads'
  | 'quote_balance'
  | 'deposits_and_borrows'
  | 'lba_positions'
  | 'trading_competition';

export function EmptyTablePlaceholder({
  type,
  className,
}: WithClassnames<{
  type: TableType;
}>) {
  const { primaryQuoteToken } = useVertexMetadataContext();

  const placeholderContent = (() => {
    switch (type) {
      // Historical placeholders
      case 'trades_history':
        return 'Your trades will appear here.';
      case 'deposits_history':
        return 'Your deposits will appear here.';
      case 'withdrawals_history':
        return 'Your withdrawals will appear here.';
      case 'liquidations_history':
        return 'Your liquidations will appear here.';
      case 'settlements_history':
        return 'Your settlements will appear here.';
      case 'trigger_orders_history':
        return 'Your historical trigger orders will appear here. 1CT will need to be enabled for trigger orders to be shown.';
      case 'pools_history':
        return 'Your LP events will appear here.';
      case 'realized_pnl_history':
        return 'Your realized PnL events will appear here.';
      case 'funding_history':
        return 'Your funding payments will appear here.';
      case 'rewards_history':
        return 'Your rewards from past epochs will appear here.';

      // Current state placeholders
      case 'spot_balances':
        return 'Your balances will appear here.';
      case 'interest_payments':
        return 'Your interest payments will appear here.';
      case 'perp_positions':
        return 'Your perp positions will appear here.';
      case 'funding_payments':
        return 'Your funding payments will appear here.';
      case 'open_limit_orders':
        return 'Your open limit orders will appear here.';
      case 'open_trigger_orders':
        return (
          <div className="flex flex-col items-start gap-y-3">
            <p>Your open trigger orders will appear here.</p>
            <TriggerOrderEnableOneClickTradingInfo />
          </div>
        );
      case 'pool_positions':
        return (
          <div className="flex flex-col items-start gap-y-1.5">
            <p>Your pool positions will appear here.</p>
            <LinkButton colorVariant="primary" as={Link} href={ROUTES.pools}>
              Provide liquidity
            </LinkButton>
          </div>
        );
      case 'lba_positions':
        return 'Your LBA position will appear here.';
      case 'spreads':
        return 'Your spreads will appear here.';
      case 'quote_balance':
        return `Your ${primaryQuoteToken.symbol} balance will appear here.`;
      case 'deposits_and_borrows':
        return 'Your deposits & borrows will appear here.';

      // Trading comp
      case 'trading_competition':
        return 'No rankings for this competition';
    }
  })();

  return (
    <TablePlaceholder className={className}>
      {placeholderContent}
    </TablePlaceholder>
  );
}
