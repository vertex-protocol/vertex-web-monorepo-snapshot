import { DiscList } from '@vertex-protocol/web-ui';

export function SocialSharingInstructionsCard() {
  return (
    <div className="text-text-secondary bg-overlay-accent/10 flex flex-col gap-y-2 rounded p-3 text-xs">
      <div className="text-accent">Twitter Instructions</div>
      <DiscList.Container>
        <DiscList.Item>Twitter will open</DiscList.Item>
        <DiscList.Item>Paste what’s on your clipboard</DiscList.Item>
        <DiscList.Item>Share your position!</DiscList.Item>
      </DiscList.Container>
    </div>
  );
}
