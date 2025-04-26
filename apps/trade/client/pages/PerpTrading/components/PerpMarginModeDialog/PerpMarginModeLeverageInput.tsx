import { LeveragePill } from 'client/components/LeveragePill';
import { PerpStaticMarketData } from 'client/hooks/markets/marketsStaticData/types';

import { RangeSlider } from 'client/modules/trading/components/RangeSlider';
import Image from 'next/image';

interface Props {
  currentMarket: PerpStaticMarketData | undefined;
  leverage: number;
  setLeverage: (value: number) => void;
}

export function PerpMarginModeLeverageInput({
  currentMarket,
  leverage,
  setLeverage,
}: Props) {
  if (!currentMarket) {
    return null;
  }

  return (
    <>
      <div className="flex items-center gap-x-2">
        <Image
          src={currentMarket.metadata.icon.asset}
          alt={currentMarket.metadata.symbol}
          width={18}
          height={18}
        />
        <span className="text-text-primary text-base">
          {currentMarket.metadata.marketName}
        </span>
        <LeveragePill>MAX {currentMarket.maxLeverage}x</LeveragePill>
      </div>
      <RangeSlider
        min={1}
        max={currentMarket.maxLeverage}
        step={1}
        value={leverage}
        renderValue={(value) => `${value}x`}
        onValueChange={setLeverage}
      />
    </>
  );
}
