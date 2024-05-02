import { m } from 'framer-motion';
import { range } from 'lodash';

function getRandomNumber() {
  return Math.floor(Math.random() * 700 + 100);
}

export function GlitchBackground() {
  return (
    <div className="absolute z-0 flex h-screen w-screen flex-col bg-gradient-to-b from-transparent to-black">
      {range(5).map((index) => {
        const animateRandomNumber = getRandomNumber();
        return (
          <m.div
            key={index}
            className="h-[150px] bg-gradient-to-b from-transparent to-black"
            initial={{ y: 0, opacity: 0.5 }}
            animate={{ y: `${animateRandomNumber}px` }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
        );
      })}
    </div>
  );
}
