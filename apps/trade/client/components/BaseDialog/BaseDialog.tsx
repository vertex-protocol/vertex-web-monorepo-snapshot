import * as RadixDialog from '@radix-ui/react-dialog';
import { hasClass, mergeClassNames } from '@vertex-protocol/web-common';
import { Button, Icons } from '@vertex-protocol/web-ui';
import { DIALOG_PADDING } from 'client/components/BaseDialog/consts';
import {
  BaseDialogBodyProps,
  BaseDialogProps,
  BaseDialogTitleProps,
} from './types';

function DialogContainer({
  open,
  onOpenChange,
  className,
  children,
}: BaseDialogProps) {
  return (
    // If modal is true here, click events on the custom overlay div don't work
    <RadixDialog.Root open={open} onOpenChange={onOpenChange} modal={false}>
      {/*This div absorbs any click events that propagate to the underlying content*/}
      {/*When the dialog is combined with the Radix select, it seems like the Select "backdrop" allows passthrough of */}
      {/*click events to the underlying content. This div is a workaround to prevent that.*/}
      <div className="pointer-events-auto fixed inset-0 z-50" />
      {/*Manually handle the overlay - if modal={false} and we use the overlay, then nothing is rendered*/}
      <div
        className="dialog-gradient-overlay fixed inset-0 z-[51] flex items-center justify-center"
        onClick={() => {
          onOpenChange(false);
        }}
      >
        <RadixDialog.Content
          className={mergeClassNames(
            'flex flex-col items-center justify-center',
            'z-10 overflow-hidden rounded-xl',
            'bg-surface-card text-text-tertiary',
            'border-stroke border',
            'w-[400px] max-w-[95vw]',
            className,
          )}
          onInteractOutside={(e) => {
            // Prevent radix from handling interaction events outside the content. This is to enable scrolling in popups (ex. walletconnect)
            e.preventDefault();
          }}
          // Stop propagation of click events to the underlying overlay. This prevents dismissal when clicking on the dialog content
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </RadixDialog.Content>
      </div>
    </RadixDialog.Root>
  );
}

function Title({
  className,
  children,
  endElement,
  onClose,
}: BaseDialogTitleProps) {
  return (
    <RadixDialog.Title
      className={mergeClassNames(
        'flex w-full items-center justify-between gap-x-4',
        'text-text-primary title-text text-lg lg:text-xl',
        'border-overlay-divider/10 border-b leading-7',
        'py-4',
        DIALOG_PADDING.horizontal,
        className,
      )}
    >
      <div className="flex-1">{children}</div>
      {endElement}
      {onClose && (
        <Button
          className="border-stroke bg-surface-card text-text-tertiary rounded border p-1 hover:brightness-110"
          startIcon={<Icons.MdClose />}
          onClick={onClose}
        />
      )}
    </RadixDialog.Title>
  );
}

function Body({ children, className }: BaseDialogBodyProps) {
  return (
    <div
      className={mergeClassNames(
        // Prevent dialog content from overflowing the screen
        'no-scrollbar text-text-secondary max-h-[85vh] w-full overflow-y-auto overflow-x-hidden',
        // Leaving hasClass usage for better DX - EditUserProfile overrides default padding but 'sm:px-6' is not being overriden
        !hasClass(className, 'px-') && DIALOG_PADDING.horizontal,
        !hasClass(className, 'py-') && DIALOG_PADDING.bodyVertical,
        className,
      )}
    >
      {children}
    </div>
  );
}

export const BaseDialog = {
  Container: DialogContainer,
  Title,
  Body,
};
