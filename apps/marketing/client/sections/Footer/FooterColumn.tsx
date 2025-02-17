'use client';

import { joinClassNames } from '@vertex-protocol/web-common';
import { motion } from 'framer-motion';
import { ExternalLink } from 'client/components/Link/Link';
import { ITEM_VARIANTS } from 'client/sections/Footer/motionVariants';
import { LINKS } from 'config/links';

interface Props {
  title?: string;
  links: { href: string; text: string }[];
  orderClass?: string;
  lastColumn?: boolean;
}

export function FooterColumn({ title, links, orderClass, lastColumn }: Props) {
  const columnBaseClasses = joinClassNames('text-body-14', 'flex flex-col');
  const columnTitleClasses = joinClassNames(
    'text-body-14 h-5',
    'mb-4 font-medium text-white',
  );
  const linksListClasses = joinClassNames('flex flex-1 flex-col', 'gap-y-4');
  const linkClasses = joinClassNames(
    'text-body-13 md:text-body-14',
    'rounded-sm transition-colors hover:text-white',
  );
  const designByClasses = joinClassNames(
    'text-body-13 text-body-dark-gray',
    'mt-auto flex flex-1 items-end',
    'md:pt-auto',
  );

  return (
    <motion.div
      variants={ITEM_VARIANTS}
      className={joinClassNames(columnBaseClasses, orderClass)}
    >
      <h2 className={columnTitleClasses}>{title}</h2>
      <ul className={linksListClasses}>
        {links.map((link) => (
          <motion.li key={link.href} variants={ITEM_VARIANTS}>
            <ExternalLink
              href={link.href}
              withHoverEffect={false}
              className={linkClasses}
            >
              {link.text}
            </ExternalLink>
          </motion.li>
        ))}
        {lastColumn && (
          <li className={designByClasses}>
            <ExternalLink
              href={LINKS.design}
              withHoverEffect={false}
              className="transition-colors hover:text-white"
            >
              Design by Altalogy
            </ExternalLink>
          </li>
        )}
      </ul>
    </motion.div>
  );
}
