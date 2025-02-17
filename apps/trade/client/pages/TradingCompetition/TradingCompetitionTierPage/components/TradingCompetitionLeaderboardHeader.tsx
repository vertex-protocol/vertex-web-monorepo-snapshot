import { AppPage } from 'client/modules/app/AppPage';

export function TradingCompetitionLeaderboardHeader() {
  return (
    <AppPage.Header
      title="Leaderboard"
      description={
        <>
          You can trade in any market to win. Winners are based on % ROI, which
          uses cash flow adjusted earnings.
          <br />
          Rankings and eligibility update every 3 hours.
        </>
      }
    />
  );
}
