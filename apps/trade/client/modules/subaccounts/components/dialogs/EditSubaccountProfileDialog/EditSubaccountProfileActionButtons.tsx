import { WithClassnames, joinClassNames } from '@vertex-protocol/web-common';
import { Button, PrimaryButton } from '@vertex-protocol/web-ui';

interface Props {
  resetChanges: () => void;
  isFormDirty: boolean;
}

export function EditSubaccountProfileActionButtons({
  className,
  resetChanges,
  isFormDirty,
}: WithClassnames<Props>) {
  return (
    <div className={joinClassNames(`flex flex-col gap-y-1`, className)}>
      <PrimaryButton type="submit" disabled={!isFormDirty}>
        Save
      </PrimaryButton>
      {isFormDirty && (
        <Button
          className="text-text-secondary hover:text-text-primary border-0 pt-2 text-sm"
          onClick={resetChanges}
        >
          Reset Changes
        </Button>
      )}
    </div>
  );
}
