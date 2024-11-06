'use client';

import {
  CustomNumberFormatSpecifier,
  formatNumber,
} from '@vertex-protocol/react-client';
import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import edgeLogo from 'assets/edge.svg';
import { useVertexMetrics } from 'client/hooks/query/useVertexMetrics';
import Image from 'next/image';
import { ReactNode } from 'react';

export function HeroMetrics({ className }: WithClassnames) {
  const { data: marketMetrics } = useVertexMetrics();
  return (
    <div
      className={joinClassNames(
        'flex flex-wrap justify-center gap-x-6 gap-y-4 px-2',
        'sm:gap-x-12',
        className,
      )}
    >
      <Metric
        label="Total Volume"
        valueContent={formatNumber(marketMetrics?.totalCumulativeVolume, {
          formatSpecifier:
            CustomNumberFormatSpecifier.CURRENCY_LARGE_ABBREVIATED,
        })}
      />
      <Metric label="Markets" valueContent="50+" />
      <Metric
        label="Powered by"
        valueContent={<Image src={edgeLogo} alt="EDGE" />}
      />
    </div>
  );
}

function Metric({
  label,
  valueContent,
}: {
  label: string;
  valueContent: ReactNode;
}) {
  return (
    <div
      className={joinClassNames(
        'flex flex-col gap-1 gap-y-1.5',
        'font-dmSans text-sm/none',
        'sm:flex-row sm:items-center',
        'md:text-base',
        'lg:text-lg',
      )}
    >
      <span className="text-white-700 leading-normal">{label}</span>
      <span className="text-white">{valueContent}</span>
    </div>
  );
}
