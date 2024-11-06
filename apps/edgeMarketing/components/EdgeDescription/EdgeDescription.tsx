import { EdgeLink } from 'components/EdgeLink/EdgeLink';
import { DESCRIPTION_LINKS } from 'config/links';

/**
 * @name EdgeDescription
 * @description Edge description with links
 */
export function EdgeDescription() {
  return (
    <div className="p-6 pb-10 sm:pb-32 md:pb-10 lg:px-12">
      <h2 className="text-md pb-2.5 leading-tight sm:text-lg">
        Synchronous Liquidity
      </h2>
      <p className="text-gray text-md max-w-[380px] text-balance leading-tight sm:text-lg">
        Vertex Edge&apos;s composable orderbook solves the problems of liquidity
        fragmentation and creates economic alliances across chains.
      </p>

      <ul className="flex gap-x-3 py-6 sm:py-8">
        {DESCRIPTION_LINKS.map((link, idx) => (
          <li key={idx}>
            <EdgeLink href={link.url} external>
              {link.label}
            </EdgeLink>
          </li>
        ))}
      </ul>

      <p className="text-gray text-md max-w-[280px] leading-snug">
        One orderbook to connect them all. The future of liquidity is
        synchronous.
      </p>
    </div>
  );
}
