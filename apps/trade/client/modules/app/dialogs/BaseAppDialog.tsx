import { joinClassNames } from '@vertex-protocol/web-common';
import {
  IconButton,
  Icons,
  SecondaryButton,
  BaseDialog,
  BaseDialogTitleProps,
  BaseDialogProps,
} from '@vertex-protocol/web-ui';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';

interface DialogContainerProps
  extends Omit<BaseDialogProps, 'open' | 'onOpenChange'> {
  onClose?: () => void;
}

/**
 * Our app dialog only mounts dialogs when they're supposed to be shown, so this is a thin wrapper over BaseDialog
 * that abstracts away the open state
 */
function DialogContainer({ children, onClose, ...rest }: DialogContainerProps) {
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

interface DialogTitleProps extends BaseDialogTitleProps {
  endElement?: React.ReactNode;
  onClose?: () => void;
}

function DialogTitle({
  children,
  onClose,
  endElement,
  className,
  ...rest
}: DialogTitleProps) {
  const { canGoBack, goBack } = useDialog();

  const backButton = canGoBack ? (
    <SecondaryButton
      size="base"
      startIcon={<Icons.CaretLeft size={14} />}
      onClick={goBack}
      className="gap-x-1 py-0 pl-1 pr-2"
    >
      Back
    </SecondaryButton>
  ) : null;

  return (
    <BaseDialog.Title
      className={joinClassNames('flex items-center gap-x-4', className)}
      {...rest}
    >
      <div className="flex flex-1 items-center gap-x-2 lg:gap-x-3">
        {backButton}
        {children}
      </div>
      {endElement}
      {onClose && <IconButton size="sm" icon={Icons.X} onClick={onClose} />}
    </BaseDialog.Title>
  );
}

export const BaseAppDialog = {
  Container: DialogContainer,
  Title: DialogTitle,
  Body: BaseDialog.Body,
  Footer: BaseDialog.Footer,
};
