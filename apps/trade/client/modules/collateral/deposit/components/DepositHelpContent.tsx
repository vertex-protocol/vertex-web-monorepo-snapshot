import { Icons, SecondaryButton } from '@vertex-protocol/web-ui';
import { BaseDialog } from 'client/components/BaseDialog/BaseDialog';
import { LinkButton } from 'client/components/LinkButton';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { LINKS } from 'client/modules/brand/links';
import {
  ARB_CHAIN_IDS,
  BLAST_CHAIN_IDS,
} from 'client/modules/chainSpecificContent/consts/chainIds';
import { useIsEnabledForChainIds } from 'client/modules/chainSpecificContent/hooks/useIsEnabledForChainIds';
import { CollateralHelpCard } from 'client/modules/collateral/components/CollateralHelpCard';
import { TOKEN_ICONS } from 'common/productMetadata/tokenIcons';
import Image from 'next/image';
import Link from 'next/link';

export function DepositHelpContent({
  onClose,
  onBackClick,
}: {
  onClose(): void;
  onBackClick(): void;
}) {
  const { show } = useDialog();
  const showBridgeCardData = useIsEnabledForChainIds(ARB_CHAIN_IDS);
  const showWrapEthCardData = useIsEnabledForChainIds([
    ...ARB_CHAIN_IDS,
    ...BLAST_CHAIN_IDS,
  ]);

  const bridgeCardData = {
    icon: <Icons.TbBuildingBridge size={16} className="text-accent" />,
    title: `Bridging/Depositing from another chain?`,
    body: (
      <div className="flex flex-col items-start gap-y-2">
        <p>
          Cross-Chain Deposits from 5+ chains in just one transaction. Powered
          by Axelar.
        </p>
        <LinkButton
          onClick={() =>
            show({
              type: 'bridge',
              params: {},
            })
          }
          color="white"
        >
          Bridge here
        </LinkButton>
      </div>
    ),
  };

  const wrapEthCardData = {
    icon: (
      <Image src={TOKEN_ICONS.weth.asset} alt="WETH" width={16} height={16} />
    ),
    title: `Why can't I deposit my ETH?`,
    body: (
      <p>
        Only ERC-20 tokens are supported as deposits. You&apos;ll need to swap
        ETH to get Wrapped ETH (wETH). You can do that{' '}
        <LinkButton as={Link} href={LINKS.wrapEth} color="white" external>
          here
        </LinkButton>
        .
      </p>
    ),
  };

  const helpCardData = [
    ...(showWrapEthCardData ? [wrapEthCardData] : []),
    ...(showBridgeCardData ? [bridgeCardData] : []),
    {
      icon: <Icons.HiOutlineCreditCard size={16} className="text-accent" />,
      title: `Depositing from a centralized exchange?`,
      body: (
        <p>
          You&apos;ll need to send supported assets to your address. Once you
          receive your assets, return to this dialog to deposit.
        </p>
      ),
    },
  ];

  return (
    <>
      <BaseDialog.Title onClose={onClose}>
        <div className="flex w-full items-center gap-x-3">
          <SecondaryButton
            size="sm"
            startIcon={<Icons.FiChevronLeft size={14} />}
            onClick={onBackClick}
            className="gap-x-1 p-1 py-0 pr-2"
          >
            Back
          </SecondaryButton>
          <span>Deposit FAQ</span>
        </div>
      </BaseDialog.Title>
      <BaseDialog.Body className="flex flex-col gap-y-2">
        {helpCardData.map(({ icon, title, body }, index) => (
          <CollateralHelpCard.Container key={index}>
            <CollateralHelpCard.Title title={title} icon={icon} />
            <CollateralHelpCard.Description>
              {body}
            </CollateralHelpCard.Description>
          </CollateralHelpCard.Container>
        ))}
      </BaseDialog.Body>
    </>
  );
}
