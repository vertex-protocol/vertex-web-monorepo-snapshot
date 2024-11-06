import { joinClassNames } from '@vertex-protocol/web-common';
import {
  Select,
  SelectComponentOption,
  SelectOptionsProps,
  SelectTriggerProps,
} from '@vertex-protocol/web-ui';
import { UpDownChevronIcon } from '@vertex-protocol/web-ui';
import {
  BridgeChain,
  BridgeToken,
} from 'client/modules/collateral/bridge/types';

interface TriggerProps extends SelectTriggerProps {
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
      className={joinClassNames(
        'flex flex-col gap-y-1 p-2',
        'w-[350px] [@media(max-width:400px)]:w-[315px]',
        'max-h-72',
        className,
      )}
      viewportClassName={viewportClassName}
      sideOffset={12}
      {...rest}
    />
  );
}

function Option({
  option,
}: {
  option: SelectComponentOption<BridgeChain | BridgeToken>;
}) {
  return (
    <Select.Option
      value={option.value}
      className="justify-stretch gap-x-2 p-2"
      withSelectedCheckmark={false}
    >
      {/*Loading remote images, so can't use Image component*/}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="size-5 rounded-full"
        alt={option.value}
        src={option.original.externalIconUrl}
      />
      {option.label}
    </Select.Option>
  );
}

export const BridgeSelect = {
  Trigger,
  Options,
  Option,
};
