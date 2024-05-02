import classNames from 'classnames';

export function CommunityGradientPill({ content }: { content: string }) {
  return (
    <div
      className={classNames(
        'bg-gradientPill flex items-center rounded',
        'px-2 py-1 text-sm font-bold uppercase text-purple-800',
        'sm:text-lg',
      )}
    >
      {content}
    </div>
  );
}
