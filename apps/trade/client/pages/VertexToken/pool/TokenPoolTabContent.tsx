import { TOKEN_PAGE_RIGHT_SECTION_CLASSNAMES } from 'client/pages/VertexToken/consts';
import { VrtxBalancesCard } from './VrtxBalancesCard';
import { VrtxMarketCard } from './VrtxMarketCard/VrtxMarketCard';
import { VrtxPoolCard } from './VrtxPoolCard/VrtxPoolCard';

export function TokenPoolTabContent() {
  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <VrtxPoolCard className={TOKEN_PAGE_RIGHT_SECTION_CLASSNAMES} />
      <div className="flex flex-1 flex-col gap-6">
        <VrtxBalancesCard />
        <VrtxMarketCard />
      </div>
    </div>
  );
}
