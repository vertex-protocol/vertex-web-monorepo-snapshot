'use client';

import { joinClassNames } from '@vertex-protocol/web-common';
import { ExternalLink } from 'client/components/Link/ExternalLink';
import { VRTX_PARTNERS } from 'client/sections/VrtxSection/data';
import {
  VRTX_CONTAINER_VARIANTS,
  VRTX_ITEM_VARIANTS,
} from 'client/sections/VrtxSection/motionVariants';
import { motion } from 'framer-motion';

export function VrtxPartners() {
  return (
    <motion.div
      variants={VRTX_CONTAINER_VARIANTS}
      className="mb-12 grid grid-cols-2 gap-6 md:grid-cols-4"
    >
      {VRTX_PARTNERS.map((partner) => {
        const linkClass = joinClassNames(
          'bg-card-alt flex items-center justify-center',
          'border border-table rounded-md p-4',
          'opacity-60 transition-opacity ease-in-out hover:opacity-100 duration-130',
        );

        return (
          <motion.div
            key={partner.name}
            variants={VRTX_ITEM_VARIANTS}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <ExternalLink
              href={partner.link}
              withHoverEffect={false}
              className={linkClass}
            >
              <partner.logo size={54} />
            </ExternalLink>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
