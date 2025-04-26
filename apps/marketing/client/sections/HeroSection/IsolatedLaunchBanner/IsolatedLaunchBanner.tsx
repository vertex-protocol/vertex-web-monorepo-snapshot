import { joinClassNames } from '@vertex-protocol/web-common';
import backgroundImg from 'client/sections/HeroSection/IsolatedLaunchBanner/background.svg';
import { motion } from 'framer-motion';
import Image from 'next/image';

export function IsolatedLaunchBanner() {
  return (
    <motion.div
      className={joinClassNames(
        'text-body-13 border-glass shadow-glass bg-card-gradient rounded-md border',
        'px-6 py-2',
        'relative overflow-hidden',
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className={joinClassNames(
          'flex flex-col items-center justify-center gap-1 md:flex-row',
          'relative z-10',
        )}
      >
        <span className="font-medium text-white">
          Isolated Trading is now live!
        </span>
        <span className="text-body-gray">
          Trade with maximum capital efficiency and manage risk your way.
        </span>
      </div>
      <Image
        src={backgroundImg}
        alt=""
        className="absolute top-0 -left-1/4 opacity-80"
      />
    </motion.div>
  );
}
