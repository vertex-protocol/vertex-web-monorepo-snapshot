import { offset } from '@floating-ui/react';
import { useHoverPopover } from 'client/hooks/ui/useHoverPopover';
import { NavPopoverContentContainer } from 'client/modules/app/navBar/components/NavPopoverContentContainer';
import { ReactNode } from 'react';

interface Props {
  triggerContent: ReactNode;
  popoverContent: ReactNode;
  popoverClassName?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function DesktopNavCustomPopover({
  triggerContent,
  popoverContent,
  popoverClassName,
  open,
  setOpen,
}: Props) {
  const {
    setTriggerRef,
    getTriggerProps,
    setContentRef,
    contentStyles,
    getContentProps,
  } = useHoverPopover({
    open,
    onOpenChange: setOpen,
    placement: 'bottom-start',
    middleware: [offset({ mainAxis: 6 })],
  });

  return (
    <>
      <div ref={setTriggerRef} {...getTriggerProps()}>
        {triggerContent}
      </div>
      {open && (
        <NavPopoverContentContainer
          ref={setContentRef}
          style={contentStyles}
          className={popoverClassName}
          {...getContentProps()}
        >
          {popoverContent}
        </NavPopoverContentContainer>
      )}
    </>
  );
}
