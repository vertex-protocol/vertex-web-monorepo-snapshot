'use client';

import { ExternalLink } from 'client/components/Link/Link';
import EdgeIcon from 'client/icons/EdgeIcon';
import { LINKS } from 'config/links';

export function EdgeInfo() {
  return (
    <div className="text-body-13 flex max-w-[35ch] flex-col gap-y-4">
      <h3 className="h-4 w-12">
        <EdgeIcon className="text-white" />
      </h3>
      <div>
        <p className="text-body-gray max-w-sm">
          Vertex solves the issues of liquidity fragmentation across chains and
          sets the path for a new multichain future.
        </p>
        <ExternalLink href={LINKS.edgeMarketing} className="text-white">
          See how Edge works
        </ExternalLink>
      </div>
    </div>
  );
}
