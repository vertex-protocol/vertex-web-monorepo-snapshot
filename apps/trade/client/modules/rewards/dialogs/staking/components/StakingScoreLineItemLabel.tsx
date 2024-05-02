import { VOVRTX_INFO } from 'common/productMetadata/vertexTokenInfo';
import Image from 'next/image';

export function StakingScoreLineItemLabel() {
  return (
    <div className="flex items-center gap-x-1">
      <Image src={VOVRTX_INFO.icon.asset} alt={VOVRTX_INFO.symbol} />
      <span>Score</span>
    </div>
  );
}
