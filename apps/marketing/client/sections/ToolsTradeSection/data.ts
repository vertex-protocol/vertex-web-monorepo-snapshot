// import toolsImage1 from 'public/img/tools/tools-1.png';
import { TradingFeature } from 'client/sections/ToolsTradeSection/types';
// import toolsImage1Mobile from "public/img/tools/tools-1-mobile.png";
import toolsImage2Mobile from 'public/img/tools/tools-2-mobile.png';
import toolsImage2 from 'public/img/tools/tools-2.png';
import toolsImage3Mobile from 'public/img/tools/tools-3-mobile.png';
import toolsImage3 from 'public/img/tools/tools-3.png';
import toolsImage4Mobile from 'public/img/tools/tools-4-mobile.png';
import toolsImage4 from 'public/img/tools/tools-4.png';
import toolsImage5Mobile from 'public/img/tools/tools-5-mobile.png';
import toolsImage5 from 'public/img/tools/tools-5.png';

// Array of trading features
export const TRADING_FEATURES: TradingFeature[] = [
  /** @todo ADD BACK IN WHEN READY - import toolsImage1Mobile and toolsImage1 also */
  // {
  //   id: 1,
  //   title: "Cross & Isolated Margin",
  //   content: "Trade with capital efficiency and manage risk how you want.",
  //   image: toolsImage1,
  //   mobileImage: toolsImage1Mobile,
  // },
  {
    id: 2,
    title: 'Customization',
    content: 'Set up your trading interface and preferences.',
    image: toolsImage2,
    mobileImage: toolsImage2Mobile,
  },
  {
    id: 3,
    title: 'Chart Trading',
    content: 'Drag to adjust or cancel orders directly on the chart.',
    image: toolsImage3,
    mobileImage: toolsImage3Mobile,
  },
  {
    id: 4,
    title: 'Shortcuts',
    content: 'Quickly access markets and actions using just your keyboard.',
    image: toolsImage4,
    mobileImage: toolsImage4Mobile,
  },
  {
    id: 5,
    title: 'Multiple Accounts',
    content: 'Create and manage up to 4 accounts under one wallet.',
    image: toolsImage5,
    mobileImage: toolsImage5Mobile,
  },
] as const;
