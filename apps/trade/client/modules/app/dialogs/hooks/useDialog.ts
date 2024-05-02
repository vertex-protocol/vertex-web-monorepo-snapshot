import { DialogParams } from 'client/modules/app/dialogs/types';
import { useAtom } from 'jotai';
import { atomWithReset, useResetAtom } from 'jotai/utils';

export const dialogAtom = atomWithReset<DialogParams | undefined>(undefined);

export interface UseDialog {
  currentDialog?: DialogParams;

  hide(): void;

  show(dialog: DialogParams): void;
}

export function useDialog(): UseDialog {
  const [dialog, setDialog] = useAtom(dialogAtom);
  const hide = useResetAtom(dialogAtom);

  return {
    currentDialog: dialog,
    hide,
    show: setDialog,
  };
}
