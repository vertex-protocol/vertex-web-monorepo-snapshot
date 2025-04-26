import {
  formatNumber,
  PresetNumberFormatSpecifier,
  useEVMContext,
} from '@vertex-protocol/react-client';
import { Icons, Value } from '@vertex-protocol/web-ui';
import { EarnLinkCardButton } from 'client/modules/app/navBar/earn/components/EarnLinkCardButton';
import { BaseEarnLinkProps } from 'client/modules/app/navBar/earn/types';
import { SKATE_VAULTS_BY_CHAIN_ENV } from 'client/modules/skateVaults/consts';
import { useSkateVaultApyFraction } from 'client/modules/skateVaults/hooks/query/useSkateVaultApyFraction';
import { IMAGES } from 'common/brandMetadata/images';
import { first } from 'lodash';
import Image from 'next/image';

export function VaultsEarnLinkCardButton({
  href,
  pageLabel,
}: BaseEarnLinkProps) {
  const { primaryChainEnv } = useEVMContext();

  const vaultAddressForApr = first(
    SKATE_VAULTS_BY_CHAIN_ENV[primaryChainEnv],
  )?.vaultAddress;

  const { data: vaultApr } = useSkateVaultApyFraction({
    vaultAddress: vaultAddressForApr,
  });

  return (
    <EarnLinkCardButton
      href={href}
      pageLabel={pageLabel}
      pageIcon={Icons.Vault}
      topOpportunityContent={
        <>
          <Value sizeVariant="sm" endElement="APR">
            {formatNumber(vaultApr, {
              formatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_2DP,
            })}
          </Value>
          <Image
            src={IMAGES.partners.skate}
            alt="SkateFi"
            className="h-2.5 w-auto"
          />
        </>
      }
    />
  );
}
