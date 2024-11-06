import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { useMemo, useState } from 'react';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { getKeyedPrimitiveSortFn } from 'client/components/DataTable/utils/sortingFns';
import { CustomNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { NumberCell } from 'client/modules/tables/cells/NumberCell';
import { HeaderCell } from 'client/components/DataTable/cells/HeaderCell';
import { TableCell } from 'client/components/DataTable/cells/TableCell';
import { SentimentLabel } from 'client/modules/sentiment/components/SentimentLabel';
import { SentimentTweetVolumeChange } from 'client/modules/sentiment/components/SentimentTweetVolumeChange';
import {
  SentimentTabItemData,
  SentimentTimeframe,
} from 'client/modules/trading/tradingSidebar/sentiment/types';
import { useTradingSidebarSentimentTab } from 'client/modules/trading/tradingSidebar/sentiment/useTradingSidebarSentimentTab';
import { SentimentTimeframeSwitcher } from 'client/modules/trading/tradingSidebar/sentiment/SentimentTimeframeSwitcher';
import { FixedHeaderDataTable } from 'client/components/FixedHeaderDataTable';
import Image from 'next/image';
import { MARKET_SENTIMENT_PROVIDER } from 'common/environment/integrations/marketSentimentProvider';
import { useAnalyticsContext } from 'client/modules/analytics/AnalyticsContext';

const columnHelper = createColumnHelper<SentimentTabItemData>();

export function TradingSidebarSentimentTab({ className }: WithClassnames) {
  const { isLoading, rows } = useTradingSidebarSentimentTab();
  const [timeframe, setTimeframe] = useState<SentimentTimeframe>('1d');
  const { trackEvent } = useAnalyticsContext();

  const columns: ColumnDef<SentimentTabItemData, any>[] = useMemo(() => {
    return [
      columnHelper.accessor('metadata', {
        header: ({ header }) => <HeaderCell header={header}>Token</HeaderCell>,
        cell: (context) => {
          const {
            symbol,
            icon: { asset },
          } = context.getValue();
          return (
            <TableCell className="gap-x-1">
              <Image src={asset} className="size-4" alt={symbol} />
              <span>{symbol}</span>
            </TableCell>
          );
        },
        sortingFn: getKeyedPrimitiveSortFn('symbol'),
        meta: {
          cellContainerClassName: 'grow',
        },
      }),
      columnHelper.accessor('marketSentiment.sentiment', {
        header: ({ header }) => (
          <HeaderCell header={header} definitionTooltipId="sentimentLabel">
            Sentiment
          </HeaderCell>
        ),
        cell: (context) => (
          <SentimentLabel score={context.getValue()[timeframe]} />
        ),
        sortingFn: getKeyedPrimitiveSortFn(timeframe),
        meta: {
          cellContainerClassName: 'w-20',
        },
      }),
      columnHelper.accessor('marketSentiment.tweets', {
        header: ({ header }) => <HeaderCell header={header}>Tweets</HeaderCell>,
        cell: (context) => (
          <NumberCell
            value={context.getValue()[timeframe]}
            formatSpecifier={
              CustomNumberFormatSpecifier.NUMBER_LARGE_ABBREVIATED
            }
          />
        ),
        sortingFn: getKeyedPrimitiveSortFn(timeframe),
        meta: {
          cellContainerClassName: 'w-14',
        },
      }),
      columnHelper.accessor('marketSentiment.tweets.change', {
        header: ({ header }) => (
          <HeaderCell
            header={header}
            className="justify-end"
            definitionTooltipId="sentimentTweetVolumeChange"
          >
            Hype
          </HeaderCell>
        ),
        cell: (context) => (
          <SentimentTweetVolumeChange value={context.getValue()} />
        ),
        sortingFn: 'basic',
        meta: {
          cellContainerClassName: 'w-14 text-right',
        },
      }),
    ];
  }, [timeframe]);

  return (
    <div
      className={joinClassNames(
        'flex flex-col gap-y-2.5',
        // Overflow hidden here to allow the content to scroll.
        'overflow-hidden',
        'text-xs',
        className,
      )}
    >
      <div className="flex items-center justify-between px-2.5 pb-1.5">
        <span className="text-text-primary">Tweet Volume &amp; Sentiment</span>
        {MARKET_SENTIMENT_PROVIDER.logo && (
          <Image
            src={MARKET_SENTIMENT_PROVIDER.logo}
            alt={MARKET_SENTIMENT_PROVIDER.name}
            className="w-11"
          />
        )}
      </div>

      <SentimentTimeframeSwitcher
        className="px-2.5"
        timeframe={timeframe}
        setTimeframe={setTimeframe}
      />

      <FixedHeaderDataTable
        columns={columns}
        data={rows}
        isLoading={isLoading}
        className="gap-y-1.5 px-1.5"
        headerClassName="flex px-1"
        rowClassName="flex py-2 px-1"
        rowAsLinkHref={({ original: { href } }) => href}
        onRowClick={() => {
          trackEvent({
            type: 'market_entrypoint_clicked',
            data: {
              entrypoint: 'sentiment',
            },
          });
        }}
      />
    </div>
  );
}
