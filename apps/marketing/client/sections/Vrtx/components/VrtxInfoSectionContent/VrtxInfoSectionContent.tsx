import { WithClassnames, joinClassNames } from '@vertex-protocol/web-common';
import { VrtxInfoLinks } from './VrtxInfoLinks';
import { VrtxListingLinks } from './VrtxListingLinks';
import { VrtxNetworkCards } from './VrtxNetworkCards';

export function VrtxInfoSectionContent({ className }: WithClassnames) {
  return (
    <div className={joinClassNames('flex flex-col gap-y-4', className)}>
      <VrtxNetworkCards />
      <Divider />
      <VrtxInfoLinks />
      <Divider />
      <VrtxListingLinks />
    </div>
  );
}

function Divider() {
  return <div className="bg-white-600 h-px w-full rounded-full" />;
}
