import { useVertexMetadataContext } from '@vertex-protocol/react-client';
import {
  BaseDefinitionTooltip,
  BaseDefinitionTooltipDecoration,
  BaseDefinitionTooltipProps,
  ConditionalAsChild,
} from '@vertex-protocol/web-ui';
import {
  DEFINITION_TOOLTIP_CONFIG_BY_ID,
  DefinitionTooltipID,
} from 'client/modules/tooltips/DefinitionTooltip/definitionTooltipConfig';
import { DefinitionTooltipContent } from 'client/modules/tooltips/DefinitionTooltip/types';
import { ReactNode } from 'react';

interface Props
  extends Pick<
    BaseDefinitionTooltipProps,
    'contentWrapperClassName' | 'tooltipOptions' | 'asChild' | 'noHelpCursor'
  > {
  /**
   * This is optional as there are many usecases where we may or may not show a tooltip in an array-based rendering pattern.
   * If this is not specified, no tooltip is rendered and children are returned as-is.
   */
  definitionId?: DefinitionTooltipID;
  children?: ReactNode;
  /** Additional decorations, such as an underline or info icon, to apply to the tooltip*/
  decoration?: BaseDefinitionTooltipDecoration;
}

export function DefinitionTooltip({
  definitionId,
  tooltipOptions,
  contentWrapperClassName,
  children,
  decoration = 'underline',
  asChild,
  noHelpCursor,
}: Props) {
  const { primaryQuoteToken } = useVertexMetadataContext();
  if (!definitionId) {
    return (
      <ConditionalAsChild
        asChild={asChild}
        fallback="div"
        // Apply contentWrapperClassName to ensure consistent behavior between when definitionId is specified and when it is not.
        className={contentWrapperClassName}
      >
        {children}
      </ConditionalAsChild>
    );
  }

  const tooltipConfig: DefinitionTooltipContent = (() => {
    const config = DEFINITION_TOOLTIP_CONFIG_BY_ID[definitionId];

    if (typeof config === 'function') {
      return config({ primaryQuoteToken });
    }

    return config;
  })();

  return (
    <BaseDefinitionTooltip
      contentWrapperClassName={contentWrapperClassName}
      title={tooltipConfig.title}
      content={tooltipConfig.content}
      tooltipOptions={{
        placement: 'auto-start',
        delayShow: 500,
        delayHide: 0,
        interactive: false,
        ...tooltipOptions,
      }}
      decoration={decoration}
      asChild={asChild}
      noHelpCursor={noHelpCursor}
    >
      {children}
    </BaseDefinitionTooltip>
  );
}
