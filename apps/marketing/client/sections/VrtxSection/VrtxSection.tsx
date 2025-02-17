'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { joinClassNames } from '@vertex-protocol/web-common';
import { Container } from 'client/components/Container/Container';
import { VrtxTokens } from 'client/components/VrtxTokens/VrtxTokens';
import { VrtxStats } from 'client/components/VrtxStats/VrtxStats';
import { VrtxHeader } from 'client/components/VrtxHeader/VrtxHeader';
import { VrtxPartners } from 'client/components/VrtxPartners/VrtxPartners';
import {
  VRTX_CONTAINER_VARIANTS,
  VRTX_ITEM_VARIANTS,
} from 'client/sections/VrtxSection/motionVariants';
import stakingAnimation from 'public/lottie/staking.json';

const DynamicLottie = dynamic(() => import('lottie-react'), {
  ssr: false,
  loading: () => <div className="min-h-[360px]" />,
});

// VrtxSection component displaying token information and statistics
export function VrtxSection() {
  return (
    <motion.section
      className={joinClassNames('py-32 text-white')}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={VRTX_CONTAINER_VARIANTS}
      id="vrtx"
      aria-labelledby="vrtx-section-title"
    >
      <Container>
        <VrtxHeader itemVariants={VRTX_ITEM_VARIANTS} />
        <motion.div
          variants={VRTX_ITEM_VARIANTS}
          className="my-11 overflow-x-clip"
          aria-label="Staking animation"
        >
          <DynamicLottie
            id="vrtx-lottie"
            animationData={stakingAnimation}
            loop={true}
            autoplay={true}
            className="w-[200%] -translate-x-1/4 rounded-md sm:w-full sm:-translate-x-0"
            aria-hidden="true"
          />
        </motion.div>
        <VrtxStats
          containerVariants={VRTX_CONTAINER_VARIANTS}
          itemVariants={VRTX_ITEM_VARIANTS}
        />
        <VrtxPartners />
        <VrtxTokens />
      </Container>
    </motion.section>
  );
}
