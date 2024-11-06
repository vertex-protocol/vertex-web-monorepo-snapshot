// We can't use Image element from nextjs here. It won't generate images properly.
/* eslint-disable @next/next/no-img-element */

import { BigDecimal } from '@vertex-protocol/client';
import { joinClassNames } from '@vertex-protocol/web-common';
import { DIALOG_PADDING } from '@vertex-protocol/web-ui';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { BrandSpecificContent } from 'client/modules/envSpecificContent/BrandSpecificContent';
import { SocialSharingButtons } from 'client/modules/socialSharing/components/SocialSharingButtons';
import { SocialSharingInstructionsCard } from 'client/modules/socialSharing/components/SocialSharingInstructionsCard';
import { SocialSharingPreview } from 'client/modules/socialSharing/components/SocialSharingPreview';
import { SocialSharingThemeSelector } from 'client/modules/socialSharing/components/SocialSharingThemeSelector';
import { useSocialSharingImageGeneration } from 'client/modules/socialSharing/hooks/useSocialSharingImageGeneration';
import { MarketInfoCellData } from 'client/modules/tables/types/MarketInfoCellData';
import Image from 'next/image';

export interface PerpPnlSocialSharingDialogParams {
  isRealized: boolean;
  marketInfo: MarketInfoCellData;
  pnlFrac: BigDecimal;
  entryPrice: BigDecimal;
  referencePrice: BigDecimal;
}

export function PerpPnlSocialSharingDialog({
  marketInfo,
  pnlFrac,
  isRealized,
  entryPrice,
  referencePrice,
}: PerpPnlSocialSharingDialogParams) {
  const { hide } = useDialog();

  const {
    imageGenerationNodeRef,
    downloadImage,
    copyImageToClipboard,
    copyAndOpenTwitter,
    previewImage,
    isCopied,
    onBackgroundImageLoad,
    onTokenIconLoad,
    disableSocialSharingButtons,
    theme,
    setTheme,
    themes,
  } = useSocialSharingImageGeneration();

  const { priceIncrement, marketName, icon, amountForSide } = marketInfo;

  return (
    <BaseAppDialog.Container onClose={hide}>
      <BaseAppDialog.Title onClose={hide}>Share Position</BaseAppDialog.Title>
      {/*Applying px-0 here to override default x padding. We want the scrollable theme selector to be full width.*/}
      <BaseAppDialog.Body className="px-0">
        {/*Hiding theme selector on Blitz until we get different themes */}
        <BrandSpecificContent enabledBrands={['vertex']}>
          <SocialSharingThemeSelector
            setTheme={setTheme}
            themes={themes}
            selectedTheme={theme}
          />
        </BrandSpecificContent>

        <div
          className={joinClassNames(
            'flex flex-col gap-y-4',
            DIALOG_PADDING.horizontal,
          )}
        >
          <div className="relative aspect-video">
            <div className="h-full w-full" ref={imageGenerationNodeRef}>
              <SocialSharingPreview
                isRealized={isRealized}
                theme={theme}
                priceIncrement={priceIncrement}
                marketName={marketName}
                iconSrc={icon.asset}
                amountForSide={amountForSide}
                entryPrice={entryPrice}
                referencePrice={referencePrice}
                pnlFrac={pnlFrac}
                onBackgroundImageLoad={onBackgroundImageLoad}
                onTokenIconLoad={onTokenIconLoad}
              />
            </div>
            {/* Render preview image so it can be copied directly from browser.
                  Overlay it to prevent flicker */}
            {previewImage && (
              <Image fill src={previewImage.url} alt="Position Preview" />
            )}
          </div>
          <SocialSharingButtons
            isCopied={isCopied}
            onTwitterClick={copyAndOpenTwitter}
            onDownloadClick={downloadImage}
            onCopyToClipboardClick={copyImageToClipboard}
            disabled={disableSocialSharingButtons}
          />
          <SocialSharingInstructionsCard />
        </div>
      </BaseAppDialog.Body>
    </BaseAppDialog.Container>
  );
}
