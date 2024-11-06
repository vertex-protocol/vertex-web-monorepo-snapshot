import { Spinner } from '@vertex-protocol/web-ui';

export function SpinnerContainer() {
  return (
    <div className="flex h-full w-full items-center justify-center py-16">
      <Spinner className="text-text-tertiary" />
    </div>
  );
}
