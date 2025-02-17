'use client';

import { ChainInfo } from 'client/components/ChainInfo/ChainInfo';
import { Container } from 'client/components/Container/Container';
import { EdgeInfo } from 'client/components/EdgeInfo/EdgeInfo';
import { OrderbookVisual } from 'client/components/OrderbookVisual/OrderbookVisual';
import { BlurRevealText } from 'client/components/RevealText/BlurRevealText';
import { TextItem } from 'client/components/RevealText/types';
import { Section } from 'client/components/Section/Section';
import { SECTION_IDS } from 'config/links';
import { motion } from 'framer-motion';

const blurRevealTexts: TextItem[] = [
  {
    element: 'h2',
    text: 'Multiple Chains, One Orderbook',
    className: 'text-header-2 md:text-header-1 font-radioGrotesk mb-4 max-w-sm',
  },
  {
    element: 'p',
    text: 'The first synchronous network of exchanges - Vertex connects traders across chains on one orderbook to offer unmatched liquidity.',
    className: 'text-body-gray text-body-14 md:text-body-16 mb-8 max-w-sm',
  },
];

export function MultiChainSection() {
  return (
    <Section
      id={SECTION_IDS.multiChain}
      asMotion
      mode="wait"
      aria-labelledby="multi-chain-title"
    >
      <Container>
        <div className="flex flex-col justify-between gap-y-12 md:gap-8 lg:flex-row">
          <div className="flex max-w-[33ch] flex-col justify-between">
            <div>
              <BlurRevealText texts={blurRevealTexts} />
              <ChainInfo />
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col gap-y-6 pt-12 lg:pt-0"
            >
              <EdgeInfo />
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex max-w-lg flex-1 flex-col gap-y-6"
            aria-label="Orderbook visualization"
          >
            <OrderbookVisual />
            <p className="text-body-dark-gray text-body-13">
              Vertex Edge Multi-Chain Sequencer.
            </p>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
