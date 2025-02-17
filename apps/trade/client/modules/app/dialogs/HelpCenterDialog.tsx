import { ExternalNavCardButton, Icons } from '@vertex-protocol/web-ui';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { LINKS } from 'common/brandMetadata/links/links';
import Link from 'next/link';

const FAQ_LINKS = {
  faq: {
    href: LINKS.faq,
    external: true,
    title: 'FAQ',
    description: 'Answers to common questions',
    icon: Icons.FileText,
  },
  tutorials: {
    href: LINKS.tutorials,
    external: true,
    title: 'Tutorials',
    description: 'How to use the app',
    icon: Icons.NavigationArrowFill,
  },
  zenDesk: {
    href: LINKS.zenDesk,
    external: true,
    title: 'Get Help',
    description: 'Ask questions via our Helpdesk',
    icon: Icons.Question,
  },
} as const;

export function HelpCenterDialog() {
  const { hide } = useDialog();

  const handleLinkClick = (external: boolean) => {
    if (!external) {
      hide();
    }
  };

  return (
    <BaseAppDialog.Container onClose={hide}>
      <BaseAppDialog.Title onClose={hide}>Help Center</BaseAppDialog.Title>
      <BaseAppDialog.Body>
        {Object.values(FAQ_LINKS).map(
          ({ title, href, external, description, icon }) => {
            return (
              <ExternalNavCardButton
                className="bg-surface-2"
                as={Link}
                key={title}
                href={href}
                title={title}
                external={external}
                description={description}
                icon={icon}
                onClick={() => handleLinkClick(external)}
              />
            );
          },
        )}
      </BaseAppDialog.Body>
    </BaseAppDialog.Container>
  );
}
