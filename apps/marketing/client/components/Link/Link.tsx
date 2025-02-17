'use client';

import React from 'react';
import NextLink from 'next/link';
import { motion } from 'framer-motion';
import {
  joinClassNames,
  WithChildren,
  WithClassnames,
} from '@vertex-protocol/web-common';
import ArrowUpRight from 'client/icons/ArrowUpRight';

interface Props extends WithChildren, WithClassnames {
  href: string;
  showArrow?: boolean;
  withHoverEffect?: boolean;
  xOffset?: number;
}

export function ExternalLink({
  href,
  children,
  className,
  showArrow = false,
  withHoverEffect = true,
  xOffset = -5,
}: Props) {
  const linkClasses = joinClassNames(
    'flex items-center gap-x-1.5 group',
    'focus:shadow-[0_0_0_3px_rgba(255,255,255,0.1)] focus:rounded-md',
    'focus-visible:shadow-[0_0_0_3px_rgba(255,255,255,0.1)] focus-visible:rounded-md',
    'transition-[outline-offset] duration-100 ease-in',
    className,
  );

  const hoverVariants = {
    initial: {
      opacity: showArrow ? 0.6 : 0,
      scale: 0.95,
      x: xOffset,
    },
    animate: { opacity: 1, scale: 1, x: 0, transition: { duration: 0.1 } },
  };

  if (!withHoverEffect) {
    return (
      <NextLink
        href={href}
        className={linkClasses}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </NextLink>
    );
  }

  return (
    <motion.span initial="initial" animate="initial" whileHover="animate">
      <NextLink
        href={href}
        className={linkClasses}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
        <motion.span
          variants={hoverVariants}
          className={joinClassNames(!showArrow && 'hidden md:block')}
        >
          <ArrowUpRight className="size-4" />
        </motion.span>
      </NextLink>
    </motion.span>
  );
}
