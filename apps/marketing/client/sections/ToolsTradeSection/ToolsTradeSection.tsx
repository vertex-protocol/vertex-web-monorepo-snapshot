'use client';

import { Badge } from 'client/components/Badge/Badge';
import { Container } from 'client/components/Container/Container';
import { BlurRevealText } from 'client/components/RevealText/BlurRevealText';
import { TradingFeatureContent } from 'client/components/ToolsFeatureContent/TradingFeatureContent';
import { TradingFeatureNav } from 'client/components/ToolsFeatureNav/TradingFeatureNav';
import { TRADING_FEATURES } from 'client/sections/ToolsTradeSection/data';
import {
  ITEM_VARIANTS,
  SECTION_VARIANTS,
} from 'client/sections/ToolsTradeSection/motionVariants';
import { SECTION_IDS } from 'config/links';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';

export function ToolsTradeSection() {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  return (
    <motion.section
      className="py-32 text-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={SECTION_VARIANTS}
      id={SECTION_IDS.tools}
      aria-labelledby="tools-section-title"
    >
      <Container>
        <motion.div variants={ITEM_VARIANTS}>
          <Badge>Trading Features</Badge>
        </motion.div>

        <BlurRevealText
          texts={[
            {
              element: 'h2',
              text: 'Tools of the Trade',
              className:
                'text-header-2 md:text-header-1 font-radioGrotesk mt-4',
            },
          ]}
        />

        <TradingFeatureNav
          features={TRADING_FEATURES}
          currentFeature={currentFeature}
          setCurrentFeature={setCurrentFeature}
          buttonRefs={buttonRefs}
          isHovered={isHovered}
          setIsHovered={setIsHovered}
        />

        <TradingFeatureContent
          feature={TRADING_FEATURES[currentFeature]}
          setIsHovered={setIsHovered}
        />
      </Container>
    </motion.section>
  );
}
