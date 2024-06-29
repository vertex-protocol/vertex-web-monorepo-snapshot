import {
  ReferenceType,
  UseFloatingOptions,
  safePolygon,
  useFloating,
  useHover,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
} from '@floating-ui/react';

export function useHoverPopover(params?: UseFloatingOptions<ReferenceType>) {
  const { refs, floatingStyles: contentStyles, context } = useFloating(params);

  const {
    reference: triggerRef,
    setReference: setTriggerRef,
    floating: contentRef,
    setFloating: setContentRef,
  } = refs;

  const click = useClick(context, {
    // click (press) behavior is used on mobile / tablet.
    ignoreMouse: true,
  });
  const hover = useHover(context, {
    handleClose: safePolygon(),
    // hover is used on desktop.
    mouseOnly: true,
  });
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const {
    getReferenceProps: getTriggerProps,
    getFloatingProps: getContentProps,
  } = useInteractions([click, hover, dismiss, role]);

  return {
    triggerRef,
    setTriggerRef,
    getTriggerProps,
    contentRef,
    setContentRef,
    getContentProps,
    contentStyles,
  };
}
