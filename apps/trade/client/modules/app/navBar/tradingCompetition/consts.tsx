import { NavPopoverContestItem } from 'client/modules/app/navBar/tradingCompetition/types';

const VERTEX_ARB_ITEMS: NavPopoverContestItem[] = [
  // {
  //   title: 'Round 1',
  //   startTimeMillis: 1735578000 * 1000,
  //   endTimeMillis: 1736010000 * 1000,
  //   href: VERTEX_TRADING_COMP_ROUND_1_ROUTES.base,
  // },
];

export const NAV_POPOVER_CONTEST_ITEMS = {
  arbitrum: VERTEX_ARB_ITEMS,
};

export const NAV_POPOVER_CONTEST_ITEM_HREFS = Object.values(
  NAV_POPOVER_CONTEST_ITEMS,
)
  .flat()
  .map(({ href }) => href);
