import { ChartBar } from '@phosphor-icons/react/dist/ssr/ChartBar';
import { joinClassNames } from '@vertex-protocol/web-common';
import { EdgeLink } from 'components/EdgeLink/EdgeLink';
import { LINKS } from 'config/links';

export function EdgeBanner({ className }: { className?: string }) {
  const bannerClassName = joinClassNames(
    'bg-gray-light rounded-xl p-3',
    'flex items-center justify-between',
    className,
  );
  return (
    <div className={bannerClassName}>
      <div className="flex items-center gap-x-1.5 md:gap-x-3">
        <span className="flex items-center justify-center rounded-full bg-white p-1.5">
          <ChartBar weight="fill" />
        </span>
        <p className="text-md leading-snug">See Edge in Action</p>
        <p className="text-gray text-md hidden leading-snug md:block">
          Real time stats showing the power of Edge
        </p>
      </div>
      <EdgeLink className="text-md text-nowrap" href={LINKS.dashboard} external>
        View Stats
      </EdgeLink>
    </div>
  );
}
