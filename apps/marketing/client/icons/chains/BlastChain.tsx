import { IconSvgProps } from 'client/icons/types';
import * as React from 'react';

const BlastChain = ({ size = 20, ...props }: IconSvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      d="M12,0h0c6.6,0,12,5.4,12,12h0c0,6.6-5.4,12-12,12h0C5.4,24,0,18.6,0,12h0C0,5.4,5.4,0,12,0Z"
      fill="currentColor"
    />
    <polygon points="18 11.9 18 11.9 20.2 13.5 19 17.2 15.7 18.8 3 18.8 6.4 8.2 8.7 9.9 6.6 16.2 16.5 16.2 17.7 12.8 10.6 12.8 11.3 10.6 18.3 10.6 19.3 7.7 1.6 7.7 5.1 5.2 20.1 5.2 22.4 6.8 21.2 10.2 18 11.9" />
  </svg>
);
export default BlastChain;
