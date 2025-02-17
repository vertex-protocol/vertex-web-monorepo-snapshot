import { Slot, SlotProps } from '@radix-ui/react-slot';
import { WithRef } from '@vertex-protocol/web-common';
import { ElementType } from 'react';

export interface ConditionalAsChildProps extends WithRef<SlotProps> {
  /** When `true`, the component will use Radix's `Slot` to render `children`. */
  asChild: boolean | undefined;
  /** Can be something like `"div"` or `FallbackComponent`. */
  fallback: ElementType;
}

/**
 * Helper component that either renders `children` directly via Radix's `Slot`
 * (when `asChild` is `true`) or wraps it with the passed in `fallback`.
 *
 * Note, if `children` is not a single node, you need to wrap the child that
 * you want props merged to with Radix's `Slottable`.
 */
export function ConditionalAsChild({
  asChild,
  fallback: Fallback,
  ...props
}: ConditionalAsChildProps) {
  const Comp = asChild ? Slot : Fallback;

  return <Comp {...props} />;
}
