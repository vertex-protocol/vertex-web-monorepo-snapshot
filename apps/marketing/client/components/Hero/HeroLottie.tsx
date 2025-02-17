'use client';

import { LottieRefCurrentProps } from 'lottie-react';
import dynamic from 'next/dynamic';
import heroAnimation from 'public/lottie/hero.json';
import { RefObject } from 'react';

interface Props {
  lottieRef: RefObject<LottieRefCurrentProps | null>;
}

const DynamicLottie = dynamic(() => import('lottie-react'), {
  ssr: false,
  loading: () => <div className="relative aspect-square" />,
});

export default function HeroLottie({ lottieRef }: Props) {
  return (
    <div className="relative aspect-square">
      <DynamicLottie
        animationData={heroAnimation}
        loop={true}
        className="absolute inset-0"
        lottieRef={lottieRef}
        renderer="svg"
        rendererSettings={{
          progressiveLoad: true,
          hideOnTransparent: true,
          imagePreserveAspectRatio: 'xMidYMid slice',
          preserveAspectRatio: 'xMidYMid slice',
        }}
        initialSegment={[0, 47]}
        onLoopComplete={() => {
          if (lottieRef.current) {
            lottieRef.current.pause();
            setTimeout(() => {
              lottieRef.current?.play();
            }, 3000);
          }
        }}
        preload="none"
        onLoadedImages={() => {
          if (lottieRef.current) {
            lottieRef.current.setSpeed(0.45);
          }
        }}
      />
    </div>
  );
}
