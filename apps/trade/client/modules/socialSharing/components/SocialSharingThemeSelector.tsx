import { joinClassNames } from '@vertex-protocol/web-common';
import {
  COMMON_TRANSPARENCY_COLORS,
  ScrollShadowsContainer,
  SecondaryButton,
} from '@vertex-protocol/web-ui';
import { SocialSharingTheme } from 'client/modules/socialSharing/hooks/socialSharingConfig';
import Image from 'next/image';

interface Props {
  themes: SocialSharingTheme[];
  selectedTheme: SocialSharingTheme;
  setTheme: (theme: SocialSharingTheme) => void;
}

export function SocialSharingThemeSelector({
  themes,
  selectedTheme,
  setTheme,
}: Props) {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="text-text-primary px-5">Choose theme</div>
      <ScrollShadowsContainer
        orientation="horizontal"
        shadowSize={50}
        className="pb-2"
      >
        {/* w-max is needed due to bug on Safari missing padding on last element. */}
        <div className="flex w-max gap-2.5 px-5">
          {themes.map((theme) => {
            const { id, name, description, previewImageSrc } = theme;

            return (
              <SecondaryButton
                key={id}
                className={joinClassNames(
                  'bg-surface-1 flex w-28 flex-col divide-y border p-0',
                  COMMON_TRANSPARENCY_COLORS.divide,
                  selectedTheme === theme
                    ? 'border-accent bg-surface-2'
                    : 'border-transparent',
                )}
                onClick={() => setTheme(theme)}
              >
                <div className="relative h-14 w-full p-2">
                  <Image src={previewImageSrc} fill alt="Preview Image" />
                </div>
                <div className="flex flex-1 flex-col justify-center py-1 text-xs">
                  <div className="text-text-primary">{name}</div>
                  <div className="text-text-tertiary">{description}</div>
                </div>
              </SecondaryButton>
            );
          })}
        </div>
      </ScrollShadowsContainer>
    </div>
  );
}
