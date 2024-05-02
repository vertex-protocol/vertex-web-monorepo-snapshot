import { mergeClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { NavAccountInfoPinItem } from 'client/modules/navigation/accountInfo/useNavAccountInfoPins';

export function PinnedNavAccountInfoItem({
  value,
  valueClassName,
  label,
}: WithClassnames<NavAccountInfoPinItem>) {
  return (
    <div className="text-2xs flex w-max flex-col items-start justify-center px-1">
      <div className="text-text-tertiary">{label}</div>
      <div className={mergeClassNames('text-text-primary', valueClassName)}>
        {value}
      </div>
    </div>
  );
}
