import { toBigDecimal } from '@vertex-protocol/client';
import { LiquidationRiskBar } from 'client/components/LiquidationRiskBar';

const LIQUIDATION_RISKS = [
  { liquidationRiskFraction: toBigDecimal(0.2), label: '0 → 40%' },
  { liquidationRiskFraction: toBigDecimal(0.4), label: '40 → 60%' },
  { liquidationRiskFraction: toBigDecimal(0.7), label: '70 → 90%' },
  { liquidationRiskFraction: toBigDecimal(0.9), label: '90 → 100%' },
] as const;

export function LiquidationRiskBars() {
  return (
    <>
      {LIQUIDATION_RISKS.map(({ liquidationRiskFraction, label }) => (
        <div key={label} className="flex flex-col gap-y-2.5">
          <div className="text-text-primary whitespace-nowrap">{label}</div>
          <LiquidationRiskBar
            liquidationRiskFraction={liquidationRiskFraction}
            className="h-5 w-full"
          />
        </div>
      ))}
    </>
  );
}
