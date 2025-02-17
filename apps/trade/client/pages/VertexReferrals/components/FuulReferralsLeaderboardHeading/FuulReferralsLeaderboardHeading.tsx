import { FuulReferralRankPill } from 'client/pages/VertexReferrals/components/FuulReferralsLeaderboardHeading/FuulReferralRankPill';

export function FuulReferralsLeaderboardHeading() {
  return (
    <div className="flex items-center gap-x-3">
      <div className="text-text-primary text-xl">Leaderboard</div>
      <FuulReferralRankPill />
    </div>
  );
}
