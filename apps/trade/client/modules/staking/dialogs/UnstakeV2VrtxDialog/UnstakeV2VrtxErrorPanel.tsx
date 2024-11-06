import { formatTimestamp, TimeFormatSpecifier } from '@vertex-protocol/web-ui';
import { ErrorPanel } from 'client/components/ErrorPanel';

interface Props {
  availableToUnstakeTimeMillis: number | undefined;
}

export function UnstakeV2VrtxErrorPanel({
  availableToUnstakeTimeMillis,
}: Props) {
  return (
    <ErrorPanel>
      Minimum stake time not met. You can unstake your tokens at{' '}
      {formatTimestamp(availableToUnstakeTimeMillis, {
        formatSpecifier: TimeFormatSpecifier.E_MMM_D_HH_12H,
      })}
    </ErrorPanel>
  );
}
