import { WithChildren, joinClassNames } from '@vertex-protocol/web-common';
import { Select } from '@vertex-protocol/web-ui';
import { UpDownChevronIcon } from 'client/components/Icons/UpDownChevronIcon';
import { ReactNode } from 'react';

interface SelectTriggerProps {
  open: boolean;
  selectedToken:
    | {
        iconUrl: string | undefined;
        symbol: string;
      }
    | undefined;
  disabled?: boolean;
}

function Trigger({ open, selectedToken, disabled }: SelectTriggerProps) {
  const content = selectedToken ? (
    <div className="flex items-center gap-x-1.5">
      {selectedToken.iconUrl && (
        // Loading remote images, so can't use Image component
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={selectedToken.iconUrl}
          alt={selectedToken.symbol}
          className="h-4 w-4"
        />
      )}
      <span className="text-text-primary flex-1">{selectedToken.symbol}</span>
    </div>
  ) : (
    'Select'
  );

  return (
    <Select.Trigger
      className={joinClassNames(
        'flex h-full w-24 min-w-fit justify-between',
        'bg-transparent hover:bg-transparent',
        'border-overlay-divider/10 border-r',
      )}
      endIcon={
        <UpDownChevronIcon
          open={open}
          className="text-text-tertiary"
          size={14}
        />
      }
      disabled={disabled}
    >
      {content}
    </Select.Trigger>
  );
}

interface SelectOptionsProps extends WithChildren {
  header?: ReactNode;
}

function Options({ header, children }: SelectOptionsProps) {
  return (
    <Select.Options
      // Gap for search bar, same width as collateral dropdown
      className="flex max-h-72 w-[350px] flex-col gap-y-2 p-2 [@media(max-width:400px)]:w-[315px]"
      header={header}
    >
      {children}
    </Select.Options>
  );
}

interface SelectOptionProps {
  symbol: string;
  iconUrl: string | undefined;
  optionValue: string;
  isSelected: boolean;
}

function Option({
  isSelected,
  symbol,
  iconUrl,
  optionValue,
}: SelectOptionProps) {
  return (
    <Select.Option
      value={optionValue}
      className={joinClassNames(
        'flex items-center justify-start gap-x-2 p-2',
        isSelected && 'text-text-primary',
      )}
    >
      {/*Loading remote images, so can't use Image component*/}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {iconUrl && <img src={iconUrl} alt={symbol} className="h-5 w-5" />}
      <span className="text-text-secondary text-sm">{symbol}</span>
    </Select.Option>
  );
}

export const BridgeTokenSelect = {
  Trigger,
  Options,
  Option,
};
