import { asyncResult } from '@vertex-protocol/utils';
import {
  SOCIAL_SHARING_THEMES,
  SocialSharingTheme,
} from 'client/modules/socialSharing/hooks/socialSharingConfig';
import { LINKS } from 'common/brandMetadata/links/links';
import { clientEnv } from 'common/environment/clientEnv';
import { saveAs } from 'file-saver';
import { toBlob } from 'html-to-image';
import { useCallback, useEffect, useRef, useState } from 'react';

interface BuildBlobOptions {
  canvasHeight: number;
  canvasWidth: number;
  minDataSize: number;
}

// Calls toBlob until expected minDataSize is matched.
// This is know issue with html-to-image on Safari where image builds partially on first toBlob call.
// see: https://github.com/bubkoo/html-to-image/issues/361#issuecomment-1506037670
async function buildBlob(
  node: HTMLDivElement,
  { canvasHeight, canvasWidth, minDataSize }: BuildBlobOptions,
) {
  let blob = new Blob();

  const maxAttempts = 5;

  for (let i = 0; blob.size < minDataSize && i < maxAttempts; i++) {
    const imageBlob = await toBlob(node, {
      canvasHeight,
      canvasWidth,
    });

    if (imageBlob) {
      blob = imageBlob;
    }
  }

  return blob;
}

export function useSocialSharingImageGeneration() {
  const imageGenerationNodeRef = useRef<HTMLDivElement>(null);

  const [theme, setBaseTheme] = useState<SocialSharingTheme>(
    SOCIAL_SHARING_THEMES[0],
  );

  const [backgroundImageLoaded, setBackgroundImageLoaded] = useState(false);
  const [tokenIconLoaded, setTokenIconLoaded] = useState(false);

  const [isCopied, setIsCopied] = useState(false);
  const [previewImage, setPreviewImage] = useState<
    | {
        blob: Blob;
        url: string;
      }
    | undefined
  >();

  const imagesHaveLoaded = backgroundImageLoaded && tokenIconLoaded;
  const disableSocialSharingButtons = !previewImage;

  const onBackgroundImageLoad = () => setBackgroundImageLoaded(true);

  const onTokenIconLoad = () => setTokenIconLoaded(true);

  const generatePreviewImage = useCallback(async (): Promise<Blob> => {
    if (!imageGenerationNodeRef.current || !imagesHaveLoaded) {
      throw new Error('Not ready to generate image');
    }

    const blob = await buildBlob(imageGenerationNodeRef.current, {
      // canvas width and height, 16/9 aspect ratio
      canvasHeight: 450,
      canvasWidth: 800,
      minDataSize: 3e6,
    });

    if (!blob) {
      throw new Error('Failed to generate image blob');
    }

    return blob;
  }, [imagesHaveLoaded]);

  // Generate preview image after imagesLoaded
  useEffect(() => {
    if (!imagesHaveLoaded) {
      return;
    }

    let cancelled = false;

    generatePreviewImage()
      .then((blob) => {
        if (!cancelled) {
          setPreviewImage({
            blob,
            url: URL.createObjectURL(blob),
          });
        }
      })
      .catch((err) => {
        console.error(`[useSocialSharing]: Failed to generate image`, err);
      });

    return () => {
      cancelled = true;
    };
  }, [imagesHaveLoaded, generatePreviewImage]);

  const copyImageToClipboard = useCallback(async () => {
    // Wrap in inner fn so we can use asyncResult.
    const writeToClipboard = async () => {
      if (!previewImage?.blob) {
        console.warn(
          `[useSocialSharing]: Failed to copy to clipboard. Image not generated`,
        );
        return;
      }

      // This prevents crashing on Firefox as ClipboardItem is not supported.
      if (typeof ClipboardItem === 'undefined') {
        console.warn(
          `[useSocialSharing]: Failed to copy to clipboard. ClipboardItem is not supported`,
        );
        return;
      }

      await navigator.clipboard.write([
        new ClipboardItem({
          // This has to be passed as Promise. Otherwise permissions will fail on Safari.
          // See: https://web.dev/async-clipboard/
          'image/png': new Promise((resolve) => {
            resolve(previewImage?.blob);
          }),
        }),
      ]);

      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    };

    await asyncResult(writeToClipboard());
  }, [previewImage?.blob]);

  const downloadImage = useCallback(async () => {
    // Wrap in async function so we can use asyncResult.
    const download = async () => {
      if (!previewImage?.blob) {
        return;
      }

      saveAs(
        previewImage.blob,
        `${clientEnv.brandMetadata.displayName}_${Date.now()}.png`,
      );
    };
    const [, error] = await asyncResult(download());

    if (error) {
      console.warn(`[useSocialSharing]: Failed to download image`, error);
    }
  }, [previewImage?.blob]);

  const copyAndOpenTwitter = useCallback(() => {
    // wrap in asyncResult to ignore errors in case it fails.
    asyncResult(copyImageToClipboard());

    // use setTimeout to bypass popup blocking on Safari and still allow copy to clipboard.
    setTimeout(() => window.open(LINKS.twitterTweet, '_blank'), 800);
  }, [copyImageToClipboard]);

  const setTheme = (newTheme: SocialSharingTheme) => {
    // Just return if It's the same, otherwise it could get stuck generating if same image selected twice.
    if (theme.id === newTheme.id) {
      return;
    }

    // Set background loaded to false because new one gets loaded after setBaseTheme.
    setBackgroundImageLoaded(false);
    setPreviewImage(undefined);

    setBaseTheme(newTheme);
  };

  return {
    theme,
    themes: SOCIAL_SHARING_THEMES,
    setTheme,
    imageGenerationNodeRef,
    downloadImage,
    copyAndOpenTwitter,
    copyImageToClipboard,
    previewImage,
    setPreviewImage,
    isCopied,
    disableSocialSharingButtons,
    onBackgroundImageLoad,
    onTokenIconLoad,
  };
}
