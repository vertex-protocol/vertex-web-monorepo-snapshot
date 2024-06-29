import { clientEnv } from 'common/environment/clientEnv';
import { useTvlUsd } from '../hooks/useTvlUsd';
import {
  CustomNumberFormatSpecifier,
  formatNumber,
} from '@vertex-protocol/react-client';

export function TvlStats() {
  const tvlUsd = useTvlUsd();

  return (
    <div className="flex gap-x-2.5 text-xs lg:text-sm">
      {clientEnv.brandMetadata.displayName} TVL:
      <span className="text-text-primary">
        {formatNumber(tvlUsd, {
          formatSpecifier:
            CustomNumberFormatSpecifier.CURRENCY_LARGE_ABBREVIATED,
        })}
      </span>
    </div>
  );
}
