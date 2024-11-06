import { WithClassnames, joinClassNames } from '@vertex-protocol/web-common';
import { VrtxInfoLinks } from 'client/sections/Vrtx/components/VrtxInfoSectionContent/VrtxInfoLinks';
import { VrtxListingLinks } from 'client/sections/Vrtx/components/VrtxInfoSectionContent/VrtxListingLinks';
import { VrtxNetworkCards } from 'client/sections/Vrtx/components/VrtxInfoSectionContent/VrtxNetworkCards';

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
