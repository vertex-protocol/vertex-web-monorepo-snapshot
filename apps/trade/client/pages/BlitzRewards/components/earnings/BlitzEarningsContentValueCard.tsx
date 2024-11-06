import { BigDecimal } from '@vertex-protocol/client';
import { PresetNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';

interface Props {
  label: string;
  value: BigDecimal | undefined;
}

export function BlitzEarningsContentValueCard({ label, value }: Props) {
  return (
    <div className="bg-surface-1 flex justify-center rounded p-4">
      <ValueWithLabel.Vertical
        className="items-center"
        sizeVariant="lg"
        label={label}
        value={value}
        numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_INT}
      />
    </div>
  );
}
