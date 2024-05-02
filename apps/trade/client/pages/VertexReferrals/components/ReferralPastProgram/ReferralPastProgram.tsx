import { ReferralMetrics, ReferralMetricsProps } from './ReferralMetrics';

export function ReferralsPastProgram({
  realizedReferralRewards,
  totalReferralCount,
}: ReferralMetricsProps) {
  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex flex-col gap-y-2 sm:gap-y-3">
        <h1 className="text-text-primary text-base sm:text-xl">Past Program</h1>
        <p className="text-text-tertiary text-sm">
          Sign ups will carry over into new program
        </p>
      </div>
      <ReferralMetrics
        realizedReferralRewards={realizedReferralRewards}
        totalReferralCount={totalReferralCount}
      />
    </div>
  );
}
