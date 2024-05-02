interface Props {
  isSignOnceSelected: boolean;
  hasChangedMode: boolean;
}

export function SignatureTxCountMessage({
  isSignOnceSelected,
  hasChangedMode,
}: Props) {
  const countMessage = (() => {
    if (isSignOnceSelected) {
      // If mode has changed, then we need 2 signatures
      // If mode hasn't changed, we're likely changing "Remember Me" so we just need 1
      return hasChangedMode ? 'Requires 2 signatures' : 'Requires 1 signature';
    }
  })();

  if (!countMessage) {
    return null;
  }

  return <div className="text-text-tertiary text-xs">{countMessage}</div>;
}
