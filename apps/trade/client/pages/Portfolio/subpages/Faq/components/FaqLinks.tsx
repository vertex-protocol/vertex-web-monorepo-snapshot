import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { ExternalNavCardButton } from '@vertex-protocol/web-ui';
import { FAQ_LINKS } from 'client/modules/faq/consts';
import { PortfolioHeader } from 'client/pages/Portfolio/components/PortfolioHeader';
import Link from 'next/link';

export function FaqLinks({ className }: WithClassnames) {
  return (
    <div
      className={joinClassNames('flex flex-col gap-y-3 lg:gap-y-6', className)}
    >
      <PortfolioHeader>Links</PortfolioHeader>
      <div className="flex flex-col gap-y-3 lg:gap-y-4">
        {[FAQ_LINKS.tutorials, FAQ_LINKS.discord].map(
          ({ title, href, external, description, icon }) => {
            return (
              <ExternalNavCardButton
                key={title}
                as={Link}
                href={href}
                external={external}
                title={title}
                description={description}
                icon={icon}
              />
            );
          },
        )}
      </div>
    </div>
  );
}
