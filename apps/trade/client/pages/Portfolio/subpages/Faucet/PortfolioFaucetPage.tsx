import { PortfolioPageContentWrapper } from 'client/pages/Portfolio/components/PortfolioPageContentWrapper';
import { PortfolioHeader } from 'client/pages/Portfolio/components/PortfolioHeader';
import { Faucet } from './components/Faucet';

export function PortfolioFaucetPage() {
  return (
    <PortfolioPageContentWrapper>
      <div className="flex flex-col items-center justify-center gap-y-4">
        <PortfolioHeader>Faucet</PortfolioHeader>
        <div className="w-96">
          <Faucet />
        </div>
      </div>
    </PortfolioPageContentWrapper>
  );
}
