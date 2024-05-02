import { Checkbox, CheckboxLabelProps } from '@vertex-protocol/web-ui';
import { DefinitionTooltip } from 'client/modules/tooltips/DefinitionTooltip/DefinitionTooltip';
import { DefinitionTooltipID } from 'client/modules/tooltips/DefinitionTooltip/definitionTooltipConfig';
import React from 'react';

interface Props extends CheckboxLabelProps {
  definitionId: DefinitionTooltipID;
}

export function CheckboxLabelWithTooltip({
  children,
  definitionId,
  ...props
}: Props) {
  return (
    <Checkbox.Label {...props}>
      <DefinitionTooltip definitionId={definitionId}>
        {children}
      </DefinitionTooltip>
    </Checkbox.Label>
  );
}
