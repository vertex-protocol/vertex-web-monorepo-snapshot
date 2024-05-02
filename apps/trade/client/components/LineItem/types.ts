import { BigDecimal } from '@vertex-protocol/client';
import { WithClassnames } from '@vertex-protocol/web-common';
import { DefinitionTooltipID } from 'client/modules/tooltips/DefinitionTooltip/definitionTooltipConfig';
import { NumberFormatSpecifier } from 'client/utils/formatNumber/NumberFormatSpecifier';
import { ReactNode } from 'react';

export type RenderValueType<TValue> =
  | ((val?: TValue) => React.ReactNode)
  | NumberFormatSpecifier
  | string;

export interface LineItemBaseProps extends WithClassnames {
  label: ReactNode;
  value: ReactNode;
  tooltip?: {
    id: DefinitionTooltipID;
    infoIcon?: true;
  };
  labelClassName?: string;
}

export interface LineItemMetricProps<TValue = BigDecimal>
  extends Omit<LineItemBaseProps, 'value'> {
  renderValue: RenderValueType<TValue>;
  value?: TValue;
  valueEndElement?: React.ReactNode;
  valueClassName?: string;
}

export interface LineItemMetricWithEstimationProps<TValue = BigDecimal>
  extends Omit<LineItemMetricProps<TValue>, 'value' | 'valueClassName'> {
  currentValue?: TValue;
  estimatedValue?: TValue;
  arrowClassName?: string;
}
