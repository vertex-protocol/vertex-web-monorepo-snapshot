import {
  CustomNumberFormatSpecifier,
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { WithClassnames } from '@vertex-protocol/web-common';
import { Value, LinkButton } from '@vertex-protocol/web-ui';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { BrandSpecificContent } from 'client/modules/envSpecificContent/BrandSpecificContent';
import { DefinitionTooltip } from 'client/modules/tooltips/DefinitionTooltip/DefinitionTooltip';
import { SkateVaultMetadata } from 'client/modules/vaults/consts';
import { useSkateVaultCard } from 'client/pages/Vaults/components/skate/hooks/useSkateVaultCard';
import { SkateVaultActionButtons } from 'client/pages/Vaults/components/skate/SkateVaultActionButtons';
import { VaultCard } from 'client/pages/Vaults/components/VaultCard';
import { BLITZ_SPECIFIC_IMAGES, IMAGES } from 'common/brandMetadata/images';
import { LINKS } from 'common/brandMetadata/links/links';
import Image from 'next/image';
import Link from 'next/link';

type Props = WithClassnames<SkateVaultMetadata>;

export function SkateVaultCard({
  vaultAddress,
  vaultName,
  claimRewardsLink,
  className,
}: Props) {
  const {
    decimalAdjustedUserShares,
    decimalAdjustedUserBalanceUsd,
    decimalAdjustedVaultTvlUsd,
    skateOllies,
    vaultApy,
  } = useSkateVaultCard({ vaultAddress });

  return (
    <VaultCard
      className={className}
      partnerImageSrc={IMAGES.partners.skate}
      partnerHref={LINKS.skateFi}
      vaultName={vaultName}
      actionsContent={
        <SkateVaultActionButtons
          vaultAddress={vaultAddress}
          vaultName={vaultName}
        />
      }
      vaultInfoContent={
        <>
          <div className="flex items-end justify-between">
            <Value endElement="APY" sizeVariant="lg" className="leading-none">
              {formatNumber(vaultApy, {
                formatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_2DP,
              })}
            </Value>
            <DefinitionTooltip
              contentWrapperClassName="text-text-tertiary text-sm"
              definitionId="skateVaultsStrategy"
            >
              Strategy & Breakdown
            </DefinitionTooltip>
          </div>
          <BrandSpecificContent enabledBrands={['blitz']}>
            <div className="text-text-primary text-sm">
              +Blast Gold{' '}
              <Image
                src={BLITZ_SPECIFIC_IMAGES.blastGoldIcon}
                alt=""
                className="inline h-3 w-auto"
              />
            </div>
          </BrandSpecificContent>
          <ValueWithLabel.Horizontal
            sizeVariant="sm"
            label="Vault TVL"
            value={decimalAdjustedVaultTvlUsd}
            numberFormatSpecifier={PresetNumberFormatSpecifier.CURRENCY_2DP}
          />
        </>
      }
      userStateContent={
        <>
          <ValueWithLabel.Horizontal
            sizeVariant="sm"
            label="Your Shares"
            value={decimalAdjustedUserShares}
            numberFormatSpecifier={CustomNumberFormatSpecifier.NUMBER_AUTO}
          />
          <ValueWithLabel.Horizontal
            sizeVariant="sm"
            label="Position Value"
            value={decimalAdjustedUserBalanceUsd}
            numberFormatSpecifier={PresetNumberFormatSpecifier.CURRENCY_2DP}
          />
          <ValueWithLabel.Horizontal
            sizeVariant="sm"
            tooltip={{ id: 'skateOllies' }}
            label="SkatePark Ollies"
            value={skateOllies}
            valueClassName="text-[#C6FF35]"
            numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_INT}
          />
          {!!claimRewardsLink && (
            <LinkButton
              external
              withExternalIcon
              as={Link}
              href={claimRewardsLink}
              colorVariant="primary"
              className="self-end text-sm"
            >
              Claim Rewards
            </LinkButton>
          )}
        </>
      }
    />
  );
}
