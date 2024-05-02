import {
  HeaderCell,
  HeaderCellProps,
} from 'client/components/DataTable/cells/HeaderCell';
import { TokenLaunchStage } from 'client/modules/rewards/hooks/useTokenLaunchStage';

interface Props<T> extends HeaderCellProps<T> {
  tokenLaunchStage: TokenLaunchStage | undefined;
}

export function LbaPositionUnlockTimeHeaderCell<T>({
  header,
  tokenLaunchStage,
}: Props<T>) {
  const title = (() => {
    switch (tokenLaunchStage) {
      case 'liquidity_unlock':
        return 'Fully Unlocks On';
      case 'post_launch':
        return 'Fully Unlocked On';
      default:
        return 'Unlock Starts';
    }
  })();

  return <HeaderCell header={header}>{title}</HeaderCell>;
}
