import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { DepositInfoCardType } from 'client/modules/collateral/deposit/types';
import { VRTX_TOKEN_INFO } from '@vertex-protocol/metadata';
import { LinkButton } from '@vertex-protocol/web-ui';

export function DepositVrtxStakingCta({
  displayedInfoCardType,
}: {
  displayedInfoCardType: DepositInfoCardType | undefined;
}) {
  const { push } = useDialog();

  if (displayedInfoCardType !== 'vrtx') {
    return null;
  }

  return (
    <div className="text-xs">
      Looking to stake {VRTX_TOKEN_INFO.symbol}?{' '}
      <LinkButton
        colorVariant="accent"
        as="button"
        onClick={() => push({ type: 'stake_vrtx', params: {} })}
      >
        Click here
      </LinkButton>
    </div>
  );
}
