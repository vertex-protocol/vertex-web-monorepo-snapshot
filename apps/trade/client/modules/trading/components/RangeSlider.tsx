import {
  joinClassNames,
  mergeClassNames,
  WithChildren,
  WithClassnames,
} from '@vertex-protocol/web-common';
import { clamp } from 'lodash';
import { ReactNode, useMemo } from 'react';
import { Range } from 'react-range';
import { IMarkProps, IThumbProps, ITrackProps } from 'react-range/lib/types';

interface Props {
  renderValue?: (val?: number) => ReactNode;
  // Fires when a user action causes a value change - safe to set `amountSource` here
  onValueChange: (value: number) => void;
  disabled?: boolean;
  value: number;
  min: number;
  max: number;
  step: number;
}

export function RangeSlider({
  className,
  value,
  onValueChange,
  disabled,
  min,
  max,
  step,
  renderValue = (value) => value,
}: WithClassnames<Props>) {
  const sliderValue = clamp(value ?? min, min, max);
  const rangeValues = useMemo(() => {
    return [sliderValue];
  }, [sliderValue]);

  return (
    <div
      className={mergeClassNames(
        // Padding to account for the absolutely positioned thumb
        'px-4 py-2',
        disabled && 'cursor-not-allowed',
        className,
      )}
    >
      <Range
        disabled={disabled}
        values={rangeValues}
        step={step}
        min={min}
        max={max}
        onChange={(values) => {
          onValueChange(values[0]);
        }}
        renderMark={({ props: { key, ...rest } }) => (
          <SliderMark key={key} props={rest} />
        )}
        renderTrack={({ props, children }) => (
          <SliderTrack sliderValue={sliderValue} props={props}>
            {children}
          </SliderTrack>
        )}
        renderThumb={({ props: { key, ...rest } }) => (
          <SliderThumb
            key={key}
            props={rest}
            disabled={disabled}
            sliderValue={sliderValue}
            renderValue={renderValue}
          />
        )}
      />
    </div>
  );
}

interface SliderTrackProps {
  props: ITrackProps;
  sliderValue: number;
}

function SliderTrack({ props, children }: WithChildren<SliderTrackProps>) {
  return (
    <div
      className="from-grad-slider-start/60 via-grad-slider-mid/80 to-grad-slider-end/60 h-2.5 rounded-xs bg-linear-to-r"
      {...props}
    >
      {children}
    </div>
  );
}

function SliderMark({ props }: { props: Omit<IMarkProps, 'key'> }) {
  return <div {...props} className="bg-surface-card h-1.5 w-px rounded-sm" />;
}

interface SliderThumbProps {
  props: Omit<IThumbProps, 'key'>;
  sliderValue: number;
  disabled?: boolean;
  renderValue: (val?: number) => ReactNode;
}

function SliderThumb({
  props,
  sliderValue,
  disabled,
  renderValue,
}: SliderThumbProps) {
  return (
    <div
      {...props}
      className={joinClassNames(
        'bg-surface-card border-primary rounded-sm border',
        'px-2 py-1 lg:px-1.5 lg:py-0.5',
        'text-text-primary text-xs',
        disabled && 'text-text-tertiary',
      )}
    >
      {renderValue(sliderValue)}
    </div>
  );
}
