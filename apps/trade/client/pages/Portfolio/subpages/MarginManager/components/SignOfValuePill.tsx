import { BigDecimal } from '@vertex-protocol/client';
import { WithClassnames, joinClassNames } from '@vertex-protocol/web-common';
import { Icons } from '@vertex-protocol/web-ui';
import { signDependentValue } from 'client/utils/signDependentValue';

interface Props {
  value: BigDecimal;
}

export function SignOfValuePill({ value, className }: WithClassnames<Props>) {
  return (
    <div
      className={joinClassNames(
        'flex h-3.5 w-3.5 items-center justify-center rounded',
        signDependentValue(value, {
          positive: 'text-positive bg-positive-muted',
          negative: 'text-negative bg-negative-muted',
          zero: 'bg-surface-3 text-text-tertiary',
        }),
        className,
      )}
    >
      {signDependentValue(value, {
        positive: <Icons.BiPlus />,
        negative: <Icons.BiMinus />,
        zero: <Icons.BsDot />,
      })}
    </div>
  );
}
