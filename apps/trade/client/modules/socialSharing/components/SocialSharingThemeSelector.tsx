import { joinClassNames } from '@vertex-protocol/web-common';
import { SecondaryButton } from '@vertex-protocol/web-ui';
import Image from 'next/image';
import { SocialSharingTheme } from '../hooks/socialSharingConfig';

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
      {/*We WANT to have the scrollbar here as some device hardware do not support horizontal scrolling*/}
      <div className="overflow-x-scroll pb-2">
        {/* w-max is needed due to bug on Safari missing padding on last element. */}
        <div className="flex w-max gap-2.5 px-5">
          {themes.map((theme) => {
            const { id, name, description, previewImageSrc } = theme;

            return (
              <SecondaryButton
                key={id}
                className={joinClassNames(
                  'divide-overlay-divider/10 bg-surface-1 flex w-28 flex-col divide-y border p-0',
                  selectedTheme === theme
                    ? 'border-accent bg-surface-2'
                    : 'border-transparent',
                )}
                onClick={() => setTheme(theme)}
              >
                <div className="relative h-14 w-full p-2">
                  <Image src={previewImageSrc} fill alt="Preview Image" />
                </div>
                <div className="flex w-full flex-1 flex-col justify-center py-1 text-xs">
                  <div className="text-text-primary">{name}</div>
                  <div className="text-text-tertiary">{description}</div>
                </div>
              </SecondaryButton>
            );
          })}
        </div>
      </div>
    </div>
  );
}
