import { useKeyPress } from 'ahooks';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';

export function useOpenCommandCenterOnKeyPress() {
  const { show } = useDialog();

  const openCommandCenter = (e: KeyboardEvent) => {
    // If the user is typing somewhere, let them type a "/".
    if (document.activeElement?.tagName === 'INPUT') {
      return;
    }

    show({ type: 'command_center', params: {} });

    // Prevents "/" from being set as the value of the command center's input.
    e.preventDefault();
  };

  useKeyPress('forwardSlash', openCommandCenter);
}
