import { mergeClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { motion, useInView } from 'framer-motion';
import dynamic from 'next/dynamic';
import { RefObject, useEffect, useRef, VideoHTMLAttributes } from 'react';

interface Props extends VideoHTMLAttributes<HTMLVideoElement>, WithClassnames {
  videoRef: RefObject<HTMLVideoElement | null>;
  videoSrc: string;
  playDelay?: number;
}

export const ClientVideo = dynamic(() => Promise.resolve(Video), {
  ssr: false,
});

function Video({
  videoRef,
  videoSrc,
  className,
  playDelay = 0,
  playsInline = true,
  ...videoProps
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, {
    once: true,
    amount: 0.3,
  });

  useEffect(() => {
    if (isInView && videoRef.current) {
      // Reset video to start
      videoRef.current.currentTime = 0;

      if (playDelay > 0) {
        setTimeout(() => {
          videoRef.current?.play();
        }, playDelay * 1000);
      } else {
        videoRef.current.play();
      }
    }
  }, [isInView, playDelay, videoRef]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      className={mergeClassNames('overflow-clip', className)}
    >
      <video
        ref={videoRef}
        src={videoSrc}
        playsInline={playsInline}
        className="h-full w-full object-cover"
        {...videoProps}
      />
    </motion.div>
  );
}
