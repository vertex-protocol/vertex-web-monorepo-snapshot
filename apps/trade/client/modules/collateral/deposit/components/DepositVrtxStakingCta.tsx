import { VRTX_TOKEN_INFO } from '@vertex-protocol/react-client';
import { LinkButton } from '@vertex-protocol/web-ui';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { DepositInfoCardType } from 'client/modules/collateral/deposit/types';

export function DepositVrtxStakingCta({
  displayedInfoCardType,
}: {
  displayedInfoCardType: DepositInfoCardType | undefined;
}) {
  const { push } = useDialog();

  if (displayedInfoCardType !== 'vrtx_margin') {
    return null;
  }

  return (
    <div className="text-xs">
      Looking to stake {VRTX_TOKEN_INFO.symbol}?{' '}
      <LinkButton
        colorVariant="accent"
        as="button"
        onClick={() => push({ type: 'stake_v2_vrtx', params: {} })}
      >
        Click here
      </LinkButton>
    </div>
  );
}
