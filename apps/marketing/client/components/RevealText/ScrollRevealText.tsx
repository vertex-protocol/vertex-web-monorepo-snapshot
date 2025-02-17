'use client';

import {
  cubicBezier,
  motion,
  MotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ElementType, Fragment, useRef } from 'react';

interface ScrollRevealTextProps {
  texts: Array<{
    text: string;
    element: ElementType;
    className?: string;
  }>;
  containerClassName?: string;
}

export function ScrollRevealText({
  texts,
  containerClassName = '',
}: ScrollRevealTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Add spring physics to smooth out the scroll progress and prevent reverse
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.5,
    bounce: 0, // Prevent bouncing
  });

  const hasReachedFullVisibility = useRef(false);
  const oneWayProgress = useTransform(smoothProgress, (latest) => {
    // If we've ever reached full visibility, stay at 1
    if (hasReachedFullVisibility.current) {
      return 1;
    }

    // Once we reach near completion, lock it
    if (latest >= 0.5) {
      hasReachedFullVisibility.current = true;
      return 1;
    }

    // Otherwise allow normal scrolling behavior
    return latest;
  });

  // Combine all texts into one array of words
  const allWords = texts.reduce(
    (acc, item, index) => {
      const words = item.text.split(' ');
      if (index < texts.length - 1) {
        words.push('\n'); // Add line break marker between texts
      }
      return [...acc, ...words];
    },
    [''],
  );

  const totalWords = allWords.length;

  return (
    <div ref={containerRef} className={containerClassName}>
      {texts.map((item, textIndex) => {
        const Element = item.element;

        return (
          <Element key={textIndex} className={item.className}>
            {item.text.split(' ').map((word, wordIndex) => {
              // Calculate global word index
              return (
                <Content
                  key={wordIndex}
                  word={word}
                  wordIndex={wordIndex}
                  textIndex={textIndex}
                  totalWords={totalWords}
                  texts={texts}
                  oneWayProgress={oneWayProgress}
                />
              );
            })}
          </Element>
        );
      })}
    </div>
  );
}

interface ContentProps {
  word: string;
  wordIndex: number;
  textIndex: number;
  totalWords: number;
  texts: ScrollRevealTextProps['texts'];
  oneWayProgress: MotionValue<number>;
}

const Content = ({
  word,
  wordIndex,
  textIndex,
  totalWords,
  texts,
  oneWayProgress,
}: ContentProps) => {
  const globalWordIndex =
    texts.slice(0, textIndex).reduce(
      (acc, text) => acc + text.text.split(' ').length + 1, // +1 for line break
      0,
    ) + wordIndex;

  // Animation timing constants
  // 0.4: Words reveal across 40% of the total scroll distance
  // 0.3: Each word takes 30% of the scroll distance to fully reveal
  // 0.15: Words start their animation slightly before their designated start point for smoother overlap
  const progressStart = (globalWordIndex / totalWords) * 0.4; // Spread words across 40% of scroll
  const progressEnd = progressStart + 0.3; // Each word takes 30% to reveal
  const staggeredStart = progressStart - 0.15; // Start slightly early for overlap

  const ease = cubicBezier(0.16, 1, 0.3, 1);

  const opacity = useTransform(
    oneWayProgress,
    [0, staggeredStart, progressStart, progressEnd],
    [0, 0, 0, 1],
    { ease },
  );
  const y = useTransform(
    oneWayProgress,
    [0, staggeredStart, progressStart, progressEnd],
    ['30%', '30%', '30%', '0%'],
    { ease },
  );
  const blurValue = useTransform(
    oneWayProgress,
    [0, staggeredStart, progressStart, progressEnd],
    ['20px', '20px', '20px', '0px'],
    { ease },
  );

  // Create a derived motion value for the complete filter string
  const filterBlur = useTransform(blurValue, (value) => `blur(${value})`);

  return (
    <Fragment key={wordIndex}>
      <motion.span
        className="inline-block"
        style={{
          opacity,
          y,
          filter: filterBlur,
        }}
      >
        {word}
      </motion.span>
      {wordIndex < texts[textIndex].text.split(' ').length - 1 && ' '}
    </Fragment>
  );
};
