'use client';

import { joinClassNames } from '@vertex-protocol/web-common';
import { BlurRevealText } from 'client/components/RevealText/BlurRevealText';
import { motion } from 'framer-motion';
import { shuffle } from 'lodash';
import { ReactNode, useEffect, useState } from 'react';

interface Props {
  traders: Trader[];
  animationCycle: number;
}

interface Trader {
  name: string;
  icon: ReactNode;
  user: string;
}

export function TradersList({ traders, animationCycle }: Props) {
  const [visibleTraders, setVisibleTraders] = useState(() =>
    traders.slice(0, 3),
  );

  useEffect(() => {
    setVisibleTraders(shuffle(traders).slice(0, 3));
  }, [animationCycle, traders]);

  const chainBoxClass =
    'bg-darkest border-light-03 rounded-lg border-2 p-0.5 relative';

  return (
    <div className="w-[120px] gap-y-2 sm:w-[170px]">
      {visibleTraders.map((trader, index) => {
        const isFirst = index === 0;
        const isLast = index === visibleTraders.length - 1;
        const isMiddle = !isFirst && !isLast;

        const boxClassName = joinClassNames(
          chainBoxClass,
          isFirst && 'bottom-[-50px]',
          isLast && 'top-[-50px] opacity-50',
          isMiddle && 'z-10 opacity-100',
        );

        return (
          <div key={`trader-${trader.name}-${index}`} className={boxClassName}>
            <div
              className={joinClassNames(
                'flex flex-col gap-y-2 rounded-sm px-2 pt-4 pb-3 md:py-4 md:pr-8 md:pl-4',
                isMiddle ? 'bg-chain-gradient' : 'bg-dark',
              )}
            >
              <motion.div
                className={joinClassNames(
                  'hidden sm:block',
                  !isMiddle && 'opacity-30',
                )}
              >
                {trader.icon}
              </motion.div>
              <motion.div
                key={`name-${trader.name}-${Date.now()}`}
                className={joinClassNames(
                  'flex items-center gap-x-1.5',
                  !isMiddle && 'opacity-30',
                )}
              >
                <span className="text-body-9 sm:text-body-12">Trader on</span>
                <BlurRevealText
                  containerClassName="flex items-center"
                  immediate
                  texts={[
                    {
                      element: 'span',
                      text: trader.name,
                      className: 'text-body-9 sm:text-body-12 text-white',
                    },
                  ]}
                />
              </motion.div>
              <motion.div
                key={`user-${trader.name}-${Date.now()}`}
                className={joinClassNames(!isMiddle && 'opacity-30')}
              >
                <BlurRevealText
                  immediate
                  texts={[
                    {
                      element: 'span',
                      text: trader.user,
                      className: 'text-body-gray text-body-9 sm:text-body-12',
                    },
                  ]}
                />
              </motion.div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
