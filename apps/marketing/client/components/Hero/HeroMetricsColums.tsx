'use client';

import { motion } from 'framer-motion';
import { joinClassNames } from '@vertex-protocol/web-common';
import { NUMBER_VARIANTS } from 'client/components/Hero/motionVariants';

interface Props {
  value: string;
  label: string;
  animationDelay: string;
  custom: number;
}

export function HeroMetricColumn({
  value,
  label,
  animationDelay,
  custom,
}: Props) {
  const columnClass = 'flex flex-col items-start justify-between md:min-w-24';
  const headerClass = 'text-header-2 md:text-header-1 font-radioGrotesk';
  const darkGrayTextClass = 'text-body-dark-gray text-body-13';
  const animateGradientBgClass =
    'bg-[linear-gradient(277deg,#fff,#FFF,#FFF,#CD92EC,#85C5E0,#fff)] bg-[length:200%_auto]';
  const animateGradientClass =
    'animate-gradient-6s text-transparent bg-clip-text';

  return (
    <div className={columnClass}>
      <motion.p
        custom={custom}
        variants={NUMBER_VARIANTS}
        initial="hidden"
        animate="visible"
        className={headerClass}
      >
        <span
          style={{ animationDelay }}
          className={joinClassNames(
            animateGradientBgClass,
            animateGradientClass,
          )}
        >
          {value}
        </span>
      </motion.p>
      <motion.p
        variants={NUMBER_VARIANTS}
        custom={custom + 0.1}
        initial="hidden"
        animate="visible"
        className={darkGrayTextClass}
      >
        {label}
      </motion.p>
    </div>
  );
}
