import { joinClassNames } from '@vertex-protocol/web-common';
import {
  Select,
  SelectComponentOption,
  SelectOptionsProps,
  SelectTriggerProps,
  UpDownChevronIcon,
} from '@vertex-protocol/web-ui';
import { BRIDGE_DROPDOWN_CONTENT_CLASSNAME } from 'client/modules/collateral/bridge/components/BridgeSelect/consts';
import {
  BridgeChainSelectValue,
  DestinationBridgeTokenSelectValue,
} from 'client/modules/collateral/bridge/types';

interface TriggerProps extends SelectTriggerProps {
  label: string | undefined;
  labelImgSrc: string | undefined;
  open: boolean;
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
    <Select.PillTrigger
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
    </Select.PillTrigger>
  );
}

function Options({
  className,
  viewportClassName,
  ...rest
}: SelectOptionsProps) {
  return (
    <Select.Options
      className={joinClassNames(BRIDGE_DROPDOWN_CONTENT_CLASSNAME, className)}
      viewportClassName={joinClassNames(
        'flex flex-col gap-y-1',
        viewportClassName,
      )}
      sideOffset={8}
      {...rest}
    />
  );
}

function Option({
  option,
}: {
  option: SelectComponentOption<
    BridgeChainSelectValue | DestinationBridgeTokenSelectValue
  >;
}) {
  return (
    <Select.Option
      className="justify-start"
      startIcon={
        // Loading remote images, so can't use Image component
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="h-5 w-auto rounded-full"
          alt={option.value}
          src={option.original.externalIconUrl}
        />
      }
      value={option.value}
      withSelectedCheckmark={false}
    >
      {option.label}
    </Select.Option>
  );
}

export const BridgeSelect = {
  Root: Select.Root,
  Trigger,
  Options,
  Option,
};
