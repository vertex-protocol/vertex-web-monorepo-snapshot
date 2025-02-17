import {
  formatTimestamp,
  Icons,
  LinkButton,
  TimeFormatSpecifier,
} from '@vertex-protocol/web-ui';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { WarningPanel } from 'client/components/WarningPanel';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { UnstakeDialogVrtxBalance } from 'client/modules/staking/dialogs/components/UnstakeDialogVrtxBalance';
import { UnstakeV1VrtxSubmitButton } from 'client/modules/staking/dialogs/UnstakeV1VrtxDialog/UnstakeVrtxSubmitButton';
import { useUnstakeV1VrtxDialog } from 'client/modules/staking/dialogs/UnstakeV1VrtxDialog/useUnstakeV1VrtxDialog';
import { VERTEX_SPECIFIC_LINKS } from 'common/brandMetadata/links/vertexLinks';
import Link from 'next/link';

export function UnstakeV1VrtxDialog() {
  const { hide, push } = useDialog();
  const {
    currentBalance,
    buttonState,
    protocolTokenSymbol,
    protocolTokenIconSrc,
    unstakeAll,
    unstakedUnlockTimeMillis,
  } = useUnstakeV1VrtxDialog();

  return (
    <BaseAppDialog.Container onClose={hide}>
      <BaseAppDialog.Title
        onClose={hide}
        endElement={
          <LinkButton
            as={Link}
            colorVariant="primary"
            className="text-xs"
            href={VERTEX_SPECIFIC_LINKS.stakeVrtxDocs}
            external
            withExternalIcon
          >
            Staking Guide
          </LinkButton>
        }
      >
        Unstake
      </BaseAppDialog.Title>
      <BaseAppDialog.Body>
        <UnstakeDialogVrtxBalance
          currentBalance={currentBalance}
          protocolTokenIconSrc={protocolTokenIconSrc}
        />
        <WarningPanel>
          <p>
            {protocolTokenSymbol} Staking has migrated to V2. You can now only
            unstake your entire V1 position.
          </p>
          <p className="text-text-secondary">
            <LinkButton
              colorVariant="primary"
              onClick={() => push({ type: 'migrate_vrtx', params: {} })}
            >
              Migrate to V2
            </LinkButton>{' '}
            instead.
          </p>
        </WarningPanel>
        <ValueWithLabel.Horizontal
          sizeVariant="xs"
          labelStartIcon={Icons.LockOpen}
          label="Unlock Time"
          valueContent={formatTimestamp(unstakedUnlockTimeMillis, {
            formatSpecifier: TimeFormatSpecifier.E_MMM_D_HH_12H,
          })}
        />
        <UnstakeV1VrtxSubmitButton
          buttonState={buttonState}
          onClick={unstakeAll}
        />
      </BaseAppDialog.Body>
    </BaseAppDialog.Container>
  );
}
