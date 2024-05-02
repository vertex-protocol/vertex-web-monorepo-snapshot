import { joinClassNames } from '@vertex-protocol/web-common';
import Image from 'next/image';
import backgroundImage from 'public/img/edge-background.png';

export function EdgeBgImage() {
  const bgImageClassName = joinClassNames(
    'flex inset-0 justify-center overflow-hidden p-8',
    '-z-1 absolute',
  );
  return (
    <div className={bgImageClassName}>
      <Image
        priority
        className="h-auto w-[680px] min-w-[680px] object-contain opacity-60"
        src={backgroundImage}
        alt="bg-header"
      />
    </div>
  );
}
