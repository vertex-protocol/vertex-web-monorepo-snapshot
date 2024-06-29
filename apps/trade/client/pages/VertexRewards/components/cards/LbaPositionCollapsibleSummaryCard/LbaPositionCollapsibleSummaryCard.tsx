import {
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { Divider, Icons, PrimaryButton } from '@vertex-protocol/web-ui';
import { ButtonStateContent } from 'client/components/ButtonStateContent';
import { LinkButton } from 'client/components/LinkButton';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import poolIcon from 'client/pages/VertexRewards/components/cards/LbaPositionCollapsibleSummaryCard/vrtx-lba-pool-icon.svg';
import { VERTEX_SPECIFIC_LINKS } from 'common/brandMetadata/links/vertexLinks';
import { isBefore } from 'date-fns';
import { now } from 'lodash';
import Link from 'next/link';
import { RewardsSummaryCard } from '../RewardsSummaryCard';
import { LbaPositionTable } from './LbaPositionTable/LbaPositionTable';
import { useLbaPositionSummaryCard } from './useLbaPositionSummaryCard';

export function LbaPositionCollapsibleSummaryCard() {
  const {
    claimableLbaRewards,
    positionValueUsd,
    totalRewardsEarned,
    vrtxToken,
    disableClaimButton,
    disableWithdrawUnlockedButton,
    unlockStartTimeMillis,
    isClaiming,
    isClaimSuccess,
    onClaimClick,
  } = useLbaPositionSummaryCard();
  const { show } = useDialog();

  const isBeforeVesting =
    !!unlockStartTimeMillis && isBefore(now(), unlockStartTimeMillis);

  const claimButtonMessage = (() => {
    if (isClaiming) {
      return 'Confirm Claim';
    }
    if (isClaimSuccess) {
      return <ButtonStateContent.Success message="Claim Successful" />;
    }
    return 'Claim LBA Rewards';
  })();

  const positionValueContent = (
    <span className="flex items-center gap-x-1.5">
      {formatNumber(positionValueUsd, {
        formatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
      })}
      {isBeforeVesting && (
        <Icons.MdLockOutline className="bg-surface-2 h-6 w-6 rounded-full p-1" />
      )}
    </span>
  );

  const metricItems = (
    <>
      <ValueWithLabel.Vertical
        tooltip={{ id: 'rewardsLbaPositionValue' }}
        label="Position"
        valueContent={positionValueContent}
      />
      <ValueWithLabel.Vertical
        tooltip={{ id: 'rewardsLbaTotalRewardsEarned' }}
        label="Total Rewards"
        value={totalRewardsEarned}
        numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
        valueEndElement={vrtxToken.token.symbol}
      />
    </>
  );

  const collapsibleContent = (
    <>
      <RewardsSummaryCard.CollapsibleTitle>
        Summary
      </RewardsSummaryCard.CollapsibleTitle>
      <LbaPositionTable />
      <LinkButton
        className="w-max gap-x-1 text-xs"
        colorVariant="primary"
        as={Link}
        href={VERTEX_SPECIFIC_LINKS.vestingScheduleGraphic}
        withExternalIcon
        external
      >
        See vesting schedule
      </LinkButton>
    </>
  );

  const footerContent = (
    <div className="flex items-center gap-x-2.5 text-xs lg:text-sm">
      {!isBeforeVesting && (
        <>
          <LinkButton
            colorVariant="primary"
            disabled={disableWithdrawUnlockedButton}
            onClick={() => show({ type: 'withdraw_lba_liquidity', params: {} })}
          >
            Withdraw Liquidity
          </LinkButton>
          <Divider vertical />
        </>
      )}
      <span>Reward distributions have ended</span>
    </div>
  );

  return (
    <RewardsSummaryCard.Container
      collapsibleContent={collapsibleContent}
      className="bg-surface-card ring-stroke"
    >
      <RewardsSummaryCard.Content
        header={
          <RewardsSummaryCard.IconHeader
            iconSrc={poolIcon}
            title="LBA Position"
          />
        }
        actionMetric={
          <ValueWithLabel.Vertical
            tooltip={{ id: 'rewardsLbaPositionAvailableToClaim' }}
            label="Available to Claim"
            value={claimableLbaRewards}
            numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
            valueEndElement={vrtxToken.token.symbol}
          />
        }
        metricItems={metricItems}
        action={
          <PrimaryButton
            onClick={onClaimClick}
            isLoading={isClaiming}
            disabled={disableClaimButton}
          >
            {claimButtonMessage}
          </PrimaryButton>
        }
        footer={footerContent}
      />
    </RewardsSummaryCard.Container>
  );
}
