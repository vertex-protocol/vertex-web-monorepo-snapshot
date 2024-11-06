import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { clientEnv } from 'common/environment/clientEnv';

export function AppVersion({ className }: WithClassnames) {
  return (
    <span className={joinClassNames('text-text-tertiary', className)}>
      {clientEnv.base.buildId}
    </span>
  );
}
