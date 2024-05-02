import { Icons } from '@vertex-protocol/web-ui';
import { TOAST_HEADER_ICON_SIZE } from 'client/components/Toast/consts';

export function PartialFillIcon() {
  return (
    <Icons.FaCircleHalfStroke
      className="text-positive"
      size={TOAST_HEADER_ICON_SIZE}
    />
  );
}
