export function DepositApproveWarning({ symbol }: { symbol: string }) {
  return (
    <div className="text-accent text-xs">
      Approval for {symbol} is required. You will need to deposit after the
      approval transaction is confirmed.
    </div>
  );
}
