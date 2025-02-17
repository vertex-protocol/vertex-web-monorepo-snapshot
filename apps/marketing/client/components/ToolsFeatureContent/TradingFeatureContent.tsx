'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ITEM_VARIANTS } from 'client/sections/ToolsTradeSection/motionVariants';
import { TradingFeature } from 'client/sections/ToolsTradeSection/types';

interface Props {
  feature: TradingFeature;
  setIsHovered: (isHovered: boolean) => void;
}

export function TradingFeatureContent({ feature, setIsHovered }: Props) {
  return (
    <motion.div
      variants={ITEM_VARIANTS}
      className="bg-dark border-new-website-overlay-8 mb-12 overflow-hidden rounded-2xl border"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      <motion.div
        key={feature.id}
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative min-h-[40vh] md:min-h-full">
          {/* Desktop Image - Using natural aspect ratio */}
          <div className="hidden md:block">
            <Image
              src={feature.image}
              alt="Command Centre Interface"
              quality={100}
              width={1000}
              height={437}
              priority
              loading="eager"
              sizes="(max-width: 768px) 0px, 1000px"
              className="h-auto w-full object-cover"
            />
          </div>

          {/* Mobile Image - Regular flow */}
          <div className="md:hidden">
            <Image
              src={feature.mobileImage}
              alt="Command Centre Interface"
              quality={100}
              width={500}
              height={218}
              priority
              sizes="(min-width: 768px) 0px, 100vw"
              className="h-auto w-full object-cover"
            />
          </div>

          <motion.div
            className="absolute bottom-0 bg-transparent p-4 md:left-10 md:top-0 md:w-1/2 md:pt-10 lg:pt-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <h3 className="text-header-4 md:text-header-3 text-header-linear font-radioGrotesk mb-4">
              {feature.title}
            </h3>
            <p className="text-body-gray text-body-14 md:text-body-16 max-w-[26ch]">
              {feature.content}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
