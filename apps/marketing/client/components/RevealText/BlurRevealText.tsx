'use client';

import { TextItem } from 'client/components/RevealText/types';
import { motion } from 'framer-motion';
import { Fragment } from 'react';

interface Props {
  texts: TextItem[];
  containerClassName?: string;
  immediate?: boolean;
}

// The transition for the blur reveal text.
const transition = { duration: 0.5, ease: [0.3, 0.1, 0.3, 1] };

// The variants for the blur reveal text.
const variants = {
  hidden: { filter: 'blur(10px)', transform: 'translateY(20%)', opacity: 0 },
  visible: { filter: 'blur(0)', transform: 'translateY(0)', opacity: 1 },
};

//BlurRevealText component renders the blur reveal text.
export function BlurRevealText({
  texts,
  containerClassName = '',
  immediate,
}: Props) {
  return (
    <motion.div
      initial="hidden"
      {...(immediate
        ? {
            animate: 'visible',
            transition: { staggerChildren: 0.03 },
          }
        : {
            whileInView: 'visible',
            viewport: { once: true },
            transition: { staggerChildren: 0.03, delayChildren: 0.1 },
          })}
      className={containerClassName}
    >
      {texts.map((item, index) => {
        const words = item.text.split(' ');
        const Element = item.element;

        return (
          <Element key={index} className={item.className}>
            {words.map((word, wordIndex) => (
              <Fragment key={wordIndex}>
                <motion.span
                  className="inline-block"
                  transition={transition}
                  variants={variants}
                >
                  {word}
                </motion.span>
                {wordIndex < words.length - 1 && ' '}
              </Fragment>
            ))}
          </Element>
        );
      })}
    </motion.div>
  );
}
