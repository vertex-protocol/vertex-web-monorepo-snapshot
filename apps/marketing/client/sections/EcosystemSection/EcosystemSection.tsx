'use client';

import { joinClassNames } from '@vertex-protocol/web-common';
import { Container } from 'client/components/Container/Container';
import { EcosystemCardWrapper } from 'client/components/EcosystemCardWrapper/EcosystemCardWrapper';
import { ExternalLink } from 'client/components/Link/ExternalLink';
import { BlurRevealText } from 'client/components/RevealText/BlurRevealText';
import { Section } from 'client/components/Section/Section';
import {
  ECOSYSTEM_COMING_SOON_PARTNERS,
  ECOSYSTEM_PARTNERS,
} from 'client/sections/EcosystemSection/data';
import { LINKS } from 'config/links';
import { motion } from 'framer-motion';

export function EcosystemSection() {
  return (
    <Section asMotion mode="wait">
      <Container>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="mb-8 md:mb-0">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 'some' }}
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
              <BlurRevealText
                texts={[
                  {
                    element: 'h2',
                    text: 'Ecosystem',
                    className:
                      'text-header-2 md:text-header-1 font-radio-grotesk mb-4',
                  },
                  {
                    element: 'p',
                    text: 'Vertex integrates with the best to bring traders the tools they deserve.',
                    className: joinClassNames(
                      'text-body-gray text-body-14 md:text-body-16 mb-14 max-w-[30ch]',
                    ),
                  },
                  {
                    element: 'p',
                    text: "Tap into Vertex's speed, liquidity, and unique multichain design to build cutting edge products.",
                    className: joinClassNames(
                      'text-body-gray text-body-14 md:text-body-16 mb-4 max-w-[30ch]',
                    ),
                  },
                ]}
              />
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 'some' }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.3, delay: 0.5 },
                },
              }}
            >
              <ExternalLink
                href={LINKS.apiDocs}
                className='className="inline-block text-body-14 md:text-body-16'
                aria-label="Build Using Vertex"
              >
                Build Using Vertex
              </ExternalLink>
            </motion.div>
          </div>
          <div className="mt-8 flex flex-col gap-y-3 md:mt-0">
            {ECOSYSTEM_PARTNERS.map((partner, index) => (
              <EcosystemCardWrapper
                key={partner.name}
                partner={partner}
                index={index}
                comingSoon={false}
                totalMainPartners={ECOSYSTEM_PARTNERS.length}
              />
            ))}
            <div className="mt-8">
              <motion.p
                className="text-body-gray text-body-13 mb-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 'some' }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      type: 'spring',
                      stiffness: 100,
                      duration: 0.1,
                      delay: ECOSYSTEM_PARTNERS.length * 0.05,
                    },
                  },
                }}
              >
                Coming soon
              </motion.p>
              {ECOSYSTEM_COMING_SOON_PARTNERS.map((partner, index) => (
                <EcosystemCardWrapper
                  key={partner.name}
                  partner={partner}
                  index={index}
                  comingSoon={true}
                  totalMainPartners={ECOSYSTEM_PARTNERS.length}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
