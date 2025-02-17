import { Variants } from 'framer-motion';

export const NUMBER_VARIANTS: Variants = {
  hidden: {
    opacity: 0,
    y: 0,
    filter: 'blur(5px)',
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      delay: i * 0.2,
      duration: 0.2,
      ease: 'linear',
    },
  }),
};
