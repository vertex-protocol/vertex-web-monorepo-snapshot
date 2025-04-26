import { joinClassNames } from '@vertex-protocol/web-common';
import { Button, getStateOverlayClassNames } from '@vertex-protocol/web-ui';

function SideIcon({
  active,
  side,
}: {
  active: boolean;
  side: 'left' | 'right';
}) {
  // One-off case where we will clip the corners of the overlay using `overflow-hidden`.
  // This is due to the undesired behavior of elements that use `border` and their children
  // having a discrepancy with the border-radius of the parent element after padding is applied.
  const stateOverlayClassNames = getStateOverlayClassNames({});

  return (
    <div
      className={joinClassNames(
        'bg-background flex h-24 w-full overflow-hidden rounded-sm border p-1 sm:h-20',
        side === 'left' ? 'justify-start' : 'justify-end',
        active ? 'border-primary' : ['border-stroke', stateOverlayClassNames],
      )}
    >
      <div
        className={joinClassNames(
          'h-full w-8 rounded-sm',
          active ? 'bg-primary' : 'bg-surface-2',
        )}
      />
    </div>
  );
}

function SideDescription({
  active,
  side,
}: {
  active: boolean;
  side: 'left' | 'right';
}) {
  const sideLabel = side === 'left' ? 'Left' : 'Right';

  return (
    <div className={active ? 'text-text-primary' : 'text-text-tertiary'}>
      <span className="text-sm">{sideLabel}</span>
    </div>
  );
}

export function OrderConsoleLocationButton({
  onSelect,
  active,
  side,
}: {
  onSelect(): void;
  active: boolean;
  side: 'left' | 'right';
}) {
  return (
    <Button
      onClick={onSelect}
      className="flex flex-1 flex-col items-center gap-y-1"
    >
      <SideIcon active={active} side={side} />
      <SideDescription active={active} side={side} />
    </Button>
  );
}
