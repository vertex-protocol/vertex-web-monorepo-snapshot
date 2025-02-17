import { PresetNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { DiscList, Icons, LinkButton } from '@vertex-protocol/web-ui';
import { CollapsibleInfoCard } from 'client/components/CollapsibleInfoCard';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { MigrateStakingSubmitButton } from 'client/modules/staking/dialogs/MigrateStakingDialog/MigrateStakingSubmitButton';
import { useMigrateStakingDialog } from 'client/modules/staking/dialogs/MigrateStakingDialog/useMigrateStakingDialog';
import { VERTEX_SPECIFIC_LINKS } from 'common/brandMetadata/links/vertexLinks';
import Link from 'next/link';

export function MigrateStakingDialog() {
  const { hide } = useDialog();
  const {
    currentV1AmountStaked,
    estimatedV2Balance,
    buttonState,
    migrate,
    protocolTokenSymbol,
  } = useMigrateStakingDialog();

  return (
    <BaseAppDialog.Container onClose={hide}>
      <BaseAppDialog.Title onClose={hide}>
        {protocolTokenSymbol} V2 Migration
      </BaseAppDialog.Title>
      <BaseAppDialog.Body>
        <DiscListCollapsibleInfoCard />
        <div className="flex items-center justify-between">
          <ValueWithLabel.Vertical
            label="V1 Staking Balance"
            value={currentV1AmountStaked}
            valueEndElement={protocolTokenSymbol}
            numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
          />
          <Icons.ArrowRight size={24} className="text-positive" />
          <ValueWithLabel.Vertical
            label="V2 Staking Balance"
            value={estimatedV2Balance}
            className="items-end"
            valueEndElement={protocolTokenSymbol}
            numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
          />
        </div>
        <MigrateStakingSubmitButton
          buttonState={buttonState}
          onClick={migrate}
        />
      </BaseAppDialog.Body>
    </BaseAppDialog.Container>
  );
}

function DiscListCollapsibleInfoCard() {
  return (
    <CollapsibleInfoCard
      isInitialOpen
      title="About Migration"
      collapsibleContent={
        <div className="flex flex-col items-start gap-y-2.5">
          <DiscList.Container className="text-text-tertiary items-start">
            <DiscList.Item>
              Your V1 position will remain until you migrate or unstake.
            </DiscList.Item>
            <DiscList.Item>V1 Positions no longer earn rewards.</DiscList.Item>
          </DiscList.Container>
          <LinkButton
            as={Link}
            href={VERTEX_SPECIFIC_LINKS.stakeVrtxDocs}
            colorVariant="primary"
            className="text-xs"
            withExternalIcon
            external
          >
            Learn more
          </LinkButton>
        </div>
      }
    />
  );
}
