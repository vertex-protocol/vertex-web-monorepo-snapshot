'use client';

import { useAnalyticsContext } from 'client/analytics/AnalyticsContext';
import { Badge } from 'client/components/Badge/Badge';
import { LaunchAppButton } from 'client/components/Button/LaunchAppButton';
import { MotionButton } from 'client/components/Button/MotionButton';
import { BlurRevealText } from 'client/components/RevealText/BlurRevealText';
import { LINKS } from 'config/links';
import { motion, useInView, Variants } from 'framer-motion';
import { useRef } from 'react';

export function VrtxHeader({ itemVariants }: { itemVariants: Variants }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { trackEvent } = useAnalyticsContext();

  return (
    <>
      <motion.div variants={itemVariants}>
        <Badge>VRTX Token</Badge>
      </motion.div>
      <div className="mt-4 flex w-full flex-col items-start gap-y-6 md:flex-row md:items-end md:justify-between md:gap-y-0">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <BlurRevealText
            texts={[
              {
                element: 'h2',
                text: 'Vertex Staking',
                className:
                  'text-header-2 md:text-header-1 font-radio-grotesk mb-4',
              },
              {
                element: 'p',
                text: 'Fees from all Vertex Edge chains go back to the Staking Pool.',
                className: 'text-body-14 md:text-body-16 text-body-gray',
              },
            ]}
          />
        </motion.div>
        <motion.div
          ref={ref}
          className="flex items-center gap-x-4 sm:justify-center"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <LaunchAppButton href={LINKS.staking} trackingKey="start_staking">
            Start Staking
          </LaunchAppButton>
          <MotionButton
            href={LINKS.buyVRTX}
            onClick={() =>
              trackEvent({
                type: 'new_marketing_cta_clicked',
                data: { source: 'buy_vertex' },
              })
            }
          >
            Buy VRTX
          </MotionButton>
        </motion.div>
      </div>
    </>
  );
}
