'use client';

import { joinClassNames } from '@vertex-protocol/web-common';
import EdgeIcon from 'client/icons/EdgeIcon';
import Logo from 'client/icons/Logo';
import { FOOTER_DATA } from 'client/sections/Footer/data';
import { FooterColumn } from 'client/sections/Footer/FooterColumn';
import {
  CONTAINER_VARIANTS,
  ITEM_VARIANTS,
} from 'client/sections/Footer/motionVariants';
import { LINKS } from 'config/links';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import FooterBg from 'public/img/vertex-footer.png';

export function Footer() {
  const mainColumns = FOOTER_DATA.slice(0, -1);
  const lastColumn = FOOTER_DATA[FOOTER_DATA.length - 1];
  const navClasses = joinClassNames(
    'border-glass shadow-glass',
    'rounded-lg border p-4',
    'backdrop-blur-xs lg:p-8 lg:backdrop-blur-md',
  );
  const logoSectionClasses = joinClassNames(
    'col-span-2 grid grid-cols-2 gap-5',
    'md:col-span-1 md:flex md:flex-col md:items-start md:items-center',
  );

  return (
    <footer className="text-body-gray relative py-16 md:py-32">
      <Image
        alt=""
        src={FooterBg}
        className="container-custom absolute right-0 bottom-0 left-0 mx-auto h-auto w-full object-contain pb-8"
        aria-hidden="true"
      />

      <div className="mx-auto px-4 lg:container lg:px-16">
        <motion.nav
          className={navClasses}
          variants={CONTAINER_VARIANTS}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
            {/* Logo section */}
            <motion.div className={logoSectionClasses} variants={ITEM_VARIANTS}>
              <Link href="/">
                <Logo className="-ml-1 h-4 w-24 md:-ml-5" />
              </Link>
              <Link
                href={LINKS.edgeDocs}
                className="text-body-13 flex max-w-max items-center gap-1.5"
              >
                Powered by
                <span className="h-3 w-9 text-white">
                  <EdgeIcon />
                </span>
              </Link>
            </motion.div>

            {/* First column */}
            <FooterColumn
              title={mainColumns[0].title}
              links={mainColumns[0].links}
              orderClass="order-1 flex flex-col md:order-none"
            />

            {/* Last column - second on mobile */}
            <FooterColumn
              title={lastColumn.title}
              links={lastColumn.links}
              orderClass="order-2 md:order-last"
              lastColumn
            />

            {/* Remaining columns */}
            {mainColumns.slice(1).map(({ title, links }, columnIndex) => (
              <FooterColumn
                key={`footer-column-${title}`}
                title={title}
                links={links}
                orderClass={`order-${columnIndex + 3} md:order-none`}
              />
            ))}
          </div>
        </motion.nav>
      </div>
    </footer>
  );
}
