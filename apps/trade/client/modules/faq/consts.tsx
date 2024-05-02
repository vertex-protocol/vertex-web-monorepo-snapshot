import { Icons } from '@vertex-protocol/web-ui';
import { LINKS } from 'client/modules/brand/links';
import { ROUTES } from 'client/modules/app/consts/routes';

export const FAQ_LINKS = {
  faq: {
    href: ROUTES.portfolio.faq,
    external: false,
    title: 'FAQ',
    description: 'Answers to common questions',
    icon: Icons.PiFileText,
  },
  tutorials: {
    href: LINKS.tutorials,
    external: true,
    title: 'Tutorials',
    description: 'How to use the app',
    icon: Icons.PiNavigationArrowFill,
  },
  discord: {
    href: LINKS.openTicketDiscord,
    external: true,
    title: 'Get Help',
    description: 'Ask questions and open support tickets in Discord',
    icon: Icons.BsDiscord,
  },
} as const;
