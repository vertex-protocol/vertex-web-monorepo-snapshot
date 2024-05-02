import { EXTERNAL_LINKS } from 'client/consts';
import { BsCode } from 'react-icons/bs';
import { MdBolt } from 'react-icons/md';
import { SiPrisma } from 'react-icons/si';

export const DEVELOPER_CARDS = [
  {
    title: 'Vertex API',
    icon: MdBolt,
    content: 'Lightning fast API for automated traders.',
    href: EXTERNAL_LINKS.api,
  },
  {
    title: 'Vertex SDK',
    icon: BsCode,
    content: 'Build products and trading experiences on top of Vertex.',
    href: EXTERNAL_LINKS.sdk,
  },
  {
    title: 'Ecosystem',
    icon: SiPrisma,
    content: 'The future of finance.',
    href: '',
    comingSoon: true,
  },
];
