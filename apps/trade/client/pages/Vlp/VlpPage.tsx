'use client';

import { VLP_TOKEN_INFO } from '@vertex-protocol/react-client';
import { joinClassNames } from '@vertex-protocol/web-common';

import { AppPage } from 'client/modules/app/AppPage';
import { VlpHeaderMetrics } from 'client/pages/Vlp/components/VlpHeaderMetrics/VlpHeaderMetrics';
import { VlpOverviewCard } from 'client/pages/Vlp/components/VlpOverviewCard/VlpOverviewCard';
import { VlpPositionCard } from 'client/pages/Vlp/components/VlpPositionCard/VlpPositionCard';
import vlpBackgroundGraphics from 'client/pages/Vlp/vlp-background-graphics.svg';
import { VERTEX_SPECIFIC_IMAGES } from 'common/brandMetadata/images';
import Image from 'next/image';

export function VlpPage() {
  const headerContent = (
    <div className="flex items-center gap-x-2 lg:gap-x-4">
      <Image
        src={VERTEX_SPECIFIC_IMAGES.vlpSquareIcon}
        alt=""
        className="h-8 w-auto lg:h-11"
      />
      Vertex Liquidity Provider ({VLP_TOKEN_INFO.symbol})
    </div>
  );

  return (
    <AppPage.Content layoutWidth="sm">
      <AppPage.Header title={headerContent} />
      <div className="relative flex gap-x-10">
        <VlpHeaderMetrics />
        {/*Background graphics*/}
        <Image
          src={vlpBackgroundGraphics}
          priority
          alt=""
          className={joinClassNames(
            'absolute -z-1 h-100',
            // These are manually adjusted to fit the design
            '-top-38 -right-20 sm:-right-35',
          )}
        />
      </div>
      <div className="flex flex-col gap-4 lg:grid lg:grid-cols-3">
        <VlpPositionCard />
        <VlpOverviewCard className="lg:col-span-2" />
      </div>
    </AppPage.Content>
  );
}
