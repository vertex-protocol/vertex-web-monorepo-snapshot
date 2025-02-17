import * as React from 'react';
import { IconSvgProps } from 'client/icons/types';

const HyperChain = ({ size = 20, ...props }: IconSvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 14 14"
    fill="none"
    {...props}
  >
    <rect width="14" height="14" rx="7" fill="currentColor" />
    <path
      d="M12 6.94968C12 10.5177 9.97681 11.6626 8.91081 10.6432C8.03336 9.81193 7.7723 8.05539 6.4525 7.87503C4.77737 7.64761 4.63234 10.0551 3.5301 10.0551C2.24656 10.0551 2 8.0397 2 7.00458C2 5.94592 2.27556 4.50302 3.37056 4.50302C4.64685 4.50302 4.71936 6.56543 6.31472 6.45564C7.90283 6.33802 7.93183 4.18934 8.9616 3.27184C9.86076 2.47981 12 3.33457 12 6.94968Z"
      fill="#0B0B0C"
    />
  </svg>
);
export default HyperChain;
