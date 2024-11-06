import { ErrorPanel } from 'client/components/ErrorPanel';
import { RepayConvertFormErrorType } from 'client/modules/collateral/repay/hooks/useRepayConvertForm/types';

export function RepayConvertFormErrorPanel({
  formError,
}: {
  formError: RepayConvertFormErrorType | undefined;
}) {
  const content = (() => {
    switch (formError) {
      case 'no_available_source':
        return 'No available balances to convert.';
      case 'not_borrowing':
        return 'You are not borrowing this asset.';
      default:
        return;
    }
  })();

  if (!content) {
    return null;
  }

  return <ErrorPanel>{content}</ErrorPanel>;
}
