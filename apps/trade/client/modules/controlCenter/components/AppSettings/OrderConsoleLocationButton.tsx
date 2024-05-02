import { joinClassNames } from '@vertex-protocol/web-common';
import { Button } from '@vertex-protocol/web-ui';

function SideIcon({
  active,
  side,
}: {
  active: boolean;
  side: 'left' | 'right';
}) {
  return (
    <div
      className={joinClassNames(
        'bg-background flex h-24 w-full rounded border p-1 sm:h-20',
        side === 'left' ? 'justify-start' : 'justify-end',
        active ? 'border-accent' : 'border-stroke hover:brightness-110',
      )}
    >
      <div
        className={joinClassNames(
          'h-full w-8 rounded',
          active ? 'bg-accent' : 'bg-surface-2',
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
      <p className="text-sm">{sideLabel}</p>
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
