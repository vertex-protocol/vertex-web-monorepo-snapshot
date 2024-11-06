import { ReactNode } from 'react';

export interface NavPopoverContestItem {
  title: ReactNode;
  startTimeMillis: number;
  endTimeMillis: number;
  href: string;
}
