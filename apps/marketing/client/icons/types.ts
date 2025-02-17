import { SVGProps } from 'react';

/**
 * Props for SVG elements used as icons
 */
export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: SVGProps<SVGSVGElement>['width'];
};
