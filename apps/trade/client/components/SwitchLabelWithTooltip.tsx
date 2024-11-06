import {
  BaseDefinitionTooltipDecoration,
  Switch,
  SwitchLabelProps,
} from '@vertex-protocol/web-ui';
import { DefinitionTooltip } from 'client/modules/tooltips/DefinitionTooltip/DefinitionTooltip';
import { DefinitionTooltipID } from 'client/modules/tooltips/DefinitionTooltip/definitionTooltipConfig';

interface Props extends SwitchLabelProps {
  definitionId: DefinitionTooltipID;
  decoration?: BaseDefinitionTooltipDecoration;
}

export function SwitchLabelWithTooltip({
  children,
  definitionId,
  decoration,
  ...props
}: Props) {
  return (
    <Switch.Label {...props}>
      <DefinitionTooltip definitionId={definitionId} decoration={decoration}>
        {children}
      </DefinitionTooltip>
    </Switch.Label>
  );
}
