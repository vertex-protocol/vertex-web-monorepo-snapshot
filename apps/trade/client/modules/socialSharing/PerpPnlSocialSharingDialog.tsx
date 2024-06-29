// We can't use Image element from nextjs here. It won't generate images properly.
/* eslint-disable @next/next/no-img-element */

import { BigDecimal } from '@vertex-protocol/client';
import { joinClassNames } from '@vertex-protocol/web-common';
import { BaseDialog } from 'client/components/BaseDialog/BaseDialog';
import { DIALOG_PADDING } from 'client/components/BaseDialog/consts';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import Image from 'next/image';
import { useDialog } from '../app/dialogs/hooks/useDialog';
import { BrandSpecificContent } from 'client/modules/envSpecificContent/BrandSpecificContent';
import { MarketInfoCellData } from '../tables/types/MarketInfoCellData';
import { SocialSharingButtons } from './components/SocialSharingButtons';
import { SocialSharingInstructionsCard } from './components/SocialSharingInstructionsCard';
import { SocialSharingPreview } from './components/SocialSharingPreview';
import { SocialSharingThemeSelector } from './components/SocialSharingThemeSelector';
import { useSocialSharingImageGeneration } from './hooks/useSocialSharingImageGeneration';

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
    <BaseAppDialog onClose={hide}>
      <BaseDialog.Title onClose={hide}>Share Position</BaseDialog.Title>
      {/*Applying px-0 here to override default x padding. We want the scrollable theme selector to be full width.*/}
      <BaseDialog.Body className="flex w-full flex-col gap-y-3 px-0 text-sm">
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
                iconUrl={icon.url}
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
      </BaseDialog.Body>
    </BaseAppDialog>
  );
}
