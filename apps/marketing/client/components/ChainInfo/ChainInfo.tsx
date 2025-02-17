'use client';

import { CHAIN_INFO_DATA } from 'client/components/ChainInfo/data';
import { Tooltip } from 'client/components/Tooltip/Tooltip';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export function ChainInfo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      transition={{ duration: 0.2, delay: 0.4 }}
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: { opacity: 0, y: 5 },
        visible: { opacity: 1, y: 0 },
      }}
      className="bg-light-03 border-new-website-overlay-8 flex max-w-max items-center gap-x-2 rounded-md border p-2"
    >
      <div className="flex gap-x-0.5 text-white">
        {CHAIN_INFO_DATA.map((chain, index) => (
          <motion.div
            key={chain.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
            }
            transition={{ duration: 0.2, delay: 0.5 + index * 0.05 }}
          >
            <Tooltip trigger={chain.icon}>{chain.name}</Tooltip>
          </motion.div>
        ))}
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.5 }}
        className="text-body-gray text-body-13"
      >
        + more launching soon
      </motion.p>
    </motion.div>
  );
}
