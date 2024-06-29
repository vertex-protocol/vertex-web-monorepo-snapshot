import { joinClassNames } from '@vertex-protocol/web-common';

export function CommunityGradientPill({ content }: { content: string }) {
  return (
    <div
      className={joinClassNames(
        'bg-gradientPill flex items-center rounded',
        'px-2 py-1 text-sm font-bold uppercase text-purple-800',
        'sm:text-lg',
      )}
    >
      {content}
    </div>
  );
}
