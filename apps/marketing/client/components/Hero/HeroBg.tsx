import React from 'react';

// Replace HeroImageProps with local Props interface
interface Props {
  className?: string;
}

// HeroBg component renders the hero background (gradients)
export function HeroBg({ className }: Props) {
  return (
    <svg
      width="1440"
      height="2448"
      viewBox="0 0 1440 2448"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="1440" height="2448" fill="#0B0B0C" />
      <rect
        opacity="0.8"
        x="390"
        y="106"
        width="660"
        height="1134"
        fill="url(#paint0_radial_2941_100384)"
      />
      <path
        opacity="0.4"
        d="M734 0H1372V1710H734V0Z"
        fill="url(#paint1_radial_2941_100384)"
      />
      <rect
        opacity="0.4"
        width="638"
        height="1710"
        transform="matrix(-1 0 0 1 734 0)"
        fill="url(#paint2_radial_2941_100384)"
      />
      <defs>
        <radialGradient
          id="paint0_radial_2941_100384"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(684.585 653.5) rotate(90) scale(495.5 223.186)"
        >
          <stop stopColor="#28252E" />
          <stop offset="0.454779" stopColor="#1E1C22" />
          <stop offset="1" stopColor="#0B0B0C" />
        </radialGradient>
        <radialGradient
          id="paint1_radial_2941_100384"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(795.5 649.5) rotate(76.3521) scale(1091.31 326.269)"
        >
          <stop stopColor="#28252E" />
          <stop offset="0.551895" stopColor="#1E1C22" />
          <stop offset="1" stopColor="#0B0B0C" />
        </radialGradient>
        <radialGradient
          id="paint2_radial_2941_100384"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(61.5 649.5) rotate(77.6343) scale(1085.69 324.586)"
        >
          <stop stopColor="#28252E" />
          <stop offset="0.551895" stopColor="#1E1C22" />
          <stop offset="1" stopColor="#0B0B0C" />
        </radialGradient>
      </defs>
    </svg>
  );
}
