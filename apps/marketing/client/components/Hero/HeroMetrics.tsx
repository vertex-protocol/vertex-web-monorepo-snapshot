'use client';

import {
  CustomNumberFormatSpecifier,
  formatNumber,
} from '@vertex-protocol/react-client';
import { HeroMetricColumn } from 'client/components/Hero/HeroMetricsColums';
import { ExternalLink } from 'client/components/Link/ExternalLink';
import { useEdgeVolume } from 'client/hooks/useEdgeVolume';
import { LINKS } from 'config/links';
import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export function HeroMetrics() {
  const ref = useRef(null);
  const { data: edgeVolume, isLoading } = useEdgeVolume();
  const [isVisible, setIsVisible] = useState(false);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isLoading && edgeVolume) {
      setIsVisible(true);
    }
  }, [isLoading, edgeVolume]);

  return (
    <div className="mt-32 flex flex-wrap justify-center gap-24" ref={ref}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible && isInView ? 1 : 0 }}
        className="flex w-full flex-wrap gap-8 md:flex-nowrap md:justify-center"
      >
        <div className="flex w-full justify-between gap-4 md:w-auto md:gap-8">
          <HeroMetricColumn
            value={`${formatNumber(edgeVolume, {
              formatSpecifier:
                CustomNumberFormatSpecifier.CURRENCY_LARGE_ABBREVIATED,
            })}+`}
            label="Total Volume"
            animationDelay="0.1s"
            custom={0}
          />
          <HeroMetricColumn
            value="50+"
            label="Markets"
            animationDelay="1s"
            custom={1}
          />
          <HeroMetricColumn
            value="10+"
            label="Collaterals"
            animationDelay="2s"
            custom={2}
          />
        </div>
        <StatsCallout />
      </motion.div>
    </div>
  );
}

function StatsCallout() {
  return (
    <div className="text-body-gray text-body-13 flex flex-1 flex-col items-start justify-end">
      <p>Don&apos;t take our word for it.</p>
      <p>Check out our stats dashboard.</p>
      <ExternalLink href={LINKS.statsDashboard} className="text-white">
        View statistics
      </ExternalLink>
    </div>
  );
}
