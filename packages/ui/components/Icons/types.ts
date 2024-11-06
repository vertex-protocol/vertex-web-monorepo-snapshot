import { ReactNode, SVGAttributes } from 'react';

export interface IconBaseProps extends SVGAttributes<SVGElement> {
  size?: string | number;
  color?: string;
}

export type IconComponent = (props: IconBaseProps) => ReactNode;
