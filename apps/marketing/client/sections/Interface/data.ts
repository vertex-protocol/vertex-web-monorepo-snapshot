import { Settings } from 'react-slick';

export const INTERFACE_DATA = {
  customize: {
    heading: 'Customizable Experience',
    description:
      'Create the trading experience you desire with custom notifications, unique trading console layouts, risk management signals, and much more.',
  },
  oneClick: {
    heading: 'One-Click Trading',
    description: 'Lightning fast & seamless for the best trading experience.',
  },
  mobile: {
    heading: 'Mobile',
    description:
      'Trade and manage positions while on the move. Vertex mobile brings the same powerful experience of desktop to your fingertips.',
  },
  portfolio: {
    heading: 'Portfolio Management',
    description:
      'Easily manage all of your positions on one elegant interface. Various account indicators are there to make trading easier and help manage risk.',
  },
};

export const SLIDER_SETTINGS: Settings = {
  infinite: true,
  dots: false,
  arrows: false,
  autoplay: true,
  speed: 1000,
  swipe: true,
  rows: 1,
  centerMode: false,
  cssEase: 'ease-in-out',
  slidesToShow: 2,
  responsive: [
    {
      breakpoint: 753,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};
