'use client';

import { joinClassNames } from '@vertex-protocol/web-common';
import { LaunchAppButton } from 'client/components/Button/LaunchAppButton';
import { Container } from 'client/components/Container/Container';
import { FeatureHighlight } from 'client/components/FeatureHighlight/FeatureHighlight';
import { FeatureList } from 'client/components/FeatureList/FeatureList';
import { BlurRevealText } from 'client/components/RevealText/BlurRevealText';
import { ScrollRevealText } from 'client/components/RevealText/ScrollRevealText';
import { Section } from 'client/components/Section/Section';
import { FEATURE_DATA } from 'client/sections/FeaturesSection/data';
import {
  containerVariants,
  itemVariants,
} from 'client/sections/FeaturesSection/motionVariants';
import { LINKS, SECTION_IDS } from 'config/links';
import { motion } from 'framer-motion';

export function FeaturesSection() {
  const listItemClasses = 'text-header-4 md:text-header-3';

  return (
    <Section
      id={SECTION_IDS.whyVertex}
      className={joinClassNames('overflow-hidden text-white')}
      asMotion
      variants={containerVariants}
      aria-labelledby="features-section-title"
    >
      <Container>
        <div
          className={joinClassNames(
            'mb-24 grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-8',
          )}
        >
          {FEATURE_DATA.highlights.map((highlight, index) => (
            <div key={index}>
              <FeatureHighlight {...highlight} playDelay={index} />
            </div>
          ))}
        </div>
        <motion.div variants={itemVariants}>
          <FeatureList features={FEATURE_DATA.features} />
        </motion.div>
        <motion.hr
          className="border-new-website-overlay-8 my-32"
          variants={{
            hidden: { scaleX: 0 },
            visible: {
              scaleX: 1,
              transition: { duration: 0.5, ease: 'easeInOut' },
            },
          }}
          aria-hidden="true"
        />
        <motion.div
          className={joinClassNames(
            'flex flex-col justify-between gap-8 md:flex-row md:items-center',
          )}
          variants={containerVariants}
        >
          <motion.div
            className="font-radio-grotesk"
            variants={containerVariants}
          >
            <BlurRevealText
              texts={[
                {
                  element: 'h2',
                  text: 'Not Just Another Perp DEX.',
                  className: joinClassNames(
                    'text-header-2 mb-8 md:text-header-1',
                  ),
                },
              ]}
            />
            <ScrollRevealText
              texts={[
                {
                  element: 'p',
                  text: 'Trade perps, spot & spreads.',
                  className: listItemClasses,
                },
                {
                  element: 'p',
                  text: 'Use multiple types of collateral.',
                  className: listItemClasses,
                },
                {
                  element: 'p',
                  text: 'Earn interest automatically.',
                  className: listItemClasses,
                },
                {
                  element: 'p',
                  text: 'Lend and borrow assets.',
                  className: listItemClasses,
                },
              ]}
            />
          </motion.div>
          <motion.div
            className="max-w-[27ch]"
            variants={itemVariants}
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <motion.div
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              className="max-w-[200px]"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              <LaunchAppButton href={LINKS.app} trackingKey="why_vertex">
                Put Your Capital to Work
              </LaunchAppButton>
            </motion.div>
            <motion.p
              className="text-body-gray text-body-14 mt-8 mb-4"
              variants={itemVariants}
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              <span className="text-white">
                All collateral automatically earns interest.{' '}
              </span>
              Even when you&apos;re not trading, your assets are working.
              Multiple collaterals and cross-margin means multiple
              possibilities.
            </motion.p>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
