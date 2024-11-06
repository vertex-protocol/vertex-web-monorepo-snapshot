import { Icons } from '@vertex-protocol/web-ui';
import { ErrorPanel } from 'client/components/ErrorPanel';
import { FastWithdrawFormError } from 'client/modules/collateral/fastWithdraw/hooks/useFastWithdrawForm';

export function FastWithdrawErrorPanel({
  formError,
}: {
  formError: FastWithdrawFormError | undefined;
}) {
  if (!formError) return null;

  const errorContentData = {
    insufficient_liquidity: {
      title: 'Insufficient Liquidity',
      description: 'There is not enough liquidity available for fast withdraw.',
    },
    withdrawal_size_below_minimum_value: {
      title: 'Below Minimum',
      description: 'The withdrawal amount has to be larger than the fee.',
    },
    withdrawal_completed: {
      title: 'Withdrawal Completed',
      description: 'This withdrawal has already been completed.',
    },
  }[formError];

  return (
    <ErrorPanel className="flex flex-col gap-y-2">
      <div className="flex items-center gap-x-1.5">
        <Icons.Warning size={14} />
        {errorContentData.title}
      </div>
      <p>{errorContentData.description}</p>
    </ErrorPanel>
  );
}
