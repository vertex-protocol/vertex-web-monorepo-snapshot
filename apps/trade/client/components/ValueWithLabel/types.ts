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
  tooltip?: {
    id: DefinitionTooltipID;
    infoIcon?: true;
  };
}

interface WithValueContent {
  valueContent: ReactNode;
  valueClassName?: string;
  valueEndElement?: ReactNode;
}

interface WithFormatValue {
  value: NumberFormatValue | undefined;
  numberFormatSpecifier: NumberFormatSpecifier | string;
  defaultValue?: string | number;
  valueClassName?: string;
  valueEndElement?: ReactNode;
  newValue?: NumberFormatValue;
  /** When overriding icon size use `size-` className. ex. `size-4`  */
  changeArrowClassName?: string;
}

export type ValueContentProps = (WithFormatValue | WithValueContent) &
  SizeVariantProps;

export type ValueWithLabelProps = WithClassnames<
  ValueContentProps & LabelContentProps
>;

export type HorizontalValueWithLabelProps = ValueWithLabelProps & {
  fitWidth?: boolean;
};
