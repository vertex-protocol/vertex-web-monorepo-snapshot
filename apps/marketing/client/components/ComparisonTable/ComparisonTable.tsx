'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  PLATFORM_COMPARISON_KEYS,
  PLATFORM_COMPARISON_COLUMNS,
} from 'client/sections/ComparisonSection/data';
import { PlatformComparisonKey } from 'client/sections/ComparisonSection/data';
import { ComparisonColumn } from 'client/components/ComparisonTable/ComparisonColumn';

export function ComparisonTable() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <div className="hidden w-full pt-12 text-white md:block">
      <div className="mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-1">
            <div className="text-body-gray sticky left-0 w-64 border-y-2 border-transparent md:relative">
              <div className="flex h-20 items-end pb-4" />
              {Object.keys(PLATFORM_COMPARISON_COLUMNS[0])
                .slice(1)
                .map((key) => (
                  <motion.div
                    key={key}
                    className="border-table text-body-12 flex h-20 items-center border-t"
                  >
                    {PLATFORM_COMPARISON_KEYS[key as PlatformComparisonKey]}
                  </motion.div>
                ))}
            </div>
            {PLATFORM_COMPARISON_COLUMNS.map((column, index) => (
              <ComparisonColumn
                key={`comparison-column-${index}`}
                column={column}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
