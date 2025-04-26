'use client';

import { joinClassNames } from '@vertex-protocol/web-common';
import { ComparisonCell } from 'client/components/ComparisonCell/ComparisonCell';
import { PlatformComparisonColumn } from 'client/sections/ComparisonSection/data';
import { motion } from 'framer-motion';

interface Props {
  column: PlatformComparisonColumn;
  index: number;
  isInView: boolean;
}

export function ComparisonColumn({ column, index, isInView }: Props) {
  const columnClassName = joinClassNames(
    'w-64 overflow-hidden rounded-lg border-y-2',
    index === 0
      ? 'shadow-table border-table border-x-2 bg-table-gradient text-white'
      : 'border-transparent text-body-gray',
  );

  const entries = Object.entries(column).map(([key, cell], cellIndex) => (
    <motion.div
      key={`comparison-${key}-cell`}
      className={joinClassNames(
        'border-table flex h-20 flex-col items-center justify-center p-4',
        cellIndex !== 0 && 'border-t',
      )}
    >
      <ComparisonCell {...cell} />
    </motion.div>
  ));

  return (
    <motion.div
      className={columnClassName}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {entries}
    </motion.div>
  );
}
