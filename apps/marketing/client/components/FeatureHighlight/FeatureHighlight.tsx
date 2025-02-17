'use client';

import { useWindowSize } from '@vertex-protocol/web-common';
import { ClientVideo } from 'client/components/ClientVideo/ClientVideo';
import { BlurRevealText } from 'client/components/RevealText/BlurRevealText';
import { motion } from 'framer-motion';
import React, { useRef } from 'react';

interface Props {
  title: string;
  description: string;
  videoSrc: string;
  playDelay?: number;
}

export function FeatureHighlight({
  title,
  description,
  videoSrc,
  playDelay = 0,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useWindowSize();
  const isMobile = width < 768;

  const handleMouseEnter = () => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      video.loop = true;
      video.play();
    }
  };

  const handleMouseLeave = () => {
    const video = videoRef.current;
    if (video) {
      video.loop = false;
    }
  };

  return (
    <motion.div ref={containerRef} className="flex flex-col items-start">
      <div
        className="h-52 flex-1 rounded-lg pb-8 md:max-w-md"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <ClientVideo
          videoRef={videoRef}
          videoSrc={videoSrc}
          loop={isMobile}
          autoPlay={isMobile}
          muted={true}
          playsInline={true}
          className="h-full w-full rounded-lg object-cover"
          preload="auto"
          playDelay={playDelay}
        />
      </div>
      <BlurRevealText
        texts={[
          {
            element: 'h2',
            text: title,
            className: 'text-header-3 font-radioGrotesk mb-4',
          },
        ]}
      />
      <p className="text-body-gray text-body-14 md:text-body-16 md:max-w-64">
        {description}
      </p>
    </motion.div>
  );
}
