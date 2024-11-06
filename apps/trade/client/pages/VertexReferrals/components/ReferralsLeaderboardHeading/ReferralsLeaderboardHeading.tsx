import { ReferralRankPill } from 'client/pages/VertexReferrals/components/ReferralsLeaderboardHeading/ReferralRankPill';

export function ReferralsLeaderboardHeading() {
  return (
    <div className="flex items-center gap-x-3">
      <div className="text-text-primary text-xl">Leaderboard</div>
      <ReferralRankPill />
    </div>
  );
}
