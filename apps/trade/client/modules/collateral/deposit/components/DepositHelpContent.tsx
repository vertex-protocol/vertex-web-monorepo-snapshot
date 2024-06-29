import { Icons, SecondaryButton } from '@vertex-protocol/web-ui';
import { BaseDialog } from 'client/components/BaseDialog/BaseDialog';
import { LinkButton } from 'client/components/LinkButton';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import {
  ARB_CHAIN_IDS,
  BLAST_CHAIN_IDS,
  MANTLE_CHAIN_IDS,
} from 'client/modules/envSpecificContent/consts/chainIds';
import { useIsEnabledForChainIds } from 'client/modules/envSpecificContent/hooks/useIsEnabledForChainIds';
import { CollateralHelpCard } from 'client/modules/collateral/components/CollateralHelpCard';
import { TOKEN_ICONS } from 'common/productMetadata/tokenIcons';
import Image from 'next/image';
import { useAnalyticsContext } from 'client/modules/analytics/AnalyticsContext';
import { useEffect } from 'react';

export function DepositHelpContent({
  onClose,
  onBackClick,
}: {
  onClose(): void;
  onBackClick(): void;
}) {
  const { show } = useDialog();
  const { trackEvent } = useAnalyticsContext();

  useEffect(() => {
    trackEvent({
      type: 'deposit_dialog_view',
      data: {
        contentType: 'help',
      },
    });
  }, [trackEvent]);

  const showBridgeCardData = useIsEnabledForChainIds([
    ...ARB_CHAIN_IDS,
    ...BLAST_CHAIN_IDS,
    ...MANTLE_CHAIN_IDS,
  ]);
  const showWrapEthCardData = useIsEnabledForChainIds([
    ...ARB_CHAIN_IDS,
    ...BLAST_CHAIN_IDS,
  ]);
  const showWrapMntCardData = useIsEnabledForChainIds([...MANTLE_CHAIN_IDS]);

  const bridgeCardData = {
    icon: <Icons.TbBuildingBridge size={16} className="text-accent" />,
    title: 'How do I deposit from other chains or use unsupported tokens?',
    body: (
      <div className="flex flex-col items-start gap-y-2">
        <p>
          Our Axelar integration allows you to deposit from 5+ other chains in
          just one transaction. You can also swap unsupported assets on the
          current chain into tokens we support.
        </p>
        <LinkButton
          onClick={() =>
            show({
              type: 'bridge',
              params: {},
            })
          }
          colorVariant="primary"
        >
          Click here to bridge / swap
        </LinkButton>
      </div>
    ),
  };

  const wrapEthCardData = {
    icon: <Image src={TOKEN_ICONS.weth.asset} alt="" className="h-4 w-auto" />,
    title: `Why can't I deposit my ETH?`,
    body: (
      <div className="flex flex-col items-start gap-y-2">
        <p>
          Only ERC-20 tokens are supported as deposits. You&apos;ll need to swap
          ETH to get Wrapped ETH (wETH). You can do that via the cross-chain
          deposit dialog.
        </p>
        <LinkButton
          onClick={() =>
            show({
              type: 'bridge',
              params: {},
            })
          }
          colorVariant="primary"
        >
          Click here to swap ETH
        </LinkButton>
      </div>
    ),
  };

  const wrapMntCardData = {
    icon: <Image src={TOKEN_ICONS.mnt.asset} alt="" className="h-4 w-auto" />,
    title: `Why can't I deposit my MNT?`,
    body: (
      <div className="flex flex-col items-start gap-y-2">
        <p>
          Only ERC-20 tokens are supported as deposits. You&apos;ll need to swap
          MNT to get Wrapped MNT (wMNT). You can do that via the cross-chain
          deposit dialog.
        </p>
        <LinkButton
          onClick={() =>
            show({
              type: 'bridge',
              params: {},
            })
          }
          colorVariant="primary"
        >
          Click here to swap MNT
        </LinkButton>
      </div>
    ),
  };

  const helpCardData = [
    ...(showWrapEthCardData ? [wrapEthCardData] : []),
    ...(showWrapMntCardData ? [wrapMntCardData] : []),
    ...(showBridgeCardData ? [bridgeCardData] : []),
    {
      icon: <Icons.HiOutlineCreditCard size={16} className="text-accent" />,
      title: `How do I deposit from a centralized exchange?`,
      body: (
        <p>
          You&apos;ll need to send supported assets to your wallet. Once you
          receive your assets, return to this dialog to deposit.
        </p>
      ),
    },
  ];

  return (
    <>
      <BaseDialog.Title onClose={onClose}>
        <div className="flex gap-x-3">
          <SecondaryButton
            size="sm"
            startIcon={<Icons.FiChevronLeft size={14} />}
            onClick={onBackClick}
            className="gap-x-1 py-0 pl-1 pr-2"
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
