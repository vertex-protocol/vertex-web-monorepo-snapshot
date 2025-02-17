'use client';

import { m, useAnimation } from 'framer-motion';
import Link from 'next/link';
import React, { ComponentPropsWithRef } from 'react';

interface BlitzLinkButtonProps
  extends Omit<ComponentPropsWithRef<typeof Link>, 'as'> {
  href: string;
  children: string;
  external?: boolean;
}

/**
 * @name BlitzLinkButton
 * @description A button used in the Blitz landing page
 *
 * @param {string} href The link to navigate to when the button is clicked
 * @param {string} children The text to display in the button
 * @param {SharedButtonProps} rest The props to pass to the button
 */
export function BlitzLinkButton({
  children,
  href,
  external = false,
  ...rest
}: BlitzLinkButtonProps) {
  const target = external ? '_blank' : undefined;
  const rel = external ? 'noopener noreferrer' : undefined;
  const controls = useAnimation();

  const handleHoverStart = () => {
    controls.start('animate');
  };

  const handleHoverEnd = () => {
    controls.start('initial');
  };

  return (
    <div
      className="relative h-9 w-[200px] cursor-pointer text-lg tracking-widest"
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
      onTouchStart={handleHoverStart}
      onTouchEnd={handleHoverEnd}
    >
      <m.div
        className="bg-pink/[0.6] shadow-pink absolute h-[33px] w-full"
        variants={{
          initial: { x: -2, y: 2 },
          animate: { x: 2, y: -2 },
        }}
        initial="initial"
        animate={controls}
      />
      <m.div
        className="bg-button relative flex h-[33px] items-center justify-center"
        variants={{
          initial: { x: 2, y: -2 },
          animate: { x: -2, y: 2 },
        }}
        initial="initial"
        animate={controls}
      >
        <Link href={href} {...rest} target={target} rel={rel}>
          {children}
        </Link>
      </m.div>
    </div>
  );
}
