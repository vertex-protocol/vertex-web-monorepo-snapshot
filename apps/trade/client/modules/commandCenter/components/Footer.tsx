import { joinClassNames } from '@vertex-protocol/web-common';
import { Divider, Icons } from '@vertex-protocol/web-ui';
import { Kbd } from 'client/modules/commandCenter/components/Kbd';
import { IMAGES } from 'common/brandMetadata/images';
import Image from 'next/image';
import { ReactNode } from 'react';

export function Footer() {
  return (
    <div
      className={joinClassNames(
        'hidden items-center justify-between rounded-b-xl px-6 py-4 lg:flex',
        'bg-surface-card text-xs',
      )}
    >
      <div className="flex items-center gap-x-6">
        <Section>
          Navigate
          <div className="flex gap-x-1">
            <Kbd icon={Icons.ArrowUp} />
            <Kbd icon={Icons.ArrowDown} />
          </div>
        </Section>
        <Divider vertical />
        <Section>
          Select
          <Kbd text="Enter" />
        </Section>
        <Divider vertical />
        <Section>
          Close
          <Kbd text="Esc" />
        </Section>
      </div>
      <Image src={IMAGES.brandMonochromeIcon} className="h-6 w-auto" alt="" />
    </div>
  );
}

function Section({ children }: { children: ReactNode }) {
  return <div className="flex items-center gap-x-2">{children}</div>;
}
