import { commonTooltips } from 'client/modules/tooltips/DefinitionTooltip/content/commonTooltips';
import { dialogTooltips } from 'client/modules/tooltips/DefinitionTooltip/content/dialogTooltips';
import { pageTooltips } from 'client/modules/tooltips/DefinitionTooltip/content/pageTooltips';
import { tableTooltips } from 'client/modules/tooltips/DefinitionTooltip/content/tableTooltips';
import { DefinitionTooltipConfig } from 'client/modules/tooltips/DefinitionTooltip/types';

export const DEFINITION_TOOLTIP_CONFIG_BY_ID = {
  ...pageTooltips,
  ...dialogTooltips,
  ...tableTooltips,
  ...commonTooltips,
} as const satisfies Record<string, DefinitionTooltipConfig>;

export type DefinitionTooltipID = keyof typeof DEFINITION_TOOLTIP_CONFIG_BY_ID;
