import {
  joinClassNames,
  WithChildren,
  WithClassnames,
} from '@vertex-protocol/web-common';
import { clamp } from 'lodash';
import React, { useMemo } from 'react';
import { Range } from 'react-range';
import { IMarkProps, IThumbProps, ITrackProps } from 'react-range/lib/types';

interface Props {
  renderValue?: (val?: number) => React.ReactNode;
  // Fires when a user action causes a value change - safe to set `amountSource` here
  onValueChange: (value: number) => void;
  disabled?: boolean;
  value: number;
  min: number;
  max: number;
  step: number;
}

export function RangeSlider({
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
      className={joinClassNames('p-3 pb-4', disabled && 'cursor-not-allowed')}
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
        renderMark={({ props }) => <SliderMark key={props.key} props={props} />}
        renderTrack={({ props, children }) => (
          <SliderTrack sliderValue={sliderValue} props={props}>
            {children}
          </SliderTrack>
        )}
        renderThumb={({ props }) => (
          <SliderThumb
            props={props}
            disabled={disabled}
            sliderValue={sliderValue}
            renderValue={renderValue}
            key="slider-thumb"
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
      className="from-grad-slider-start via-grad-slider-mid to-grad-slider-end h-2.5 rounded-sm bg-gradient-to-r"
      {...props}
    >
      {children}
    </div>
  );
}

function SliderMark({ props }: { props: IMarkProps }) {
  return <div {...props} className="bg-surface-card h-1.5 w-px rounded" />;
}

interface SliderThumbProps {
  props: IThumbProps;
  sliderValue: number;
  disabled?: boolean;
  renderValue: (val?: number) => React.ReactNode;
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
        'bg-surface-card border-accent rounded border',
        'px-2 py-1 lg:px-1.5 lg:py-0.5',
        'text-text-primary text-xs font-medium',
        disabled && 'text-text-tertiary',
      )}
    >
      {renderValue(sliderValue)}
    </div>
  );
}
