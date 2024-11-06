import { DialogParams } from 'client/modules/app/dialogs/types';
import { useAtom } from 'jotai';
import { atomWithReset, useResetAtom } from 'jotai/utils';
import { useCallback } from 'react';

interface DialogParamsLinkedListNode {
  currentDialog: DialogParams;
  prevDialogNode: DialogParamsLinkedListNode | null;
}

const dialogAtom = atomWithReset<DialogParamsLinkedListNode | null>(null);

export interface UseDialog {
  // Current dialog on stack
  currentDialog: DialogParams | undefined;
  // Hide the current dialog, clear the dialog stack
  hide(): void;
  // Show a dialog without pushing it to the stack, clear the dialog stack
  show(dialog: DialogParams): void;
  // Push to the dialog stack
  push(dialog: DialogParams): void;
  // Go back to the previous dialog in the stack, dismiss if no previous dialog
  goBack: () => void;
  // Whether there is a previous dialog in the stack to go back to
  canGoBack: boolean;
}

export function useDialog(): UseDialog {
  const [dialogHead, setDialogHead] = useAtom(dialogAtom);
  const hide = useResetAtom(dialogAtom);

  const show = useCallback(
    (newDialog: DialogParams) => {
      setDialogHead({ currentDialog: newDialog, prevDialogNode: null });
    },
    [setDialogHead],
  );

  const push = useCallback(
    (newDialog: DialogParams) => {
      setDialogHead((currentDialogNode) => ({
        currentDialog: newDialog,
        prevDialogNode: currentDialogNode,
      }));
    },
    [setDialogHead],
  );

  const goBack = useCallback(() => {
    if (dialogHead) {
      setDialogHead(dialogHead.prevDialogNode);
    } else {
      setDialogHead(null);
    }
  }, [dialogHead, setDialogHead]);

  const canGoBack = !!dialogHead?.prevDialogNode;

  return {
    currentDialog: dialogHead?.currentDialog,
    hide,
    show,
    push,
    goBack,
    canGoBack,
  };
}
