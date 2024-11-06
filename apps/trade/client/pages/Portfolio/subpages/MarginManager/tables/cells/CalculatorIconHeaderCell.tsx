import { Header } from '@tanstack/react-table';
import { WithChildren, WithClassnames } from '@vertex-protocol/web-common';
import { Icons } from '@vertex-protocol/web-ui';
import { HeaderCell } from 'client/components/DataTable/cells/HeaderCell';
import { DefinitionTooltip } from 'client/modules/tooltips/DefinitionTooltip/DefinitionTooltip';
import { DefinitionTooltipID } from 'client/modules/tooltips/DefinitionTooltip/definitionTooltipConfig';

interface Props<T> extends WithClassnames, WithChildren {
  header: Header<T, any>;
  definitionTooltipId: DefinitionTooltipID;
}

export function CalculatorIconHeaderCell<T>({
  header,
  definitionTooltipId,
}: Props<T>) {
  return (
    <HeaderCell header={header} className="flex justify-end px-6">
      <DefinitionTooltip
        definitionId={definitionTooltipId}
        tooltipOptions={{ interactive: true, delayHide: 300 }}
        contentWrapperClassName="text-disabled hover:text-text-tertiary"
      >
        <Icons.MathOperationsBold size={16} />
      </DefinitionTooltip>
    </HeaderCell>
  );
}
