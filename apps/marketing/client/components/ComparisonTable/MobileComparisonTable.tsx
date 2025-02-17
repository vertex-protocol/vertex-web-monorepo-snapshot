'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';
import { ComparisonCell } from 'client/components/ComparisonCell/ComparisonCell';
import {
  PLATFORM_COMPARISON_KEYS,
  PLATFORM_COMPARISON_COLUMNS,
  PlatformComparisonKey,
} from 'client/sections/ComparisonSection/data';

type SwipeDirection = 'left' | 'right';

export function MobileComparisonTable() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<SwipeDirection>('right');
  const [isAnimating, setIsAnimating] = useState(false);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (
        currentIndex < PLATFORM_COMPARISON_COLUMNS.length - 1 &&
        !isAnimating
      ) {
        setIsAnimating(true);
        setDirection('left');
        setCurrentIndex((prev) => prev + 1);
      }
    },
    onSwipedRight: () => {
      if (currentIndex > 0 && !isAnimating) {
        setIsAnimating(true);
        setDirection('right');
        setCurrentIndex((prev) => prev - 1);
      }
    },
    trackMouse: true,
  });

  const getAnimationOffset = (dir: SwipeDirection) =>
    dir === 'left' ? -100 : 100;

  return (
    <div
      {...handlers}
      className="mt-12 w-full overflow-x-clip px-4 text-white md:hidden"
    >
      <div className="mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="flex">
            <div className="text-body-gray w-32 flex-1 border-y-2 border-transparent md:relative">
              <div className="flex h-16 items-end" />
              {Object.keys(PLATFORM_COMPARISON_COLUMNS[0])
                .slice(1)
                .map((key) => (
                  <motion.div
                    key={key}
                    className="border-table flex h-16 items-center border-t"
                  >
                    <span className="text-body-12">
                      {PLATFORM_COMPARISON_KEYS[key as PlatformComparisonKey]}
                    </span>
                  </motion.div>
                ))}
            </div>
            <div className="relative flex-1">
              <div className="shadow-table bg-darkest">
                <motion.div
                  key={currentIndex}
                  initial={{
                    x: getAnimationOffset(direction),
                    opacity: 0,
                  }}
                  animate={{
                    x: 0,
                    opacity: 1,
                  }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  onAnimationComplete={() => setIsAnimating(false)}
                  className="bg-table border-table rounded-lg border-2"
                >
                  <div className="flex flex-col">
                    {Object.values(
                      PLATFORM_COMPARISON_COLUMNS[currentIndex],
                    ).map((cell, index) => (
                      <motion.div
                        key={index}
                        className="border-table flex h-16 items-center justify-center border-t"
                      >
                        <ComparisonCell {...cell} />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              <div className="mt-6 flex justify-center gap-2">
                {PLATFORM_COMPARISON_COLUMNS.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (!isAnimating) {
                        setIsAnimating(true);
                        const newDirection =
                          index > currentIndex ? 'left' : 'right';
                        setDirection(newDirection);
                        setCurrentIndex(index);
                      }
                    }}
                    className={`h-2 w-2 rounded-full transition-all ${
                      index === currentIndex
                        ? 'w-4 bg-white'
                        : 'bg-body-dark-gray'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
