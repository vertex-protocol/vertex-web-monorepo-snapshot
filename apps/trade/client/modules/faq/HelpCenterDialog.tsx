import { ExternalNavCardButton } from '@vertex-protocol/web-ui';
import { BaseDialog } from 'client/components/BaseDialog/BaseDialog';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import Link from 'next/link';
import { FAQ_LINKS } from './consts';

export function HelpCenterDialog() {
  const { hide } = useDialog();

  return (
    <BaseAppDialog onClose={hide}>
      <BaseDialog.Title onClose={hide}>Help Center</BaseDialog.Title>
      <BaseDialog.Body className="flex flex-col gap-y-2">
        {Object.values(FAQ_LINKS).map(
          ({ title, href, external, description, icon }) => {
            return (
              <ExternalNavCardButton
                className="bg-surface-2 hover:bg-surface-2"
                as={Link}
                key={title}
                href={href}
                title={title}
                external={external}
                description={description}
                icon={icon}
              />
            );
          },
        )}
      </BaseDialog.Body>
    </BaseAppDialog>
  );
}
