import { WithChildren, useIsClient } from '@vertex-protocol/web-common';
import { ReactPortal } from 'react';
import { createPortal } from 'react-dom';
import { TOOLTIP_PORTAL_ROOT_ID } from './tooltipConfig';

export const TooltipPortal = ({
  children,
}: WithChildren): ReactPortal | JSX.Element | null => {
  const isClient = useIsClient();
  if (!isClient) return null;

  const portal = document.getElementById(TOOLTIP_PORTAL_ROOT_ID);
  if (!portal) {
    console.warn('No portal found');
    return <>{children}</>;
  }
  return createPortal(children, portal);
};
