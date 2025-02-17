import * as React from 'react';
import { IconSvgProps } from 'client/icons/types';

const OneClickIcon = ({ size = 20, ...props }: IconSvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 12 14"
    fill="none"
    {...props}
  >
    <path
      d="M1.5447 2.84777C1.43527 2.55355 1.70155 2.25761 2.00565 2.33547L10.7575 4.57622C11.075 4.6575 11.1558 5.07096 10.8922 5.26572L7.46776 7.79619C7.42433 7.82828 7.38806 7.86906 7.36126 7.91594L5.39179 11.3611C5.22809 11.6474 4.80466 11.6128 4.68968 11.3036L1.5447 2.84777Z"
      fill="currentColor"
    />
  </svg>
);
export default OneClickIcon;
