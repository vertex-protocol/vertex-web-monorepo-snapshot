import { BracketsAngle } from '@phosphor-icons/react/dist/ssr/BracketsAngle';
import { Lightning } from '@phosphor-icons/react/dist/ssr/Lightning';
import { Planet } from '@phosphor-icons/react/dist/ssr/Planet';
import { EXTERNAL_LINKS } from 'client/consts';
import { ReactNode } from 'react';

interface IconProps {
  size?: number;
  className?: string;
}

export type IconType = (props: IconProps) => ReactNode;

export const DEVELOPER_CARDS = [
  {
    title: 'Vertex API',
    icon: (props: IconProps) => <Lightning weight="fill" {...props} />,
    content: 'Lightning fast API for automated traders.',
    href: EXTERNAL_LINKS.api,
  },
  {
    title: 'Vertex SDK',
    icon: BracketsAngle,
    content: 'Build products and trading experiences on top of Vertex.',
    href: EXTERNAL_LINKS.sdk,
  },
  {
    title: 'Ecosystem',
    icon: Planet,
    content: 'The future of finance.',
    href: '',
    comingSoon: true,
  },
];
