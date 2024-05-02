import Image from 'next/image';
import axelarLogo from './assets/axelar-logo.svg';
import squidLogo from './assets/squid-logo.svg';

export function BridgePoweredBy() {
  return (
    <div className="flex items-center justify-center text-xs">
      <span>Powered by</span>
      <Image src={squidLogo} alt="squid" className="h-auto w-8" />
      <span>+</span>
      {/* Note: left margin just makes things look a bit better */}
      <Image src={axelarLogo} alt="axelar" className="ml-1 h-auto w-10" />
    </div>
  );
}
