import { RadioGroupIndicator as BaseRadioGroupIndicator } from '@radix-ui/react-radio-group';
import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';

export function RadioGroupIndicator({
  active,
  className,
}: WithClassnames<{ active: boolean }>) {
  return (
    <div
      className={joinClassNames(
        'flex items-center justify-center',
        'h-5 w-5 rounded-full border',
        active
          ? 'bg-primary border-transparent'
          : 'bg-surface-1 border-disabled',
        className,
      )}
    >
      <BaseRadioGroupIndicator className="bg-text-primary h-2 w-2 rounded-full" />
    </div>
  );
}
