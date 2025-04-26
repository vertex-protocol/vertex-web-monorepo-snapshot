'use client';

import { joinClassNames } from '@vertex-protocol/web-common';
import { BlurRevealText } from 'client/components/RevealText/BlurRevealText';
import { LayoutGroup, motion } from 'framer-motion';
import { range } from 'lodash';
import { useEffect, useState } from 'react';

interface Props {
  combinations: string[];
  borderColor: string;
  animationCycle: number;
}

export function AnimatedOrderList({
  combinations,
  borderColor,
  animationCycle,
}: Props) {
  const [orders, setOrders] = useState(combinations.slice(0, 3));

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * combinations.length);
    const newOrder = combinations[randomIndex];
    setOrders((prev) => [newOrder, prev[0], prev[1]]);
  }, [animationCycle, combinations]);

  const offerBidContainerClass =
    'bg-darkest border-light-03 max-w-max rounded-lg border-2 p-0.5';
  const offerBidInnerClass =
    'bg-chain-gradient rounded-sm border-l-4 py-2 pl-4 pr-8 whitespace-nowrap';

  return (
    <div className="text-body-9 sm:text-body-12 flex flex-col gap-y-0.5">
      <LayoutGroup>
        {range(3).map((index) => (
          <motion.div
            layout
            key={`container-${index}`}
            className={offerBidContainerClass}
            transition={{
              layout: {
                duration: 0.4,
                ease: [0.23, 1, 0.32, 1],
              },
            }}
          >
            <motion.div
              layout
              className={joinClassNames(offerBidInnerClass, borderColor)}
              transition={{
                layout: {
                  duration: 0.4,
                  ease: [0.23, 1, 0.32, 1],
                },
              }}
            >
              <BlurRevealText
                immediate
                texts={[
                  {
                    element: 'span',
                    text: orders[index],
                    className: 'whitespace-nowrap',
                  },
                ]}
              />
            </motion.div>
          </motion.div>
        ))}
      </LayoutGroup>
    </div>
  );
}
