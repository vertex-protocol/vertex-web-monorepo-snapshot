'use client';

import { useIsChainEnvType } from '@vertex-protocol/react-client';
import { LinkButton } from '@vertex-protocol/web-ui';
import { MakerStatisticsCharts } from 'client/components/MakerStatisticsCharts/MakerStatisticsCharts';
import { MakerMetricsCards } from 'client/components/MakerMetricsCards';
import { MakerStatisticsSelectors } from 'client/components/MakerStatisticsSelectors/MakerStatisticsSelectors';
import {
  UseMakerStatisticsSelectors,
  useMakerStatisticsSelectors,
} from 'client/components/MakerStatisticsSelectors/useMakerStatisticsSelectors';
import {
  BLITZ_EXTERNAL_LINKS,
  VERTEX_EXTERNAL_LINKS,
} from 'client/config/links';
import Link from 'next/link';
import { joinClassNames } from '@vertex-protocol/web-common';

export function MainPage() {
  const {
    epochOptions,
    epoch,
    setEpoch,
    intervalOptions,
    interval,
    setInterval,
    productOptions,
    productId,
    setProductId,
    chainEnvOptions,
    primaryChainEnv,
    setPrimaryChainEnv,
  } = useMakerStatisticsSelectors();

  const { isBlast } = useIsChainEnvType();

  return (
    <>
      <PageHeader
        isBlast={isBlast}
        epochOptions={epochOptions}
        epoch={epoch}
        setEpoch={setEpoch}
        intervalOptions={intervalOptions}
        interval={interval}
        setInterval={setInterval}
        productOptions={productOptions}
        productId={productId}
        setProductId={setProductId}
        chainEnvOptions={chainEnvOptions}
        primaryChainEnv={primaryChainEnv}
        setPrimaryChainEnv={setPrimaryChainEnv}
      />
      <MakerMetricsCards
        productId={productId}
        epoch={epoch}
        interval={interval}
      />
      <MakerStatisticsCharts
        productId={productId}
        epoch={epoch}
        interval={interval}
        isBlast={isBlast}
      />
    </>
  );
}

interface PageHeaderProps extends UseMakerStatisticsSelectors {
  isBlast: boolean;
}

function PageHeader({
  isBlast,
  chainEnvOptions,
  primaryChainEnv,
  setPrimaryChainEnv,
  productOptions,
  productId,
  setProductId,
  epochOptions,
  epoch,
  setEpoch,
  intervalOptions,
  interval,
  setInterval,
}: PageHeaderProps) {
  const makerProgramDocsLink = isBlast
    ? BLITZ_EXTERNAL_LINKS.makerProgramDocs
    : VERTEX_EXTERNAL_LINKS.makerProgramDocs;

  return (
    <div className="flex flex-col gap-y-1">
      <h1 className="text-text-primary font-title text-xl lg:text-3xl">
        MM Dashboard
      </h1>
      <div
        className={joinClassNames(
          'flex flex-col gap-4',
          'sm:flex-row sm:justify-between lg:text-sm',
          'text-text-tertiary text-xs',
        )}
      >
        <div>
          Details about MM Program can be found{' '}
          <LinkButton
            as={Link}
            colorVariant="primary"
            external
            href={makerProgramDocsLink}
          >
            here
          </LinkButton>
          .
        </div>
        <MakerStatisticsSelectors
          chainEnvOptions={chainEnvOptions}
          primaryChainEnv={primaryChainEnv}
          setPrimaryChainEnv={setPrimaryChainEnv}
          productOptions={productOptions}
          productId={productId}
          setProductId={setProductId}
          epochOptions={epochOptions}
          epoch={epoch}
          setEpoch={setEpoch}
          intervalOptions={intervalOptions}
          interval={interval}
          setInterval={setInterval}
        />
      </div>
    </div>
  );
}
