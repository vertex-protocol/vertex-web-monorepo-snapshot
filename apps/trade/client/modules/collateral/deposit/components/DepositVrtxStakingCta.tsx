import { LinkButton } from 'client/components/LinkButton';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { VRTX_TOKEN_INFO } from 'common/productMetadata/vertexTokenInfo';
import { DepositInfoCardType } from '../types';

export function DepositVrtxStakingCta({
  displayedInfoCardType,
}: {
  displayedInfoCardType: DepositInfoCardType | undefined;
}) {
  const { show } = useDialog();

  if (displayedInfoCardType !== 'vrtx') {
    return null;
  }

  return (
    <div className="text-xs">
      Looking to stake {VRTX_TOKEN_INFO.symbol}?{' '}
      <LinkButton
        color="accent"
        as="button"
        onClick={() => show({ type: 'stake_vrtx', params: {} })}
      >
        Click here
      </LinkButton>
    </div>
  );
}
