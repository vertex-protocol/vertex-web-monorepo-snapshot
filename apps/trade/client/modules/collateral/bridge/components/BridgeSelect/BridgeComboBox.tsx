import { joinClassNames } from '@vertex-protocol/web-common';
import { UpDownChevronIcon } from '@vertex-protocol/web-ui';
import {
  ComboBox,
  ComboBoxOptionProps,
  ComboBoxOptionsProps,
  ComboBoxTriggerProps,
} from 'client/components/ComboBox/ComboBox';
import { ComboBoxComponentOption } from 'client/components/ComboBox/hooks/types';
import { BRIDGE_DROPDOWN_CONTENT_CLASSNAME } from 'client/modules/collateral/bridge/components/BridgeSelect/consts';
import {
  BridgeChainSelectValue,
  BridgeTokenSelectValue,
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
        <img
          className="h-4 w-auto rounded-full"
          src={labelImgSrc}
          alt={label}
        />
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
      className={joinClassNames(BRIDGE_DROPDOWN_CONTENT_CLASSNAME, className)}
      // `h-60` because we must also account for the search bar.
      scrollContainerClassName="h-60 gap-y-1"
      sideOffset={12}
      {...rest}
    />
  );
}

interface OptionProps extends Omit<ComboBoxOptionProps, 'value' | 'children'> {
  option: ComboBoxComponentOption<
    BridgeChainSelectValue | BridgeTokenSelectValue
  >;
}

function Option({ option, ...rest }: OptionProps) {
  return (
    <ComboBox.Option className="justify-start" value={option.value} {...rest}>
      {/*Loading remote images, so can't use Image component*/}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="h-5 w-auto rounded-full"
        alt={option.value}
        src={option.original.externalIconUrl}
      />
      {option.label}
    </ComboBox.Option>
  );
}

export const BridgeComboBox = {
  Root: ComboBox.Root,
  Trigger,
  Options,
  Option,
};
