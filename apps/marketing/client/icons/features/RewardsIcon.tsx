import * as React from 'react';
import { IconSvgProps } from 'client/icons/types';

const RewardsIcon = ({ size = 20, ...props }: IconSvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 12 12"
    fill="none"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.15116 0C3.79154 0 3.5 0.291536 3.5 0.651163V3.5L0.651163 3.5C0.291536 3.5 0 3.79154 0 4.15116V5.84884C0 6.20846 0.291535 6.5 0.651163 6.5H3.5V9.34884C3.5 9.70846 3.79154 10 4.15116 10H5.84884C6.20846 10 6.5 9.70846 6.5 9.34884V6.5H9.34884C9.70846 6.5 10 6.20846 10 5.84884V4.15116C10 3.79154 9.70846 3.5 9.34884 3.5L6.5 3.5V0.651163C6.5 0.291536 6.20846 0 5.84884 0H4.15116Z"
      fill="currentColor"
    />
  </svg>
);
export default RewardsIcon;
