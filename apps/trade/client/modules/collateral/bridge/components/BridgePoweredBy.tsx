import { IMAGES } from 'common/brandMetadata/images';
import Image from 'next/image';

export function BridgePoweredBy() {
  return (
    <div className="flex items-center justify-center text-xs">
      <span>Powered by</span>
      <Image src={IMAGES.partners.squid} alt="squid" className="h-auto w-8" />
      <span>+</span>
      <Image
        src={IMAGES.partners.axelar}
        alt="axelar"
        // Note: left margin just makes things look a bit better
        className="ml-1 h-auto w-10"
      />
    </div>
  );
}
