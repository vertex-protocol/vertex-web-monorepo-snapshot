import { WithChildren } from '@vertex-protocol/web-common';
import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { TOOLTIP_PORTAL_ROOT_ID } from './tooltipConfig';

export function TooltipPortal({ children }: WithChildren): ReactNode {
  const portalElement =
    typeof document !== 'undefined' &&
    document.getElementById(TOOLTIP_PORTAL_ROOT_ID);

  if (!portalElement) {
    console.warn('No portal found');
    return <>{children}</>;
  }

  return createPortal(children, portalElement);
}
