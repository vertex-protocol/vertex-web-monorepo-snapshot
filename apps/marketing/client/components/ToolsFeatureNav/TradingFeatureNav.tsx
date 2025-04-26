'use client';

import { joinClassNames } from '@vertex-protocol/web-common';
import { ITEM_VARIANTS } from 'client/sections/ToolsTradeSection/motionVariants';
import { TradingFeature } from 'client/sections/ToolsTradeSection/types';
import { motion } from 'framer-motion';
import {
  Dispatch,
  RefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
} from 'react';

interface Props {
  features: TradingFeature[];
  currentFeature: number;
  setCurrentFeature: Dispatch<SetStateAction<number>>;
  buttonRefs: RefObject<(HTMLButtonElement | null)[]>;
  isHovered: boolean;
  setIsHovered: (isHovered: boolean) => void;
}

export function TradingFeatureNav({
  features,
  currentFeature,
  setCurrentFeature,
  buttonRefs,
  isHovered,
  setIsHovered,
}: Props) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToButton = useCallback(
    (index: number) => {
      const button = buttonRefs.current[index];
      if (button && scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const scrollLeft =
          button.offsetLeft -
          8 -
          container.clientWidth / 2 +
          button.clientWidth / 2;
        container.scrollTo({
          left: scrollLeft,
          behavior: 'smooth',
        });
      }
    },
    [buttonRefs],
  );

  const nextFeature = useCallback(() => {
    setCurrentFeature((current) => {
      const next = (current + 1) % features.length;
      scrollToButton(next);
      return next;
    });
  }, [features.length, scrollToButton, setCurrentFeature]);

  useEffect(() => {
    const startAutoplay = () => {
      autoplayRef.current = setInterval(() => {
        if (!isHovered) {
          nextFeature();
        }
      }, 5000);
    };

    const stopAutoplay = () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
    };

    startAutoplay();
    return () => stopAutoplay();
  }, [isHovered, nextFeature]);

  const baseClass = joinClassNames(
    'no-scrollbar overflow-x-auto overflow-y-hidden relative',
    'mb-6 mt-8 flex gap-x-4 border-b border-new-website-overlay-8 p-2',
  );

  return (
    <motion.div
      ref={scrollContainerRef}
      variants={ITEM_VARIANTS}
      className={baseClass}
      style={{
        WebkitOverflowScrolling: 'touch',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {features.map((feature, index) => {
        const tradingBtnClasses = joinClassNames(
          'whitespace-nowrap px-4 py-2 flex items-center gap-x-2 text-body-13',
          'transition-colors duration-200 ease-in-out',
          index === currentFeature ? 'text-white' : 'text-body-dark-gray',
        );
        const tradingIndexClasses = joinClassNames(
          'w-5 h-5 rounded-full items-center justify-center',
          index === currentFeature
            ? 'bg-transparency-white-10 text-white'
            : 'bg-transparency-white-5 text-body-dark-gray',
          'hidden md:flex',
        );
        return (
          <motion.button
            key={feature.id}
            ref={(el) => {
              buttonRefs.current[index] = el;
            }}
            className={tradingBtnClasses}
            onClick={() => {
              setCurrentFeature(index);
              scrollToButton(index);
            }}
          >
            <motion.span
              className={tradingIndexClasses}
              animate={{
                backgroundColor:
                  index === currentFeature
                    ? 'rgba(255, 255, 255, 0.1)'
                    : 'rgba(255, 255, 255, 0.05)',
              }}
            >
              {index + 1}
            </motion.span>
            {feature.title}
          </motion.button>
        );
      })}
      <motion.div
        className="absolute bottom-0 h-px bg-white"
        initial={false}
        animate={{
          width: buttonRefs.current[currentFeature]?.offsetWidth ?? 0,
          x: (buttonRefs.current[currentFeature]?.offsetLeft ?? 0) - 8,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
        }}
      />
    </motion.div>
  );
}
