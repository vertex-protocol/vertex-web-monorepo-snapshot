import { ExternalNavCardButton } from '@vertex-protocol/web-ui';
import { BaseDialog } from 'client/components/BaseDialog/BaseDialog';
import { FAQ_LINKS } from 'client/modules/app/consts/faqLinks';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import Link from 'next/link';

export function HelpCenterDialog() {
  const { hide } = useDialog();

  const handleLinkClick = (external: boolean) => {
    if (!external) {
      hide();
    }
  };

  return (
    <BaseAppDialog onClose={hide}>
      <BaseDialog.Title onClose={hide}>Help Center</BaseDialog.Title>
      <BaseDialog.Body className="flex flex-col gap-y-2">
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
      </BaseDialog.Body>
    </BaseAppDialog>
  );
}
