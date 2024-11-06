import { NavPopoverContestItem } from 'client/modules/app/navBar/tradingCompetition/types';
import { SEI_TRADING_COMPETITION_ROUTES } from 'client/pages/TradingCompetition/configs/sei/routes';

const SEI_CONTEST_ITEMS: NavPopoverContestItem[] = [
  {
    title: 'Round 1',
    startTimeMillis: 1727712000000,
    endTimeMillis: 1728144000000,
    href: SEI_TRADING_COMPETITION_ROUTES.round1Landing,
  },
  {
    title: 'Round 2',
    startTimeMillis: 1728316800000,
    endTimeMillis: 1728748800000,
    href: SEI_TRADING_COMPETITION_ROUTES.round2Landing,
  },
  {
    title: 'Round 3',
    startTimeMillis: 1728921600000,
    endTimeMillis: 1729353600000,
    href: SEI_TRADING_COMPETITION_ROUTES.round3Landing,
  },
];

export const NAV_POPOVER_CONTEST_ITEMS = {
  sei: SEI_CONTEST_ITEMS,
};

export const NAV_POPOVER_CONTEST_ITEM_HREFS = Object.values(
  NAV_POPOVER_CONTEST_ITEMS,
)
  .flat()
  .map(({ href }) => href);
