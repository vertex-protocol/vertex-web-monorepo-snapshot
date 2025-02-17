import { AppPage } from 'client/modules/app/AppPage';
import Image from 'next/image';

import vertexSonicLogo from 'client/pages/SonicPoints/vertex-x-sonic-logo.svg';

export function SonicPointsPageHeader() {
  return (
    <div className="flex flex-col justify-between gap-y-4 sm:flex-row">
      <AppPage.Header
        title={
          <div className="flex items-baseline gap-x-3.5">
            Gems Farming
            <span className="text-sonic-gradient-highlight text-xl">
              Season 1
            </span>
          </div>
        }
        description="Trade, deposit, and refer to earn credits towards Sonic Gems."
      />
      <Image src={vertexSonicLogo} alt="" className="self-end" />
    </div>
  );
}
