import * as React from 'react';
import { IconSvgProps } from 'client/icons/types';

const EthereumChain = ({ size = 20, ...props }: IconSvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 12 18"
    fill="none"
    {...props}
  >
    <path
      d="M5.15234 0.751953V6.84985L10.3063 9.15288L5.15234 0.751953Z"
      fill="currentColor"
      fillOpacity="0.602"
    />
    <path
      d="M5.15468 0.751953L0 9.15288L5.15468 6.84985V0.751953Z"
      fill="currentColor"
    />
    <path
      d="M5.15234 13.1052V17.2486L10.3098 10.1133L5.15234 13.1052Z"
      fill="currentColor"
      fillOpacity="0.602"
    />
    <path
      d="M5.15468 17.2486V13.1045L0 10.1133L5.15468 17.2486Z"
      fill="currentColor"
    />
    <path
      d="M5.15234 12.1458L10.3063 9.15322L5.15234 6.85156V12.1458Z"
      fill="currentColor"
      fillOpacity="0.2"
    />
    <path
      d="M0 9.15322L5.15468 12.1458V6.85156L0 9.15322Z"
      fill="currentColor"
      fillOpacity="0.602"
    />
  </svg>
);
export default EthereumChain;
