import { joinClassNames } from '@vertex-protocol/web-common';
import {
  ComboBoxTriggerProps,
  ComboBox,
  ComboBoxOptionsProps,
  ComboBoxOptionProps,
} from 'client/components/ComboBox/ComboBox';
import { ComboBoxComponentOption } from 'client/components/ComboBox/hooks/types';
import { UpDownChevronIcon } from '@vertex-protocol/web-ui';
import {
  BridgeChain,
  BridgeToken,
} from 'client/modules/collateral/bridge/types';

interface TriggerProps extends ComboBoxTriggerProps {
  title: string;
  label: string | undefined;
  labelImgSrc: string | undefined;
  open: boolean;
  disabled?: boolean;
}

function Trigger({
  open,
  label,
  labelImgSrc,
  title,
  disabled,
  className,
}: TriggerProps) {
  const labelContent = (() => {
    if (!label) {
      return 'Select';
    }

    return (
      <div className="flex items-center gap-x-1 overflow-hidden">
        <span className="truncate">{label}</span>
        {/* Loading remote images, so can't use Image component */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="size-4 rounded-full" src={labelImgSrc} alt={label} />
      </div>
    );
  })();

  return (
    <ComboBox.PillTrigger
      className={joinClassNames(
        disabled
          ? 'text-disabled bg-surface-1'
          : 'text-text-primary bg-surface-2',
        className,
      )}
      endIcon={<UpDownChevronIcon open={open} className="size-3" />}
      disabled={disabled}
    >
      <span className="text-text-tertiary mr-auto">{title}</span>
      {labelContent}
    </ComboBox.PillTrigger>
  );
}

function Options({ className, ...rest }: ComboBoxOptionsProps) {
  return (
    <ComboBox.Options
      className={joinClassNames(
        'flex flex-col gap-y-1 p-2',
        'w-[350px] [@media(max-width:400px)]:w-[315px]',
        'h-72',
        className,
      )}
      // `h-60` because we must also account for the search bar.
      scrollContainerClassName="h-60"
      sideOffset={12}
      {...rest}
    />
  );
}

interface OptionProps extends Omit<ComboBoxOptionProps, 'value' | 'children'> {
  option: ComboBoxComponentOption<BridgeChain | BridgeToken>;
}

function Option({ option, ...rest }: OptionProps) {
  return (
    <ComboBox.Option
      value={option.value}
      className="justify-stretch gap-x-2 p-2"
      {...rest}
    >
      {/*Loading remote images, so can't use Image component*/}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="size-5 rounded-full"
        alt={option.value}
        src={option.original.externalIconUrl}
      />
      {option.label}
    </ComboBox.Option>
  );
}

export const BridgeComboBox = {
  Trigger,
  Options,
  Option,
};
