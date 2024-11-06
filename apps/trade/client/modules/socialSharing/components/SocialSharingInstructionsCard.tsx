import { joinClassNames } from '@vertex-protocol/web-common';
import { COMMON_TRANSPARENCY_COLORS, DiscList } from '@vertex-protocol/web-ui';

export function SocialSharingInstructionsCard() {
  return (
    <div
      className={joinClassNames(
        'text-text-secondary flex flex-col gap-y-2 rounded p-3 text-xs',
        COMMON_TRANSPARENCY_COLORS.bgAccent,
      )}
    >
      <div className="text-accent">Twitter Instructions</div>
      <DiscList.Container>
        <DiscList.Item>Twitter will open</DiscList.Item>
        <DiscList.Item>Paste what&apos;s on your clipboard</DiscList.Item>
        <DiscList.Item>Share your position!</DiscList.Item>
      </DiscList.Container>
    </div>
  );
}
