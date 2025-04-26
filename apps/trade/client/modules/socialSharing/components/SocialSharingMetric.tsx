import {
  formatNumber,
  NumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { BigDecimal } from '@vertex-protocol/utils';

interface Props {
  label: string;
  formatSpecifier: NumberFormatSpecifier | string;
  value: BigDecimal;
}

export function SocialSharingMetric({ label, value, formatSpecifier }: Props) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="text-text-secondary text-[6px] uppercase">{label}</div>

      <div className="text-text-primary text-sm leading-3">
        {formatNumber(value, {
          formatSpecifier,
        })}
      </div>
    </div>
  );
}
