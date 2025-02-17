'use client';

import React, { useRef } from 'react';
import { useInView, motion } from 'framer-motion';
import { EcosystemCard } from 'client/components/EcosystemCardWrapper/EcosystemCard';
import { EcosystemPartner } from 'client/sections/EcosystemSection/data';

interface EcosystemCardWrapperProps {
  partner: EcosystemPartner;
  index: number;
  comingSoon?: boolean;
  totalMainPartners?: number;
}

export function EcosystemCardWrapper({
  partner,
  index,
  comingSoon = false,
  totalMainPartners = 0,
}: EcosystemCardWrapperProps) {
  const cardRef = useRef(null);
  const isCardInView = useInView(cardRef, {
    once: true,
    amount: 0.5,
    margin: '0px 0px -100px 0px',
  });

  const delay = comingSoon
    ? (totalMainPartners + index + 1) * 0.05
    : index * 0.05;

  return (
    <motion.div
      ref={cardRef}
      initial="hidden"
      animate={isCardInView ? 'visible' : 'hidden'}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            type: 'spring',
            stiffness: 100,
            duration: 0.1,
            delay,
          },
        },
      }}
      transition={{ duration: 0.2 }}
    >
      <EcosystemCard partner={partner} comingSoon={comingSoon} />
    </motion.div>
  );
}
