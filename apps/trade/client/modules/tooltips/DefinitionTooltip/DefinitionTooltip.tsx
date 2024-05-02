import { mergeClassNames } from '@vertex-protocol/web-common';
import {
  BaseDefinitionTooltip,
  BaseDefinitionTooltipProps,
  IconBaseProps,
  Icons,
} from '@vertex-protocol/web-ui';
import {
  DEFINITION_TOOLTIP_CONFIG_BY_ID,
  DefinitionTooltipID,
} from 'client/modules/tooltips/DefinitionTooltip/definitionTooltipConfig';
import { ReactNode } from 'react';

export type DefinitionTooltipDecoration =
  | 'underline'
  | { icon: true | IconBaseProps }
  | 'none';

interface Props
  extends Pick<
    BaseDefinitionTooltipProps,
    'portal' | 'contentWrapperClassName' | 'tooltipOptions'
  > {
  // This is optional as there are many usecases where we may or may not show a tooltip in an array-based rendering pattern
  // If this is not specified, no tooltip is rendered and children are returned as-is
  definitionId?: DefinitionTooltipID;
  portal?: BaseDefinitionTooltipProps['portal'];
  children?: ReactNode;
  // Additional decorations, such as an underline or info icon, to apply to the tooltip
  decoration?: DefinitionTooltipDecoration;
}

export function DefinitionTooltip({
  definitionId,
  portal,
  tooltipOptions,
  contentWrapperClassName,
  children,
  decoration = 'underline',
}: Props) {
  if (!definitionId) {
    // Wrap with contentWrapperClassName to ensure consistent behavior between when definitionId is specified and when it is not
    return <div className={contentWrapperClassName}>{children}</div>;
  }

  const hasIcon = typeof decoration !== 'string' && !!decoration?.icon;
  const icon = (() => {
    if (!hasIcon) {
      return null;
    }

    const iconProps: IconBaseProps =
      decoration.icon === true ? {} : decoration.icon;
    const { size, className } = iconProps;

    return (
      <Icons.MdInfoOutline
        size={size ?? 16}
        className={mergeClassNames('text-text-tertiary', className)}
        {...iconProps}
      />
    );
  })();

  const tooltipConfig = DEFINITION_TOOLTIP_CONFIG_BY_ID[definitionId];

  const underlineClassNames = (() => {
    if (decoration !== 'underline') {
      return '';
    }

    return mergeClassNames(
      'underline underline-offset-[3px]',
      'decoration-dashed decoration-disabled hover:decoration-text-primary',
      'transition-colors duration-200 ease-in-out',
      contentWrapperClassName,
    );
  })();

  return (
    <BaseDefinitionTooltip
      portal={portal}
      contentWrapperClassName={mergeClassNames(
        icon && 'flex gap-x-1 items-center w-max',
        contentWrapperClassName,
        underlineClassNames,
      )}
      title={tooltipConfig.title}
      content={tooltipConfig.content}
      tooltipOptions={{
        placement: 'auto-start',
        delayShow: 500,
        delayHide: 0,
        interactive: false,
        ...tooltipOptions,
      }}
    >
      {children}
      {icon}
    </BaseDefinitionTooltip>
  );
}
