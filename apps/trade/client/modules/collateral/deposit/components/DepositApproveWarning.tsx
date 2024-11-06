import { WarningPanel } from 'client/components/WarningPanel';

export function DepositApproveWarning({ symbol }: { symbol: string }) {
  return (
    <WarningPanel>
      Approval for {symbol} is required. You will need to deposit after the
      approval transaction is confirmed.
    </WarningPanel>
  );
}
