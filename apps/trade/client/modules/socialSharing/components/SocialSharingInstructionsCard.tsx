import { joinClassNames } from '@vertex-protocol/web-common';
import { DiscList } from '@vertex-protocol/web-ui';

export function SocialSharingInstructionsCard() {
  return (
    <div
      className={joinClassNames(
        'text-text-secondary bg-overlay-accent text-xs',
        'flex flex-col gap-y-2 rounded-sm p-3',
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
