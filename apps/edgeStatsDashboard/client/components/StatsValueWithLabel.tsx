import { formatNumber, NumberFormatValue } from '@vertex-protocol/react-client';
import { Label, Value } from '@vertex-protocol/web-ui';
import { ReactNode } from 'react';

interface WithFormatValue {
  value: NumberFormatValue | undefined;
  formatSpecifier: string;
}

interface WithValueContent {
  valueContent: ReactNode;
}

type Props = { label: string } & (WithFormatValue | WithValueContent);

export function StatsValueWithLabel({ label, ...unionProps }: Props) {
  const valueContent = (() => {
    if ('valueContent' in unionProps) {
      const { valueContent } = unionProps;
      return valueContent;
    }

    const { value, formatSpecifier } = unionProps;
    return formatNumber(value, {
      formatSpecifier,
    });
  })();

  return (
    <div className="flex flex-col items-start gap-y-1">
      <Label className="text-text-secondary font-medium" sizeVariant="sm">
        {label}
      </Label>
      <Value className="font-semibold" sizeVariant="lg">
        {valueContent}
      </Value>
    </div>
  );
}
