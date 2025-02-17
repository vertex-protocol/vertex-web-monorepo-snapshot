import * as React from 'react';
import { IconSvgProps } from 'client/icons/types';

const BaseChain = ({ size = 20, ...props }: IconSvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <path
      d="M7.98822 15.2005C11.9716 15.2005 15.2008 11.977 15.2008 8.00066C15.2008 4.02427 11.9716 0.800781 7.98822 0.800781C4.20902 0.800781 1.10869 3.70228 0.800781 7.39545H10.3341V8.60587H0.800781C1.10869 12.299 4.20902 15.2005 7.98822 15.2005Z"
      fill="currentColor"
    />
  </svg>
);
export default BaseChain;
