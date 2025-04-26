import * as RadioGroup from '@radix-ui/react-radio-group';
import { WithClassnames, joinClassNames } from '@vertex-protocol/web-common';
import { TabTextButton } from '@vertex-protocol/web-ui';
import { Dispatch, SetStateAction } from 'react';

export interface ChartTimespanRadioGroupOption<TTimespan> {
  label: string;
  value: TTimespan;
}

export interface ChartTimespanRadioGroupProps<TTimespan extends string>
  extends WithClassnames {
  timespan: TTimespan;
  disabled?: boolean;
  setTimespan: Dispatch<SetStateAction<TTimespan>>;
  timespanOptions: ChartTimespanRadioGroupOption<TTimespan>[];
}

export function ChartTimespanRadioGroup<TTimespan extends string>({
  className,
  timespan,
  setTimespan,
  timespanOptions,
}: ChartTimespanRadioGroupProps<TTimespan>) {
  return (
    <RadioGroup.Root
      value={timespan}
      onValueChange={(value) => setTimespan(value as TTimespan)}
      className={joinClassNames('flex items-center', className)}
    >
      {timespanOptions.map(({ label, value }) => {
        return (
          <RadioGroup.Item key={label} value={value} asChild>
            <TabTextButton className="p-1 text-xs" active={value === timespan}>
              {label}
            </TabTextButton>
          </RadioGroup.Item>
        );
      })}
    </RadioGroup.Root>
  );
}
