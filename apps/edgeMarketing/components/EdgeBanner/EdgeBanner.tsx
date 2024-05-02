import { joinClassNames } from '@vertex-protocol/web-common';
import { EdgeLink } from 'components/EdgeLink/EdgeLink';
import { LINKS } from 'config/links';
import { PiChartBarFill } from 'react-icons/pi';

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
          <PiChartBarFill />
        </span>
        <p className="text-md leading-snug">See Edge in Action</p>
      </div>
      <p className="text-gray text-md hidden leading-snug md:block">
        Real time stats showing the power of Edge
      </p>
      <EdgeLink className="text-md text-nowrap" href={LINKS.dashboard} external>
        View Stats
      </EdgeLink>
    </div>
  );
}
