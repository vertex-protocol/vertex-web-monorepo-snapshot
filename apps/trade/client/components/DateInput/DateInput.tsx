import { joinClassNames } from '@vertex-protocol/web-common';
import {
  ButtonAsHTMLButtonProps,
  COMMON_TRANSPARENCY_COLORS,
  formatTimestamp,
  Icons,
  SecondaryButton,
  TextButton,
  TimeFormatSpecifier,
} from '@vertex-protocol/web-ui';
import { forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'client/components/DateInput/DateInput.css';

interface DateInputTriggerProps extends ButtonAsHTMLButtonProps {
  label: string;
  value: string | undefined;
  placeholder: string;
}

const DateInputTrigger = forwardRef<HTMLButtonElement, DateInputTriggerProps>(
  function DateInputTrigger(
    { label, value, className, placeholder, ...rest },
    ref,
  ) {
    return (
      <SecondaryButton
        className={joinClassNames(
          // w-full is to fill width of .react-datepicker__input-container
          'w-full justify-between',
          'text-text-tertiary px-3 text-xs',
          className,
        )}
        ref={ref}
        {...rest}
      >
        <span>{label}</span>
        <div className="flex items-center gap-x-2">
          {!!value ? (
            <span className="text-text-primary">{value}</span>
          ) : (
            <span>{placeholder}</span>
          )}
          <Icons.CalendarBlank className="text-text-secondary size-4" />
        </div>
      </SecondaryButton>
    );
  },
);

interface DateInputProps {
  value: Date | undefined;
  onChange: (date: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
  triggerClassName?: string;
  /**
   * Label for the trigger
   */
  triggerLabel: string;
  /**
   * Shown in lieu of the value when no date is selected
   */
  triggerPlaceholderText: string;
}

export function DateInput({
  triggerLabel,
  triggerPlaceholderText,
  triggerClassName,
  value,
  onChange,
  minDate,
  maxDate,
}: DateInputProps) {
  return (
    <DatePicker
      selected={value}
      onChange={onChange}
      minDate={minDate}
      maxDate={maxDate}
      calendarClassName="shadow-elevation"
      popperPlacement="bottom-end"
      customInput={
        <DateInputTrigger
          className={triggerClassName}
          label={triggerLabel}
          placeholder={triggerPlaceholderText}
          // Value is injected by DatePicker
          value={undefined}
        />
      }
      renderCustomHeader={({
        date,
        prevMonthButtonDisabled,
        decreaseMonth,
        increaseMonth,
        nextMonthButtonDisabled,
      }) => (
        <div
          className={joinClassNames(
            'flex items-center px-4 pb-2 text-sm',
            'border-b',
            COMMON_TRANSPARENCY_COLORS.border,
          )}
        >
          <span className="mr-auto">
            {formatTimestamp(date, {
              formatSpecifier: TimeFormatSpecifier.MONTH_YYYY,
            })}
          </span>
          <TextButton
            className="px-1"
            onClick={decreaseMonth}
            disabled={prevMonthButtonDisabled}
          >
            <Icons.CaretLeft />
          </TextButton>
          <TextButton
            className="-mr-1 px-1"
            onClick={increaseMonth}
            disabled={nextMonthButtonDisabled}
          >
            <Icons.CaretRight />
          </TextButton>
        </div>
      )}
      dateFormat={TimeFormatSpecifier.MONTH_D_YYYY}
      showPopperArrow={false}
      enableTabLoop={false}
    />
  );
}
