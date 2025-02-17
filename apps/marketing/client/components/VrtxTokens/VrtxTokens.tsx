'use client';

import { joinClassNames } from '@vertex-protocol/web-common';
import { ExternalLink } from 'client/components/Link/Link';
import ArbitrumChain from 'client/icons/chains/ArbitrumChain';
import BaseChain from 'client/icons/chains/BaseChain';
import BlastChain from 'client/icons/chains/BlastChain';
import EthereumChain from 'client/icons/chains/EthereumChain';
import CoingeckoIcon from 'client/icons/Coingecko';
import CoinMarketCapIcon from 'client/icons/CoinMarket';
import {
  VRTX_CONTAINER_VARIANTS,
  VRTX_ITEM_VARIANTS,
} from 'client/sections/VrtxSection/motionVariants';
import { LINKS } from 'config/links';
import { motion } from 'framer-motion';

export function VrtxTokens() {
  const linkClasses = joinClassNames('flex items-center gap-x-2');
  const spanClass = 'col-span-2 md:col-span-4 text-body-gray';
  const containerClass = joinClassNames(
    'text-body-13',
    'flex flex-col gap-12',
    'lg:flex-row lg:items-center lg:justify-between lg:gap-x-0',
  );
  const divContainerClass = joinClassNames(
    'auto-cols-max grid grid-cols-2 md:grid-cols-4',
    'lg:items-start gap-4 lg:flex lg:items-center',
  );

  return (
    <motion.div variants={VRTX_CONTAINER_VARIANTS} className={containerClass}>
      <motion.div
        variants={VRTX_CONTAINER_VARIANTS}
        className={divContainerClass}
      >
        <motion.span variants={VRTX_ITEM_VARIANTS} className={spanClass}>
          Official token address
        </motion.span>
        <ExternalLink
          showArrow
          xOffset={0}
          href={LINKS.arbiscan}
          className={linkClasses}
        >
          <ArbitrumChain />
          <span>Arbiscan</span>
        </ExternalLink>
        <ExternalLink
          showArrow
          xOffset={0}
          href={LINKS.etherscan}
          className={linkClasses}
        >
          <EthereumChain />
          <span>Etherscan</span>
        </ExternalLink>
        <ExternalLink
          showArrow
          xOffset={0}
          href={LINKS.baseScan}
          className={linkClasses}
        >
          <BaseChain />
          <span>BaseScan</span>
        </ExternalLink>
        <ExternalLink
          showArrow
          xOffset={0}
          href={LINKS.blast}
          className={linkClasses}
        >
          <BlastChain />
          <span>Blast</span>
        </ExternalLink>
      </motion.div>
      <motion.div
        variants={VRTX_CONTAINER_VARIANTS}
        className={divContainerClass}
      >
        <motion.span variants={VRTX_ITEM_VARIANTS} className={spanClass}>
          Links
        </motion.span>
        <ExternalLink
          showArrow
          xOffset={0}
          href={LINKS.coinmarketcap}
          className={linkClasses}
        >
          <CoinMarketCapIcon />
          <span>CoinMarketCap</span>
        </ExternalLink>
        <ExternalLink
          showArrow
          xOffset={0}
          href={LINKS.coingecko}
          className={linkClasses}
        >
          <CoingeckoIcon className="text-dark" />
          <span>Coingecko</span>
        </ExternalLink>
      </motion.div>
    </motion.div>
  );
}
