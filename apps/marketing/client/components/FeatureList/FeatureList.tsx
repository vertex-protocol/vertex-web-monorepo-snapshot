'use client';

import { motion, useInView } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface Props {
  features: Feature[];
}

interface Feature {
  icon: ReactNode;
  title: string;
  description: string;
}

export function FeatureList({ features }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-1 gap-8 md:grid-cols-4"
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      {features.map((feature, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5 }}
          className="gap-y-2"
        >
          <div className="inline-flex items-center gap-x-1">
            {feature.icon}
            <h4 className="text-body-14">{feature.title}</h4>
          </div>
          <p className="text-body-gray text-body-14 md:max-w-48">
            {feature.description}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}
