import OneClickIcon from 'client/icons/features/OneClickIcon';
import RewardsIcon from 'client/icons/features/RewardsIcon';
import UnbeatableIcon from 'client/icons/features/UnbeatableIcon';
import UnlikeIcon from 'client/icons/features/UnlikeIcon';

export const FEATURE_DATA = {
  highlights: [
    {
      title: 'Feel the Speed',
      description:
        'Vertex delivers trades in 5-15 milliseconds - unparalleled speed, unrivaled performance.',
      videoSrc: '/video/feel.mp4',
    },
    {
      title: 'Liquidity for all Sizes',
      description:
        'Vertex offers unmatched depth and tight spreads - built for trades of any size.',
      videoSrc: '/video/chain.mp4',
    },
  ],
  features: [
    {
      icon: <OneClickIcon size={16} />,
      title: 'One-Click Trading',
      description:
        'No more wasted time. Sign one transaction for your entire trading session.',
    },
    {
      icon: <UnbeatableIcon size={14} />,
      title: 'Unbeatable Fees',
      description: 'Stop overpaying. 0% on maker orders and 0.02% for takers.',
    },
    {
      icon: <UnlikeIcon size={16} />,
      title: 'Unlike The Others',
      description:
        'Perp, spot, and yield markets with cross-margining offer endless opportunities.',
    },
    {
      icon: <RewardsIcon size={14} />,
      title: 'Rewards',
      description:
        'Earn when you trade. Stake VRTX to share in protocol growth.',
    },
  ],
};
