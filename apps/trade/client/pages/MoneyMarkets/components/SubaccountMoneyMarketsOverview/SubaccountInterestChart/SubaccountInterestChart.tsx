'use client';

import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { Card } from '@vertex-protocol/web-ui';
import { BrandLoadingWrapper } from 'client/components/BrandIconLoadingWrapper/BrandLoadingWrapper';
import { ChartDynamicGradientDefinitions } from 'client/modules/charts/components/ChartDynamicGradientDefinitions/ChartDynamicGradientDefinitions';
import {
  ChartTimespanRadioGroup,
  ChartTimespanRadioGroupOption,
} from 'client/modules/charts/components/ChartTimespanRadioGroup';
import {
  AREA_CHART_DEFAULTS,
  CHART_DOT_DEFAULTS,
  CHART_GRID_DEFAULTS,
  CHART_TOOLTIP_DEFAULTS,
  CHART_XAXIS_DEFAULTS,
  CHART_YAXIS_DEFAULTS,
} from 'client/modules/charts/config';
import { currencyAxisFormatter } from 'client/modules/charts/utils/axisFormatters';
import { useSubaccountInterestChartData } from 'client/pages/MoneyMarkets/components/SubaccountMoneyMarketsOverview/SubaccountInterestChart/hooks/useSubaccountInterestChart';
import {
  SUBACCOUNT_INTEREST_CHART_DYNAMIC_GRADIENT_CONFIG,
  useSubaccountInterestChartColors,
} from 'client/pages/MoneyMarkets/components/SubaccountMoneyMarketsOverview/SubaccountInterestChart/hooks/useSubaccountInterestChartColors';
import { SubaccountInterestChartTooltip } from 'client/pages/MoneyMarkets/components/SubaccountMoneyMarketsOverview/SubaccountInterestChart/SubaccountInterestChartTooltip';
import {
  SubaccountInterestChartDataItem,
  SubaccountInterestChartTimespan,
} from 'client/pages/MoneyMarkets/components/SubaccountMoneyMarketsOverview/SubaccountInterestChart/types';
import { getSubaccountInterestChartTimespanAxisFormatter } from 'client/pages/MoneyMarkets/components/SubaccountMoneyMarketsOverview/SubaccountInterestChart/utils/getSubaccountInterestChartTimespanAxisFormatter';
import { useState } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const TIMESPAN_OPTIONS: ChartTimespanRadioGroupOption<SubaccountInterestChartTimespan>[] =
  [
    {
      label: '24h',
      value: '24h',
    },
    {
      label: '7d',
      value: '7d',
    },
    {
      label: '30d',
      value: '30d',
    },
    {
      label: 'All',
      value: 'all_time',
    },
  ];

export function SubaccountInterestChart({ className }: WithClassnames) {
  const [timespan, setTimespan] =
    useState<SubaccountInterestChartTimespan>('24h');

  const {
    data: subaccountInterestChartData,
    isLoading: isLoadingSubaccountInterestChartData,
  } = useSubaccountInterestChartData(timespan);

  const xAxisFormatter =
    getSubaccountInterestChartTimespanAxisFormatter(timespan);

  const interestChartColors = useSubaccountInterestChartColors({
    data: subaccountInterestChartData,
    valueKey: 'cumulativeNetSpotInterestUsd',
  });

  return (
    <Card
      className={joinClassNames(
        'flex flex-col',
        // Small screen styles
        'gap-y-2 p-3',
        // Large screen styles
        'lg:gap-y-3 lg:px-2.5 lg:py-4',
        className,
      )}
    >
      <ChartTimespanRadioGroup
        timespan={timespan}
        setTimespan={setTimespan}
        timespanOptions={TIMESPAN_OPTIONS}
        className="ml-auto"
      />
      {/*Chart*/}
      {/*Setting height to prevent collapse on mobile, height needs to be specified here for chart responsive container to work*/}
      {/*On large screens, height is derived from the parent container, so no need to specify height here*/}
      <div className="flex h-60 min-h-60 flex-1 lg:h-auto">
        <BrandLoadingWrapper
          iconSizeVariant="sm"
          isLoading={isLoadingSubaccountInterestChartData}
          indicatorContainerClassName="flex-1"
          grayscale
        >
          {!!subaccountInterestChartData && (
            <>
              <ChartDynamicGradientDefinitions
                valueKey="cumulativeNetSpotInterestUsd"
                data={subaccountInterestChartData}
                gradientConfigs={
                  SUBACCOUNT_INTEREST_CHART_DYNAMIC_GRADIENT_CONFIG
                }
              />
              <ResponsiveContainer>
                <AreaChart data={subaccountInterestChartData}>
                  <CartesianGrid {...CHART_GRID_DEFAULTS} />
                  <Tooltip
                    {...CHART_TOOLTIP_DEFAULTS}
                    content={<SubaccountInterestChartTooltip />}
                  />
                  <XAxis
                    {...CHART_XAXIS_DEFAULTS}
                    tickFormatter={xAxisFormatter}
                  />
                  <YAxis
                    {...CHART_YAXIS_DEFAULTS}
                    tickFormatter={currencyAxisFormatter}
                  />
                  <Area
                    {...AREA_CHART_DEFAULTS}
                    {...interestChartColors}
                    dataKey={cumulativeInterestChartDataKey}
                    activeDot={{
                      ...CHART_DOT_DEFAULTS,
                      stroke: interestChartColors.stroke,
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </>
          )}
        </BrandLoadingWrapper>
      </div>
    </Card>
  );
}

function cumulativeInterestChartDataKey(data: SubaccountInterestChartDataItem) {
  return data.cumulativeNetSpotInterestUsd;
}
