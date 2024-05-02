import { BigDecimal } from '@vertex-protocol/client';
import { joinClassNames, mergeClassNames } from '@vertex-protocol/web-common';
import { Icons } from '@vertex-protocol/web-ui';
import { DefinitionTooltip } from 'client/modules/tooltips/DefinitionTooltip/DefinitionTooltip';
import {
  LineItemBaseProps,
  LineItemMetricProps,
  LineItemMetricWithEstimationProps,
} from './types';
import { getValueContent } from './utils';

function Base({
  tooltip,
  label,
  labelClassName,
  value,
  className,
}: LineItemBaseProps) {
  return (
    <div
      className={mergeClassNames(
        'flex items-center justify-between',
        'text-text-primary text-xs',
        className,
      )}
    >
      <DefinitionTooltip
        definitionId={tooltip?.id}
        decoration={tooltip?.infoIcon ? { icon: true } : undefined}
        contentWrapperClassName={joinClassNames(
          'text-text-tertiary',
          labelClassName,
        )}
      >
        {label}
      </DefinitionTooltip>
      {value}
    </div>
  );
}

function Metric<TValue = BigDecimal>({
  value,
  renderValue,
  valueEndElement,
  valueClassName,
  ...rest
}: LineItemMetricProps<TValue>) {
  const valueContent = getValueContent(renderValue, value);

  return (
    <Base
      value={
        <span
          className={mergeClassNames(
            'flex items-center justify-end gap-x-1',
            valueClassName,
          )}
        >
          {valueContent}
          {valueEndElement && (
            <div className="text-text-tertiary">{valueEndElement}</div>
          )}
        </span>
      }
      {...rest}
    />
  );
}

function MetricWithEstimation<TValue = BigDecimal>({
  renderValue,
  currentValue,
  estimatedValue,
  valueEndElement,
  arrowClassName,
  ...rest
}: LineItemMetricWithEstimationProps<TValue>) {
  const currentValueContent = getValueContent(renderValue, currentValue);
  const estimatedValueContent = getValueContent(renderValue, estimatedValue);

  return (
    <Base
      value={
        <div className="flex items-center justify-end gap-x-1">
          <div
            className={
              !!estimatedValue ? 'text-text-tertiary' : 'text-text-primary'
            }
          >
            {currentValueContent}
          </div>
          {estimatedValue && (
            <div className="flex items-center gap-x-1">
              <Icons.MdArrowRightAlt className={arrowClassName} />
              <div className="text-text-primary">{estimatedValueContent}</div>
            </div>
          )}
          {valueEndElement && (
            <div className="text-text-tertiary">{valueEndElement}</div>
          )}
        </div>
      }
      {...rest}
    />
  );
}

export const LineItem = {
  Base,
  Metric,
  MetricWithEstimation,
};
