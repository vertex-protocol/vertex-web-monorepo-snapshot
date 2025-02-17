'use client';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { joinClassNames } from '@vertex-protocol/web-common';
import { ReactNode } from 'react';

interface TooltipProps {
  /** The element that triggers the tooltip */
  trigger: ReactNode;
  /** The content to show in the tooltip */
  children: ReactNode;
  /** Optional className for the trigger wrapper */
  className?: string;
  /** Tooltip position */
  side?: 'top' | 'right' | 'bottom' | 'left';
  /** Tooltip alignment */
  align?: 'start' | 'center' | 'end';
  /** Delay before showing tooltip (ms) */
  delayDuration?: number;
}

export function Tooltip({
  trigger,
  children,
  className,
  side = 'top',
  align = 'center',
}: TooltipProps) {
  return (
    <TooltipPrimitive.Root>
      <TooltipPrimitive.Trigger asChild>
        <div className={className}>{trigger}</div>
      </TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          side={side}
          align={align}
          className={joinClassNames(
            'bg-primary z-50 overflow-hidden rounded-md px-3 py-1.5',
            'text-primary-foreground animate-in fade-in-0 text-xs',
            'bg-tooltip border-new-website-overlay-8 text-body-12 select-none rounded border px-3 py-1 text-white shadow-md',
          )}
          sideOffset={4}
        >
          {children}
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
}
