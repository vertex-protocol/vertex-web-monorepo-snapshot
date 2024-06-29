import { joinClassNames } from '@vertex-protocol/web-common';
import { Divider, Icons } from '@vertex-protocol/web-ui';
import { IMAGES } from 'common/brandMetadata/images';
import { Kbd } from 'client/modules/commandCenter/components/Kbd';
import React, { ReactNode } from 'react';
import Image from 'next/image';

export function Footer() {
  return (
    <div
      className={joinClassNames(
        'hidden items-center justify-between px-6 py-4 lg:flex',
        'bg-surface-card text-xs',
      )}
    >
      <div className="flex items-center gap-x-6">
        <Section>
          Navigate
          <div className="flex gap-x-1">
            <Kbd icon={Icons.AiOutlineArrowUp} />
            <Kbd icon={Icons.AiOutlineArrowDown} />
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
