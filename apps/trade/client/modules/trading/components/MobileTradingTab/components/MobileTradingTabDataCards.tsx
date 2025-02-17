import { WithChildren } from '@vertex-protocol/web-common';
import { SpinnerContainer } from 'client/components/SpinnerContainer';
import {
  EmptyTablePlaceholder,
  EmptyPlaceholderTableType,
} from 'client/modules/tables/EmptyTablePlaceholder';

interface Props extends WithChildren {
  isLoading: boolean;
  hasData: boolean;
  type: EmptyPlaceholderTableType;
}

export function MobileTradingTabDataCards({
  isLoading,
  hasData,
  type,
  children,
}: Props) {
  if (isLoading) {
    return <SpinnerContainer />;
  }

  if (!hasData) {
    return <EmptyTablePlaceholder className="py-1 text-xs" type={type} />;
  }

  return <div className="flex flex-col gap-y-2">{children}</div>;
}
