import { TabsTrigger } from '@radix-ui/react-tabs';
import {
  WithChildren,
  WithClassnames,
  mergeClassNames,
} from '@vertex-protocol/web-common';
import { CounterPill, TextButton } from '@vertex-protocol/web-ui';
import { TabIdentifiable } from 'client/hooks/ui/tabs/types';

export interface TableTabProps<TTabID extends string>
  extends WithChildren,
    WithClassnames,
    TabIdentifiable<TTabID> {
  isSelected: boolean;
  associatedCount?: number;
}

export function TradingTableTabsTrigger<TTabID extends string>({
  isSelected,
  id,
  children,
  className,
  associatedCount,
}: TableTabProps<TTabID>) {
  return (
    <TabsTrigger asChild value={id}>
      <TextButton
        id={id}
        className={mergeClassNames('px-4 py-1.5 text-xs', className)}
        active={isSelected}
        endIcon={
          !!associatedCount && (
            <CounterPill>{associatedCount.toFixed()}</CounterPill>
          )
        }
      >
        {children}
      </TextButton>
    </TabsTrigger>
  );
}
