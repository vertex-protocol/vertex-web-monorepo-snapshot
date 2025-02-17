'use client';

import { joinClassNames } from '@vertex-protocol/web-common';
import { Container } from 'client/components/Container/Container';
import { ExternalLink } from 'client/components/Link/Link';
import { BlurRevealText } from 'client/components/RevealText/BlurRevealText';
import { TextItem } from 'client/components/RevealText/types';
import { PARTNERS } from 'client/sections/PartnersSection/data';
import {
  ITEM_VARIANTS,
  LOGO_VARIANTS,
  SECTION_VARIANTS,
} from 'client/sections/PartnersSection/motionVariants';
import { LINKS } from 'config/links';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const blurRevealTexts: TextItem[] = [
  {
    element: 'h2',
    text: 'Partners',
    className: 'text-header-2 md:text-header-1 font-radioGrotesk mb-4',
  },
  {
    element: 'p',
    text: 'Backed by the best. Vertex is the preferred on-chain exchange for professional trading firms.',
    className: 'text-body-gray text-body-14 md:text-body-16 mb-12 max-w-md',
  },
];

export function PartnersSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const linkClass = joinClassNames(
    'p-4 flex h-full items-center justify-center',
    'rounded-md border-table border bg-card-alt',
    'transition-all duration-200 ease-in-out opacity-60 hover:opacity-100',
  );

  return (
    <motion.section
      ref={sectionRef}
      className="pb-32 text-white md:pb-0"
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={SECTION_VARIANTS}
    >
      <Container>
        <BlurRevealText texts={blurRevealTexts} />
        <motion.div
          className="mb-12 grid grid-cols-2 gap-6 md:grid-cols-4"
          variants={ITEM_VARIANTS}
        >
          {PARTNERS.map((partner, index) => (
            <motion.div
              key={partner.name}
              custom={index} // Pass the index as a custom prop
              variants={LOGO_VARIANTS}
              transition={{ duration: 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <ExternalLink
                href={partner.link}
                withHoverEffect={false}
                className={linkClass}
              >
                <partner.logo size={54} />
              </ExternalLink>
            </motion.div>
          ))}
        </motion.div>
        <motion.p
          className="text-body-14 text-body-gray"
          variants={ITEM_VARIANTS}
        >
          Trading firms and HFTs - please reach out for increased rate limits
          and lower latency gateways.{' '}
          <ExternalLink
            href={LINKS.institutionalTg}
            className="inline-flex text-white"
          >
            Contact us here
          </ExternalLink>
        </motion.p>
      </Container>
    </motion.section>
  );
}
