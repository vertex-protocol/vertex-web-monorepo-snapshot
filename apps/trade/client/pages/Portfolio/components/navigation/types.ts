export interface PortfolioNavItem {
  label: string;
  href: string;
  selected?: boolean;
  // If given, renders a "count" indicator - for example, the number of open orders
  associatedCount?: number;
  disabled?: boolean;
}
