import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { SecondaryButton } from '@vertex-protocol/web-ui';
import { DefinitionTooltip } from 'client/modules/tooltips/DefinitionTooltip/DefinitionTooltip';

interface Props extends WithClassnames {
  isWithdrawal: boolean;
  isProcessing: boolean | undefined;
  hasWithdrawPoolLiquidity: boolean;
  onFastWithdrawClick: () => void;
}

export function AccountCenterWithdrawalStatus({
  isWithdrawal,
  isProcessing,
  hasWithdrawPoolLiquidity,
  onFastWithdrawClick,
  className,
}: Props) {
  if (!isWithdrawal || !isProcessing) {
    return null;
  }

  return (
    <div
      className={joinClassNames('flex items-center justify-between', className)}
    >
      <DefinitionTooltip
        contentWrapperClassName="text-accent"
        definitionId="historicalWithdrawalsProcessing"
      >
        Processing
      </DefinitionTooltip>
      {hasWithdrawPoolLiquidity && (
        <SecondaryButton size="xs" onClick={onFastWithdrawClick}>
          Fast Withdraw
        </SecondaryButton>
      )}
    </div>
  );
}
