import {
  NumberFormatSpecifier,
  NumberFormatValue,
} from '@vertex-protocol/react-client';
import { WithClassnames } from '@vertex-protocol/web-common';
import { IconComponent, SizeVariant } from '@vertex-protocol/web-ui';
import { DefinitionTooltipID } from 'client/modules/tooltips/DefinitionTooltip/definitionTooltipConfig';
import { ReactNode } from 'react';

export interface ValueWithLabelSizeVariants {
  label: SizeVariant;
  value: SizeVariant;
}

interface SizeVariantProps {
  sizeVariant?: SizeVariant;
  sizeVariantOverrides?: Partial<ValueWithLabelSizeVariants>;
}

interface LabelContentProps extends SizeVariantProps {
  label: ReactNode;
  labelClassName?: string;
  labelStartIcon?: IconComponent;
  labelEndIcon?: IconComponent;
  labelIconClassName?: string;
  tooltip?: {
    id: DefinitionTooltipID;
    infoIcon?: true;
  };
}

interface WithValueContent {
  valueContent: ReactNode;
  valueClassName?: string;
  valueEndElement?: ReactNode;
  isValuePrivate?: boolean;
}

interface WithFormatValue {
  value: NumberFormatValue | undefined | null;
  numberFormatSpecifier: NumberFormatSpecifier | string;
  defaultValue?: string | number;
  valueClassName?: string;
  valueEndElement?: ReactNode;
  /**
   * Null indicates a "non-value" as the new value, which will render a `-` instead of skipping render of the `-> newValue` entirely
   * This is useful for the estimated liquidation price, amongst other things.
   */
  newValue?: NumberFormatValue | null;
  /** When overriding icon size use `size-` className. ex. `size-4`  */
  changeArrowClassName?: string;
  isValuePrivate?: boolean;
}

export type ValueContentProps = (WithFormatValue | WithValueContent) &
  SizeVariantProps;

export type ValueWithLabelProps = WithClassnames<
  ValueContentProps & LabelContentProps
>;

export type HorizontalValueWithLabelProps = ValueWithLabelProps & {
  fitWidth?: boolean;
};
