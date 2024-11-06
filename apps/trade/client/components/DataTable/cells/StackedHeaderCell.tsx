import { Header } from '@tanstack/react-table';
import { WithClassnames } from '@vertex-protocol/web-common';
import { HeaderCell } from 'client/components/DataTable/cells/HeaderCell';
import { DefinitionTooltip } from 'client/modules/tooltips/DefinitionTooltip/DefinitionTooltip';
import { DefinitionTooltipID } from 'client/modules/tooltips/DefinitionTooltip/definitionTooltipConfig';
import { ReactNode } from 'react';

export function StackedHeaderCell<T>({
  top,
  bottom,
  header,
  topDefinitionTooltipId,
  bottomDefinitionTooltipId,
  ...rest
}: WithClassnames<{
  header: Header<T, any>;
  top: ReactNode;
  bottom: ReactNode;
  topDefinitionTooltipId?: DefinitionTooltipID;
  bottomDefinitionTooltipId?: DefinitionTooltipID;
}>) {
  return (
    <HeaderCell header={header} {...rest}>
      <div className="flex flex-col gap-y-1">
        <DefinitionTooltip definitionId={topDefinitionTooltipId}>
          {top}
        </DefinitionTooltip>
        <DefinitionTooltip definitionId={bottomDefinitionTooltipId}>
          {bottom}
        </DefinitionTooltip>
      </div>
    </HeaderCell>
  );
}
