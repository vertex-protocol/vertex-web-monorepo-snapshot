import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { Card } from '@vertex-protocol/web-ui';
import vlpChart from 'client/pages/Vlp/components/VlpOverviewCard/components/vlp-mock-chart.png';
import Image from 'next/image';

export function VlpOverviewChartComingSoon({ className }: WithClassnames) {
  return (
    <div
      className={joinClassNames(
        'relative flex h-70 items-center justify-center',
        className,
      )}
    >
      <Card className="bg-surface-1 text-text-primary z-1 px-4 py-3 text-xs">
        Chart Coming Soon
      </Card>
      <Image src={vlpChart} fill alt="" className="blur-xs" priority />
    </div>
  );
}
