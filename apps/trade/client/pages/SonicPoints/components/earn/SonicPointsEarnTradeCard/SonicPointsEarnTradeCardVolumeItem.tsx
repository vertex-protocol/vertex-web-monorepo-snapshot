'use client';

import {
  PresetNumberFormatSpecifier,
  useVertexMetadataContext,
} from '@vertex-protocol/react-client';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { useSonicPoints } from 'client/hooks/query/points/useSonicPoints';
import { useMemo } from 'react';

export function SonicPointsEarnTradeCardVolumeItem() {
  const { data: sonicPointsData } = useSonicPoints();
  const {
    primaryQuoteToken: { symbol: primaryQuoteSymbol },
  } = useVertexMetadataContext();

  const accountTotalTradingVolume = useMemo(() => {
    return sonicPointsData
      ? sonicPointsData.takerVolume.plus(sonicPointsData.makerVolume)
      : undefined;
  }, [sonicPointsData]);

  return (
    <ValueWithLabel.Vertical
      label="Your Volume"
      sizeVariant="sm"
      value={accountTotalTradingVolume}
      numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_INT}
      valueEndElement={primaryQuoteSymbol}
    />
  );
}
