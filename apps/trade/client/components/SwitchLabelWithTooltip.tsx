import { Switch, SwitchLabelProps } from '@vertex-protocol/web-ui';
import { DefinitionTooltip } from 'client/modules/tooltips/DefinitionTooltip/DefinitionTooltip';
import { DefinitionTooltipID } from 'client/modules/tooltips/DefinitionTooltip/definitionTooltipConfig';
import React from 'react';

interface Props extends SwitchLabelProps {
  definitionId: DefinitionTooltipID;
}

export function SwitchLabelWithTooltip({
  children,
  definitionId,
  ...props
}: Props) {
  return (
    <Switch.Label {...props}>
      <DefinitionTooltip definitionId={definitionId}>
        {children}
      </DefinitionTooltip>
    </Switch.Label>
  );
}
