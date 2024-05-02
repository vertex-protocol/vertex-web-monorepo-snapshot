import { BaseDialog } from 'client/components/BaseDialog/BaseDialog';
import { BaseDialogProps } from 'client/components/BaseDialog/types';

interface Props extends Omit<BaseDialogProps, 'open' | 'onOpenChange'> {
  onClose?: () => void;
}

/**
 * Our app dialog only mounts dialogs when they're supposed to be shown, so this is a thin wrapper over BaseDialog
 * that abstracts away the open state
 */
export function BaseAppDialog({ children, onClose, ...rest }: Props) {
  const onOpenChange = (open: boolean) => {
    if (!open) {
      onClose?.();
    }
  };

  return (
    <BaseDialog.Container open onOpenChange={onOpenChange} {...rest}>
      {children}
    </BaseDialog.Container>
  );
}
