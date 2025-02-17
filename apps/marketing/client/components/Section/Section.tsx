'use client';

import React from 'react';
import {
  joinClassNames,
  WithChildren,
  WithClassnames,
} from '@vertex-protocol/web-common';
import {
  AnimatePresence,
  motion,
  Variants,
  AnimatePresenceProps,
} from 'framer-motion';
import { SECTION_MOTION_VARIANTS } from 'client/components/Section/motionVariants';

type ModeType = AnimatePresenceProps['mode'];

interface Props extends WithChildren, WithClassnames {
  asMotion?: boolean;
  mode?: ModeType;
  id?: string;
  variants?: Variants;
}

/**
 * Section component renders a section of the page with optional motion animation.
 */
export function Section({
  asMotion = false,
  children,
  mode = 'wait',
  className,
  id,
  variants,
}: Props) {
  const sectionClassName = joinClassNames(
    'min-h-svh text-white py-16 md:py-32 flex flex-col justify-center',
    className,
  );

  // If the section is animated, render the motion.section component.
  if (asMotion) {
    return (
      <AnimatePresence mode={mode}>
        <motion.section
          className={sectionClassName}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={variants ? variants : SECTION_MOTION_VARIANTS}
          id={id}
        >
          {children}
        </motion.section>
      </AnimatePresence>
    );
  }

  // If the section is not animated, render the standard section component.
  return (
    <AnimatePresence mode={mode}>
      <section id={id} className={sectionClassName}>
        {children}
      </section>
    </AnimatePresence>
  );
}
