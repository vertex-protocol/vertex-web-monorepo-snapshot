import {
  NumberFormatSpecifier,
  NumberFormatValue,
} from '@vertex-protocol/react-client';
import { WithClassnames } from '@vertex-protocol/web-common';
import { IconType, SizeVariant } from '@vertex-protocol/web-ui';
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
  labelStartIcon?: IconType;
  labelEndIcon?: IconType;
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
  outerValueClassName?: string;
  valueEndElement?: ReactNode;
  newValue?: NumberFormatValue;
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
