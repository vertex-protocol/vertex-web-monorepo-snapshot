import { DisclosureCard } from '@vertex-protocol/web-ui';
import { VOVRTX_INFO, VRTX_TOKEN_INFO } from '@vertex-protocol/metadata';

export function UnstakeVrtxDisclosure() {
  return (
    <DisclosureCard
      title={`${VOVRTX_INFO.symbol} goes back to baseline`}
      description={`Unstaking any amount of ${VRTX_TOKEN_INFO.symbol} resets your multiplier to 1x and ${VOVRTX_INFO.symbol} score to baseline.`}
    />
  );
}
