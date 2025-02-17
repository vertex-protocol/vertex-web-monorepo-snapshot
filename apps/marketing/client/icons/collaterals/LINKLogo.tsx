import * as React from 'react';
import { IconSvgProps } from 'client/icons/types';

const LINKLogo = ({ size = 20, ...props }: IconSvgProps) => (
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
      d="M7 4.11726L9.59962 5.55592V8.43865L7.01128 9.88274L4.41165 8.46037V5.56678L7 4.11726ZM7 2L6.04699 2.53203L3.45301 3.98154L2.5 4.51357V9.51357L3.45301 10.0402L6.05263 11.4734L7.00564 12L7.95865 11.468L10.547 10.0185L11.5 9.48643V4.481L10.547 3.9544L7.94737 2.51574L7 2Z"
      fill="#0B0B0C"
    />
  </svg>
);
export default LINKLogo;
