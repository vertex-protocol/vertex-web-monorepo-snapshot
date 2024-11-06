'use client';

import { ReactNode } from 'react';
import { useIsClient, useWindowSize } from '@vertex-protocol/web-common';

interface Props {
  desktopContent: ReactNode;
  mobileContent: ReactNode;
}

export function HomePage({ desktopContent, mobileContent }: Props) {
  const isClient = useIsClient();
  const { width } = useWindowSize();

  if (isClient && width < 834) {
    return mobileContent;
  }

  return desktopContent;
}
