import { Header } from '@tanstack/react-table';
import { WithClassnames } from '@vertex-protocol/web-common';
import { DefinitionTooltipID } from 'client/modules/tooltips/DefinitionTooltip/definitionTooltipConfig';

import { HeaderCell } from './HeaderCell';
import { DefinitionTooltip } from 'client/modules/tooltips/DefinitionTooltip/DefinitionTooltip';

export function StackedHeaderCell<T>({
  top,
  bottom,
  header,
  topDefinitionTooltipId,
  bottomDefinitionTooltipId,
  ...rest
}: WithClassnames<{
  header: Header<T, any>;
  top: React.ReactNode;
  bottom: React.ReactNode;
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
