'use client';

import { joinClassNames } from '@vertex-protocol/web-common';
import { LaunchAppButton } from 'client/components/Button/LaunchAppButton';
import { MotionButton } from 'client/components/Button/MotionButton';
import { HeroBg } from 'client/components/Hero/HeroBg';
import HeroLottie from 'client/components/Hero/HeroLottie';
import { BlurRevealText } from 'client/components/RevealText/BlurRevealText';
import { Tooltip } from 'client/components/Tooltip/Tooltip';
import EdgeIcon from 'client/icons/EdgeIcon';
import { HERO_TEXTS, NETWORKS } from 'client/sections/HeroSection/data';
import { LINKS } from 'config/links';
import { motion, useInView } from 'framer-motion';
import { LottieRefCurrentProps } from 'lottie-react';
import { useRef } from 'react';

export function Hero() {
  const textRef = useRef(null);
  const isInView = useInView(textRef, { once: true, amount: 0.1 });

  const badgeClasses = joinClassNames(
    'bg-light-03 py-1.5 px-2 rounded border',
    'border-new-website-overlay-8',
    'flex items-center gap-x-2 text-body-13',
  );

  const lottieRef = useRef<LottieRefCurrentProps | null>(null);

  return (
    <>
      <motion.div
        className={joinClassNames(
          'pointer-events-none absolute inset-0 top-[300px] -z-10',
          'flex h-full w-full items-center justify-center overflow-x-clip md:top-[600px]',
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <HeroBg className="max-w-full md:absolute md:max-w-none" />
      </motion.div>
      <div className="relative">
        <div className="mx-auto mb-10 w-[30vh]">
          <HeroLottie lottieRef={lottieRef} />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.2 }}
          className="mb-8 flex items-center justify-center gap-x-1.5"
        >
          <div className={badgeClasses}>
            <span className="text-body-gray">Available on</span>
            <div className="flex gap-x-0.5">
              {NETWORKS.map((network, index) => (
                <motion.div
                  key={network.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.9 + index * 0.05 }}
                  className="h-3.5 w-3.5 rounded-full text-white"
                >
                  <Tooltip trigger={network.icon}>{network.name}</Tooltip>
                </motion.div>
              ))}
            </div>
          </div>
          <div className={badgeClasses}>
            <div className="text-body-gray inline-flex items-center gap-x-2">
              Powered by
              <div className="h-3 w-9 flex-shrink-0 text-white">
                <EdgeIcon />
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div
          ref={textRef}
          className="font-radioGrotesk"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.05,
                delayChildren: 0.1,
              },
            },
          }}
        >
          <BlurRevealText texts={HERO_TEXTS} />
        </motion.div>
        <motion.div
          className="flex items-center justify-center gap-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <LaunchAppButton href={LINKS.app} trackingKey="hero">
            Start Trading
          </LaunchAppButton>
          <MotionButton href={LINKS.institutionalTg}>API Gateway</MotionButton>
        </motion.div>
      </div>
    </>
  );
}
