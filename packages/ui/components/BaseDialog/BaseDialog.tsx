import * as RadixDialog from '@radix-ui/react-dialog';
import {
  hasClass,
  joinClassNames,
  mergeClassNames,
} from '@vertex-protocol/web-common';
import { Z_INDEX } from '../../consts';
import { ConditionalAsChild } from '../ConditionalAsChild';
import { DIALOG_PADDING } from './consts';
import {
  BaseDialogBodyProps,
  BaseDialogFooterProps,
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
      <RadixDialog.Content
        onInteractOutside={(e) => {
          // Prevent radix from handling interaction events outside the content. This is to enable scrolling in popups (ex. walletconnect)
          e.preventDefault();
        }}
        // Need to pass this because we're not using `Radix.Description`.
        // See https://www.radix-ui.com/primitives/docs/components/dialog#description.
        aria-describedby={undefined}
      >
        {/*This div absorbs any click events that propagate to the underlying content*/}
        {/*When the dialog is combined with the Radix select, it seems like the Select "backdrop" allows passthrough of */}
        {/*click events to the underlying content. This div is a workaround to prevent that.*/}
        <div
          className={joinClassNames(
            'pointer-events-auto fixed inset-0',
            Z_INDEX.dialogOverlay,
          )}
        />
        {/*Manually handle the overlay - if modal={false} and we use the overlay, then nothing is rendered*/}
        <div
          className={joinClassNames(
            'from-grad-overlay-dialog-start to-grad-overlay-dialog-end bg-linear-to-b backdrop-blur-[6px]',
            'fixed inset-0 flex items-center justify-center',
            Z_INDEX.dialogContainer,
          )}
          onClick={() => {
            onOpenChange(false);
          }}
        >
          {/* Handle dialog content */}
          <div
            className={mergeClassNames(
              'flex flex-col',
              'z-10 overflow-hidden rounded-xl',
              'bg-surface-card text-text-tertiary',
              'border-stroke shadow-elevation-dialog border',
              'w-100 max-w-[95vw]',
              className,
            )}
            // Stop propagation of click events to the underlying overlay. This prevents dismissal when clicking on the dialog content
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </div>
      </RadixDialog.Content>
    </RadixDialog.Root>
  );
}

function Title({ className, children }: BaseDialogTitleProps) {
  return (
    <RadixDialog.Title
      className={mergeClassNames(
        'text-text-primary title-text text-lg lg:text-xl',
        'border-overlay-divider border-b leading-7',
        DIALOG_PADDING.headerFooterVertical,
        DIALOG_PADDING.horizontal,
        className,
      )}
    >
      {children}
    </RadixDialog.Title>
  );
}

function Body({ children, className, asChild }: BaseDialogBodyProps) {
  return (
    <ConditionalAsChild
      asChild={asChild}
      fallback="div"
      className={mergeClassNames(
        'flex flex-col gap-y-4',
        // Prevent dialog content from overflowing the screen
        'no-scrollbar max-h-[75vh] overflow-x-hidden overflow-y-auto',
        'text-text-secondary text-sm',
        // Leaving hasClass usage for better DX - EditSubaccountProfile overrides default padding but 'sm:px-6' is not being overridden
        !hasClass(className, 'px-') && DIALOG_PADDING.horizontal,
        !hasClass(className, 'py-') && DIALOG_PADDING.bodyVertical,
        className,
      )}
    >
      {children}
    </ConditionalAsChild>
  );
}

function Footer({ className, children }: BaseDialogFooterProps) {
  return (
    <div
      className={mergeClassNames(
        'border-overlay-divider border-t',
        DIALOG_PADDING.headerFooterVertical,
        DIALOG_PADDING.horizontal,
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
  Footer,
};
