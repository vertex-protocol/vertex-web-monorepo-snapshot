# Vertex Frontend Lines

**Last updated**: 2025-02-03 21:16:31 UTC

## Apps

### apps/blitzMarketing

#### Files

```
---------------------------------------------------------------------------------------------------------------------
File                                                                              blank        comment           code
---------------------------------------------------------------------------------------------------------------------
apps/blitzMarketing/app/error.tsx                                                    3              0              9
apps/blitzMarketing/app/layout.tsx                                                   5              5             92
apps/blitzMarketing/app/not-found.tsx                                                2              0              8
apps/blitzMarketing/app/page.tsx                                                     1              0              4
apps/blitzMarketing/components/BlitzLinkButton.tsx                                   6              8             58
apps/blitzMarketing/components/ClientLayout.tsx                                      4              0             20
apps/blitzMarketing/components/CookieNoticeBanner.tsx                                7              0             70
apps/blitzMarketing/components/GlitchText.tsx                                        5              8             34
apps/blitzMarketing/config/links.ts                                                  0              0             10
apps/blitzMarketing/config/seoInfo.ts                                                0              0              6
apps/blitzMarketing/eslint.config.js                                                 1              0             17
apps/blitzMarketing/hooks/useBlitzCookiePreference.ts                                2              0             12
apps/blitzMarketing/hooks/useGlitchTextOnHover.ts                                    6             16             43
apps/blitzMarketing/netlify.toml                                                     0              0              2
apps/blitzMarketing/package.json                                                     0              0             37
apps/blitzMarketing/postcss.config.js                                                0              0              6
apps/blitzMarketing/public/browserconfig.xml                                         0              0              9
apps/blitzMarketing/public/safari-pinned-tab.svg                                     0              0             24
apps/blitzMarketing/public/site.webmanifest                                          0              0             19
apps/blitzMarketing/sections/ErrorSection.tsx                                        1              4             38
apps/blitzMarketing/sections/HeroSection/HeroSection.tsx                             1              4             42
apps/blitzMarketing/sections/HeroSection/components/BottomBar.tsx                    3              4             46
apps/blitzMarketing/sections/HeroSection/components/TopBar.tsx                       1              4             34
apps/blitzMarketing/styles/animations/glitchKeyframes.css                           26              0            339
apps/blitzMarketing/styles/colors.ts                                                 0              0             14
apps/blitzMarketing/styles/globals.css                                               3              0             17
apps/blitzMarketing/tailwind.config.ts                                               2              2             44
apps/blitzMarketing/tsconfig.json                                                    0              0             14
apps/blitzMarketing/utils/fonts/index.ts                                             2              0             10
---------------------------------------------------------------------------------------------------------------------
SUM:                                                                                 81             55           1078
```

#### Summary by Language

```
-------------------------------------------------------------------------------
Language                     files          blank        comment           code
-------------------------------------------------------------------------------
TypeScript                      19             51             55            594
CSS                              2             29              0            356
JSON                             3              0              0             70
SVG                              1              0              0             24
JavaScript                       2              1              0             23
XML                              1              0              0              9
TOML                             1              0              0              2
-------------------------------------------------------------------------------
SUM:                            29             81             55           1078
-------------------------------------------------------------------------------
```

### apps/edgeMMDashboard

#### Files

```
-------------------------------------------------------------------------------------------------------------------------------------------------------------
File                                                                                                                      blank        comment           code
-------------------------------------------------------------------------------------------------------------------------------------------------------------
apps/edgeMMDashboard/app/ClientLayout.tsx                                                                                    8              2             61
apps/edgeMMDashboard/app/global-error.tsx                                                                                    2              0              5
apps/edgeMMDashboard/app/layout.tsx                                                                                          4              5             90
apps/edgeMMDashboard/app/not-found.tsx                                                                                       1              0              4
apps/edgeMMDashboard/app/page.tsx                                                                                            1              3              4
apps/edgeMMDashboard/client/components/LocationRestrictedDialog.tsx                                                          2              0             43
apps/edgeMMDashboard/client/components/MakerMetricsCards.tsx                                                                 4              0             55
apps/edgeMMDashboard/client/components/MakerStatisticsCharts/MakerMetricChart/ChartTooltip.tsx                               7              0             70
apps/edgeMMDashboard/client/components/MakerStatisticsCharts/MakerMetricChart/MakerMetricChart.tsx                           9              6            145
apps/edgeMMDashboard/client/components/MakerStatisticsCharts/MakerMetricChart/MakerMetricChartLegend.tsx                     4              1             51
apps/edgeMMDashboard/client/components/MakerStatisticsCharts/MakerMetricChart/MakerMetricChartTooltip.tsx                    7              2             53
apps/edgeMMDashboard/client/components/MakerStatisticsCharts/MakerMetricChart/axisFormatters.ts                              9             28             46
apps/edgeMMDashboard/client/components/MakerStatisticsCharts/MakerMetricChart/config.ts                                      7              1             73
apps/edgeMMDashboard/client/components/MakerStatisticsCharts/MakerMetricChart/types.ts                                       0              0              4
apps/edgeMMDashboard/client/components/MakerStatisticsCharts/MakerMetricChart/utils.ts                                       0              1              3
apps/edgeMMDashboard/client/components/MakerStatisticsCharts/MakerStatisticsCharts.tsx                                       5              0            148
apps/edgeMMDashboard/client/components/MakerStatisticsCharts/useMakerStatisticsCharts.ts                                    19              6            125
apps/edgeMMDashboard/client/components/MakerStatisticsSelectors/ChainEnvSelect.tsx                                           3              2             58
apps/edgeMMDashboard/client/components/MakerStatisticsSelectors/EpochSelect.tsx                                              3              2             53
apps/edgeMMDashboard/client/components/MakerStatisticsSelectors/IntervalSelect.tsx                                           3              1             56
apps/edgeMMDashboard/client/components/MakerStatisticsSelectors/MakerStatisticsSelectors.tsx                                 2              0             45
apps/edgeMMDashboard/client/components/MakerStatisticsSelectors/ProductSelect.tsx                                            4              2             57
apps/edgeMMDashboard/client/components/MakerStatisticsSelectors/useMakerStatisticsSelectors.ts                              11              4            130
apps/edgeMMDashboard/client/config/links.ts                                                                                  2              0             13
apps/edgeMMDashboard/client/config/seoInfo.ts                                                                                0              0             15
apps/edgeMMDashboard/client/hooks/query/useAllMarkets.ts                                                                    19              7            103
apps/edgeMMDashboard/client/hooks/query/useEpochs.ts                                                                         6              3             32
apps/edgeMMDashboard/client/hooks/query/useMakerStatistics.ts                                                                4              0             51
apps/edgeMMDashboard/client/hooks/useIsGeolocationBlocked.ts                                                                 1              0              8
apps/edgeMMDashboard/client/pages/ErrorPage.tsx                                                                              1              0             20
apps/edgeMMDashboard/client/pages/MainPage.tsx                                                                               7              0            126
apps/edgeMMDashboard/eslint.config.js                                                                                        1              0             17
apps/edgeMMDashboard/netlify.toml                                                                                            0              0              2
apps/edgeMMDashboard/package.json                                                                                            0              0             43
apps/edgeMMDashboard/postcss.config.js                                                                                       0              0              6
apps/edgeMMDashboard/public/browserconfig.xml                                                                                0              0              9
apps/edgeMMDashboard/public/safari-pinned-tab.svg                                                                            0              0             10
apps/edgeMMDashboard/public/site.webmanifest                                                                                 0              0             19
apps/edgeMMDashboard/styles/globals.css                                                                                      9              5             40
apps/edgeMMDashboard/tailwind.config.ts                                                                                      2              0             15
apps/edgeMMDashboard/tsconfig.json                                                                                           0              0             14
-------------------------------------------------------------------------------------------------------------------------------------------------------------
SUM:                                                                                                                        167             81           1922
```

#### Summary by Language

```
-------------------------------------------------------------------------------
Language                     files          blank        comment           code
-------------------------------------------------------------------------------
TypeScript                      32            157             76           1762
JSON                             3              0              0             76
CSS                              1              9              5             40
JavaScript                       2              1              0             23
SVG                              1              0              0             10
XML                              1              0              0              9
TOML                             1              0              0              2
-------------------------------------------------------------------------------
SUM:                            41            167             81           1922
-------------------------------------------------------------------------------
```

### apps/edgeMarketing

#### Files

```
----------------------------------------------------------------------------------------------------------------------
File                                                                               blank        comment           code
----------------------------------------------------------------------------------------------------------------------
apps/edgeMarketing/app/error.tsx                                                      3              0              9
apps/edgeMarketing/app/layout.tsx                                                     4              5             61
apps/edgeMarketing/app/not-found.tsx                                                  2              0              8
apps/edgeMarketing/app/page.tsx                                                       1              0              4
apps/edgeMarketing/components/ClientLayout.tsx                                        7              3             46
apps/edgeMarketing/components/CookieNoticeBanner.tsx                                  8              0             66
apps/edgeMarketing/components/EdgeBanner/EdgeBanner.tsx                               1              0             27
apps/edgeMarketing/components/EdgeBgImage/EdgeBgImage.tsx                             1              0             19
apps/edgeMarketing/components/EdgeDescription/EdgeDescription.tsx                     3              4             28
apps/edgeMarketing/components/EdgeLink/EdgeLink.tsx                                   5              4             41
apps/edgeMarketing/components/EdgeTileLink/EdgeTileLink.tsx                          11              0             91
apps/edgeMarketing/config/links.ts                                                    2              1             29
apps/edgeMarketing/config/seoInfo.ts                                                  0              0              7
apps/edgeMarketing/eslint.config.js                                                   1              0             17
apps/edgeMarketing/hooks/useEdgeCookiePreference.ts                                   2              0             12
apps/edgeMarketing/hooks/useEdgeMetrics.ts                                           11              1             61
apps/edgeMarketing/netlify.toml                                                       0              0              2
apps/edgeMarketing/package.json                                                       0              0             37
apps/edgeMarketing/postcss.config.js                                                  0              0              6
apps/edgeMarketing/public/browserconfig.xml                                           0              0              9
apps/edgeMarketing/public/img/arbitrum-arb-logo.svg                                   0              0             36
apps/edgeMarketing/public/img/base-logo.svg                                           0              0              4
apps/edgeMarketing/public/img/blitz-button-bg.svg                                     0              0             19
apps/edgeMarketing/public/img/blitz-logo-light.svg                                    0              0             84
apps/edgeMarketing/public/img/blitz-logo.svg                                          0              0             22
apps/edgeMarketing/public/img/edge-logo.svg                                           0              0             17
apps/edgeMarketing/public/img/mantle-logo.svg                                         0              0             12
apps/edgeMarketing/public/img/sei-logo.svg                                            0              0             10
apps/edgeMarketing/public/img/sonic-logo.svg                                          0              0              8
apps/edgeMarketing/public/img/vertex-button-bg.svg                                    0              0             30
apps/edgeMarketing/public/img/vertex-logo-light.svg                                   0              0             22
apps/edgeMarketing/public/img/vertex-logo.svg                                         0              0             22
apps/edgeMarketing/public/safari-pinned-tab.svg                                       0              0             10
apps/edgeMarketing/public/site.webmanifest                                            0              0             19
apps/edgeMarketing/sections/ErrorSection/ErrorSection.tsx                             1              4             39
apps/edgeMarketing/sections/HeroSection/HeroSection.tsx                               1              4             28
apps/edgeMarketing/sections/HeroSection/components/BuiltOnEdge.tsx                    9              0            150
apps/edgeMarketing/styles/colors.ts                                                   0              0             17
apps/edgeMarketing/styles/globals.css                                                 1              0              9
apps/edgeMarketing/tailwind.config.ts                                                 1              2             48
apps/edgeMarketing/tsconfig.json                                                      0              0             14
apps/edgeMarketing/utils/fonts.ts                                                     1              0             10
----------------------------------------------------------------------------------------------------------------------
SUM:                                                                                  76             28           1210
```

#### Summary by Language

```
-------------------------------------------------------------------------------
Language                     files          blank        comment           code
-------------------------------------------------------------------------------
TypeScript                      21             74             28            801
SVG                             13              0              0            296
JSON                             3              0              0             70
JavaScript                       2              1              0             23
CSS                              1              1              0              9
XML                              1              0              0              9
TOML                             1              0              0              2
-------------------------------------------------------------------------------
SUM:                            42             76             28           1210
-------------------------------------------------------------------------------
```

### apps/edgeStatsDashboard

#### Files

```
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
File                                                                                                                                                                                      blank        comment           code
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
apps/edgeStatsDashboard/app/ClientLayout.tsx                                                                                                                                                 8              0             60
apps/edgeStatsDashboard/app/global-error.tsx                                                                                                                                                 2              0              5
apps/edgeStatsDashboard/app/layout.tsx                                                                                                                                                       4              5             97
apps/edgeStatsDashboard/app/not-found.tsx                                                                                                                                                    1              0              4
apps/edgeStatsDashboard/app/page.tsx                                                                                                                                                         1              3              4
apps/edgeStatsDashboard/client/assets/edge-logo.svg                                                                                                                                          0              0             19
apps/edgeStatsDashboard/client/assets/edge-with-vertex-logo.svg                                                                                                                              0              0             17
apps/edgeStatsDashboard/client/components/LabelWithEdgeLogo.tsx                                                                                                                              1              0             10
apps/edgeStatsDashboard/client/components/MarketWithRateList.tsx                                                                                                                             6              0             76
apps/edgeStatsDashboard/client/components/StatsChartWithOverviewSection.tsx                                                                                                                  2              0             22
apps/edgeStatsDashboard/client/components/StatsDataCard.tsx                                                                                                                                  6              2             80
apps/edgeStatsDashboard/client/components/StatsSection.tsx                                                                                                                                   1              0             15
apps/edgeStatsDashboard/client/components/StatsValueWithLabel.tsx                                                                                                                            1              0             24
apps/edgeStatsDashboard/client/components/TimeframeSelect/TimeframeSelect.tsx                                                                                                                4              0             50
apps/edgeStatsDashboard/client/components/charts/ChainEnvBreakdownStatsChart/ChainEnvBreakdownStatsChart.tsx                                                                                 3              6            162
apps/edgeStatsDashboard/client/components/charts/ChainEnvBreakdownStatsChart/assets/edge.svg                                                                                                 0              0             19
apps/edgeStatsDashboard/client/components/charts/ChainEnvBreakdownStatsChart/types.ts                                                                                                        3              0             12
apps/edgeStatsDashboard/client/components/charts/ChartTooltip.tsx                                                                                                                            8              0             81
apps/edgeStatsDashboard/client/components/charts/StatsChart/StatsChart.tsx                                                                                                                   7             12            166
apps/edgeStatsDashboard/client/components/charts/StatsChart/StatsChartTooltip.tsx                                                                                                           11              2             77
apps/edgeStatsDashboard/client/components/charts/StatsChart/config.tsx                                                                                                                       8              5             87
apps/edgeStatsDashboard/client/components/charts/StatsChart/types.ts                                                                                                                         3             12             22
apps/edgeStatsDashboard/client/components/charts/StatsPieChart/StatsPieChart.tsx                                                                                                             3              5            109
apps/edgeStatsDashboard/client/components/charts/StatsPieChart/StatsPieChartCenterMetric.tsx                                                                                                 2              0             26
apps/edgeStatsDashboard/client/components/charts/StatsPieChart/StatsPieChartLegend.tsx                                                                                                       3              0             31
apps/edgeStatsDashboard/client/components/charts/StatsPieChart/StatsPieChartTooltip.tsx                                                                                                      5              0             38
apps/edgeStatsDashboard/client/components/charts/StatsPieChart/types.ts                                                                                                                      0              0              4
apps/edgeStatsDashboard/client/components/charts/axisFormatters.ts                                                                                                                           9             33             53
apps/edgeStatsDashboard/client/components/charts/utils/getDefaultChartFillColor.ts                                                                                                           5             36             18
apps/edgeStatsDashboard/client/config/links.ts                                                                                                                                               0              0              6
apps/edgeStatsDashboard/client/config/seoInfo.ts                                                                                                                                             0              0             14
apps/edgeStatsDashboard/client/hooks/query/useQueryAllEdgeMarkets.ts                                                                                                                        15             14            105
apps/edgeStatsDashboard/client/hooks/query/useQueryAllMarkets24HrFundingRates.ts                                                                                                             5              0             28
apps/edgeStatsDashboard/client/hooks/query/useQueryEdgeInsuranceFunds.ts                                                                                                                     8              0             37
apps/edgeStatsDashboard/client/hooks/query/useQueryEdgeMarketSnapshots.ts                                                                                                                   19             17            106
apps/edgeStatsDashboard/client/hooks/query/useQueryEdgeMinDepositRates.ts                                                                                                                    8              0             44
apps/edgeStatsDashboard/client/hooks/query/useQueryOraclePrices.ts                                                                                                                           7              3             32
apps/edgeStatsDashboard/client/hooks/query/useQueryPrimaryQuotePrice.ts                                                                                                                      3              0             20
apps/edgeStatsDashboard/client/hooks/types.ts                                                                                                                                                8              2             19
apps/edgeStatsDashboard/client/hooks/useChartTimeframe.ts                                                                                                                                   10              1             86
apps/edgeStatsDashboard/client/hooks/useEdgeMarketSnapshots.ts                                                                                                                              15             14            134
apps/edgeStatsDashboard/client/hooks/useEdgeMarketSnapshotsAtHistoricalTimes.ts                                                                                                             14              5             88
apps/edgeStatsDashboard/client/hooks/usePrimaryQuotePriceUsd.ts                                                                                                                              2              5             12
apps/edgeStatsDashboard/client/hooks/utils.ts                                                                                                                                                1              6             25
apps/edgeStatsDashboard/client/pages/ErrorPage.tsx                                                                                                                                           1              0             20
apps/edgeStatsDashboard/client/pages/MainPage/MainPage.tsx                                                                                                                                   3              0             35
apps/edgeStatsDashboard/client/pages/MainPage/components/DashboardTabs.tsx                                                                                                                   4              0             87
apps/edgeStatsDashboard/client/pages/MainPage/components/OpenInterestFundingAndLiquidationsTabContent/FundingSection/FundingSection.tsx                                                      4              0            103
apps/edgeStatsDashboard/client/pages/MainPage/components/OpenInterestFundingAndLiquidationsTabContent/FundingSection/useEdgeTopFundingRatesCardData.ts                                       8              2             44
apps/edgeStatsDashboard/client/pages/MainPage/components/OpenInterestFundingAndLiquidationsTabContent/FundingSection/useHistoricalFundingChartData.ts                                       11              2             52
apps/edgeStatsDashboard/client/pages/MainPage/components/OpenInterestFundingAndLiquidationsTabContent/LiquidationsSection/LiquidationsSection.tsx                                            4              0             82
apps/edgeStatsDashboard/client/pages/MainPage/components/OpenInterestFundingAndLiquidationsTabContent/LiquidationsSection/useEdgeLiquidationsOverviewData.ts                                 8              0             38
apps/edgeStatsDashboard/client/pages/MainPage/components/OpenInterestFundingAndLiquidationsTabContent/LiquidationsSection/useInsuranceFundsByChainEnvPieChartData.ts                         8              0             41
apps/edgeStatsDashboard/client/pages/MainPage/components/OpenInterestFundingAndLiquidationsTabContent/LiquidationsSection/useLiquidationsByChainEnvChartData.ts                              9              0             64
apps/edgeStatsDashboard/client/pages/MainPage/components/OpenInterestFundingAndLiquidationsTabContent/OpenInterestFundingAndLiquidationsTabContent.tsx                                       1              0             12
apps/edgeStatsDashboard/client/pages/MainPage/components/OpenInterestFundingAndLiquidationsTabContent/OpenInterestSection/OpenInterestSection.tsx                                            2              0             46
apps/edgeStatsDashboard/client/pages/MainPage/components/OpenInterestFundingAndLiquidationsTabContent/OpenInterestSection/useEdgeOpenInterestPieChartData.ts                                 7              0             41
apps/edgeStatsDashboard/client/pages/MainPage/components/OpenInterestFundingAndLiquidationsTabContent/hooks/useAllEdgePerpMarkets.ts                                                         4              7             15
apps/edgeStatsDashboard/client/pages/MainPage/components/OverviewTabContent/OverviewTabContent.tsx                                                                                           1              0             15
apps/edgeStatsDashboard/client/pages/MainPage/components/RevenueAndUsersTabContent/RevenueAndUsersTabContent.tsx                                                                             1              0             12
apps/edgeStatsDashboard/client/pages/MainPage/components/RevenueAndUsersTabContent/RevenueSection/EdgeNetTradingFeesChartSection/EdgeNetTradingFeesChartSection.tsx                          2              0             50
apps/edgeStatsDashboard/client/pages/MainPage/components/RevenueAndUsersTabContent/RevenueSection/EdgeNetTradingFeesChartSection/useEdgeNetTradingFeesChartSectionData.ts                   11              0             61
apps/edgeStatsDashboard/client/pages/MainPage/components/RevenueAndUsersTabContent/RevenueSection/RevenueSection.tsx                                                                         1              0             15
apps/edgeStatsDashboard/client/pages/MainPage/components/RevenueAndUsersTabContent/RevenueSection/TradingFeesByMarketChartSection/TradingFeesByMarketChartSection.tsx                        2              0             53
apps/edgeStatsDashboard/client/pages/MainPage/components/RevenueAndUsersTabContent/RevenueSection/TradingFeesByMarketChartSection/useEdgeMakerRebatesOverviewData.ts                         6              0             29
apps/edgeStatsDashboard/client/pages/MainPage/components/RevenueAndUsersTabContent/RevenueSection/TradingFeesByMarketChartSection/useEdgeTradingFeesPieChartData.ts                          7              0             44
apps/edgeStatsDashboard/client/pages/MainPage/components/RevenueAndUsersTabContent/RevenueSection/TradingFeesChartSection/TradingFeesChartSection.tsx                                        2              0             53
apps/edgeStatsDashboard/client/pages/MainPage/components/RevenueAndUsersTabContent/RevenueSection/TradingFeesChartSection/useEdgeTradingFeesOverviewData.ts                                  9              0             42
apps/edgeStatsDashboard/client/pages/MainPage/components/RevenueAndUsersTabContent/RevenueSection/TradingFeesChartSection/useTradingFeesByChainEnvChartData.ts                              11              1             69
apps/edgeStatsDashboard/client/pages/MainPage/components/RevenueAndUsersTabContent/UsersSection/UserBaseChartSection/UserBaseChartSection.tsx                                                4              0             59
apps/edgeStatsDashboard/client/pages/MainPage/components/RevenueAndUsersTabContent/UsersSection/UserBaseChartSection/useEdgeUserBaseOverviewData.ts                                         10              1             47
apps/edgeStatsDashboard/client/pages/MainPage/components/RevenueAndUsersTabContent/UsersSection/UserBaseChartSection/useUserBaseByChainEnvChartData.ts                                       9              0             55
apps/edgeStatsDashboard/client/pages/MainPage/components/RevenueAndUsersTabContent/UsersSection/UsersSection.tsx                                                                             1              0             11
apps/edgeStatsDashboard/client/pages/MainPage/components/RevenueAndUsersTabContent/utils/getTotalTradingFeesByProductId.ts                                                                   2             10             16
apps/edgeStatsDashboard/client/pages/MainPage/components/TvlAndYieldTabContent/BorrowDepositAprChartsSection/BorrowDepositAprChartsSection.tsx                                               1              0             11
apps/edgeStatsDashboard/client/pages/MainPage/components/TvlAndYieldTabContent/BorrowDepositAprChartsSection/HistoricalProductBorrowAprChart.tsx                                             3              0             56
apps/edgeStatsDashboard/client/pages/MainPage/components/TvlAndYieldTabContent/BorrowDepositAprChartsSection/HistoricalProductDepositAprChart.tsx                                            3              0             56
apps/edgeStatsDashboard/client/pages/MainPage/components/TvlAndYieldTabContent/BorrowDepositAprChartsSection/useHistoricalProductBorrowAprChartData.ts                                      11              0             59
apps/edgeStatsDashboard/client/pages/MainPage/components/TvlAndYieldTabContent/BorrowDepositAprChartsSection/useHistoricalProductDepositAprChartData.ts                                     11              0             59
apps/edgeStatsDashboard/client/pages/MainPage/components/TvlAndYieldTabContent/BorrowDepositChartsSection/BorrowDepositChartsSection.tsx                                                     2              0             49
apps/edgeStatsDashboard/client/pages/MainPage/components/TvlAndYieldTabContent/BorrowDepositChartsSection/useBorrowsByChainEnvChartData.ts                                                  11              0             60
apps/edgeStatsDashboard/client/pages/MainPage/components/TvlAndYieldTabContent/BorrowDepositChartsSection/useDepositsByChainEnvChartData.ts                                                 11              0             60
apps/edgeStatsDashboard/client/pages/MainPage/components/TvlAndYieldTabContent/BorrowDepositPieChartsSection/BorrowDepositPieChartsSection.tsx                                               3              0             52
apps/edgeStatsDashboard/client/pages/MainPage/components/TvlAndYieldTabContent/BorrowDepositPieChartsSection/useEdgeBorrowsPieChartData.ts                                                   6              0             41
apps/edgeStatsDashboard/client/pages/MainPage/components/TvlAndYieldTabContent/BorrowDepositPieChartsSection/useEdgeDepositsPieChartData.ts                                                  6              0             41
apps/edgeStatsDashboard/client/pages/MainPage/components/TvlAndYieldTabContent/TopBorrowDepositAprCardsSection/TopBorrowDepositAprCardsSection.tsx                                           3              0             73
apps/edgeStatsDashboard/client/pages/MainPage/components/TvlAndYieldTabContent/TopBorrowDepositAprCardsSection/useEdgeTopBorrowAprsCardData.ts                                               7              1             43
apps/edgeStatsDashboard/client/pages/MainPage/components/TvlAndYieldTabContent/TopBorrowDepositAprCardsSection/useEdgeTopDepositAprsCardData.ts                                              7              1             44
apps/edgeStatsDashboard/client/pages/MainPage/components/TvlAndYieldTabContent/TvlAndFlowsSection/EdgeFlowsChartSection.tsx                                                                  3              0             54
apps/edgeStatsDashboard/client/pages/MainPage/components/TvlAndYieldTabContent/TvlAndFlowsSection/TvlAndFlowsSection.tsx                                                                     1              0             11
apps/edgeStatsDashboard/client/pages/MainPage/components/TvlAndYieldTabContent/TvlAndFlowsSection/useEdgeFlowsChartData.ts                                                                  12              0             77
apps/edgeStatsDashboard/client/pages/MainPage/components/TvlAndYieldTabContent/TvlAndYieldTabContent.tsx                                                                                     1              0             16
apps/edgeStatsDashboard/client/pages/MainPage/components/TvlAndYieldTabContent/hooks/useAllEdgeSpotMarkets.ts                                                                                4              8             18
apps/edgeStatsDashboard/client/pages/MainPage/components/TvlAndYieldTabContent/utils/calcAnnualizedInterestRate.ts                                                                           2              8              5
apps/edgeStatsDashboard/client/pages/MainPage/components/VolumesTabContent/EdgeSpotPerpVolumeChartsSection/EdgeSpotPerpVolumeChartsSection.tsx                                               3              0             76
apps/edgeStatsDashboard/client/pages/MainPage/components/VolumesTabContent/EdgeSpotPerpVolumeChartsSection/useEdgeSpotPerpVolumeChartsSectionData.ts                                        20              0            113
apps/edgeStatsDashboard/client/pages/MainPage/components/VolumesTabContent/EdgeVolumePieChartsSection/EdgeVolumePieChartsSection.tsx                                                         3              0             70
apps/edgeStatsDashboard/client/pages/MainPage/components/VolumesTabContent/EdgeVolumePieChartsSection/useEdgeVolumePieChartsSectionData.ts                                                  13              2            122
apps/edgeStatsDashboard/client/pages/MainPage/components/VolumesTabContent/VolumeByChainEnvCardsSection/VolumeByChainEnvCardsSection.tsx                                                     6              1             58
apps/edgeStatsDashboard/client/pages/MainPage/components/VolumesTabContent/VolumeByChainEnvCardsSection/useVolumeByChainEnvCardsSectionData.ts                                               8              0             61
apps/edgeStatsDashboard/client/pages/MainPage/components/VolumesTabContent/VolumesTabContent.tsx                                                                                             1              0             14
apps/edgeStatsDashboard/client/pages/MainPage/components/common/ActiveUsersChartSection/ActiveUsersChartSection.tsx                                                                          2              0             52
apps/edgeStatsDashboard/client/pages/MainPage/components/common/ActiveUsersChartSection/useEdgeActiveUsersChartData.ts                                                                       9              2             39
apps/edgeStatsDashboard/client/pages/MainPage/components/common/ActiveUsersChartSection/useEdgeActiveUsersOverviewData.ts                                                                    6              0             23
apps/edgeStatsDashboard/client/pages/MainPage/components/common/OpenInterestByChainEnvSection/OpenInterestByChainEnvChartSection.tsx                                                         4              0             45
apps/edgeStatsDashboard/client/pages/MainPage/components/common/OpenInterestByChainEnvSection/useEdgeOpenInterestOverviewData.ts                                                            11              4             59
apps/edgeStatsDashboard/client/pages/MainPage/components/common/OpenInterestByChainEnvSection/useOpenInterestByChainEnvChartData.ts                                                         11              0             55
apps/edgeStatsDashboard/client/pages/MainPage/components/common/ProductsSelect/ProductsSelect.tsx                                                                                            3              2             56
apps/edgeStatsDashboard/client/pages/MainPage/components/common/ProductsSelect/useProductsSelect.ts                                                                                         13              1             84
apps/edgeStatsDashboard/client/pages/MainPage/components/common/TvlByChainEnvChartSection/TvlByChainEnvChartSection.tsx                                                                      4              0             56
apps/edgeStatsDashboard/client/pages/MainPage/components/common/TvlByChainEnvChartSection/useTvlByChainEnvChartData.ts                                                                      11              0             56
apps/edgeStatsDashboard/client/pages/MainPage/components/common/TvlByChainEnvChartSection/useTvlOverviewData.ts                                                                             10              0             62
apps/edgeStatsDashboard/client/pages/MainPage/components/common/VolumeByChainEnvChartSection/VolumeByChainEnvChartSection.tsx                                                                2              0             50
apps/edgeStatsDashboard/client/pages/MainPage/components/common/VolumeByChainEnvChartSection/useEdgeVolumeOverviewData.ts                                                                   10              0             55
apps/edgeStatsDashboard/client/pages/MainPage/components/common/VolumeByChainEnvChartSection/useVolumeByChainEnvChartData.ts                                                                11              1             78
apps/edgeStatsDashboard/client/types.ts                                                                                                                                                      0              0              1
apps/edgeStatsDashboard/client/utils/calcAllProductsTotalValue.ts                                                                                                                            2              4             13
apps/edgeStatsDashboard/client/utils/calcDecimalAdjustedUsdValue.ts                                                                                                                          1              6              6
apps/edgeStatsDashboard/client/utils/calcTotalDecimalAdjustedDeltasUsd.ts                                                                                                                    3              6             24
apps/edgeStatsDashboard/client/utils/calcTotalDecimalAdjustedValueUsd.ts                                                                                                                     1              5             15
apps/edgeStatsDashboard/client/utils/createPieChartDataByProductId.ts                                                                                                                        4              0             22
apps/edgeStatsDashboard/client/utils/getAverageOraclePricesByProductId.ts                                                                                                                    3              9             15
apps/edgeStatsDashboard/client/utils/getDecimalAdjustedDeltasUsdByProductId.ts                                                                                                               7              6             20
apps/edgeStatsDashboard/client/utils/getMarketName.ts                                                                                                                                        4              6             10
apps/edgeStatsDashboard/client/utils/getSpotMarketTokenName.ts                                                                                                                               3              5              7
apps/edgeStatsDashboard/client/utils/getValuesInPrimaryQuoteByProductId.ts                                                                                                                   3              5             18
apps/edgeStatsDashboard/client/utils/getVolumesInPrimaryQuoteByProductId.ts                                                                                                                  7             11             29
apps/edgeStatsDashboard/client/utils/processIndexerMarketSnapshots.ts                                                                                                                        6             13             26
apps/edgeStatsDashboard/client/utils/types.ts                                                                                                                                                0              0              2
apps/edgeStatsDashboard/eslint.config.js                                                                                                                                                     1              0             17
apps/edgeStatsDashboard/netlify.toml                                                                                                                                                         0              0              2
apps/edgeStatsDashboard/package.json                                                                                                                                                         0              0             45
apps/edgeStatsDashboard/postcss.config.js                                                                                                                                                    0              0              6
apps/edgeStatsDashboard/public/browserconfig.xml                                                                                                                                             0              0              9
apps/edgeStatsDashboard/public/safari-pinned-tab.svg                                                                                                                                         0              0             10
apps/edgeStatsDashboard/public/site.webmanifest                                                                                                                                              0              0             19
apps/edgeStatsDashboard/styles/globals.css                                                                                                                                                   7              5             34
apps/edgeStatsDashboard/tailwind.config.ts                                                                                                                                                   2              0             15
apps/edgeStatsDashboard/tsconfig.json                                                                                                                                                        0              0             14
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
SUM:                                                                                                                                                                                        698            323           6003
```

#### Summary by Language

```
-------------------------------------------------------------------------------
Language                     files          blank        comment           code
-------------------------------------------------------------------------------
TypeScript                     127            690            318           5792
JSON                             3              0              0             78
SVG                              4              0              0             65
CSS                              1              7              5             34
JavaScript                       2              1              0             23
XML                              1              0              0              9
TOML                             1              0              0              2
-------------------------------------------------------------------------------
SUM:                           139            698            323           6003
-------------------------------------------------------------------------------
```

### apps/marketing

#### Files

```
----------------------------------------------------------------------------------------------------------------------------------
File                                                                                           blank        comment           code
----------------------------------------------------------------------------------------------------------------------------------
apps/marketing/app/error.tsx                                                                      3              0             10
apps/marketing/app/global-error.tsx                                                               3              0             10
apps/marketing/app/icon.svg                                                                       0              0              3
apps/marketing/app/layout.tsx                                                                     6              3            144
apps/marketing/app/not-found.tsx                                                                  2              0             11
apps/marketing/app/page.tsx                                                                       2              0             14
apps/marketing/client/analytics/AnalyticsContext.ts                                               6              1             22
apps/marketing/client/analytics/AnalyticsContextProvider.tsx                                      8              0             39
apps/marketing/client/components/Badge/Badge.tsx                                                  3              0             17
apps/marketing/client/components/Button/LaunchAppButton.tsx                                      10              0             82
apps/marketing/client/components/Button/MotionButton.tsx                                          9              0             65
apps/marketing/client/components/ChainInfo/ChainInfo.tsx                                          3              0             45
apps/marketing/client/components/ChainInfo/data.tsx                                               1              0             32
apps/marketing/client/components/ClientLayout/ClientLayout.tsx                                    7              6             53
apps/marketing/client/components/ClientVideo/ClientVideo.tsx                                      6              1             55
apps/marketing/client/components/ComparisonCell/ComparisonCell.tsx                               11              0             75
apps/marketing/client/components/ComparisonCell/ComparisonChainsCell.tsx                          7              0             38
apps/marketing/client/components/ComparisonTable/ComparisonColumn.tsx                             5              0             40
apps/marketing/client/components/ComparisonTable/ComparisonTable.tsx                              3              0             49
apps/marketing/client/components/ComparisonTable/MobileComparisonTable.tsx                        7              0            125
apps/marketing/client/components/Container/Container.tsx                                          2              0             13
apps/marketing/client/components/CookieNoticeBanner/CookieNoticeBanner.tsx                        8              0             75
apps/marketing/client/components/EcosystemCardWrapper/EcosystemCard.tsx                           5              0             57
apps/marketing/client/components/EcosystemCardWrapper/EcosystemCardWrapper.tsx                    5              0             50
apps/marketing/client/components/EdgeInfo/EdgeInfo.tsx                                            2              0             22
apps/marketing/client/components/FeatureHighlight/FeatureHighlight.tsx                            6              0             70
apps/marketing/client/components/FeatureList/FeatureList.tsx                                      5              0             50
apps/marketing/client/components/Hero/Hero.tsx                                                    5              0            104
apps/marketing/client/components/Hero/HeroBg.tsx                                                  2              2             76
apps/marketing/client/components/Hero/HeroLottie.tsx                                              4              0             46
apps/marketing/client/components/Hero/HeroMetrics.tsx                                             5              0             67
apps/marketing/client/components/Hero/HeroMetricsColums.tsx                                       4              0             54
apps/marketing/client/components/Hero/motionVariants.ts                                           1              0             18
apps/marketing/client/components/Link/Link.tsx                                                    6              0             70
apps/marketing/client/components/Navigation/Navigation.tsx                                        3              0             45
apps/marketing/client/components/OrderbookVisual/AnimatedOrderList.tsx                            6              0             68
apps/marketing/client/components/OrderbookVisual/OrderbookVisual.tsx                              7              1             65
apps/marketing/client/components/OrderbookVisual/data.tsx                                         4              0             58
apps/marketing/client/components/RevealText/BlurRevealText.tsx                                    6              3             57
apps/marketing/client/components/RevealText/ScrollRevealText.tsx                                 18             11            140
apps/marketing/client/components/RevealText/types.ts                                              0              0              5
apps/marketing/client/components/Section/Section.tsx                                              6              5             57
apps/marketing/client/components/Section/motionVariants.ts                                        0              0              8
apps/marketing/client/components/ToolsFeatureContent/TradingFeatureContent.tsx                    5              0             73
apps/marketing/client/components/ToolsFeatureNav/TradingFeatureNav.tsx                           10              0            146
apps/marketing/client/components/Tooltip/Tooltip.tsx                                              3              6             41
apps/marketing/client/components/TradersList/TradersList.tsx                                      9              0             94
apps/marketing/client/components/VrtxHeader/VrtxHeader.tsx                                        3              0             68
apps/marketing/client/components/VrtxPartners/VrtxPartners.tsx                                    3              0             42
apps/marketing/client/components/VrtxStats/VrtxStats.tsx                                          6              7            107
apps/marketing/client/components/VrtxStats/useStakingData.ts                                     15              0             97
apps/marketing/client/components/VrtxTokens/VrtxTokens.tsx                                        3              0            102
apps/marketing/client/hooks/useEdgeVolume.ts                                                     11              0             52
apps/marketing/client/hooks/useVertexCookiePreference.ts                                          2              0             12
apps/marketing/client/icons/ArrowUpRight.tsx                                                      1              0             22
apps/marketing/client/icons/CheckIcon.tsx                                                         1              0             18
apps/marketing/client/icons/CloseIcon.tsx                                                         1              0             18
apps/marketing/client/icons/CoinMarket.tsx                                                        1              0             18
apps/marketing/client/icons/Coingecko.tsx                                                         2              0             51
apps/marketing/client/icons/DashboardIcon.tsx                                                     1              0             19
apps/marketing/client/icons/EdgeIcon.tsx                                                          1              0             20
apps/marketing/client/icons/ErrorIcon.tsx                                                         4              0            159
apps/marketing/client/icons/Logo.tsx                                                              2              0             58
apps/marketing/client/icons/NotFoundIcon.tsx                                                      5              0            161
apps/marketing/client/icons/StakingIcon.tsx                                                       1              0             18
apps/marketing/client/icons/chains/ArbitrumChain.tsx                                              1              0             46
apps/marketing/client/icons/chains/AvalancheChain.tsx                                             1              0             24
apps/marketing/client/icons/chains/BaseChain.tsx                                                  1              0             18
apps/marketing/client/icons/chains/BlastChain.tsx                                                 1              0             18
apps/marketing/client/icons/chains/DydxChain.tsx                                                  1              0             39
apps/marketing/client/icons/chains/EthereumChain.tsx                                              1              0             42
apps/marketing/client/icons/chains/HyperChain.tsx                                                 1              0             19
apps/marketing/client/icons/chains/MantleChain.tsx                                                1              0             78
apps/marketing/client/icons/chains/SeiChain.tsx                                                   1              0             28
apps/marketing/client/icons/chains/SonicChain.tsx                                                 2              0             31
apps/marketing/client/icons/collaterals/ARBLogo.tsx                                               1              0             55
apps/marketing/client/icons/collaterals/BTCLogo.tsx                                               1              0             46
apps/marketing/client/icons/collaterals/ETHLogo.tsx                                               1              0             48
apps/marketing/client/icons/collaterals/LINKLogo.tsx                                              1              0             19
apps/marketing/client/icons/collaterals/UNILogo.tsx                                               1              0             62
apps/marketing/client/icons/collaterals/USDCLogo.tsx                                              1              0             26
apps/marketing/client/icons/collaterals/USDTLogo.tsx                                              1              0             39
apps/marketing/client/icons/features/InterestsIcon.tsx                                            1              0             18
apps/marketing/client/icons/features/OneClickIcon.tsx                                             1              0             18
apps/marketing/client/icons/features/RewardsIcon.tsx                                              1              0             20
apps/marketing/client/icons/features/UnbeatableIcon.tsx                                           1              0             18
apps/marketing/client/icons/features/UnlikeIcon.tsx                                               1              0             18
apps/marketing/client/icons/logos/AxelarLogo.tsx                                                  2              0             62
apps/marketing/client/icons/logos/BinanceLogo.tsx                                                 2              0             62
apps/marketing/client/icons/logos/BybitLogo.tsx                                                   2              0             46
apps/marketing/client/icons/logos/CamelotLogo.tsx                                                 2              0             58
apps/marketing/client/icons/logos/ChainLinkLogo.tsx                                               2              0             62
apps/marketing/client/icons/logos/CollabLogo.tsx                                                  2              0             42
apps/marketing/client/icons/logos/DexterityLogo.tsx                                               2              0             40
apps/marketing/client/icons/logos/DydxLogo.tsx                                                    2              0             58
apps/marketing/client/icons/logos/ElixirLogo.tsx                                                  2              0             62
apps/marketing/client/icons/logos/FunLogo.tsx                                                     2              0             70
apps/marketing/client/icons/logos/GateLogo.tsx                                                    2              0             26
apps/marketing/client/icons/logos/GmxLogo.tsx                                                     2              0             34
apps/marketing/client/icons/logos/GsrLogo.tsx                                                     2              0             22
apps/marketing/client/icons/logos/HackVCLogo.tsx                                                  2              0             30
apps/marketing/client/icons/logos/HrtLogo.tsx                                                     2              0             32
apps/marketing/client/icons/logos/HtxLogo.tsx                                                     2              0             40
apps/marketing/client/icons/logos/HyperLogo.tsx                                                   2              0             74
apps/marketing/client/icons/logos/JaneStreetLogo.tsx                                              2              0             38
apps/marketing/client/icons/logos/JoeLogo.tsx                                                     2              0             37
apps/marketing/client/icons/logos/KucoinLogo.tsx                                                  2              0             54
apps/marketing/client/icons/logos/MexcLogo.tsx                                                    2              0             69
apps/marketing/client/icons/logos/NotifiLogo.tsx                                                  2              0             62
apps/marketing/client/icons/logos/PearLogo.tsx                                                    2              0             26
apps/marketing/client/icons/logos/SeliniLogo.tsx                                                  2              0             30
apps/marketing/client/icons/logos/SkateLogo.tsx                                                   2              0             74
apps/marketing/client/icons/logos/StorkLogo.tsx                                                   2              0             50
apps/marketing/client/icons/logos/TransakLogo.tsx                                                 2              0             58
apps/marketing/client/icons/logos/VertexLogo.tsx                                                  2              0             63
apps/marketing/client/icons/logos/WintermuteLogo.tsx                                              2              0             70
apps/marketing/client/icons/types.ts                                                              1              3              4
apps/marketing/client/sections/BelowFoldSections/BelowFoldSections.tsx                            1              0             21
apps/marketing/client/sections/ComparisonSection/ComparisonSection.tsx                            2              0             32
apps/marketing/client/sections/ComparisonSection/data.tsx                                         9              2            285
apps/marketing/client/sections/EcosystemSection/EcosystemSection.tsx                              2              0            129
apps/marketing/client/sections/EcosystemSection/data.tsx                                          4              2             87
apps/marketing/client/sections/ErrorSection/ErrorSection.tsx                                      2              0             22
apps/marketing/client/sections/FeaturesSection/FeaturesSection.tsx                                3              0            133
apps/marketing/client/sections/FeaturesSection/data.tsx                                           1              0             46
apps/marketing/client/sections/FeaturesSection/motionVariants.ts                                  1              2             23
apps/marketing/client/sections/Footer/Footer.tsx                                                  7              0             87
apps/marketing/client/sections/Footer/FooterColumn.tsx                                            4              0             61
apps/marketing/client/sections/Footer/data.ts                                                     2              4             40
apps/marketing/client/sections/Footer/motionVariants.ts                                           1              6             25
apps/marketing/client/sections/HeroSection/HeroSection.tsx                                        2              0             21
apps/marketing/client/sections/HeroSection/data.tsx                                               2              0             47
apps/marketing/client/sections/MultiChainSection/MultiChainSection.tsx                            3              0             65
apps/marketing/client/sections/PartnersSection/PartnersSection.tsx                                5              0             84
apps/marketing/client/sections/PartnersSection/data.tsx                                           1              0             31
apps/marketing/client/sections/PartnersSection/motionVariants.ts                                  2              0             37
apps/marketing/client/sections/ToolsTradeSection/ToolsTradeSection.tsx                            6              0             58
apps/marketing/client/sections/ToolsTradeSection/data.ts                                          1             11             39
apps/marketing/client/sections/ToolsTradeSection/motionVariants.ts                                1              2             23
apps/marketing/client/sections/ToolsTradeSection/types.ts                                         1              0              8
apps/marketing/client/sections/VrtxSection/VrtxSection.tsx                                        3              1             56
apps/marketing/client/sections/VrtxSection/data.tsx                                               1              0             19
apps/marketing/client/sections/VrtxSection/motionVariants.ts                                      1              2             22
apps/marketing/client/utils/fonts.ts                                                              2              1             15
apps/marketing/config/links.ts                                                                   11              6             79
apps/marketing/config/sensitiveData.ts                                                            0              0              4
apps/marketing/eslint.config.js                                                                   1              0             17
apps/marketing/package.json                                                                       0              0             47
apps/marketing/postcss.config.js                                                                  1              1              7
apps/marketing/public/lottie/hero.json                                                            0              0           1378
apps/marketing/public/lottie/staking.json                                                         0              0           3634
apps/marketing/styles/globals.css                                                                28              0            170
apps/marketing/tailwind.config.ts                                                                 2              0             99
apps/marketing/tsconfig.json                                                                      0              0             14
----------------------------------------------------------------------------------------------------------------------------------
SUM:                                                                                             497             89          12750
```

#### Summary by Language

```
-------------------------------------------------------------------------------
Language                     files          blank        comment           code
-------------------------------------------------------------------------------
TypeScript                     146            467             88           7480
JSON                             4              0              0           5073
CSS                              1             28              0            170
JavaScript                       2              2              1             24
SVG                              1              0              0              3
-------------------------------------------------------------------------------
SUM:                           154            497             89          12750
-------------------------------------------------------------------------------
```

### apps/station

#### Files

```
---------------------------------------------------------------------------------------------------------------
File                                                                        blank        comment           code
---------------------------------------------------------------------------------------------------------------
apps/station/app/ClientLayout.tsx                                              9              3             59
apps/station/app/cron/[taskId]/page.tsx                                        4              0             22
apps/station/app/cron/page.tsx                                                 2              0             10
apps/station/app/layout.tsx                                                    3              4             78
apps/station/app/page.tsx                                                      2              0             11
apps/station/app/task/[taskId]/page.tsx                                        4              0             19
apps/station/client/components/CardsContainer.tsx                              4              3             24
apps/station/client/components/DataFilterSwitch.tsx                            2              0             24
apps/station/client/components/DateTimeValue.tsx                               3              0             19
apps/station/client/components/JSONCodeEditor.tsx                              1              0             27
apps/station/client/components/NavBar/NavBar.tsx                               6              0             84
apps/station/client/components/NavBar/NavBarChainSelect.tsx                    3              0            114
apps/station/client/components/NavBar/useNavBarLinks.ts                        2              0             21
apps/station/client/components/NoDataStateContainer.tsx                        1              0              6
apps/station/client/components/PageSection.tsx                                 2              0             12
apps/station/client/components/PageTitle.tsx                                   1              0              4
apps/station/client/components/Pagination.tsx                                  2              0             36
apps/station/client/consts/routes.ts                                           0              0              4
apps/station/client/consts/seoInfo.ts                                          0              0             11
apps/station/client/consts/store.ts                                            4              0             11
apps/station/client/consts/taskTimeFormatSpecifier.ts                          0              0              1
apps/station/client/hooks/queries/useCronTasks.ts                              5              0             32
apps/station/client/hooks/queries/usePaginatedTasks.ts                         7              4             60
apps/station/client/hooks/queries/useTask.ts                                   5              0             29
apps/station/client/hooks/queries/useTaskSignatures.ts                         5              0             32
apps/station/client/hooks/useStationApiUrls.ts                                 3              0             10
apps/station/client/pages/CronTaskPage/CronTaskPage.tsx                        6              0             51
apps/station/client/pages/CronTaskPage/useCronTask.ts                          4              0             25
apps/station/client/pages/CronTasksPage/CronTaskCard.tsx                       5              0             79
apps/station/client/pages/CronTasksPage/CronTasksPage.tsx                      4              0             53
apps/station/client/pages/TaskPage/TaskPage.tsx                                6              0             60
apps/station/client/pages/TasksPage/TaskCard.tsx                               5              1             60
apps/station/client/pages/TasksPage/TasksPage.tsx                              8              2             93
apps/station/eslint.config.js                                                  1              0             17
apps/station/netlify.toml                                                      0              0              2
apps/station/package.json                                                      0              0             45
apps/station/postcss.config.js                                                 0              0              6
apps/station/public/browserconfig.xml                                          0              0              9
apps/station/public/safari-pinned-tab.svg                                      1              0             16
apps/station/public/site.webmanifest                                           0              0             19
apps/station/stationApi/baseTypes.ts                                           4              0             50
apps/station/stationApi/endpoints.ts                                           1              0             19
apps/station/stationApi/fetchStationApi.ts                                     4              0             18
apps/station/stationApi/queryTypes.ts                                          8              1             37
apps/station/styles/globals.css                                                9              5             40
apps/station/tailwind.config.ts                                                2              0             15
apps/station/tsconfig.json                                                     0              0             14
---------------------------------------------------------------------------------------------------------------
SUM:                                                                          148             23           1488
```

#### Summary by Language

```
-------------------------------------------------------------------------------
Language                     files          blank        comment           code
-------------------------------------------------------------------------------
TypeScript                      38            137             18           1320
JSON                             3              0              0             78
CSS                              1              9              5             40
JavaScript                       2              1              0             23
SVG                              1              1              0             16
XML                              1              0              0              9
TOML                             1              0              0              2
-------------------------------------------------------------------------------
SUM:                            47            148             23           1488
-------------------------------------------------------------------------------
```

### apps/trade

#### Files

```
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
File                                                                                                                                                                                                     blank        comment           code
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
apps/trade/app/ClientLayout.tsx                                                                                                                                                                             4              8             65
apps/trade/app/competitions/blitz/[tier]/page.tsx                                                                                                                                                           5              9             15
apps/trade/app/competitions/blitz/layout.tsx                                                                                                                                                                2              0             14
apps/trade/app/competitions/blitz/page.tsx                                                                                                                                                                  3              9              9
apps/trade/app/competitions/vertex-1/[tier]/page.tsx                                                                                                                                                        5              8             14
apps/trade/app/competitions/vertex-1/layout.tsx                                                                                                                                                             2              0             17
apps/trade/app/competitions/vertex-1/page.tsx                                                                                                                                                               2              5              9
apps/trade/app/error.tsx                                                                                                                                                                                    4              0             13
apps/trade/app/gems/page.tsx                                                                                                                                                                                3              0             22
apps/trade/app/global-error.tsx                                                                                                                                                                             4              2             19
apps/trade/app/layout.tsx                                                                                                                                                                                   3              7             88
apps/trade/app/markets/page.tsx                                                                                                                                                                             2              0              8
apps/trade/app/money-markets/page.tsx                                                                                                                                                                       2              0              7
apps/trade/app/not-found.tsx                                                                                                                                                                                2              0              9
apps/trade/app/perpetuals/page.tsx                                                                                                                                                                          2              0              8
apps/trade/app/pools/page.tsx                                                                                                                                                                               2              0              7
apps/trade/app/portfolio/balances/page.tsx                                                                                                                                                                  2              0              8
apps/trade/app/portfolio/faucet/page.tsx                                                                                                                                                                    3              0             15
apps/trade/app/portfolio/history/page.tsx                                                                                                                                                                   2              0              8
apps/trade/app/portfolio/layout.tsx                                                                                                                                                                         1              0             21
apps/trade/app/portfolio/margin-manager/page.tsx                                                                                                                                                            2              0              8
apps/trade/app/portfolio/orders/page.tsx                                                                                                                                                                    2              0              8
apps/trade/app/portfolio/overview/page.tsx                                                                                                                                                                  2              0              8
apps/trade/app/portfolio/pools/page.tsx                                                                                                                                                                     2              0              8
apps/trade/app/portfolio/positions/page.tsx                                                                                                                                                                 2              0              8
apps/trade/app/referrals/page.tsx                                                                                                                                                                           3              0             15
apps/trade/app/rewards/page.tsx                                                                                                                                                                             2              0             16
apps/trade/app/spot/page.tsx                                                                                                                                                                                2              0             17
apps/trade/app/staking/page.tsx                                                                                                                                                                             3              0             15
apps/trade/app/vaults/page.tsx                                                                                                                                                                              2              0             25
apps/trade/client/assets/brand/blast-gold-icon.svg                                                                                                                                                          0              0              7
apps/trade/client/assets/brand/blast-icon.svg                                                                                                                                                               0              0              4
apps/trade/client/assets/brand/blast-logo.svg                                                                                                                                                               1              0             14
apps/trade/client/assets/brand/blitz-brand-icon.svg                                                                                                                                                         0              0             20
apps/trade/client/assets/brand/blitz-logo.svg                                                                                                                                                               0              0            139
apps/trade/client/assets/brand/blitz-monochrome-icon.svg                                                                                                                                                    1              0             14
apps/trade/client/assets/brand/vertex-brand-icon.svg                                                                                                                                                        0              0             16
apps/trade/client/assets/brand/vertex-logo.svg                                                                                                                                                              0              0             22
apps/trade/client/assets/brand/vertex-monochrome-icon.svg                                                                                                                                                   0              0              9
apps/trade/client/assets/leaderboard/fifth-place-pentagon.svg                                                                                                                                               0              0              1
apps/trade/client/assets/leaderboard/first-place-pentagon.svg                                                                                                                                               0              0              1
apps/trade/client/assets/leaderboard/fourth-place-pentagon.svg                                                                                                                                              0              0              1
apps/trade/client/assets/leaderboard/second-place-pentagon.svg                                                                                                                                              0              0              1
apps/trade/client/assets/leaderboard/third-place-pentagon.svg                                                                                                                                               0              0              1
apps/trade/client/assets/partners/aerodome-logo.svg                                                                                                                                                         0              0             20
apps/trade/client/assets/partners/axelar-logo.svg                                                                                                                                                           0              0              3
apps/trade/client/assets/partners/elixir-logo.svg                                                                                                                                                           0              0             11
apps/trade/client/assets/partners/skatefi-logo.svg                                                                                                                                                          0              0              5
apps/trade/client/assets/partners/squid-logo.svg                                                                                                                                                            0              0              4
apps/trade/client/components/ActionButtons/CancelAllOrdersButton.tsx                                                                                                                                        4              0             35
apps/trade/client/components/ActionButtons/CancelOrderButton.tsx                                                                                                                                            5              1             44
apps/trade/client/components/ActionButtons/CloseAllPositionsButton.tsx                                                                                                                                      4              0             28
apps/trade/client/components/ActionButtons/FavoriteButton.tsx                                                                                                                                               4              0             32
apps/trade/client/components/ActionSummary.tsx                                                                                                                                                              4              1             79
apps/trade/client/components/AmountWithSymbol.tsx                                                                                                                                                           1              0             21
apps/trade/client/components/BrandIconLoadingWrapper/BrandIconLoadingIndicator.tsx                                                                                                                          2              2             26
apps/trade/client/components/BrandIconLoadingWrapper/BrandLoadingWrapper.tsx                                                                                                                                4              5             38
apps/trade/client/components/ButtonStateContent.tsx                                                                                                                                                         4              0             30
apps/trade/client/components/ChartTooltip.tsx                                                                                                                                                               8              2             80
apps/trade/client/components/CheckboxLabelWithTooltip.tsx                                                                                                                                                   2              0             20
apps/trade/client/components/CheckmarkIcon.tsx                                                                                                                                                              2              0             18
apps/trade/client/components/CollapsibleInfoCard.tsx                                                                                                                                                        3              0             36
apps/trade/client/components/ComboBox/ComboBox.tsx                                                                                                                                                          9              3            178
apps/trade/client/components/ComboBox/hooks/types.ts                                                                                                                                                        4              0             26
apps/trade/client/components/ComboBox/hooks/useComboBox.ts                                                                                                                                                  4              4             31
apps/trade/client/components/Countdown.tsx                                                                                                                                                                  5              0             89
apps/trade/client/components/DataCard.tsx                                                                                                                                                                   4              0             22
apps/trade/client/components/DataTable/DataTable.tsx                                                                                                                                                       13             10            194
apps/trade/client/components/DataTable/Pagination.tsx                                                                                                                                                       4              0             39
apps/trade/client/components/DataTable/SeparatedRowDataTable.tsx                                                                                                                                            1              2             28
apps/trade/client/components/DataTable/TablePlaceholder.tsx                                                                                                                                                 1              1             21
apps/trade/client/components/DataTable/cells/HeaderCell.tsx                                                                                                                                                 3              1             57
apps/trade/client/components/DataTable/cells/MarketProductInfoCell.tsx                                                                                                                                      2              6             34
apps/trade/client/components/DataTable/cells/StackedHeaderCell.tsx                                                                                                                                          1              0             33
apps/trade/client/components/DataTable/cells/StackedTableCell.tsx                                                                                                                                           1              0             25
apps/trade/client/components/DataTable/cells/TableCell.tsx                                                                                                                                                  2              0             23
apps/trade/client/components/DataTable/components/DataTableHeaderGroup.tsx                                                                                                                                  1              0             38
apps/trade/client/components/DataTable/components/DataTableRowGroup.tsx                                                                                                                                     2              2             47
apps/trade/client/components/DataTable/hooks/useDataTablePagination.ts                                                                                                                                     11             11             85
apps/trade/client/components/DataTable/react-table.d.ts                                                                                                                                                     1              0             10
apps/trade/client/components/DataTable/utils/sortingFns.ts                                                                                                                                                  7             12             49
apps/trade/client/components/DateInput/DateInput.css                                                                                                                                                        6              7             36
apps/trade/client/components/DateInput/DateInput.tsx                                                                                                                                                        5              9            121
apps/trade/client/components/Disclosure/UserDisclosureDismissibleCard.tsx                                                                                                                                   4              0             26
apps/trade/client/components/ErrorPanel.tsx                                                                                                                                                                 1              0             23
apps/trade/client/components/FavoriteButton.tsx                                                                                                                                                             4              0             32
apps/trade/client/components/FixedHeaderDataTable.tsx                                                                                                                                                      20             43            130
apps/trade/client/components/Form.tsx                                                                                                                                                                       1              1             11
apps/trade/client/components/FractionAmountButtons.tsx                                                                                                                                                      6              0             78
apps/trade/client/components/Icons/IdentityIcon.tsx                                                                                                                                                         2              6             18
apps/trade/client/components/Icons/UserRiskWarningIcon.tsx                                                                                                                                                  6              0             52
apps/trade/client/components/InputProductSymbolWithIcon.tsx                                                                                                                                                 3              0             29
apps/trade/client/components/InputSummaryItem.tsx                                                                                                                                                           3              1             51
apps/trade/client/components/KeyFeatures.tsx                                                                                                                                                                5              0             69
apps/trade/client/components/LiquidationRiskBar.tsx                                                                                                                                                         4              0             53
apps/trade/client/components/MarginInfoPill.tsx                                                                                                                                                             3              1             33
apps/trade/client/components/MarketCategoryFilter/MarketCategoryFilter.tsx                                                                                                                                  3              0             44
apps/trade/client/components/MarketCategoryFilter/useMarketCategoryFilter.ts                                                                                                                                8              2             60
apps/trade/client/components/MarketInfoCard.tsx                                                                                                                                                             5              5             75
apps/trade/client/components/MarketInfoWithSide.tsx                                                                                                                                                         2              0             57
apps/trade/client/components/NewPill.tsx                                                                                                                                                                    1              0              4
apps/trade/client/components/PnlValueWithPercentage.tsx                                                                                                                                                     2              0             39
apps/trade/client/components/PrivacyToggleIcon.tsx                                                                                                                                                          3              0             17
apps/trade/client/components/SpinnerContainer.tsx                                                                                                                                                           1              0             14
apps/trade/client/components/SpotMoreActionsDropdownMenu.tsx                                                                                                                                                6              2            102
apps/trade/client/components/StatusIndicator.tsx                                                                                                                                                            4              1             54
apps/trade/client/components/Summary.tsx                                                                                                                                                                    4              0             48
apps/trade/client/components/SwitchLabelWithTooltip.tsx                                                                                                                                                     2              0             25
apps/trade/client/components/SwitcherDropdownItemButton.tsx                                                                                                                                                 2              0             32
apps/trade/client/components/Toast/ActionToast/ActionToast.tsx                                                                                                                                              9              0            129
apps/trade/client/components/Toast/ActionToast/consts.ts                                                                                                                                                    3              0             13
apps/trade/client/components/Toast/ActionToast/types.ts                                                                                                                                                     7              0             31
apps/trade/client/components/Toast/Toast.tsx                                                                                                                                                                7              9            105
apps/trade/client/components/Toast/consts.ts                                                                                                                                                                1              0              2
apps/trade/client/components/Toast/types.ts                                                                                                                                                                 7              0             19
apps/trade/client/components/TokenPairIcons.tsx                                                                                                                                                             5              2             52
apps/trade/client/components/ValidUserStatePrimaryButton/ValidUserStatePrimaryButton.tsx                                                                                                                    4              1             26
apps/trade/client/components/ValidUserStatePrimaryButton/useButtonUserStateErrorProps.ts                                                                                                                    9              7             87
apps/trade/client/components/ValueWithLabel/ValueWithLabel.tsx                                                                                                                                             13             13            154
apps/trade/client/components/ValueWithLabel/types.ts                                                                                                                                                        8              5             48
apps/trade/client/components/WarningPanel.tsx                                                                                                                                                               3              1             31
apps/trade/client/context/ExodusWalletProvider.tsx                                                                                                                                                          3              2             25
apps/trade/client/context/appData/AppDataProviders.tsx                                                                                                                                                     13             14            107
apps/trade/client/context/appData/getEVMContextParams.ts                                                                                                                                                    5              2             68
apps/trade/client/context/appData/hooks/useChainEnvQueryParam.ts                                                                                                                                            4              3             22
apps/trade/client/context/appData/hooks/useSavedPrimaryChainEnv.ts                                                                                                                                          3              0             24
apps/trade/client/context/gatedAppAccess/GatedAppAccessContext.tsx                                                                                                                                          6              0             25
apps/trade/client/context/gatedAppAccess/hooks/useCloudflareRedirect.ts                                                                                                                                     6              8             42
apps/trade/client/context/gatedAppAccess/hooks/useGeolocationBlock.ts                                                                                                                                       4              1             31
apps/trade/client/context/subaccount/SubaccountContext.tsx                                                                                                                                                  5             22             25
apps/trade/client/context/subaccount/SubaccountContextProvider.tsx                                                                                                                                         17             13            141
apps/trade/client/context/subaccount/consts.ts                                                                                                                                                              0              3              1
apps/trade/client/context/subaccount/hooks/useSubaccountNames.ts                                                                                                                                            7             12             42
apps/trade/client/context/subaccount/types.ts                                                                                                                                                               2              1             17
apps/trade/client/hooks/execute/cancelOrder/types.ts                                                                                                                                                        6              1             27
apps/trade/client/hooks/execute/cancelOrder/useExecuteCancelAllOrders.ts                                                                                                                                   14              2             91
apps/trade/client/hooks/execute/cancelOrder/useExecuteCancelInvalidTpSlOrders.ts                                                                                                                           23             16            164
apps/trade/client/hooks/execute/cancelOrder/useExecuteCancelOrders.ts                                                                                                                                      13              5            108
apps/trade/client/hooks/execute/cancelOrder/useExecuteCancelOrdersWithNotification.ts                                                                                                                       7              0             48
apps/trade/client/hooks/execute/foundationToken/useExecuteClaimFoundationRewards.ts                                                                                                                         5              3             32
apps/trade/client/hooks/execute/modifyOrder/types.ts                                                                                                                                                        2              0             12
apps/trade/client/hooks/execute/modifyOrder/useExecuteModifyOrder.ts                                                                                                                                        3              0             35
apps/trade/client/hooks/execute/modifyOrder/useModifyOrderMutationFn.ts                                                                                                                                    20             10            232
apps/trade/client/hooks/execute/modifyOrder/validateModifiedOrderPrice.ts                                                                                                                                  11              2             63
apps/trade/client/hooks/execute/placeOrder/types.ts                                                                                                                                                         5              8             35
apps/trade/client/hooks/execute/placeOrder/useExecuteCloseAllPositions.ts                                                                                                                                  17              3            120
apps/trade/client/hooks/execute/placeOrder/useExecuteClosePosition.ts                                                                                                                                      10              4            101
apps/trade/client/hooks/execute/placeOrder/useExecutePlaceOrder.ts                                                                                                                                          3              1             37
apps/trade/client/hooks/execute/placeOrder/usePlaceOrderMutationFn.ts                                                                                                                                      19             13            160
apps/trade/client/hooks/execute/tradingCompetition/useExecuteRegisterForTier.ts                                                                                                                             6              0             44
apps/trade/client/hooks/execute/useExecuteApproveAllowance.ts                                                                                                                                               8             13             50
apps/trade/client/hooks/execute/useExecuteApproveAllowanceForProduct.ts                                                                                                                                     7              6             43
apps/trade/client/hooks/execute/useExecuteBurnLp.ts                                                                                                                                                         4              0             47
apps/trade/client/hooks/execute/useExecuteDepositCollateral.ts                                                                                                                                              6              0             61
apps/trade/client/hooks/execute/useExecuteFastWithdrawal.ts                                                                                                                                                 7              1             48
apps/trade/client/hooks/execute/useExecuteMintLp.ts                                                                                                                                                         4              0             57
apps/trade/client/hooks/execute/useExecuteMintTokens.ts                                                                                                                                                     6              0             36
apps/trade/client/hooks/execute/useExecuteSlowModeUpdateLinkedSigner.ts                                                                                                                                    12              7             90
apps/trade/client/hooks/execute/useExecuteSubaccountQuoteTransfer.ts                                                                                                                                       10              9             75
apps/trade/client/hooks/execute/useExecuteUpdateLinkedSigner.ts                                                                                                                                            15             11             85
apps/trade/client/hooks/execute/useExecuteWithdrawCollateral.ts                                                                                                                                             6              1             57
apps/trade/client/hooks/execute/util/getMarketOrderExecutionPrice.ts                                                                                                                                        2              4             15
apps/trade/client/hooks/execute/util/logExecuteError.ts                                                                                                                                                     2              0             16
apps/trade/client/hooks/execute/util/refetchQueryKeys.ts                                                                                                                                                    6              8             39
apps/trade/client/hooks/execute/util/useExecuteInValidContext.ts                                                                                                                                            7              5             60
apps/trade/client/hooks/execute/util/useRefetchOpenEngineOrders.ts                                                                                                                                          9              2             63
apps/trade/client/hooks/execute/util/useRefetchQueries.ts                                                                                                                                                   7             13             46
apps/trade/client/hooks/execute/vrtxToken/useExecuteClaimAndStakeLiquidTokens.ts                                                                                                                            5              0             36
apps/trade/client/hooks/execute/vrtxToken/useExecuteClaimLbaRewards.ts                                                                                                                                      5              3             31
apps/trade/client/hooks/execute/vrtxToken/useExecuteClaimLiquidTokens.ts                                                                                                                                    5              4             36
apps/trade/client/hooks/execute/vrtxToken/useExecuteClaimStakingRewards.ts                                                                                                                                  5              3             32
apps/trade/client/hooks/execute/vrtxToken/useExecuteMigrateStakingV1ToV2.ts                                                                                                                                 5              3             32
apps/trade/client/hooks/execute/vrtxToken/useExecuteStakeV2Vrtx.ts                                                                                                                                          6              4             53
apps/trade/client/hooks/execute/vrtxToken/useExecuteStakingSetTradingWallet.ts                                                                                                                              6              3             30
apps/trade/client/hooks/execute/vrtxToken/useExecuteUnstakeV2Vrtx.ts                                                                                                                                        7              6             39
apps/trade/client/hooks/execute/vrtxToken/useExecuteUnstakeVrtx.ts                                                                                                                                          5              3             35
apps/trade/client/hooks/execute/vrtxToken/useExecuteWithdrawLbaLiquidity.ts                                                                                                                                 5              3             36
apps/trade/client/hooks/execute/vrtxToken/useExecuteWithdrawUnstakedV2Vrtx.ts                                                                                                                               5              3             34
apps/trade/client/hooks/execute/vrtxToken/useExecuteWithdrawUnstakedVrtx.ts                                                                                                                                 5              3             32
apps/trade/client/hooks/markets/marketsStaticData/types.ts                                                                                                                                                  6             13             41
apps/trade/client/hooks/markets/marketsStaticData/useAllMarketsStaticData.ts                                                                                                                                2              3             10
apps/trade/client/hooks/markets/marketsStaticData/useAllMarketsStaticDataByChainEnv.ts                                                                                                                     19              4            136
apps/trade/client/hooks/markets/useAllMarkets24hrSnapshots.ts                                                                                                                                               7              9             38
apps/trade/client/hooks/markets/useAllMarketsStats.ts                                                                                                                                                      19             19            138
apps/trade/client/hooks/markets/useAllProducts24hrHistoricalSnapshot.ts                                                                                                                                     2              4              6
apps/trade/client/hooks/markets/useEdgeAggregatedMarketSnapshots.ts                                                                                                                                        14             13            125
apps/trade/client/hooks/markets/useFavoritedMarkets.ts                                                                                                                                                      6              1             29
apps/trade/client/hooks/markets/useFilteredMarkets.ts                                                                                                                                                       8              6             80
apps/trade/client/hooks/markets/useLatestMarketPrice.ts                                                                                                                                                     3              0             17
apps/trade/client/hooks/markets/useLatestOrderFill.ts                                                                                                                                                       3              0             18
apps/trade/client/hooks/markets/useLatestPriceChange.ts                                                                                                                                                     4              2             18
apps/trade/client/hooks/markets/useLpYields.ts                                                                                                                                                             10              8             59
apps/trade/client/hooks/markets/useMarket.ts                                                                                                                                                                5              0             32
apps/trade/client/hooks/markets/useMarketsOverview.ts                                                                                                                                                      14              5             96
apps/trade/client/hooks/markets/useNewMarkets.ts                                                                                                                                                            2              0              9
apps/trade/client/hooks/markets/usePrimaryQuotePriceUsd.ts                                                                                                                                                  1              5             12
apps/trade/client/hooks/markets/useSpotInterestRates.ts                                                                                                                                                     7              6             46
apps/trade/client/hooks/query/consts/notConnectedAltQueryAddress.ts                                                                                                                                         0              2              2
apps/trade/client/hooks/query/foundationRewards/useAccountFoundationRewardsClaimState.ts                                                                                                                    9              4             62
apps/trade/client/hooks/query/foundationRewards/useSubaccountFoundationRewards.ts                                                                                                                           4              0             35
apps/trade/client/hooks/query/markets/allMarkets/types.ts                                                                                                                                                   1              6             14
apps/trade/client/hooks/query/markets/allMarkets/useAllMarkets.ts                                                                                                                                           2              3             10
apps/trade/client/hooks/query/markets/allMarkets/useAllMarketsByChainEnv.ts                                                                                                                                17              4            121
apps/trade/client/hooks/query/markets/useAllMarkets24hrFundingRates.ts                                                                                                                                      6              0             41
apps/trade/client/hooks/query/markets/useAllMarketsLatestPrices.ts                                                                                                                                         12              2             68
apps/trade/client/hooks/query/markets/useAllProductsHistoricalSnapshots.ts                                                                                                                                  7              9             49
apps/trade/client/hooks/query/markets/useEdgeMarketSnapshots.ts                                                                                                                                             6              1             61
apps/trade/client/hooks/query/markets/useHealthGroups.ts                                                                                                                                                    8              4             48
apps/trade/client/hooks/query/markets/useIndexerPrimaryQuotePrice.ts                                                                                                                                        3              0             22
apps/trade/client/hooks/query/markets/useLatestOraclePrices.ts                                                                                                                                              6              4             41
apps/trade/client/hooks/query/markets/useLatestOrderFillsForProduct.ts                                                                                                                                     10             15             79
apps/trade/client/hooks/query/markets/useLatestPerpPrices.ts                                                                                                                                                4              0             36
apps/trade/client/hooks/query/markets/useMarketLiquidity.ts                                                                                                                                                 4             11             52
apps/trade/client/hooks/query/markets/useMarketSnapshots.ts                                                                                                                                                 6              1             72
apps/trade/client/hooks/query/markets/useMinDepositRates.ts                                                                                                                                                 3              0             27
apps/trade/client/hooks/query/markets/useOrderbookAddresses.ts                                                                                                                                              6              5             34
apps/trade/client/hooks/query/points/useAddressBlitzInitialPointsDropStatus.ts                                                                                                                              5              0             33
apps/trade/client/hooks/query/points/useAddressBlitzPoints.ts                                                                                                                                               7              3             49
apps/trade/client/hooks/query/points/useBlitzPointsLeaderboard.ts                                                                                                                                           6              1             47
apps/trade/client/hooks/query/points/useSonicPoints.ts                                                                                                                                                      6              0             33
apps/trade/client/hooks/query/points/useSonicPointsLeaderboard.ts                                                                                                                                           6              1             41
apps/trade/client/hooks/query/rewards/useAddressPaginatedRewards.ts                                                                                                                                         6              1             49
apps/trade/client/hooks/query/rewards/useAddressTakerRewards.ts                                                                                                                                             4              0             30
apps/trade/client/hooks/query/subaccount/isolatedPositions/annotateIsolatedPositions.ts                                                                                                                     7              1             45
apps/trade/client/hooks/query/subaccount/isolatedPositions/useIsolatedPositionsForAppSubaccounts.ts                                                                                                        11              5             77
apps/trade/client/hooks/query/subaccount/isolatedPositions/useSubaccountIsolatedPositions.ts                                                                                                                9              1             61
apps/trade/client/hooks/query/subaccount/subaccountSummary/annotateSubaccountSummary.ts                                                                                                                     6              3             54
apps/trade/client/hooks/query/subaccount/subaccountSummary/useSubaccountEstimatedSummary.ts                                                                                                                 6              4             76
apps/trade/client/hooks/query/subaccount/subaccountSummary/useSubaccountSummary.ts                                                                                                                         10              1             75
apps/trade/client/hooks/query/subaccount/subaccountSummary/useSummariesForAppSubaccounts.ts                                                                                                                11              5             73
apps/trade/client/hooks/query/subaccount/useAllDepositableTokenBalances.ts                                                                                                                                 12             11             78
apps/trade/client/hooks/query/subaccount/useListSubaccounts.ts                                                                                                                                              6              1             43
apps/trade/client/hooks/query/subaccount/useMaxMintLpAmount.ts                                                                                                                                              7              0             64
apps/trade/client/hooks/query/subaccount/useMaxOrderSize.ts                                                                                                                                                 7              0             72
apps/trade/client/hooks/query/subaccount/useMaxWithdrawableAmount.ts                                                                                                                                        7              1             67
apps/trade/client/hooks/query/subaccount/useSubaccountCreationTime.ts                                                                                                                                       6              6             61
apps/trade/client/hooks/query/subaccount/useSubaccountFeeRates.ts                                                                                                                                           4              2             41
apps/trade/client/hooks/query/subaccount/useSubaccountIndexerSnapshots.ts                                                                                                                                  11              7            101
apps/trade/client/hooks/query/subaccount/useSubaccountIndexerSnapshotsAtTimes.ts                                                                                                                           10              9             83
apps/trade/client/hooks/query/subaccount/useSubaccountLatestFillOrderEvents.ts                                                                                                                              3              3             54
apps/trade/client/hooks/query/subaccount/useSubaccountLinkedSigner.ts                                                                                                                                       4              4             51
apps/trade/client/hooks/query/subaccount/useSubaccountOpenEngineOrders.ts                                                                                                                                   7              6             54
apps/trade/client/hooks/query/subaccount/useSubaccountOpenTriggerOrders.ts                                                                                                                                 10              7             73
apps/trade/client/hooks/query/subaccount/useSubaccountPaginatedCollateralEvents.ts                                                                                                                          4              4             78
apps/trade/client/hooks/query/subaccount/useSubaccountPaginatedHistoricalTrades.ts                                                                                                                          5              3             75
apps/trade/client/hooks/query/subaccount/useSubaccountPaginatedHistoricalTriggerOrders.ts                                                                                                                   9              9             88
apps/trade/client/hooks/query/subaccount/useSubaccountPaginatedLiquidationEvents.ts                                                                                                                        14             11             98
apps/trade/client/hooks/query/subaccount/useSubaccountPaginatedLpEvents.ts                                                                                                                                  3              1             67
apps/trade/client/hooks/query/subaccount/useSubaccountPaginatedPaymentEvents.ts                                                                                                                             6             17             75
apps/trade/client/hooks/query/subaccount/useSubaccountPaginatedRealizedPnlEvents.ts                                                                                                                        20             20            155
apps/trade/client/hooks/query/subaccount/useSubaccountPaginatedSettlementEvents.ts                                                                                                                          3              5             69
apps/trade/client/hooks/query/subaccount/useSubaccountReferralCode.ts                                                                                                                                       4              2             45
apps/trade/client/hooks/query/subaccount/useSubaccountTokenRewards.ts                                                                                                                                       5              2             33
apps/trade/client/hooks/query/tradingCompetition/useLeaderboardContests.ts                                                                                                                                 10              7             63
apps/trade/client/hooks/query/tradingCompetition/usePaginatedLeaderboard.ts                                                                                                                                 6              1             50
apps/trade/client/hooks/query/tradingCompetition/useSubaccountLeaderboardRegistrationState.ts                                                                                                               7              1             55
apps/trade/client/hooks/query/tradingCompetition/useSubaccountLeaderboardState.ts                                                                                                                           8              0             59
apps/trade/client/hooks/query/useClustersName.ts                                                                                                                                                            1             13             11
apps/trade/client/hooks/query/useEngineStatus.ts                                                                                                                                                            3              1             26
apps/trade/client/hooks/query/useLatestEventSubmissionIndex.ts                                                                                                                                              6              0             39
apps/trade/client/hooks/query/useNSubmissions.ts                                                                                                                                                            2              1             25
apps/trade/client/hooks/query/useOnChainMutationStatus.ts                                                                                                                                                   3              4             15
apps/trade/client/hooks/query/useOnChainTransactionState.ts                                                                                                                                                 5              1             78
apps/trade/client/hooks/query/useProtocolTokenQueryClients.ts                                                                                                                                               2              3             16
apps/trade/client/hooks/query/useServerTime.ts                                                                                                                                                              4              3             29
apps/trade/client/hooks/query/useTokenAllowance.ts                                                                                                                                                          8              1             62
apps/trade/client/hooks/query/useTokenAllowanceForProduct.ts                                                                                                                                                4              5             16
apps/trade/client/hooks/query/vrtxToken/useAccountLbaState.ts                                                                                                                                               9              3             81
apps/trade/client/hooks/query/vrtxToken/useAccountStakingState.ts                                                                                                                                          14              9            101
apps/trade/client/hooks/query/vrtxToken/useAccountStakingV2State.ts                                                                                                                                        11             12            115
apps/trade/client/hooks/query/vrtxToken/useAccountTokenClaimState.ts                                                                                                                                       10              9             88
apps/trade/client/hooks/query/vrtxToken/useLbaConfig.ts                                                                                                                                                     5              1             30
apps/trade/client/hooks/query/vrtxToken/useLbaUsdcAllowance.ts                                                                                                                                              2              3             11
apps/trade/client/hooks/query/vrtxToken/useStakingState.ts                                                                                                                                                 10              6             76
apps/trade/client/hooks/query/vrtxToken/useStakingV2State.ts                                                                                                                                               11              9             71
apps/trade/client/hooks/query/vrtxToken/useTokenClaimDeadlines.ts                                                                                                                                           6              6             36
apps/trade/client/hooks/query/vrtxToken/useVrtxTokenSupply.ts                                                                                                                                               7              7             44
apps/trade/client/hooks/query/withdrawPool/useAllProductsWithdrawPoolLiquidity.ts                                                                                                                           8              4             57
apps/trade/client/hooks/query/withdrawPool/useMarkedWithdrawPoolIdxs.ts                                                                                                                                     8              5             45
apps/trade/client/hooks/query/withdrawPool/useWithdrawPoolFeeAmount.ts                                                                                                                                      9              4             57
apps/trade/client/hooks/subaccount/useCanUserExecute.ts                                                                                                                                                     2              3              5
apps/trade/client/hooks/subaccount/useEstimateSubaccountInfoChange.ts                                                                                                                                      13             14            110
apps/trade/client/hooks/subaccount/useLpBalances.ts                                                                                                                                                        15              9            129
apps/trade/client/hooks/subaccount/useMaxOrderSizeEstimation.ts                                                                                                                                            11              8             64
apps/trade/client/hooks/subaccount/useMinimumDepositAmounts.ts                                                                                                                                              3              1             20
apps/trade/client/hooks/subaccount/usePerpPositions.ts                                                                                                                                                     33             13            280
apps/trade/client/hooks/subaccount/usePrimaryQuoteBalance.ts                                                                                                                                                3              0             15
apps/trade/client/hooks/subaccount/useReduceOnlyTriggerOrders.ts                                                                                                                                           11              0             67
apps/trade/client/hooks/subaccount/useRequiresInitialDeposit.ts                                                                                                                                             2              4              5
apps/trade/client/hooks/subaccount/useSlowModeFeeAllowance.ts                                                                                                                                               8              4             46
apps/trade/client/hooks/subaccount/useSpotBalances.ts                                                                                                                                                      14              2            123
apps/trade/client/hooks/subaccount/useSubaccountCountIndicators.ts                                                                                                                                         13              0             69
apps/trade/client/hooks/subaccount/useSubaccountHealthCheckSequencerFee.ts                                                                                                                                  2              3              9
apps/trade/client/hooks/subaccount/useSubaccountIndexerSnapshot.ts                                                                                                                                          3              1             19
apps/trade/client/hooks/subaccount/useSubaccountOverview/getSubaccountOverview.ts                                                                                                                          30             25            312
apps/trade/client/hooks/subaccount/useSubaccountOverview/types.ts                                                                                                                                           1              8             44
apps/trade/client/hooks/subaccount/useSubaccountOverview/useSubaccountOverview.ts                                                                                                                           9             10            105
apps/trade/client/hooks/subaccount/useSubaccountTimespanMetrics.ts                                                                                                                                         18              8            123
apps/trade/client/hooks/subaccount/useUserRiskWarningState.ts                                                                                                                                               7              1             26
apps/trade/client/hooks/subaccount/useUserStateError.ts                                                                                                                                                     6              1             66
apps/trade/client/hooks/ui/breakpoints/breakpoints.ts                                                                                                                                                       1              0              5
apps/trade/client/hooks/ui/breakpoints/index.ts                                                                                                                                                             0              0              4
apps/trade/client/hooks/ui/breakpoints/useIsDesktop.ts                                                                                                                                                      2              0              5
apps/trade/client/hooks/ui/breakpoints/useIsMobile.ts                                                                                                                                                       1              0              4
apps/trade/client/hooks/ui/breakpoints/useSizeClass.ts                                                                                                                                                      5              1             33
apps/trade/client/hooks/ui/form/useFormTokenAllowance.ts                                                                                                                                                   10             27             90
apps/trade/client/hooks/ui/form/useLinkedPercentageAmountInputEffects.ts                                                                                                                                    5             12             41
apps/trade/client/hooks/ui/form/useOnFractionSelectedHandler.ts                                                                                                                                             4              4             22
apps/trade/client/hooks/ui/navigation/useProductTradingLinks.ts                                                                                                                                             6              1             28
apps/trade/client/hooks/ui/navigation/usePushHistoryPage.ts                                                                                                                                                 2              0             17
apps/trade/client/hooks/ui/navigation/usePushTradePage.ts                                                                                                                                                   8              1             35
apps/trade/client/hooks/ui/navigation/useShowDialogForProduct.ts                                                                                                                                            4              0             46
apps/trade/client/hooks/ui/select/useAtomControlledSelect.ts                                                                                                                                                3              0             22
apps/trade/client/hooks/ui/tabs/types.ts                                                                                                                                                                    2              0              8
apps/trade/client/hooks/ui/tabs/useAtomControlledTabs.ts                                                                                                                                                    4              2             38
apps/trade/client/hooks/ui/tabs/useTabs.ts                                                                                                                                                                  4              1             28
apps/trade/client/hooks/ui/useCountdownDuration.ts                                                                                                                                                          9              8             43
apps/trade/client/hooks/ui/useRepeatedClickCountHandler.ts                                                                                                                                                  5              1             24
apps/trade/client/hooks/ui/useShouldFlash.ts                                                                                                                                                               11              6             36
apps/trade/client/hooks/ui/useTextSearch.ts                                                                                                                                                                11             15             44
apps/trade/client/hooks/util/useAddressDisplayName.ts                                                                                                                                                       4             11             27
apps/trade/client/hooks/util/useBaseUrl.ts                                                                                                                                                                  0              0              4
apps/trade/client/hooks/util/useDebounceFalsy.ts                                                                                                                                                            5              6             15
apps/trade/client/hooks/util/useGetConfirmedTx.ts                                                                                                                                                           5              7             29
apps/trade/client/hooks/util/useGetRecvTime.ts                                                                                                                                                              2              5             11
apps/trade/client/hooks/util/useIsConnected.ts                                                                                                                                                              2              0              5
apps/trade/client/hooks/util/useIsSmartContractWalletConnected.ts                                                                                                                                           6              4             37
apps/trade/client/hooks/util/useOperationTimeLogger.ts                                                                                                                                                      5              5             22
apps/trade/client/hooks/util/usePageVisibility.ts                                                                                                                                                           6              0             20
apps/trade/client/hooks/util/useRunOnceOnCondition.ts                                                                                                                                                       2              5             13
apps/trade/client/hooks/util/useRunWithDelayOnCondition.ts                                                                                                                                                  4              6             26
apps/trade/client/hooks/util/useSocialShareLinks.ts                                                                                                                                                         1              7              7
apps/trade/client/hooks/util/useSwitchToProtocolTokenChainEnv.ts                                                                                                                                            4              4             20
apps/trade/client/hooks/util/useSyncedRef.ts                                                                                                                                                                1              2              8
apps/trade/client/hooks/util/useVertexClientHasLinkedSigner.ts                                                                                                                                              3              8             11
apps/trade/client/modules/accountCenter/AccountCenterDialog.tsx                                                                                                                                             2              0             29
apps/trade/client/modules/accountCenter/components/AccountCenterCollateralHistory.tsx                                                                                                                       5              1            111
apps/trade/client/modules/accountCenter/components/AccountCenterHeader/AccountCenterHeader.tsx                                                                                                              3              0             51
apps/trade/client/modules/accountCenter/components/AccountCenterHeader/AccountCenterSubaccountSwitcher.tsx                                                                                                  3              0             30
apps/trade/client/modules/accountCenter/components/AccountCenterHeader/ActionButtons.tsx                                                                                                                    5              0             44
apps/trade/client/modules/accountCenter/components/AccountCenterHeader/WalletAddressWithActions.tsx                                                                                                         3              0             32
apps/trade/client/modules/accountCenter/components/AccountCenterPortfolioCard.tsx                                                                                                                           4              3             88
apps/trade/client/modules/accountCenter/components/AccountCenterUserCTA.tsx                                                                                                                                 5              6             38
apps/trade/client/modules/accountCenter/components/AccountCenterWalletDisplayName.tsx                                                                                                                       5              0             37
apps/trade/client/modules/accountCenter/components/AccountCenterWalletIcon.tsx                                                                                                                              5              0             23
apps/trade/client/modules/accountCenter/components/AccountCenterWithdrawalStatus.tsx                                                                                                                        3              0             37
apps/trade/client/modules/accountCenter/hooks/useAccountCenterCollateralHistory.ts                                                                                                                         14             10            102
apps/trade/client/modules/analytics/AnalyticsContext.tsx                                                                                                                                                    5              1             11
apps/trade/client/modules/analytics/AnalyticsContextProvider.tsx                                                                                                                                           10              1             75
apps/trade/client/modules/analytics/AnalyticsGlobalEventsReporter.tsx                                                                                                                                       5              6             41
apps/trade/client/modules/analytics/CookieNoticeBanner.tsx                                                                                                                                                  6              0             72
apps/trade/client/modules/analytics/GoogleAnalytics.tsx                                                                                                                                                     2              0             12
apps/trade/client/modules/analytics/MicrosoftClarityAnalytics.tsx                                                                                                                                           8              2             26
apps/trade/client/modules/analytics/types.ts                                                                                                                                                                6              0             36
apps/trade/client/modules/analytics/useCookiePreference.ts                                                                                                                                                  4              0             24
apps/trade/client/modules/app/AppBottomSheet.tsx                                                                                                                                                            4              0             23
apps/trade/client/modules/app/AppDialogs.tsx                                                                                                                                                                3              0             40
apps/trade/client/modules/app/AppFooter.tsx                                                                                                                                                                 1              0             29
apps/trade/client/modules/app/AppPage.tsx                                                                                                                                                                   7              1             83
apps/trade/client/modules/app/assets/blitz-desktop-highlights.svg                                                                                                                                           1              0             40
apps/trade/client/modules/app/assets/blitz-mobile-highlights.svg                                                                                                                                            1              0             39
apps/trade/client/modules/app/assets/vertex-desktop-highlights.svg                                                                                                                                          1              0             43
apps/trade/client/modules/app/assets/vertex-mobile-highlights.svg                                                                                                                                           1              0             41
apps/trade/client/modules/app/components/AppVersion.tsx                                                                                                                                                     1              0              9
apps/trade/client/modules/app/components/LatencyMonitor.tsx                                                                                                                                                 5              0             35
apps/trade/client/modules/app/components/NeedHelpButton.tsx                                                                                                                                                 3              0             14
apps/trade/client/modules/app/components/StatusButton.tsx                                                                                                                                                   3              0             28
apps/trade/client/modules/app/components/UpcomingMaintenanceAlert.tsx                                                                                                                                       4              0             16
apps/trade/client/modules/app/components/UpcomingMaintenanceLink.tsx                                                                                                                                        1              0             17
apps/trade/client/modules/app/components/banners/AbstractLaunchPromoBanner/AbstractLaunchPromoBanner.tsx                                                                                                    7              0             50
apps/trade/client/modules/app/components/banners/AbstractLaunchPromoBanner/abstract-full-logo.svg                                                                                                           0              0             27
apps/trade/client/modules/app/components/banners/AbstractLaunchPromoBanner/edge.svg                                                                                                                         0              0             21
apps/trade/client/modules/app/components/banners/AbstractUpvoteDiscoverPromoBanner.tsx                                                                                                                      4              0             37
apps/trade/client/modules/app/components/banners/AppPromoBanner/AppPromoBanner.tsx                                                                                                                          9              0            115
apps/trade/client/modules/app/consts/padding.ts                                                                                                                                                             0              1              4
apps/trade/client/modules/app/consts/routes.ts                                                                                                                                                              2              0             34
apps/trade/client/modules/app/dialogs/ActionSuccessDialog.tsx                                                                                                                                               3              0             34
apps/trade/client/modules/app/dialogs/BaseAppDialog.tsx                                                                                                                                                     8              4             69
apps/trade/client/modules/app/dialogs/ChangeSubaccountDialog.tsx                                                                                                                                           10              3             89
apps/trade/client/modules/app/dialogs/CommandCenterDialog.tsx                                                                                                                                               3              1             18
apps/trade/client/modules/app/dialogs/EditOrderViaChartDialog.tsx                                                                                                                                           4              5             36
apps/trade/client/modules/app/dialogs/HelpCenterDialog.tsx                                                                                                                                                  4              0             60
apps/trade/client/modules/app/dialogs/LocationRestrictedDialog.tsx                                                                                                                                          1              0             41
apps/trade/client/modules/app/dialogs/dialogGroups/AccountDialogs.tsx                                                                                                                                       2              0             63
apps/trade/client/modules/app/dialogs/dialogGroups/CampaignDialogs.tsx                                                                                                                                      2              0             12
apps/trade/client/modules/app/dialogs/dialogGroups/CollateralDialogs.tsx                                                                                                                                    2              0             36
apps/trade/client/modules/app/dialogs/dialogGroups/DetailDialogs.tsx                                                                                                                                        2              3             44
apps/trade/client/modules/app/dialogs/dialogGroups/LpDialogs.tsx                                                                                                                                            2              0             16
apps/trade/client/modules/app/dialogs/dialogGroups/PerpDialogs.tsx                                                                                                                                          2              0             35
apps/trade/client/modules/app/dialogs/dialogGroups/ReferralDialogs.tsx                                                                                                                                      2              0             20
apps/trade/client/modules/app/dialogs/dialogGroups/VaultsDialogs.tsx                                                                                                                                        2              0             16
apps/trade/client/modules/app/dialogs/dialogGroups/VrtxTokenDialogs.tsx                                                                                                                                     2              0             28
apps/trade/client/modules/app/dialogs/hooks/useAppDialogEffects.ts                                                                                                                                          3             10             27
apps/trade/client/modules/app/dialogs/hooks/useDialog.ts                                                                                                                                                    9              6             52
apps/trade/client/modules/app/dialogs/types.ts                                                                                                                                                              3              0            258
apps/trade/client/modules/app/dialogs/wallet/ConnectWalletDialog.tsx                                                                                                                                        3              0             23
apps/trade/client/modules/app/dialogs/wallet/hooks/useConnectWalletStateMachine.ts                                                                                                                         12              4             53
apps/trade/client/modules/app/dialogs/wallet/states/connect/ConnectWalletDialogContent.tsx                                                                                                                  4              1             91
apps/trade/client/modules/app/dialogs/wallet/states/connect/WalletButton.tsx                                                                                                                                4              2             58
apps/trade/client/modules/app/dialogs/wallet/states/connect/assets/binance.svg                                                                                                                              0              0              1
apps/trade/client/modules/app/dialogs/wallet/states/connect/assets/coinbase.svg                                                                                                                             0              0              4
apps/trade/client/modules/app/dialogs/wallet/states/connect/assets/passkey.svg                                                                                                                              0              0              1
apps/trade/client/modules/app/dialogs/wallet/states/connect/assets/walletconnect.svg                                                                                                                        0              0              4
apps/trade/client/modules/app/dialogs/wallet/states/connect/consts.ts                                                                                                                                       0              0              1
apps/trade/client/modules/app/dialogs/wallet/states/connect/customConnectorMetadata.tsx                                                                                                                     4              3             74
apps/trade/client/modules/app/dialogs/wallet/states/connect/useResolvedConnectors.ts                                                                                                                       12              6             63
apps/trade/client/modules/app/dialogs/wallet/states/termsOfUse/TermsOfUseDialogContent.tsx                                                                                                                  4              0             69
apps/trade/client/modules/app/dialogs/wallet/states/welcome/KeyFeaturesDialogContent.tsx                                                                                                                    2              0             22
apps/trade/client/modules/app/hooks/useAlertUpcomingMaintenanceWindow.ts                                                                                                                                    5              5             22
apps/trade/client/modules/app/hooks/useIsEngineHealthy.ts                                                                                                                                                   3              1              8
apps/trade/client/modules/app/navBar/AppNavBar.tsx                                                                                                                                                          3              0             13
apps/trade/client/modules/app/navBar/DesktopNavBarContent.tsx                                                                                                                                               6              1             99
apps/trade/client/modules/app/navBar/MobileNavBarContent.tsx                                                                                                                                                9              3            162
apps/trade/client/modules/app/navBar/accountInfo/NavAccountInfoPinsDropdown.tsx                                                                                                                             3              1             44
apps/trade/client/modules/app/navBar/accountInfo/NavAccountInfoPinsDropdownContent.tsx                                                                                                                      6              1            116
apps/trade/client/modules/app/navBar/accountInfo/PinnedNavAccountInfoItem.tsx                                                                                                                               1              0             16
apps/trade/client/modules/app/navBar/accountInfo/useNavAccountInfoPins.tsx                                                                                                                                 19              4            238
apps/trade/client/modules/app/navBar/chainEnvSwitcher/ChainEnvSwitcherDropdown.tsx                                                                                                                          6              0            128
apps/trade/client/modules/app/navBar/chainEnvSwitcher/assets/blitz-chain-env-switcher-icon.svg                                                                                                              0              0             21
apps/trade/client/modules/app/navBar/chainEnvSwitcher/chainEnvSwitcherOptions.ts                                                                                                                            2              0             70
apps/trade/client/modules/app/navBar/components/AppNavItemButton.tsx                                                                                                                                        3              0             43
apps/trade/client/modules/app/navBar/components/AppNavLogo/AppNavLogo.tsx                                                                                                                                   1              0             15
apps/trade/client/modules/app/navBar/components/DesktopNavCustomPopover.tsx                                                                                                                                 2              4             27
apps/trade/client/modules/app/navBar/components/MobileNavCustomCollapsible.tsx                                                                                                                              6              0             87
apps/trade/client/modules/app/navBar/components/NavPopoverContentContainer.tsx                                                                                                                              1              0             17
apps/trade/client/modules/app/navBar/components/NavPopoverHeader.tsx                                                                                                                                        2              0             19
apps/trade/client/modules/app/navBar/earn/DesktopEarnPopover.tsx                                                                                                                                            4              1             73
apps/trade/client/modules/app/navBar/earn/MobileEarnCollapsible.tsx                                                                                                                                         4              1             72
apps/trade/client/modules/app/navBar/earn/useEarnLinks.tsx                                                                                                                                                  8              0             71
apps/trade/client/modules/app/navBar/hooks/useAppNavItems.tsx                                                                                                                                               8             24            119
apps/trade/client/modules/app/navBar/hooks/useGetIsActiveRoute.ts                                                                                                                                           2              3             14
apps/trade/client/modules/app/navBar/hooks/useMobileCollapsible.ts                                                                                                                                          3              0             11
apps/trade/client/modules/app/navBar/moreLinks/DesktopMoreLinksPopover.tsx                                                                                                                                  2              0             30
apps/trade/client/modules/app/navBar/moreLinks/MobileMoreLinksCollapsible.tsx                                                                                                                               2              0             35
apps/trade/client/modules/app/navBar/moreLinks/useMoreLinks.tsx                                                                                                                                             2              1             63
apps/trade/client/modules/app/navBar/trade/DesktopNavMarketSwitcher/DesktopNavMarketSwitcher.tsx                                                                                                            8              3            144
apps/trade/client/modules/app/navBar/trade/DesktopNavMarketSwitcher/NavMarketSwitcherTable.tsx                                                                                                              6              1            133
apps/trade/client/modules/app/navBar/trade/MobileNavTradeCollapsible.tsx                                                                                                                                    3              1             44
apps/trade/client/modules/app/navBar/trade/useNavTradeMarketCategories.ts                                                                                                                                   4              1             26
apps/trade/client/modules/app/navBar/tradingCompetition/BlitzCompetitionNavItemButton.tsx                                                                                                                   4              0             26
apps/trade/client/modules/app/navBar/tradingCompetition/DesktopTradingCompetitionsPopover.tsx                                                                                                               5              0             66
apps/trade/client/modules/app/navBar/tradingCompetition/MobileTradingCompetitionsCollapsible.tsx                                                                                                            6              0             77
apps/trade/client/modules/app/navBar/tradingCompetition/TradingCompetitionNavItemTimeline.tsx                                                                                                               2              0             26
apps/trade/client/modules/app/navBar/tradingCompetition/consts.tsx                                                                                                                                          3              6             11
apps/trade/client/modules/app/navBar/tradingCompetition/types.ts                                                                                                                                            1              0              7
apps/trade/client/modules/collateral/bridge/components/BridgeDestinationInput.tsx                                                                                                                           3              1             75
apps/trade/client/modules/collateral/bridge/components/BridgeDialog.tsx                                                                                                                                     2              0             20
apps/trade/client/modules/collateral/bridge/components/BridgeDismissible.tsx                                                                                                                                2              0             41
apps/trade/client/modules/collateral/bridge/components/BridgeFormContent.tsx                                                                                                                                4              0             97
apps/trade/client/modules/collateral/bridge/components/BridgePoweredBy.tsx                                                                                                                                  1              1             16
apps/trade/client/modules/collateral/bridge/components/BridgeSelect/BridgeComboBox.tsx                                                                                                                      8              1             95
apps/trade/client/modules/collateral/bridge/components/BridgeSelect/BridgeSelect.tsx                                                                                                                        7              2            104
apps/trade/client/modules/collateral/bridge/components/BridgeSelect/DestinationTokenSelect.tsx                                                                                                              7              0             63
apps/trade/client/modules/collateral/bridge/components/BridgeSelect/SourceChainSelect.tsx                                                                                                                   5              1             61
apps/trade/client/modules/collateral/bridge/components/BridgeSelect/SourceTokenSelect.tsx                                                                                                                   6              2             84
apps/trade/client/modules/collateral/bridge/components/BridgeSelect/consts.ts                                                                                                                               0              0              2
apps/trade/client/modules/collateral/bridge/components/BridgeSourceInput.tsx                                                                                                                                2              1             88
apps/trade/client/modules/collateral/bridge/components/BridgeSubmitButton.tsx                                                                                                                               5              0             34
apps/trade/client/modules/collateral/bridge/components/BridgeSummaryDisclosure.tsx                                                                                                                          5              0            172
apps/trade/client/modules/collateral/bridge/hooks/execute/useExecuteBridgeTokens.ts                                                                                                                         8              1             62
apps/trade/client/modules/collateral/bridge/hooks/form/types.ts                                                                                                                                             4              5             49
apps/trade/client/modules/collateral/bridge/hooks/form/useBridgeAmountErrorTooltipContent.ts                                                                                                                1              0             20
apps/trade/client/modules/collateral/bridge/hooks/form/useBridgeForm.ts                                                                                                                                    27              9            240
apps/trade/client/modules/collateral/bridge/hooks/form/useBridgeFormData.ts                                                                                                                                16              2             86
apps/trade/client/modules/collateral/bridge/hooks/form/useBridgeFormOnChangeSideEffects.ts                                                                                                                  7              4             60
apps/trade/client/modules/collateral/bridge/hooks/query/useBridgeTokenBalances.ts                                                                                                                           6              3             41
apps/trade/client/modules/collateral/bridge/hooks/query/useEstimatedBridgeRoute.ts                                                                                                                          6              1             59
apps/trade/client/modules/collateral/bridge/hooks/useBridgeData.ts                                                                                                                                         19              9            109
apps/trade/client/modules/collateral/bridge/hooks/useBridgeEstimatedSubaccountInfoChange.ts                                                                                                                 4              1             33
apps/trade/client/modules/collateral/bridge/hooks/useBridgeRouteSummary.ts                                                                                                                                  9              1             72
apps/trade/client/modules/collateral/bridge/hooks/useSquidSDK.ts                                                                                                                                            5              4             22
apps/trade/client/modules/collateral/bridge/hooks/utils/getSquidRouteRequest.ts                                                                                                                             4             13             79
apps/trade/client/modules/collateral/bridge/types.ts                                                                                                                                                        5              5             32
apps/trade/client/modules/collateral/components/CollateralAssetSelect.tsx                                                                                                                                   9              2            182
apps/trade/client/modules/collateral/components/CollateralHelpCard.tsx                                                                                                                                      5              0             47
apps/trade/client/modules/collateral/components/CollateralSelectInput.tsx                                                                                                                                   3              0             65
apps/trade/client/modules/collateral/components/DelayedWithdrawalWarning.tsx                                                                                                                                1              0             29
apps/trade/client/modules/collateral/components/DepositSummaryDisclosure.tsx                                                                                                                                7              0            100
apps/trade/client/modules/collateral/components/EstimatedCurrencyValueItem.tsx                                                                                                                              4              0             17
apps/trade/client/modules/collateral/components/MinimumInitialDepositAmount.tsx                                                                                                                             4              0             28
apps/trade/client/modules/collateral/deposit/components/DepositApproveWarning.tsx                                                                                                                           1              0              9
apps/trade/client/modules/collateral/deposit/components/DepositDialog.tsx                                                                                                                                   5              1            168
apps/trade/client/modules/collateral/deposit/components/DepositOptionsDropdown/DepositOptionsDropdown.tsx                                                                                                  10              7            157
apps/trade/client/modules/collateral/deposit/components/DepositOptionsDropdown/icons/BnbLogoIcon.tsx                                                                                                        1              0             16
apps/trade/client/modules/collateral/deposit/components/DepositOptionsDropdown/icons/EthLogoIcon.tsx                                                                                                        1              0             21
apps/trade/client/modules/collateral/deposit/components/DepositOptionsDropdown/icons/MastercardLogoIcon.tsx                                                                                                 1              0             11
apps/trade/client/modules/collateral/deposit/components/DepositOptionsDropdown/icons/OptimismLogoIcon.tsx                                                                                                   1              0             20
apps/trade/client/modules/collateral/deposit/components/DepositOptionsDropdown/icons/VisaLogoIcon.tsx                                                                                                       1              0             18
apps/trade/client/modules/collateral/deposit/components/DepositSubmitButton.tsx                                                                                                                             4              0             46
apps/trade/client/modules/collateral/deposit/components/DepositVrtxStakingCta.tsx                                                                                                                           3              0             26
apps/trade/client/modules/collateral/deposit/components/dismissibles/BlastNativeYieldDepositDismissible.tsx                                                                                                 2              0             18
apps/trade/client/modules/collateral/deposit/components/dismissibles/WethDepositDismissible.tsx                                                                                                             3              0             44
apps/trade/client/modules/collateral/deposit/components/dismissibles/WmntDepositDismissible.tsx                                                                                                             3              0             41
apps/trade/client/modules/collateral/deposit/components/dismissibles/WsDepositDismissible.tsx                                                                                                               2              0             36
apps/trade/client/modules/collateral/deposit/components/dismissibles/WseiDepositDismissible.tsx                                                                                                             2              0             37
apps/trade/client/modules/collateral/deposit/hooks/useDepositAmountErrorTooltipContent.ts                                                                                                                   1              0             18
apps/trade/client/modules/collateral/deposit/hooks/useDepositForm.ts                                                                                                                                       27             20            235
apps/trade/client/modules/collateral/deposit/hooks/useDepositFormData.ts                                                                                                                                    8              5             69
apps/trade/client/modules/collateral/deposit/hooks/useDepositFormDisplayedInfoCardType.ts                                                                                                                  13              9             92
apps/trade/client/modules/collateral/deposit/hooks/useDepositFormOnChangeSideEffects.ts                                                                                                                     3              2             36
apps/trade/client/modules/collateral/deposit/hooks/useDepositFormSubmitHandler.ts                                                                                                                           7              2             91
apps/trade/client/modules/collateral/deposit/types.ts                                                                                                                                                       4              2             25
apps/trade/client/modules/collateral/fastWithdraw/components/FastWithdrawDialog.tsx                                                                                                                         3              1             48
apps/trade/client/modules/collateral/fastWithdraw/components/FastWithdrawErrorPanel.tsx                                                                                                                     3              0             33
apps/trade/client/modules/collateral/fastWithdraw/components/FastWithdrawInfoCollapsible.tsx                                                                                                                2              0             36
apps/trade/client/modules/collateral/fastWithdraw/components/FastWithdrawSubmitButton.tsx                                                                                                                   3              0             35
apps/trade/client/modules/collateral/fastWithdraw/components/FastWithdrawSummary.tsx                                                                                                                        3              0             54
apps/trade/client/modules/collateral/fastWithdraw/hooks/useFastWithdrawForm.tsx                                                                                                                            14              6             98
apps/trade/client/modules/collateral/fastWithdraw/hooks/useFastWithdrawFormData.tsx                                                                                                                        10              0             67
apps/trade/client/modules/collateral/hooks/useAreWithdrawalsProcessing.ts                                                                                                                                   7              8             27
apps/trade/client/modules/collateral/hooks/useCollateralEstimateSubaccountInfoChange.ts                                                                                                                    13              8             94
apps/trade/client/modules/collateral/hooks/useWithdrawalsAreDelayed.ts                                                                                                                                      3              1             14
apps/trade/client/modules/collateral/repay/RepayDialog.tsx                                                                                                                                                  6              3            103
apps/trade/client/modules/collateral/repay/components/MaxRepayDismissible.tsx                                                                                                                               1              0             10
apps/trade/client/modules/collateral/repay/components/RepayConversionRateDisplay.tsx                                                                                                                        5              2             38
apps/trade/client/modules/collateral/repay/components/RepayConvertButton.tsx                                                                                                                                3              0             41
apps/trade/client/modules/collateral/repay/components/RepayConvertDismissible.tsx                                                                                                                           1              0             16
apps/trade/client/modules/collateral/repay/components/RepayConvertFormErrorPanel.tsx                                                                                                                        3              0             22
apps/trade/client/modules/collateral/repay/components/RepayConvertInputWrapper.tsx                                                                                                                          1              0             13
apps/trade/client/modules/collateral/repay/components/RepayConvertTab.tsx                                                                                                                                   3              2            147
apps/trade/client/modules/collateral/repay/components/RepayDepositButton.tsx                                                                                                                                4              0             46
apps/trade/client/modules/collateral/repay/components/RepayDepositTab.tsx                                                                                                                                   3              1             98
apps/trade/client/modules/collateral/repay/hooks/useHasRepayableBalances.ts                                                                                                                                 2              0             15
apps/trade/client/modules/collateral/repay/hooks/useRepayConvertForm/types.ts                                                                                                                               6              9             52
apps/trade/client/modules/collateral/repay/hooks/useRepayConvertForm/useRepayConvertForm.ts                                                                                                                29             24            262
apps/trade/client/modules/collateral/repay/hooks/useRepayConvertForm/useRepayConvertMarketData.ts                                                                                                           9              3             55
apps/trade/client/modules/collateral/repay/hooks/useRepayConvertForm/useRepayConvertMaxRepaySizes.ts                                                                                                       14              6             96
apps/trade/client/modules/collateral/repay/hooks/useRepayConvertForm/useRepayConvertOnChangeSideEffects.ts                                                                                                  3              4             31
apps/trade/client/modules/collateral/repay/hooks/useRepayConvertForm/useRepayConvertProducts.ts                                                                                                            10              4            107
apps/trade/client/modules/collateral/repay/hooks/useRepayConvertForm/useRepayConvertReplayAmountErrorTooltipContent.ts                                                                                      3              0             21
apps/trade/client/modules/collateral/repay/hooks/useRepayConvertForm/useRepayConvertSubmitHandler.ts                                                                                                        5              1             83
apps/trade/client/modules/collateral/repay/hooks/useRepayDepositForm.ts                                                                                                                                    14              3            133
apps/trade/client/modules/collateral/types.ts                                                                                                                                                               1              0             10
apps/trade/client/modules/collateral/utils/sortByDisplayedAssetValue.ts                                                                                                                                     1              0             11
apps/trade/client/modules/collateral/withdraw/components/BorrowingFundsDismissible.tsx                                                                                                                      1              0             16
apps/trade/client/modules/collateral/withdraw/components/EnableBorrowsSwitch.tsx                                                                                                                            3              0             28
apps/trade/client/modules/collateral/withdraw/components/WithdrawButton.tsx                                                                                                                                 3              0             53
apps/trade/client/modules/collateral/withdraw/components/WithdrawDialog.tsx                                                                                                                                 6              2            130
apps/trade/client/modules/collateral/withdraw/components/WithdrawInputSummary.tsx                                                                                                                           3              0             42
apps/trade/client/modules/collateral/withdraw/components/WithdrawSummaryDisclosure.tsx                                                                                                                      5              0            108
apps/trade/client/modules/collateral/withdraw/hooks/useWithdrawAmountErrorTooltipContent.tsx                                                                                                                3              0             22
apps/trade/client/modules/collateral/withdraw/hooks/useWithdrawForm.ts                                                                                                                                     33             28            283
apps/trade/client/modules/collateral/withdraw/hooks/useWithdrawFormData.ts                                                                                                                                  8              4             64
apps/trade/client/modules/collateral/withdraw/types.ts                                                                                                                                                      3              2             22
apps/trade/client/modules/commandCenter/components/CommandCenter.tsx                                                                                                                                        2             11             83
apps/trade/client/modules/commandCenter/components/CommandCenterNavButton.tsx                                                                                                                               2              0             14
apps/trade/client/modules/commandCenter/components/Footer.tsx                                                                                                                                               2              0             40
apps/trade/client/modules/commandCenter/components/Kbd.tsx                                                                                                                                                  2              0             22
apps/trade/client/modules/commandCenter/components/NoResultsMessage.tsx                                                                                                                                     1              0             18
apps/trade/client/modules/commandCenter/components/OpenCommandCenterOnKeyPressListener.tsx                                                                                                                  2              0              5
apps/trade/client/modules/commandCenter/components/cells/ActionName.tsx                                                                                                                                     2              0             18
apps/trade/client/modules/commandCenter/components/groups/BalancesGroup.tsx                                                                                                                                 2              0             14
apps/trade/client/modules/commandCenter/components/groups/Group.tsx                                                                                                                                         3              0             25
apps/trade/client/modules/commandCenter/components/groups/MarketsGroup.tsx                                                                                                                                  2              0             14
apps/trade/client/modules/commandCenter/components/groups/NavItemsGroup.tsx                                                                                                                                 2              0             32
apps/trade/client/modules/commandCenter/components/groups/PositionsGroup.tsx                                                                                                                                2              0             14
apps/trade/client/modules/commandCenter/components/tables/BalancesTable.tsx                                                                                                                                 4              0             89
apps/trade/client/modules/commandCenter/components/tables/BaseTable/BaseRow.tsx                                                                                                                             4              4             41
apps/trade/client/modules/commandCenter/components/tables/BaseTable/BaseTable.tsx                                                                                                                           6              1             49
apps/trade/client/modules/commandCenter/components/tables/BaseTable/TableHeaderGroup.tsx                                                                                                                    1              0             19
apps/trade/client/modules/commandCenter/components/tables/BaseTable/TableRow.tsx                                                                                                                            2              0             31
apps/trade/client/modules/commandCenter/components/tables/MarketsTable.tsx                                                                                                                                  8              1            130
apps/trade/client/modules/commandCenter/components/tables/PositionsTable.tsx                                                                                                                                4              0             95
apps/trade/client/modules/commandCenter/hooks/useCommandCenter.ts                                                                                                                                          12              4             85
apps/trade/client/modules/commandCenter/hooks/useCommandCenterBalanceItems.ts                                                                                                                              14              0             90
apps/trade/client/modules/commandCenter/hooks/useCommandCenterMarketItems.ts                                                                                                                                9              0             91
apps/trade/client/modules/commandCenter/hooks/useCommandCenterNavItems.ts                                                                                                                                   6              0            165
apps/trade/client/modules/commandCenter/hooks/useCommandCenterPositionItems.ts                                                                                                                             12              1            109
apps/trade/client/modules/commandCenter/hooks/useOpenCommandCenterOnKeyPress.ts                                                                                                                             5              2             13
apps/trade/client/modules/envSpecificContent/BrandSpecificContent.tsx                                                                                                                                       4              0             13
apps/trade/client/modules/envSpecificContent/ChainSpecificContent.tsx                                                                                                                                       4              0             13
apps/trade/client/modules/envSpecificContent/RedirectOnInvalidChainEnvListener.tsx                                                                                                                          5              6             29
apps/trade/client/modules/envSpecificContent/consts/noSpotChainEnvs.ts                                                                                                                                      1              1              9
apps/trade/client/modules/envSpecificContent/hooks/useEnabledFeatures.ts                                                                                                                                    8              0             54
apps/trade/client/modules/envSpecificContent/hooks/useIsEnabledForBrand.ts                                                                                                                                  1              2              8
apps/trade/client/modules/envSpecificContent/hooks/useIsEnabledForChainEnvs.ts                                                                                                                              2              2              9
apps/trade/client/modules/localstorage/globalState/SavedGlobalState.ts                                                                                                                                      1              1              5
apps/trade/client/modules/localstorage/globalState/defaultGlobalState.ts                                                                                                                                    3              1             19
apps/trade/client/modules/localstorage/globalState/useSavedGlobalState.ts                                                                                                                                   5              0             40
apps/trade/client/modules/localstorage/hooks/useLocalStorageAddressKey.ts                                                                                                                                   2              1              8
apps/trade/client/modules/localstorage/types.ts                                                                                                                                                             0              1              1
apps/trade/client/modules/localstorage/userSettings/defaultUserSettings.ts                                                                                                                                  4              9            154
apps/trade/client/modules/localstorage/userSettings/types/SavedPortfolioUserSettings.ts                                                                                                                     1              0              4
apps/trade/client/modules/localstorage/userSettings/types/SavedUserSettings.ts                                                                                                                              1              0             17
apps/trade/client/modules/localstorage/userSettings/types/navAccountPins.ts                                                                                                                                 1              0             14
apps/trade/client/modules/localstorage/userSettings/types/tradingSettings.ts                                                                                                                               15              2             62
apps/trade/client/modules/localstorage/userSettings/useSavedUserSettings.ts                                                                                                                                 7              1             46
apps/trade/client/modules/localstorage/userSettings/userSettingValidators.ts                                                                                                                                2              1             18
apps/trade/client/modules/localstorage/userSettings/userSettingsSchema.ts                                                                                                                                   6              1            124
apps/trade/client/modules/localstorage/userState/defaultUserState.ts                                                                                                                                        4              1             65
apps/trade/client/modules/localstorage/userState/types/SavedUserState.ts                                                                                                                                    1              0              9
apps/trade/client/modules/localstorage/userState/types/userDisclosureTypes.ts                                                                                                                               6              9             39
apps/trade/client/modules/localstorage/userState/types/userTradingSidebarTypes.ts                                                                                                                           2              0             13
apps/trade/client/modules/localstorage/userState/types/userTutorialFlowTypes.ts                                                                                                                             2              0             12
apps/trade/client/modules/localstorage/userState/useSavedUserState.ts                                                                                                                                       5              0             43
apps/trade/client/modules/localstorage/userState/useShowUserDisclosure.ts                                                                                                                                   7             12             35
apps/trade/client/modules/localstorage/userState/userStateSchema.ts                                                                                                                                         2              1             24
apps/trade/client/modules/localstorage/utils/setStateActionToState.ts                                                                                                                                       1              0              9
apps/trade/client/modules/localstorage/utils/zodValidators.ts                                                                                                                                               3              2             19
apps/trade/client/modules/notifi/NotifiContextProviderWrapper.tsx                                                                                                                                           7              1             74
apps/trade/client/modules/notifi/NotifiDialog.tsx                                                                                                                                                           4              0             52
apps/trade/client/modules/notifi/styles/connect.css                                                                                                                                                        10              1             93
apps/trade/client/modules/notifi/styles/error.css                                                                                                                                                           5              0             37
apps/trade/client/modules/notifi/styles/ftu.css                                                                                                                                                            17              5            102
apps/trade/client/modules/notifi/styles/history.css                                                                                                                                                        26              5            157
apps/trade/client/modules/notifi/styles/inbox.css                                                                                                                                                          22              7            121
apps/trade/client/modules/notifi/styles/index.css                                                                                                                                                           3              1            208
apps/trade/client/modules/notifi/styles/loading-animation.css                                                                                                                                               3              2             28
apps/trade/client/modules/notifi/styles/nav-header.css                                                                                                                                                      1              0             28
apps/trade/client/modules/notifi/styles/notifi-card-modal.css                                                                                                                                               0              0             10
apps/trade/client/modules/notifi/styles/powered-by-notifi.css                                                                                                                                               3              0             20
apps/trade/client/modules/notifi/styles/subscription-value-input.css                                                                                                                                        5              0             40
apps/trade/client/modules/notifi/styles/target-inputs.css                                                                                                                                                  14              4             97
apps/trade/client/modules/notifi/styles/target-list.css                                                                                                                                                    25              3            151
apps/trade/client/modules/notifi/styles/target-state-banner.css                                                                                                                                            13              0             95
apps/trade/client/modules/notifi/styles/toggle.css                                                                                                                                                          6              0             47
apps/trade/client/modules/notifi/styles/topic-list.css                                                                                                                                                     51              7            263
apps/trade/client/modules/notifications/NotificationManagerContext.tsx                                                                                                                                      3              0             11
apps/trade/client/modules/notifications/NotificationManagerContextProvider.tsx                                                                                                                              8              0            132
apps/trade/client/modules/notifications/components/AcceptFuulReferralNotification.tsx                                                                                                                       4              0             56
apps/trade/client/modules/notifications/components/NotificationPositionInfo.tsx                                                                                                                             4              0             48
apps/trade/client/modules/notifications/components/OrderSuccessIcon.tsx                                                                                                                                     1              0              7
apps/trade/client/modules/notifications/components/SignaturePendingNotification.tsx                                                                                                                         3              0             39
apps/trade/client/modules/notifications/components/collateral/ActionErrorNotification.tsx                                                                                                                   2              0             25
apps/trade/client/modules/notifications/components/collateral/BridgeDepositSuccessNotification.tsx                                                                                                          3              0             49
apps/trade/client/modules/notifications/components/consts.ts                                                                                                                                                0              0              1
apps/trade/client/modules/notifications/components/newFeature/NewFeatureNotification.tsx                                                                                                                    2              0             29
apps/trade/client/modules/notifications/components/newFeature/features/PerpMarketFeatureNotification.tsx                                                                                                    8              0             71
apps/trade/client/modules/notifications/components/newFeature/features/PerpMarketsFeatureNotification.tsx                                                                                                   5              0             56
apps/trade/client/modules/notifications/components/newFeature/features/SpotMarketFeatureNotification.tsx                                                                                                   10              0             88
apps/trade/client/modules/notifications/components/orders/CancelMultiOrdersErrorNotification.tsx                                                                                                            2              0             21
apps/trade/client/modules/notifications/components/orders/CancelMultiOrdersSuccessNotification.tsx                                                                                                          3              0             30
apps/trade/client/modules/notifications/components/orders/CancelOrderErrorNotification.tsx                                                                                                                  2              0             21
apps/trade/client/modules/notifications/components/orders/CancelOrderSuccessNotification.tsx                                                                                                                8              2             67
apps/trade/client/modules/notifications/components/orders/OrderFillNotification/OrderFillNotification.tsx                                                                                                   9              0            116
apps/trade/client/modules/notifications/components/orders/OrderFillNotification/PartialFillIcon.tsx                                                                                                         1              0             10
apps/trade/client/modules/notifications/components/orders/OrderFillNotification/useOrderFilledNotification.ts                                                                                               7              3             62
apps/trade/client/modules/notifications/components/orders/OrderNotificationValueItem.tsx                                                                                                                    2              1             14
apps/trade/client/modules/notifications/components/orders/PlaceOrderErrorNotification.tsx                                                                                                                   4              0             43
apps/trade/client/modules/notifications/components/orders/PlaceOrderSuccessNotification.tsx                                                                                                                 6              1             90
apps/trade/client/modules/notifications/components/positions/CloseMultiPositionsErrorNotification.tsx                                                                                                       3              0             25
apps/trade/client/modules/notifications/components/positions/ClosePositionErrorNotification.tsx                                                                                                             2              0             26
apps/trade/client/modules/notifications/components/positions/ClosePositionSuccessNotification.tsx                                                                                                           5              0             65
apps/trade/client/modules/notifications/components/risk/LiquidationNotification.tsx                                                                                                                         8              5             54
apps/trade/client/modules/notifications/components/risk/LiquidationRiskNotification.tsx                                                                                                                     4              0             43
apps/trade/client/modules/notifications/components/risk/MarginUsageWarningNotification.tsx                                                                                                                  5              0             43
apps/trade/client/modules/notifications/emitters/FeatureNotificationsEmitter.tsx                                                                                                                            7              6             47
apps/trade/client/modules/notifications/emitters/FuulReferralNotificationsEmitter.tsx                                                                                                                       3              0             16
apps/trade/client/modules/notifications/emitters/SubaccountNotificationsEventEmitter.tsx                                                                                                                    1              3              9
apps/trade/client/modules/notifications/emitters/hooks/useSubaccountFillOrderEventEmitter.ts                                                                                                               10             13             74
apps/trade/client/modules/notifications/emitters/hooks/useSubaccountLiquidationEventEmitter.ts                                                                                                              9             11             59
apps/trade/client/modules/notifications/emitters/hooks/useSubaccountRiskEventEmitter.ts                                                                                                                     8             18             48
apps/trade/client/modules/notifications/handlers/handleAcceptFuulReferralNotificationDispatch.tsx                                                                                                           1              0             23
apps/trade/client/modules/notifications/handlers/handleActionErrorHandlerNotificationDispatch.tsx                                                                                                           3              0             48
apps/trade/client/modules/notifications/handlers/handleBridgeDepositNotificationDispatch.tsx                                                                                                                3              0             77
apps/trade/client/modules/notifications/handlers/handleCancelMultiOrdersNotificationDispatch.tsx                                                                                                            4              0             70
apps/trade/client/modules/notifications/handlers/handleCancelOrderNotificationDispatch.tsx                                                                                                                  4              0             73
apps/trade/client/modules/notifications/handlers/handleCloseMultiPositionsNotificationDispatch.tsx                                                                                                          2              0             49
apps/trade/client/modules/notifications/handlers/handleClosePositionNotificationDispatch.tsx                                                                                                                5              0             74
apps/trade/client/modules/notifications/handlers/handleFeatureNotificationDispatch.tsx                                                                                                                      3             24             32
apps/trade/client/modules/notifications/handlers/handleLiquidationNotificationDispatch.tsx                                                                                                                  2              0             27
apps/trade/client/modules/notifications/handlers/handleLiquidationRiskNotificationDispatch.tsx                                                                                                              2              0             26
apps/trade/client/modules/notifications/handlers/handleMarginUsageWarningNotificationDispatch.tsx                                                                                                           2              0             22
apps/trade/client/modules/notifications/handlers/handleOrderFillNotificationDispatch.tsx                                                                                                                    2              1             24
apps/trade/client/modules/notifications/handlers/handlePlaceOrderNotificationDispatch.tsx                                                                                                                   5              1             78
apps/trade/client/modules/notifications/hooks/useLimitVisibleNotifications.ts                                                                                                                               2              5             13
apps/trade/client/modules/notifications/types.ts                                                                                                                                                           18              4            145
apps/trade/client/modules/pools/components/LpActionsCell.tsx                                                                                                                                                2              0             43
apps/trade/client/modules/pools/components/LpBalancesTable.tsx                                                                                                                                              7              0            174
apps/trade/client/modules/pools/components/LpInfoPanel/LpInfoPanel.tsx                                                                                                                                      2              0             46
apps/trade/client/modules/pools/components/LpInfoPanel/LpInfoPanelTokenPairHeader.tsx                                                                                                                       3              0             31
apps/trade/client/modules/pools/components/StackedTokenPairLabel.tsx                                                                                                                                        2              6             33
apps/trade/client/modules/pools/components/TokenIconLabel.tsx                                                                                                                                               2              0             37
apps/trade/client/modules/pools/hooks/useElixirLpYields.ts                                                                                                                                                  6              1             44
apps/trade/client/modules/pools/hooks/useLpTable.ts                                                                                                                                                         9              4            118
apps/trade/client/modules/pools/provide/ProvideLiquidityDialog.tsx                                                                                                                                          5              1            142
apps/trade/client/modules/pools/provide/ProvideLiquidityInput.tsx                                                                                                                                           2              0             42
apps/trade/client/modules/pools/provide/ProvideLiquiditySubmitButton.tsx                                                                                                                                    3              0             37
apps/trade/client/modules/pools/provide/ProvideLiquiditySummary.tsx                                                                                                                                         2              0             45
apps/trade/client/modules/pools/provide/hooks/useProvideLiquidityAmountErrorTooltipContent.ts                                                                                                               1              0             18
apps/trade/client/modules/pools/provide/hooks/useProvideLiquidityForm.ts                                                                                                                                   43             50            385
apps/trade/client/modules/pools/provide/hooks/useProvideLiquidityValidators.ts                                                                                                                              4              0             53
apps/trade/client/modules/pools/types.ts                                                                                                                                                                    5              0             19
apps/trade/client/modules/pools/utils/getElixirProductLink.tsx                                                                                                                                              0              0              3
apps/trade/client/modules/pools/withdraw/WithdrawLiquidityDialog.tsx                                                                                                                                        5              0             90
apps/trade/client/modules/pools/withdraw/WithdrawLiquidityInput.tsx                                                                                                                                         2              0             30
apps/trade/client/modules/pools/withdraw/WithdrawLiquiditySubmitButton.tsx                                                                                                                                  3              0             45
apps/trade/client/modules/pools/withdraw/WithdrawLiquiditySummary.tsx                                                                                                                                       6              2            125
apps/trade/client/modules/pools/withdraw/hooks/useWithdrawLiquidityAmountErrorTooltipContent.ts                                                                                                             1              0             18
apps/trade/client/modules/pools/withdraw/hooks/useWithdrawLiquidityForm.ts                                                                                                                                 29             21            230
apps/trade/client/modules/pools/withdraw/hooks/useWithdrawLiquidityValidators.ts                                                                                                                            3              0             34
apps/trade/client/modules/privacy/components/PrivateContent.tsx                                                                                                                                             2              0             21
apps/trade/client/modules/privacy/consts.ts                                                                                                                                                                 0              0              1
apps/trade/client/modules/privacy/hooks/usePrivacySetting.ts                                                                                                                                                4              0             17
apps/trade/client/modules/privacy/types.ts                                                                                                                                                                  1              0              5
apps/trade/client/modules/referrals/ReferralCodeListener.tsx                                                                                                                                                8             10             29
apps/trade/client/modules/referrals/ReferralLinkBar.tsx                                                                                                                                                     9              8             95
apps/trade/client/modules/referrals/consts.ts                                                                                                                                                               0              2              2
apps/trade/client/modules/referrals/fuul/FuulReferralLinkBar.tsx                                                                                                                                            3              1             26
apps/trade/client/modules/referrals/fuul/FuulReferralsContext.tsx                                                                                                                                          10             23             72
apps/trade/client/modules/referrals/fuul/consts.ts                                                                                                                                                          0              4             10
apps/trade/client/modules/referrals/fuul/dialogs/ClaimFuulReferralEarningsDialog/ClaimFuulReferralEarningsDialog.tsx                                                                                        2              0             43
apps/trade/client/modules/referrals/fuul/dialogs/ClaimFuulReferralEarningsDialog/ClaimFuulReferralEarningsSubmitButton.tsx                                                                                  3              0             34
apps/trade/client/modules/referrals/fuul/dialogs/ClaimFuulReferralEarningsDialog/hooks/useClaimFuulReferralEarningsDialog.ts                                                                                9              0             64
apps/trade/client/modules/referrals/fuul/dialogs/ConfirmFuulReferralDialog/ConfirmFuulReferralDialog.tsx                                                                                                    5              1             67
apps/trade/client/modules/referrals/fuul/dialogs/ConfirmFuulReferralDialog/ConfirmFuulReferralSubmitButton.tsx                                                                                              3              0             31
apps/trade/client/modules/referrals/fuul/dialogs/ConfirmFuulReferralDialog/hooks/useConfirmFuulReferralDialog.tsx                                                                                           7              1             60
apps/trade/client/modules/referrals/fuul/dialogs/CustomizeFuulReferralLinkDialog/CustomizeFuulReferralLinkDialog.tsx                                                                                        4              0             73
apps/trade/client/modules/referrals/fuul/dialogs/CustomizeFuulReferralLinkDialog/CustomizeFuulReferralLinkSubmitButton.tsx                                                                                  3              0             30
apps/trade/client/modules/referrals/fuul/dialogs/CustomizeFuulReferralLinkDialog/hooks/useCustomizeFuulReferralLinkDialog.ts                                                                               21              3            123
apps/trade/client/modules/referrals/fuul/dialogs/CustomizeFuulReferralLinkDialog/hooks/useCustomizeFuulReferralLinkErrorTooltipContent.ts                                                                   1              0             18
apps/trade/client/modules/referrals/fuul/formatFuulReferralCode.ts                                                                                                                                          2              7             10
apps/trade/client/modules/referrals/fuul/hooks/execute/useExecuteAcceptFuulReferral.ts                                                                                                                      6              1             53
apps/trade/client/modules/referrals/fuul/hooks/execute/useExecuteClaimFuulReferralRewards.ts                                                                                                                8              0             50
apps/trade/client/modules/referrals/fuul/hooks/execute/useExecuteUpsertFuulAffiliateCode.ts                                                                                                                10              0             46
apps/trade/client/modules/referrals/fuul/hooks/query/types.ts                                                                                                                                               3             12             18
apps/trade/client/modules/referrals/fuul/hooks/query/useAddressFuulRefereeRewards.ts                                                                                                                        6              4             34
apps/trade/client/modules/referrals/fuul/hooks/query/useAddressFuulReferralCode.ts                                                                                                                          5              4             25
apps/trade/client/modules/referrals/fuul/hooks/query/useAddressFuulReferralRewards.ts                                                                                                                       6              3             35
apps/trade/client/modules/referrals/fuul/hooks/query/useAddressOnChainFuulReferralRewards.ts                                                                                                                9              3             57
apps/trade/client/modules/referrals/fuul/hooks/query/useFuulReferrerForAddress.ts                                                                                                                           7              6             32
apps/trade/client/modules/referrals/fuul/hooks/query/usePaginatedFuulReferralRewardsLeaderboard.ts                                                                                                          8              1             52
apps/trade/client/modules/referrals/fuul/hooks/query/utils.ts                                                                                                                                               3              2             45
apps/trade/client/modules/referrals/types.ts                                                                                                                                                                0              0              6
apps/trade/client/modules/referrals/useReferralLink.ts                                                                                                                                                      6              8             26
apps/trade/client/modules/rewards/components/BlitzBoostedMarketItem.tsx                                                                                                                                     3              0             37
apps/trade/client/modules/rewards/components/BlitzRewardsMetrics/BlitzRewardsMetric.tsx                                                                                                                     2              0             33
apps/trade/client/modules/rewards/components/BlitzRewardsMetrics/BlitzRewardsMetrics.tsx                                                                                                                    3              0             38
apps/trade/client/modules/rewards/components/RewardsCard.tsx                                                                                                                                                7              0             80
apps/trade/client/modules/rewards/dialogs/ClaimTradingRewardsDialog/ClaimAndStakeChangeItems.tsx                                                                                                            2              0             32
apps/trade/client/modules/rewards/dialogs/ClaimTradingRewardsDialog/ClaimAndStakeRadioGroup.tsx                                                                                                             7              0             44
apps/trade/client/modules/rewards/dialogs/ClaimTradingRewardsDialog/ClaimTradingRewardsDialog.tsx                                                                                                           5              0            100
apps/trade/client/modules/rewards/dialogs/ClaimTradingRewardsDialog/types.ts                                                                                                                                1              1              5
apps/trade/client/modules/rewards/dialogs/ClaimTradingRewardsDialog/useClaimTradingRewardsDialog.tsx                                                                                                       14              7             96
apps/trade/client/modules/rewards/dialogs/WithdrawLbaLiquidityDialog/WithdrawLbaLiquidityDialog.tsx                                                                                                         2              1             83
apps/trade/client/modules/rewards/dialogs/WithdrawLbaLiquidityDialog/components/WithdrawLbaLiquidityDismissible.tsx                                                                                         1              0             22
apps/trade/client/modules/rewards/dialogs/WithdrawLbaLiquidityDialog/components/WithdrawLbaLiquidityInfoPanel.tsx                                                                                           2              0             53
apps/trade/client/modules/rewards/dialogs/WithdrawLbaLiquidityDialog/components/WithdrawLbaLiquiditySubmitButton.tsx                                                                                        3              0             43
apps/trade/client/modules/rewards/dialogs/WithdrawLbaLiquidityDialog/hooks/types.ts                                                                                                                         5              2             37
apps/trade/client/modules/rewards/dialogs/WithdrawLbaLiquidityDialog/hooks/useWithdrawLbaLiquidityAmountErrorTooltipContent.tsx                                                                             1              0             18
apps/trade/client/modules/rewards/dialogs/WithdrawLbaLiquidityDialog/hooks/useWithdrawLbaLiquidityForm.ts                                                                                                  30             15            230
apps/trade/client/modules/rewards/dialogs/types.ts                                                                                                                                                          1              0             15
apps/trade/client/modules/rewards/hooks/useAccountLbaTokenAllocation.ts                                                                                                                                     6              8             52
apps/trade/client/modules/rewards/hooks/useBlitzMarketBoosts.ts                                                                                                                                             6              0             33
apps/trade/client/modules/rewards/hooks/useClaimLbaRewards.ts                                                                                                                                               7              4             59
apps/trade/client/modules/rewards/hooks/useFoundationToken.ts                                                                                                                                               2              3             33
apps/trade/client/modules/rewards/hooks/useLatestRewardsEpochs.ts                                                                                                                                           7              4             54
apps/trade/client/modules/rewards/hooks/useTokenLaunchStage.ts                                                                                                                                             10              9             79
apps/trade/client/modules/rewards/types.ts                                                                                                                                                                  1              5             20
apps/trade/client/modules/rewards/utils/toVrtxRewardEpoch.ts                                                                                                                                               11             11             99
apps/trade/client/modules/sentry/SentryConfigManager.tsx                                                                                                                                                    6              1             24
apps/trade/client/modules/settings/SettingsDialog.tsx                                                                                                                                                       2              0             36
apps/trade/client/modules/settings/components/OneClickTradingSettingsEntrypoint.tsx                                                                                                                         2              0             25
apps/trade/client/modules/settings/components/OrderConsoleLocationButton.tsx                                                                                                                                5              3             60
apps/trade/client/modules/settings/components/OrderDefaultMarginMode.tsx                                                                                                                                    7              0             54
apps/trade/client/modules/settings/components/OrderLinesToggle.tsx                                                                                                                                          2              0             22
apps/trade/client/modules/settings/components/OrderNotificationsToggle.tsx                                                                                                                                  2              0             22
apps/trade/client/modules/settings/components/OrderSlippageForm/OrderSlippageForm.tsx                                                                                                                       2              0             24
apps/trade/client/modules/settings/components/OrderSlippageForm/SlippageFormForType.tsx                                                                                                                     5              0             78
apps/trade/client/modules/settings/components/OrderSlippageForm/useOrderSlippageForm/useOrderSlippageForm.ts                                                                                                4              0             26
apps/trade/client/modules/settings/components/OrderSlippageForm/useOrderSlippageForm/useOrderSlippageFormForType.ts                                                                                        14             13             99
apps/trade/client/modules/settings/components/OrderSlippageForm/useOrderSlippageForm/useOrderSlippageValueErrorTooltipContent.ts                                                                            1              0             16
apps/trade/client/modules/settings/components/TradingConsolePosition.tsx                                                                                                                                    2              0             26
apps/trade/client/modules/singleSignatureSessions/components/LinkedSignerSync.tsx                                                                                                                           1              1              5
apps/trade/client/modules/singleSignatureSessions/components/RememberMeSwitch.tsx                                                                                                                           3              0             26
apps/trade/client/modules/singleSignatureSessions/components/SignatureModeSettingsDialog/OneClickTradingStatusPill.tsx                                                                                      2              0             20
apps/trade/client/modules/singleSignatureSessions/components/SignatureModeSettingsDialog/SignatureModeDisable1CTDialogContent/SignatureModeDisable1CTDialogContent.tsx                                      7              0             83
apps/trade/client/modules/singleSignatureSessions/components/SignatureModeSettingsDialog/SignatureModeDisable1CTDialogContent/SignatureModeDisable1CTSubmitButton.tsx                                       3              0             33
apps/trade/client/modules/singleSignatureSessions/components/SignatureModeSettingsDialog/SignatureModeDisable1CTDialogContent/SignatureModeNumSwitchesRemaining.tsx                                         3              0             40
apps/trade/client/modules/singleSignatureSessions/components/SignatureModeSettingsDialog/SignatureModeDisable1CTDialogContent/SignatureModeSaveRememberMeButton.tsx                                         3              0             31
apps/trade/client/modules/singleSignatureSessions/components/SignatureModeSettingsDialog/SignatureModeDisable1CTDialogContent/SignatureModeUserWarning.tsx                                                  3              0             25
apps/trade/client/modules/singleSignatureSessions/components/SignatureModeSettingsDialog/SignatureModeDisable1CTDialogContent/useSignatureModeDisable1CTDialogContent.ts                                   14              5             80
apps/trade/client/modules/singleSignatureSessions/components/SignatureModeSettingsDialog/SignatureModeDisable1CTDialogContent/useSignatureModeRememberMe.ts                                                 8              4             66
apps/trade/client/modules/singleSignatureSessions/components/SignatureModeSettingsDialog/SignatureModeEnable1CTDialogContent/SignatureModeEnable1CTDialogContent.tsx                                        6              0             76
apps/trade/client/modules/singleSignatureSessions/components/SignatureModeSettingsDialog/SignatureModeEnable1CTDialogContent/SignatureModeEnable1CTSubmitButton.tsx                                         3              0             33
apps/trade/client/modules/singleSignatureSessions/components/SignatureModeSettingsDialog/SignatureModeEnable1CTDialogContent/SignatureModeUserStateErrorCard.tsx                                            3              0             30
apps/trade/client/modules/singleSignatureSessions/components/SignatureModeSettingsDialog/SignatureModeEnable1CTDialogContent/useSignatureModeEnable1CTDialogContent.ts                                     17             11            116
apps/trade/client/modules/singleSignatureSessions/components/SignatureModeSettingsDialog/SignatureModeInfo.tsx                                                                                              1              0             19
apps/trade/client/modules/singleSignatureSessions/components/SignatureModeSettingsDialog/SignatureModeSettingsDialog.tsx                                                                                    5              2             37
apps/trade/client/modules/singleSignatureSessions/components/SignatureModeSlowModeEntrypoint.tsx                                                                                                            3              2             44
apps/trade/client/modules/singleSignatureSessions/components/SignatureModeSlowModeSettingsDialog/PrivateKeyInput.tsx                                                                                        6              3             90
apps/trade/client/modules/singleSignatureSessions/components/SignatureModeSlowModeSettingsDialog/SignatureModeSlowModeSettingsDialog.tsx                                                                    4              0             67
apps/trade/client/modules/singleSignatureSessions/components/SignatureModeSlowModeSettingsDialog/SlowModeEnable1CTSwitch.tsx                                                                                2              0             18
apps/trade/client/modules/singleSignatureSessions/components/SignatureModeSlowModeSettingsDialog/SlowModeSettingsActionButton.tsx                                                                           3              1             66
apps/trade/client/modules/singleSignatureSessions/components/SignatureModeSlowModeSettingsDialog/SlowModeSettingsInfoCollapsible.tsx                                                                        3              0             41
apps/trade/client/modules/singleSignatureSessions/components/SignatureModeSlowModeSettingsDialog/hooks/types.ts                                                                                             9              4             28
apps/trade/client/modules/singleSignatureSessions/components/SignatureModeSlowModeSettingsDialog/hooks/useSignatureModeSlowModeSettingsDialog.ts                                                           27             16            246
apps/trade/client/modules/singleSignatureSessions/components/SignatureModeSlowModeSettingsDialog/hooks/useSlowModeSettingsPrivateKeyErrorTooltipContent.tsx                                                 1              0             16
apps/trade/client/modules/singleSignatureSessions/components/SingleSignatureReapprovalDialog/SingleSignatureReapprovalDialog.tsx                                                                            5              1             61
apps/trade/client/modules/singleSignatureSessions/components/SingleSignatureReapprovalDialog/SingleSignatureReapprovalSubmitButton.tsx                                                                      3              0             33
apps/trade/client/modules/singleSignatureSessions/components/SingleSignatureReapprovalDialog/useSingleSignatureReapprovalDialog.tsx                                                                         8              4             69
apps/trade/client/modules/singleSignatureSessions/hooks/useIsSingleSignatureSession.ts                                                                                                                      3              0             14
apps/trade/client/modules/singleSignatureSessions/hooks/useLinkedSignerSync.ts                                                                                                                             11             14             89
apps/trade/client/modules/singleSignatureSessions/hooks/useRequiresApproveSignOnce.ts                                                                                                                       2              1              9
apps/trade/client/modules/singleSignatureSessions/hooks/useRequiresSingleSignatureSetup.ts                                                                                                                  2              1              7
apps/trade/client/modules/singleSignatureSessions/hooks/useSavedSubaccountSigningPreference.ts                                                                                                             19              7            109
apps/trade/client/modules/singleSignatureSessions/types.ts                                                                                                                                                  6              1             27
apps/trade/client/modules/socialSharing/PerpPnlSocialSharingDialog.tsx                                                                                                                                      6              1             96
apps/trade/client/modules/socialSharing/components/SocialSharingButtons.tsx                                                                                                                                 2              0             48
apps/trade/client/modules/socialSharing/components/SocialSharingInstructionsCard.tsx                                                                                                                        1              0             19
apps/trade/client/modules/socialSharing/components/SocialSharingMarketInfo.tsx                                                                                                                              2              0             46
apps/trade/client/modules/socialSharing/components/SocialSharingMetric.tsx                                                                                                                                  3              0             20
apps/trade/client/modules/socialSharing/components/SocialSharingPnlInfo.tsx                                                                                                                                 2              1             30
apps/trade/client/modules/socialSharing/components/SocialSharingPreview.tsx                                                                                                                                 4              2             70
apps/trade/client/modules/socialSharing/components/SocialSharingThemeSelector.tsx                                                                                                                           3              0             57
apps/trade/client/modules/socialSharing/hooks/socialSharingConfig.ts                                                                                                                                        3              0            104
apps/trade/client/modules/socialSharing/hooks/useSocialSharingImageGeneration.ts                                                                                                                           35             14            157
apps/trade/client/modules/staking/dialogs/MigrateStakingDialog/MigrateStakingDialog.tsx                                                                                                                     3              0             78
apps/trade/client/modules/staking/dialogs/MigrateStakingDialog/MigrateStakingSubmitButton.tsx                                                                                                               3              0             34
apps/trade/client/modules/staking/dialogs/MigrateStakingDialog/useMigrateStakingDialog.ts                                                                                                                  12              0             88
apps/trade/client/modules/staking/dialogs/StakeV2VrtxDialog/StakeV2VrtxDialog.tsx                                                                                                                           4              0            143
apps/trade/client/modules/staking/dialogs/StakeV2VrtxDialog/StakeV2VrtxSubmitButton.tsx                                                                                                                     4              0             42
apps/trade/client/modules/staking/dialogs/StakeV2VrtxDialog/StakeV2VrtxSummary.tsx                                                                                                                          3              0             38
apps/trade/client/modules/staking/dialogs/StakeV2VrtxDialog/useStakeV2VrtxDialog.ts                                                                                                                        30              9            227
apps/trade/client/modules/staking/dialogs/StakeV2VrtxDialog/useStakeV2VrtxSummary.ts                                                                                                                       12              3             85
apps/trade/client/modules/staking/dialogs/StakingSetTradingWalletDialog/StakingSetTradingWalletDialog.tsx                                                                                                  11              2             90
apps/trade/client/modules/staking/dialogs/UnstakeV1VrtxDialog/UnstakeV1VrtxDialog.tsx                                                                                                                       2              0             80
apps/trade/client/modules/staking/dialogs/UnstakeV1VrtxDialog/UnstakeVrtxSubmitButton.tsx                                                                                                                   3              0             34
apps/trade/client/modules/staking/dialogs/UnstakeV1VrtxDialog/useUnstakeV1VrtxDialog.ts                                                                                                                    12              3             93
apps/trade/client/modules/staking/dialogs/UnstakeV2VrtxDialog/UnstakeV2VrtxDialog.tsx                                                                                                                       3              0            126
apps/trade/client/modules/staking/dialogs/UnstakeV2VrtxDialog/UnstakeV2VrtxErrorPanel.tsx                                                                                                                   2              0             17
apps/trade/client/modules/staking/dialogs/UnstakeV2VrtxDialog/UnstakeV2VrtxRadioGroup.tsx                                                                                                                   6              0             85
apps/trade/client/modules/staking/dialogs/UnstakeV2VrtxDialog/UnstakeV2VrtxSubmitButton.tsx                                                                                                                 3              0             40
apps/trade/client/modules/staking/dialogs/UnstakeV2VrtxDialog/useUnstakeV2VrtxDialog.ts                                                                                                                    20              2            133
apps/trade/client/modules/staking/dialogs/components/UnstakeDialogVrtxBalance.tsx                                                                                                                           1              0             32
apps/trade/client/modules/staking/dialogs/useStakeVrtxAmountErrorTooltipContent.tsx                                                                                                                         1              0             18
apps/trade/client/modules/staking/hooks/useStakingV2Rewards.ts                                                                                                                                              5              1             50
apps/trade/client/modules/staking/hooks/useVrtxMarketMetrics.ts                                                                                                                                             6              0             33
apps/trade/client/modules/subaccounts/avatarLibraryData.ts                                                                                                                                                  3              0             74
apps/trade/client/modules/subaccounts/components/EnsAvatarImage.tsx                                                                                                                                         2              2             19
apps/trade/client/modules/subaccounts/components/ProfileAvatarIcon.tsx                                                                                                                                      7              6             55
apps/trade/client/modules/subaccounts/components/SubaccountSwitcherDropdownContent.tsx                                                                                                                      3              0             99
apps/trade/client/modules/subaccounts/components/dialogs/AddSubaccountDialog/AddSubaccountDialog.tsx                                                                                                        5              0            103
apps/trade/client/modules/subaccounts/components/dialogs/AddSubaccountDialog/AddSubaccountDialogStepHeader.tsx                                                                                              1              0             20
apps/trade/client/modules/subaccounts/components/dialogs/EditSubaccountProfileDialog/EditSubaccountProfileActionButtons.tsx                                                                                 2              0             27
apps/trade/client/modules/subaccounts/components/dialogs/EditSubaccountProfileDialog/EditSubaccountProfileDialog.tsx                                                                                        3              0             50
apps/trade/client/modules/subaccounts/components/dialogs/EditSubaccountProfileDialog/SubaccountProfileFormInputs.tsx                                                                                        3              0             59
apps/trade/client/modules/subaccounts/components/dialogs/EditSubaccountProfileDialog/SubaccountProfilePreview.tsx                                                                                           3              1             27
apps/trade/client/modules/subaccounts/components/dialogs/EditSubaccountProfileDialog/avatarSection/AvatarTypeButton.tsx                                                                                    10              0             63
apps/trade/client/modules/subaccounts/components/dialogs/EditSubaccountProfileDialog/avatarSection/AvatarTypeSelector.tsx                                                                                  12              2            124
apps/trade/client/modules/subaccounts/components/dialogs/EditSubaccountProfileDialog/avatarSection/LibraryAvatarList.tsx                                                                                    3              3             55
apps/trade/client/modules/subaccounts/components/dialogs/EditSubaccountProfileDialog/usernameSection/UsernameInput.tsx                                                                                      3              0             28
apps/trade/client/modules/subaccounts/components/dialogs/ManageSubaccountsDialog/ManageSubaccountsDialog.tsx                                                                                                3              2             94
apps/trade/client/modules/subaccounts/components/dialogs/ManageSubaccountsDialog/ManageSubaccountsDialogSubaccountCard.tsx                                                                                  3              0             93
apps/trade/client/modules/subaccounts/components/dialogs/SubaccountQuoteTransferDialog/SubaccountQuoteTransferAmountInput.tsx                                                                               2              0             37
apps/trade/client/modules/subaccounts/components/dialogs/SubaccountQuoteTransferDialog/SubaccountQuoteTransferDialog.tsx                                                                                    5              0            122
apps/trade/client/modules/subaccounts/components/dialogs/SubaccountQuoteTransferDialog/SubaccountQuoteTransferEnableBorrowsSwitch.tsx                                                                       2              0             28
apps/trade/client/modules/subaccounts/components/dialogs/SubaccountQuoteTransferDialog/SubaccountQuoteTransferInputSummary.tsx                                                                              2              0             44
apps/trade/client/modules/subaccounts/components/dialogs/SubaccountQuoteTransferDialog/SubaccountQuoteTransferOverviewCards.tsx                                                                             5              1             85
apps/trade/client/modules/subaccounts/components/dialogs/SubaccountQuoteTransferDialog/SubaccountQuoteTransferSelect.tsx                                                                                    6              1             70
apps/trade/client/modules/subaccounts/components/dialogs/SubaccountQuoteTransferDialog/SubaccountQuoteTransferSubmitButton.tsx                                                                              3              0             39
apps/trade/client/modules/subaccounts/components/dialogs/SubaccountQuoteTransferDialog/SubaccountQuoteTransferSummaryDisclosure.tsx                                                                         8              0            111
apps/trade/client/modules/subaccounts/consts.ts                                                                                                                                                             4              4              6
apps/trade/client/modules/subaccounts/hooks/useAllSubaccountsWithMetrics.ts                                                                                                                                 8              6             62
apps/trade/client/modules/subaccounts/hooks/useCumulativePortfolioValueUsd.ts                                                                                                                               4              3             15
apps/trade/client/modules/subaccounts/hooks/useEnsProfile.ts                                                                                                                                                4              1             22
apps/trade/client/modules/subaccounts/hooks/useSavedSubaccountSettings.ts                                                                                                                                   8              0             51
apps/trade/client/modules/subaccounts/hooks/useSubaccountProfileForm.ts                                                                                                                                    16             15             94
apps/trade/client/modules/subaccounts/hooks/useSubaccountQuoteTransferForm/types.ts                                                                                                                         2              0             11
apps/trade/client/modules/subaccounts/hooks/useSubaccountQuoteTransferForm/useSubaccountQuoteTransferAmountErrorTooltipContent.ts                                                                           2              0             21
apps/trade/client/modules/subaccounts/hooks/useSubaccountQuoteTransferForm/useSubaccountQuoteTransferForm.ts                                                                                               28              2            234
apps/trade/client/modules/subaccounts/hooks/useSubaccountQuoteTransferForm/useSubaccountQuoteTransferFormData.ts                                                                                           18              4            109
apps/trade/client/modules/subaccounts/hooks/useSubaccountQuoteTransferForm/useSubaccountQuoteTransferFormSubmitHandler.ts                                                                                  10              1             63
apps/trade/client/modules/subaccounts/hooks/useSubaccountQuoteTransferForm/useSubaccountQuoteTransferValidateAmount.ts                                                                                      6              0             34
apps/trade/client/modules/subaccounts/hooks/useUsernameErrorTooltipContent.tsx                                                                                                                              1              0             16
apps/trade/client/modules/subaccounts/types.ts                                                                                                                                                              7              0             21
apps/trade/client/modules/subaccounts/utils/getAppSubaccountName.ts                                                                                                                                         2              3              7
apps/trade/client/modules/subaccounts/utils/getDefaultSubaccountProfile.ts                                                                                                                                  1              0             11
apps/trade/client/modules/subaccounts/utils/getDefaultSubaccountUsername.ts                                                                                                                                 5              7             12
apps/trade/client/modules/subaccounts/utils/getSubaccountIdentityIconId.ts                                                                                                                                  1              7              7
apps/trade/client/modules/subaccounts/utils/getSubaccountKey.ts                                                                                                                                             1              4              4
apps/trade/client/modules/subaccounts/utils/isAppSubaccountName.ts                                                                                                                                          2              7              9
apps/trade/client/modules/tables/EmptyTablePlaceholder.tsx                                                                                                                                                  5              2            109
apps/trade/client/modules/tables/MoneyMarketsTable.tsx                                                                                                                                                      5              0            220
apps/trade/client/modules/tables/OpenEngineOrdersTable.tsx                                                                                                                                                 12              3            247
apps/trade/client/modules/tables/OpenTriggerOrdersTable.tsx                                                                                                                                                 7              2            184
apps/trade/client/modules/tables/PaginatedFundingPaymentsTable.tsx                                                                                                                                          4              0            160
apps/trade/client/modules/tables/PaginatedHistoricalTradesTable.tsx                                                                                                                                         5              0            153
apps/trade/client/modules/tables/PaginatedInterestPaymentsTable.tsx                                                                                                                                         4              0            135
apps/trade/client/modules/tables/PaginatedRealizedPnlEventsTable.tsx                                                                                                                                       11              0            225
apps/trade/client/modules/tables/PerpPositionsTable.tsx                                                                                                                                                    11              0            346
apps/trade/client/modules/tables/SpotBalancesTable.tsx                                                                                                                                                      9              2            177
apps/trade/client/modules/tables/cells/AddressCell.tsx                                                                                                                                                      2              0             13
apps/trade/client/modules/tables/cells/AmountFilledCell.tsx                                                                                                                                                 2              0             45
apps/trade/client/modules/tables/cells/AmountWithSymbolCell.tsx                                                                                                                                             2              2             28
apps/trade/client/modules/tables/cells/CancelAllOrdersHeaderCell.tsx                                                                                                                                        1              0             17
apps/trade/client/modules/tables/cells/CancelOrderCell.tsx                                                                                                                                                  2              0             19
apps/trade/client/modules/tables/cells/CloseAllPositionsHeaderCell.tsx                                                                                                                                      1              0             14
apps/trade/client/modules/tables/cells/CurrencyCell.tsx                                                                                                                                                     2              1             18
apps/trade/client/modules/tables/cells/DateTimeCell.tsx                                                                                                                                                     2              0             24
apps/trade/client/modules/tables/cells/FavoriteHeaderCell.tsx                                                                                                                                               3              1             35
apps/trade/client/modules/tables/cells/FavoriteToggleCell.tsx                                                                                                                                               2              0             39
apps/trade/client/modules/tables/cells/MarketInfoWithSideCell.tsx                                                                                                                                           4              0             30
apps/trade/client/modules/tables/cells/NumberCell.tsx                                                                                                                                                       2              0             16
apps/trade/client/modules/tables/cells/OrderTypeCell.tsx                                                                                                                                                    3              0             42
apps/trade/client/modules/tables/cells/PercentageCell.tsx                                                                                                                                                   3              0             21
apps/trade/client/modules/tables/cells/PercentageChangeCell.tsx                                                                                                                                             3              1             22
apps/trade/client/modules/tables/cells/PerpMarginLeverageCell.tsx                                                                                                                                           3              1             43
apps/trade/client/modules/tables/cells/PerpStackedEntryOracleCell.tsx                                                                                                                                       2              0             33
apps/trade/client/modules/tables/cells/PerpStackedPnlCell.tsx                                                                                                                                               3              1             42
apps/trade/client/modules/tables/cells/PerpTpSlCell.tsx                                                                                                                                                     7              2            121
apps/trade/client/modules/tables/cells/PnlCell.tsx                                                                                                                                                          2              0             30
apps/trade/client/modules/tables/cells/RankCell.tsx                                                                                                                                                         4              0             30
apps/trade/client/modules/tables/cells/SpotActionButtonCell.tsx                                                                                                                                             5              3            124
apps/trade/client/modules/tables/cells/StackedAmountValueCell.tsx                                                                                                                                           3              2             47
apps/trade/client/modules/tables/cells/StackedTokenPairCell.tsx                                                                                                                                             2              0             16
apps/trade/client/modules/tables/cells/TitleHeaderCell.tsx                                                                                                                                                  2              0             13
apps/trade/client/modules/tables/cells/TriggerOrderAmountWithSymbolCell.tsx                                                                                                                                 4              1             33
apps/trade/client/modules/tables/detailDialogs/LpBalanceDetailsDialog.tsx                                                                                                                                   5              0             97
apps/trade/client/modules/tables/detailDialogs/LpMarketDetailsDialog.tsx                                                                                                                                    7              0            114
apps/trade/client/modules/tables/detailDialogs/MarketDetailsDialog.tsx                                                                                                                                      8              0            104
apps/trade/client/modules/tables/detailDialogs/OpenEngineOrderDetailsDialog.tsx                                                                                                                             7              0            165
apps/trade/client/modules/tables/detailDialogs/OpenTriggerOrderDetailsDialog.tsx                                                                                                                            7              0            125
apps/trade/client/modules/tables/detailDialogs/PerpPositionDetailsDialog.tsx                                                                                                                                8              0            144
apps/trade/client/modules/tables/detailDialogs/PreLiquidationDetailsDialog/PreLiquidationBalanceAccordionItem.tsx                                                                                           2              0             50
apps/trade/client/modules/tables/detailDialogs/PreLiquidationDetailsDialog/PreLiquidationDetailsDialog.tsx                                                                                                  9              0            190
apps/trade/client/modules/tables/detailDialogs/PreLiquidationDetailsDialog/types.ts                                                                                                                         0              0              3
apps/trade/client/modules/tables/detailDialogs/PreLiquidationDetailsDialog/usePreLiquidationDetailsDialog.ts                                                                                               21              1            152
apps/trade/client/modules/tables/detailDialogs/RealizedPnlDetailsDialog.tsx                                                                                                                                 8              0             90
apps/trade/client/modules/tables/detailDialogs/SpotBalanceDetailsDialog.tsx                                                                                                                                 7              0             67
apps/trade/client/modules/tables/detailDialogs/components/BalancesButtons.tsx                                                                                                                               4              0             84
apps/trade/client/modules/tables/detailDialogs/components/LpCtaButtons.tsx                                                                                                                                  3              0             44
apps/trade/client/modules/tables/detailDialogs/components/LpHeader.tsx                                                                                                                                      2              0             50
apps/trade/client/modules/tables/detailDialogs/components/ProductHeader.tsx                                                                                                                                 2              0             44
apps/trade/client/modules/tables/detailDialogs/components/base/TableDetailDialog.tsx                                                                                                                        3              0             29
apps/trade/client/modules/tables/detailDialogs/hooks/useOpenOrderDetailsDialog.tsx                                                                                                                          9              0             68
apps/trade/client/modules/tables/hooks/useFundingPaymentsTable.ts                                                                                                                                          15              3            130
apps/trade/client/modules/tables/hooks/useHistoricalTradesTable.ts                                                                                                                                         16              3            156
apps/trade/client/modules/tables/hooks/useInterestPaymentsTable.ts                                                                                                                                         14              1            113
apps/trade/client/modules/tables/hooks/useMoneyMarketsTable.ts                                                                                                                                             10              0             92
apps/trade/client/modules/tables/hooks/useOpenEngineOrdersTable.ts                                                                                                                                          9              1            142
apps/trade/client/modules/tables/hooks/useOpenTriggerOrdersTable.ts                                                                                                                                        10              2            116
apps/trade/client/modules/tables/hooks/usePerpPositionsTable.ts                                                                                                                                             7              1            138
apps/trade/client/modules/tables/hooks/useRealizedPnlEventsTable.ts                                                                                                                                        15              2            185
apps/trade/client/modules/tables/hooks/useSpotBalancesTable.ts                                                                                                                                              8              4             75
apps/trade/client/modules/tables/types/HistoricalTradesTableItem.ts                                                                                                                                         1              0             19
apps/trade/client/modules/tables/types/MarketInfoCellData.ts                                                                                                                                                1              0             14
apps/trade/client/modules/tables/types/RealizedPnlEventsTableItem.ts                                                                                                                                        1              0             17
apps/trade/client/modules/tables/utils/getTableButtonOnClickHandler.ts                                                                                                                                      2              0              9
apps/trade/client/modules/tooltips/DefinitionTooltip/DefinitionTooltip.tsx                                                                                                                                  6              6             70
apps/trade/client/modules/tooltips/DefinitionTooltip/content/commonTooltips.tsx                                                                                                                             1              3            112
apps/trade/client/modules/tooltips/DefinitionTooltip/content/dialogTooltips.tsx                                                                                                                            11              0            190
apps/trade/client/modules/tooltips/DefinitionTooltip/content/pageTooltips.tsx                                                                                                                              16              0            585
apps/trade/client/modules/tooltips/DefinitionTooltip/content/tableTooltips.tsx                                                                                                                             16              0            269
apps/trade/client/modules/tooltips/DefinitionTooltip/definitionTooltipConfig.tsx                                                                                                                            2              0             12
apps/trade/client/modules/tooltips/DefinitionTooltip/types.ts                                                                                                                                               3              0             12
apps/trade/client/modules/trading/OrderFillQueryRefetchListener.tsx                                                                                                                                        13             16             79
apps/trade/client/modules/trading/TpSlPositionChangeListener.tsx                                                                                                                                           11             18             70
apps/trade/client/modules/trading/chart/SaveLoadAdapter.ts                                                                                                                                                 31             18            155
apps/trade/client/modules/trading/chart/TradingChartTabs.tsx                                                                                                                                                5              1             61
apps/trade/client/modules/trading/chart/TradingViewChart.tsx                                                                                                                                                3              0             34
apps/trade/client/modules/trading/chart/config/datafeedConfig.ts                                                                                                                                           11             10             86
apps/trade/client/modules/trading/chart/config/types.ts                                                                                                                                                     1              3              9
apps/trade/client/modules/trading/chart/config/widgetConfig.ts                                                                                                                                             17             15            123
apps/trade/client/modules/trading/chart/depth/DepthChart.tsx                                                                                                                                                5              0             82
apps/trade/client/modules/trading/chart/depth/DepthChartTooltip.tsx                                                                                                                                         5              1             57
apps/trade/client/modules/trading/chart/depth/useDepthChart.ts                                                                                                                                             21              9            109
apps/trade/client/modules/trading/chart/funding/FundingChart.tsx                                                                                                                                            5              4            101
apps/trade/client/modules/trading/chart/funding/FundingChartHeader.tsx                                                                                                                                      3              0             37
apps/trade/client/modules/trading/chart/funding/FundingChartSelect.tsx                                                                                                                                      5              0             62
apps/trade/client/modules/trading/chart/funding/FundingChartTooltip.tsx                                                                                                                                     3              1             44
apps/trade/client/modules/trading/chart/funding/useFundingChart.ts                                                                                                                                         14              4             76
apps/trade/client/modules/trading/chart/hooks/useApplyWidgetOverrides.ts                                                                                                                                    4              0             17
apps/trade/client/modules/trading/chart/hooks/useDrawChartEntryLines.ts                                                                                                                                    27             14            166
apps/trade/client/modules/trading/chart/hooks/useDrawChartLinesWhenReady.ts                                                                                                                                 3              6             36
apps/trade/client/modules/trading/chart/hooks/useDrawChartOrderLines.tsx                                                                                                                                   56             35            320
apps/trade/client/modules/trading/chart/hooks/useSyncWidgetSymbol.ts                                                                                                                                        5              0             38
apps/trade/client/modules/trading/chart/hooks/useTradingViewChart.ts                                                                                                                                       12              7             55
apps/trade/client/modules/trading/chart/hooks/useTradingViewData/types.ts                                                                                                                                   1              0              7
apps/trade/client/modules/trading/chart/hooks/useTradingViewData/useTradingViewData.ts                                                                                                                     45             24            310
apps/trade/client/modules/trading/chart/hooks/useTradingViewData/useUpdateLatestBar.ts                                                                                                                     14              6             85
apps/trade/client/modules/trading/chart/hooks/useTradingViewData/utils.ts                                                                                                                                   8              9             35
apps/trade/client/modules/trading/chart/hooks/useTradingViewWidget.ts                                                                                                                                      22              8            132
apps/trade/client/modules/trading/chart/hooks/useUpdateLimitPriceOnCrosshairClick.ts                                                                                                                        9              2             47
apps/trade/client/modules/trading/chart/utils/isChartSyncedToSymbolInfo.ts                                                                                                                                  1              8              9
apps/trade/client/modules/trading/closeAllPositions/CloseAllPositionsDialog.tsx                                                                                                                             8              0             80
apps/trade/client/modules/trading/closeAllPositions/hooks/useCloseAllPositionsDialog.ts                                                                                                                     5              0             40
apps/trade/client/modules/trading/closePosition/ClosePositionDialog.tsx                                                                                                                                     3              0             93
apps/trade/client/modules/trading/closePosition/components/ClosePositionButton.tsx                                                                                                                          2              0             40
apps/trade/client/modules/trading/closePosition/components/ClosePositionMetrics.tsx                                                                                                                         2              0             94
apps/trade/client/modules/trading/closePosition/components/ClosePositionSummary.tsx                                                                                                                         5              0             47
apps/trade/client/modules/trading/closePosition/hooks/useClosePositionForm.ts                                                                                                                              16              7            129
apps/trade/client/modules/trading/components/AdvancedOrderSettings/AdvancedOrderSettings.tsx                                                                                                                7              0            126
apps/trade/client/modules/trading/components/AdvancedOrderSettings/TimeInForceTypeSelect.tsx                                                                                                                4              0             66
apps/trade/client/modules/trading/components/AdvancedOrderSettings/hooks/useAdvancedOrderSettings.ts                                                                                                        8              0             49
apps/trade/client/modules/trading/components/BaseMarketSwitcherTable/cells/MarketSwitcherStackedPriceCell.tsx                                                                                               3              0             38
apps/trade/client/modules/trading/components/HistoricalTradesTab.tsx                                                                                                                                        6              0             69
apps/trade/client/modules/trading/components/MarketDataTabs.tsx                                                                                                                                             7              1            101
apps/trade/client/modules/trading/components/MarketInfoCardsContainer.tsx                                                                                                                                   1              0             19
apps/trade/client/modules/trading/components/MobileTradingTab/MobileTradingTabEngineOrders.tsx                                                                                                              3              0             98
apps/trade/client/modules/trading/components/MobileTradingTab/MobileTradingTabHistoricalTrades.tsx                                                                                                          3              0             94
apps/trade/client/modules/trading/components/MobileTradingTab/MobileTradingTabPositions/MobileTradingTabPositions.tsx                                                                                       3              0            186
apps/trade/client/modules/trading/components/MobileTradingTab/MobileTradingTabPositions/MobileTradingTabPositionsActionButtons.tsx                                                                          6              0             59
apps/trade/client/modules/trading/components/MobileTradingTab/MobileTradingTabRealizedPnlEvents.tsx                                                                                                         3              0            104
apps/trade/client/modules/trading/components/MobileTradingTab/MobileTradingTabSpotBalances/MobileTradingTabSpotBalances.tsx                                                                                 3              0             86
apps/trade/client/modules/trading/components/MobileTradingTab/MobileTradingTabSpotBalances/MobileTradingTabSpotBalancesActionButtons.tsx                                                                    4              0             62
apps/trade/client/modules/trading/components/MobileTradingTab/MobileTradingTabTrade.tsx                                                                                                                     2              0             13
apps/trade/client/modules/trading/components/MobileTradingTab/MobileTradingTabTriggerOrders.tsx                                                                                                             3              0            100
apps/trade/client/modules/trading/components/MobileTradingTab/components/MobileTradingTabActions.tsx                                                                                                        3              2             24
apps/trade/client/modules/trading/components/MobileTradingTab/components/MobileTradingTabDataCardHeader.tsx                                                                                                 8              9             96
apps/trade/client/modules/trading/components/MobileTradingTab/components/MobileTradingTabDataCards.tsx                                                                                                      4              0             25
apps/trade/client/modules/trading/components/MobileTradingTabs.tsx                                                                                                                                          2              5             59
apps/trade/client/modules/trading/components/OpenEngineOrdersTab.tsx                                                                                                                                        6              0             67
apps/trade/client/modules/trading/components/OpenTriggerOrdersTab.tsx                                                                                                                                       6              0             67
apps/trade/client/modules/trading/components/OrderFormInputs.tsx                                                                                                                                            4              3            121
apps/trade/client/modules/trading/components/OrderFormSpreadWarningPanel.tsx                                                                                                                                1              0              8
apps/trade/client/modules/trading/components/OrderFormVrtxBorrowWarningPanel.tsx                                                                                                                            1              0             10
apps/trade/client/modules/trading/components/OrderSideTabs.tsx                                                                                                                                              3              0             45
apps/trade/client/modules/trading/components/OrderSubmitButton.tsx                                                                                                                                         10              2             82
apps/trade/client/modules/trading/components/PerpMarginModeCrossInfo.tsx                                                                                                                                    1              0             17
apps/trade/client/modules/trading/components/PerpMarginModeIsolatedInfo.tsx                                                                                                                                 2              0             16
apps/trade/client/modules/trading/components/PriceTypeTabs.tsx                                                                                                                                              9              4             86
apps/trade/client/modules/trading/components/RangeSlider.tsx                                                                                                                                                8              2            114
apps/trade/client/modules/trading/components/RealizedPnlEventsTab.tsx                                                                                                                                       8              1             61
apps/trade/client/modules/trading/components/StopMarketOrderDismissible.tsx                                                                                                                                 3              0             53
apps/trade/client/modules/trading/components/StopOrderTriggerPriceInfo.tsx                                                                                                                                  3              0             30
apps/trade/client/modules/trading/components/TradeInput.tsx                                                                                                                                                 2              1             52
apps/trade/client/modules/trading/components/TradingErrorPanel.tsx                                                                                                                                          4              0             22
apps/trade/client/modules/trading/components/TradingMarketSwitcher/TradingMarketSwitcher.tsx                                                                                                                5              7             92
apps/trade/client/modules/trading/components/TradingMarketSwitcher/TradingMarketSwitcherPopoverTrigger.tsx                                                                                                  6              4             65
apps/trade/client/modules/trading/components/TradingMarketSwitcher/TradingMarketSwitcherProductInfoCell.tsx                                                                                                 2              0             36
apps/trade/client/modules/trading/components/TradingMarketSwitcher/TradingMarketSwitcherTable.tsx                                                                                                           6              1            110
apps/trade/client/modules/trading/components/TradingTableTabs/LargeScreenTradingTableTabs.tsx                                                                                                               3              1             68
apps/trade/client/modules/trading/components/TradingTableTabs/TradingTabFilterSelect.tsx                                                                                                                    5              0             53
apps/trade/client/modules/trading/components/TradingTableTabs/TradingTableTabsTrigger.tsx                                                                                                                   2              0             39
apps/trade/client/modules/trading/components/TradingTableTabs/hooks/useSelectedFilterByTradingTableTabSetting.ts                                                                                            4              0             29
apps/trade/client/modules/trading/components/TradingTableTabs/types.ts                                                                                                                                      9              0             32
apps/trade/client/modules/trading/components/TriggerOrderEnableOneClickTradingInfo.tsx                                                                                                                      4              0             26
apps/trade/client/modules/trading/defaultOrderSlippage.ts                                                                                                                                                   1              0              7
apps/trade/client/modules/trading/hooks/orderFormContext/useOrderFormConversionPrices.ts                                                                                                                    8              6             70
apps/trade/client/modules/trading/hooks/orderFormContext/useOrderFormEnableMaxSizeLogic.ts                                                                                                                  6              5             23
apps/trade/client/modules/trading/hooks/orderFormContext/useOrderFormError.ts                                                                                                                               8              6             71
apps/trade/client/modules/trading/hooks/orderFormContext/useOrderFormMarketSelection.ts                                                                                                                    13             15             92
apps/trade/client/modules/trading/hooks/orderFormContext/useOrderFormMaxOrderSizes.ts                                                                                                                       9              4             69
apps/trade/client/modules/trading/hooks/orderFormContext/useOrderFormOnChangeSideEffects.ts                                                                                                                22             41            250
apps/trade/client/modules/trading/hooks/orderFormContext/useOrderFormProductData.ts                                                                                                                        13              3             80
apps/trade/client/modules/trading/hooks/orderFormContext/useOrderFormSubmitHandler.ts                                                                                                                      26             12            250
apps/trade/client/modules/trading/hooks/orderFormContext/useOrderFormValidators.ts                                                                                                                         12              0            122
apps/trade/client/modules/trading/hooks/useEnableTradingNotifications.ts                                                                                                                                    3              0             19
apps/trade/client/modules/trading/hooks/useEnableTradingOrderLines.ts                                                                                                                                       3              0             18
apps/trade/client/modules/trading/hooks/useEstimateTradeEntry.ts                                                                                                                                           26             36            147
apps/trade/client/modules/trading/hooks/useIsHighSpread.ts                                                                                                                                                  5              0             23
apps/trade/client/modules/trading/hooks/useMarketSwitcher/types.ts                                                                                                                                          1              0             22
apps/trade/client/modules/trading/hooks/useMarketSwitcher/useMarketSwitcher.ts                                                                                                                             13              0            103
apps/trade/client/modules/trading/hooks/useMarketSwitcher/utils.ts                                                                                                                                          6              1             53
apps/trade/client/modules/trading/hooks/useNextFundingTime.ts                                                                                                                                               9              6             25
apps/trade/client/modules/trading/hooks/useOrderFormAssetAmountErrorTooltipContent.ts                                                                                                                       1              0             29
apps/trade/client/modules/trading/hooks/useOrderFormInputs.tsx                                                                                                                                             14              3            110
apps/trade/client/modules/trading/hooks/useOrderFormPriceErrorTooltipContent.tsx                                                                                                                            1              0             23
apps/trade/client/modules/trading/hooks/useOrderFormQuoteAmountErrorTooltipContent.ts                                                                                                                       1              0             18
apps/trade/client/modules/trading/hooks/useOrderFormTimeInForceInDaysErrorTooltipContent.tsx                                                                                                                1              0             18
apps/trade/client/modules/trading/hooks/useOrderSlippageSettings.ts                                                                                                                                         5              0             30
apps/trade/client/modules/trading/hooks/useSetPriceInput.ts                                                                                                                                                 4              0             24
apps/trade/client/modules/trading/hooks/useSpotLeverageEnabled.ts                                                                                                                                           2              0             18
apps/trade/client/modules/trading/hooks/useTradingConsolePosition.ts                                                                                                                                        3              0             19
apps/trade/client/modules/trading/hooks/useTradingMarketSwitcher.ts                                                                                                                                         6              0             38
apps/trade/client/modules/trading/hooks/useTradingPageHead.ts                                                                                                                                               6              6             34
apps/trade/client/modules/trading/layout/DesktopTradingLayout.tsx                                                                                                                                           1              0             24
apps/trade/client/modules/trading/layout/LargeScreenTradingLayout.tsx                                                                                                                                       4              5             98
apps/trade/client/modules/trading/layout/MobileTradingLayout.tsx                                                                                                                                            1              2             37
apps/trade/client/modules/trading/layout/TabletTradingLayout.tsx                                                                                                                                            1              0             27
apps/trade/client/modules/trading/layout/TradingPageLayout.tsx                                                                                                                                              2              0             16
apps/trade/client/modules/trading/layout/types.ts                                                                                                                                                           6              1             37
apps/trade/client/modules/trading/marketOrders/components/MarketOrderRow.tsx                                                                                                                                9              1            119
apps/trade/client/modules/trading/marketOrders/components/MarketOrderRows.tsx                                                                                                                               5              0             46
apps/trade/client/modules/trading/marketOrders/components/MarketOrdersHeaderRow.tsx                                                                                                                         3              0             38
apps/trade/client/modules/trading/marketOrders/latestMarketTrades/LatestMarketTrades.tsx                                                                                                                    7              3             96
apps/trade/client/modules/trading/marketOrders/latestMarketTrades/hooks/useLatestMarketTrades.ts                                                                                                           15              1             89
apps/trade/client/modules/trading/marketOrders/orderbook/Orderbook.tsx                                                                                                                                      8              1            161
apps/trade/client/modules/trading/marketOrders/orderbook/assets/orderbook-asks-icon.svg                                                                                                                     0              0              6
apps/trade/client/modules/trading/marketOrders/orderbook/assets/orderbook-bids-and-asks-icon.svg                                                                                                            0              0              7
apps/trade/client/modules/trading/marketOrders/orderbook/assets/orderbook-bids-icon.svg                                                                                                                     0              0              6
apps/trade/client/modules/trading/marketOrders/orderbook/components/OrderbookPriceBox.tsx                                                                                                                   7              2            114
apps/trade/client/modules/trading/marketOrders/orderbook/components/OrderbookSettings.tsx                                                                                                                   3              0             53
apps/trade/client/modules/trading/marketOrders/orderbook/components/TickSpacingSelect.tsx                                                                                                                   4              0             58
apps/trade/client/modules/trading/marketOrders/orderbook/components/ToggleViewButton.tsx                                                                                                                    3              0             37
apps/trade/client/modules/trading/marketOrders/orderbook/components/TotalAmountDenomSelect.tsx                                                                                                              5              0             67
apps/trade/client/modules/trading/marketOrders/orderbook/hooks/mapOrderbookDataFromQueries.ts                                                                                                              25              9            164
apps/trade/client/modules/trading/marketOrders/orderbook/hooks/types.ts                                                                                                                                     4             10             46
apps/trade/client/modules/trading/marketOrders/orderbook/hooks/useOrderbook.ts                                                                                                                             20              6            117
apps/trade/client/modules/trading/marketOrders/orderbook/hooks/useSelectedTickSpacingMultiplier.ts                                                                                                          6              2             35
apps/trade/client/modules/trading/marketOrders/orderbook/hooks/useShowOrderbookTotalInQuote.ts                                                                                                              4              0             23
apps/trade/client/modules/trading/marketOrders/orderbook/types.ts                                                                                                                                           2              0              6
apps/trade/client/modules/trading/tpsl/components/TpSlTriggerCriteriaPriceTypeSelect.tsx                                                                                                                    5              0             60
apps/trade/client/modules/trading/tpsl/consts.ts                                                                                                                                                            1              7              2
apps/trade/client/modules/trading/tpsl/hooks/useTpSlPlaceOrderForm/types.ts                                                                                                                                 5              9             37
apps/trade/client/modules/trading/tpsl/hooks/useTpSlPlaceOrderForm/useSavedTpSlTriggerPriceType.ts                                                                                                          3              0             19
apps/trade/client/modules/trading/tpsl/hooks/useTpSlPlaceOrderForm/useTpSlPlaceOrderForm.ts                                                                                                                20             15            155
apps/trade/client/modules/trading/tpsl/hooks/useTpSlPlaceOrderForm/useTpSlPlaceOrderFormEstimatedState.ts                                                                                                  10              4             73
apps/trade/client/modules/trading/tpsl/hooks/useTpSlPlaceOrderForm/useTpSlPlaceOrderFormOnChangeSideEffects.ts                                                                                             13              8            109
apps/trade/client/modules/trading/tpsl/hooks/useTpSlPlaceOrderForm/useTpSlPlaceOrderFormSubmitHandler.ts                                                                                                   16              4            143
apps/trade/client/modules/trading/tpsl/hooks/useTpSlPlaceOrderForm/useTpSlPlaceOrderTriggerPriceErrorTooltipContent.ts                                                                                      5              0             44
apps/trade/client/modules/trading/tpsl/hooks/useTpSlPlaceOrderForm/useTpSlTriggerPriceValidator.ts                                                                                                          6             10             58
apps/trade/client/modules/trading/tpsl/tpslDialog/TpSlDialog.tsx                                                                                                                                            3              0             36
apps/trade/client/modules/trading/tpsl/tpslDialog/components/TpSlCancelOrderButton.tsx                                                                                                                      4              0             50
apps/trade/client/modules/trading/tpsl/tpslDialog/components/TpSlMetricsCard.tsx                                                                                                                            4              0             69
apps/trade/client/modules/trading/tpsl/tpslDialog/components/TpSlOrderEstimate.tsx                                                                                                                          7              0             45
apps/trade/client/modules/trading/tpsl/tpslDialog/components/TpSlOrderInfo/TpSlOrderInfo.tsx                                                                                                                3              0             42
apps/trade/client/modules/trading/tpsl/tpslDialog/components/TpSlOrderInfo/TpSlTriggerPriceInfo.tsx                                                                                                         5              0             35
apps/trade/client/modules/trading/tpsl/tpslDialog/components/TpSlOrderManagement.tsx                                                                                                                        3              0             77
apps/trade/client/modules/trading/tpsl/tpslDialog/components/TpSlPlaceOrderForm/TpSlPlaceOrderForm.tsx                                                                                                      2              0             57
apps/trade/client/modules/trading/tpsl/tpslDialog/components/TpSlPlaceOrderForm/TpSlPlaceOrderInputs.tsx                                                                                                    3              0             68
apps/trade/client/modules/trading/tpsl/tpslDialog/components/TpSlPlaceOrderForm/TpSlPlaceOrderSubmitButton.tsx                                                                                              4              0             35
apps/trade/client/modules/trading/tpsl/tpslDialog/hooks/useTpSlDialogOrderForm.ts                                                                                                                           8              0             71
apps/trade/client/modules/trading/tpsl/tpslDialog/hooks/useTpSlOrderInfo.ts                                                                                                                                11              2             78
apps/trade/client/modules/trading/tpsl/tpslDialog/hooks/useTpSlPositionData.ts                                                                                                                              6              0             52
apps/trade/client/modules/trading/tpsl/tpslDialog/types.ts                                                                                                                                                  4              0             31
apps/trade/client/modules/trading/tpsl/triggerCriteriaUtils.ts                                                                                                                                              2              0             12
apps/trade/client/modules/trading/tpsl/utils/isTpSlOrderSize.ts                                                                                                                                             2              6             12
apps/trade/client/modules/trading/tradingSidebar/EmptyWatchlistPlaceholder.tsx                                                                                                                              2              0             20
apps/trade/client/modules/trading/tradingSidebar/TradingSidebar.tsx                                                                                                                                         8              6            126
apps/trade/client/modules/trading/tradingSidebar/TradingSidebarWatchlistTabButtons.tsx                                                                                                                      4              1             53
apps/trade/client/modules/trading/tradingSidebar/markets/TradingSidebarMarketsTab.tsx                                                                                                                      10             12            174
apps/trade/client/modules/trading/tradingSidebar/markets/types.ts                                                                                                                                           1              0              8
apps/trade/client/modules/trading/tradingSidebar/markets/useTradingSidebarMarketsTab.ts                                                                                                                     8              0             62
apps/trade/client/modules/trading/tradingSidebar/markets/utils.ts                                                                                                                                           6              1             38
apps/trade/client/modules/trading/tradingSidebar/types.ts                                                                                                                                                   1              0              9
apps/trade/client/modules/trading/tradingSidebar/useTradingSidebar.ts                                                                                                                                      13              2            104
apps/trade/client/modules/trading/types.ts                                                                                                                                                                 13              2             48
apps/trade/client/modules/trading/utils/getIsHighSpread.ts                                                                                                                                                  1              4              4
apps/trade/client/modules/trading/utils/getOrderSideLabel.ts                                                                                                                                                5              7             45
apps/trade/client/modules/trading/utils/getOrderType.ts                                                                                                                                                     2              3             26
apps/trade/client/modules/trading/utils/getOrderTypeLabel.ts                                                                                                                                                1              0             12
apps/trade/client/modules/trading/utils/getTriggerOrderType.ts                                                                                                                                              6              6             22
apps/trade/client/modules/trading/utils/incrementValidator.ts                                                                                                                                               1              1              7
apps/trade/client/modules/trading/utils/isoOrderChecks.ts                                                                                                                                                   2              0              9
apps/trade/client/modules/trading/websockets/hooks/useHandleProductIdChange.ts                                                                                                                              7              3             88
apps/trade/client/modules/trading/websockets/hooks/useOnMessageHandler.ts                                                                                                                                  14             11            119
apps/trade/client/modules/trading/websockets/types.ts                                                                                                                                                       2              0              9
apps/trade/client/modules/trading/websockets/useTradingWebsocketSubscriptions.ts                                                                                                                           10             16             78
apps/trade/client/modules/trading/websockets/utils/eventHandlers.ts                                                                                                                                        13             16            135
apps/trade/client/modules/trading/websockets/utils/subscriptionParams.ts                                                                                                                                    2              0             17
apps/trade/client/modules/tradingCompetition/components/TradingCompetitionStatusBadge.tsx                                                                                                                   2              0             19
apps/trade/client/modules/tradingCompetition/hooks/useTradingCompetitionData.ts                                                                                                                            22             28            135
apps/trade/client/modules/tradingCompetition/types.ts                                                                                                                                                       5             16             46
apps/trade/client/modules/transak/TransakNoticeDialog.tsx                                                                                                                                                   4              0             34
apps/trade/client/modules/transak/hooks/useTransak.ts                                                                                                                                                       7              1            100
apps/trade/client/modules/transak/transak-logo.svg                                                                                                                                                          0              0             29
apps/trade/client/modules/tutorial/components/TutorialFlowAccordion/TutorialAccordionContent.tsx                                                                                                            2              1             33
apps/trade/client/modules/tutorial/components/TutorialFlowAccordion/TutorialAccordionTrigger.tsx                                                                                                            2              0             34
apps/trade/client/modules/tutorial/components/TutorialFlowAccordion/TutorialFlowAccordion.tsx                                                                                                               2              0             64
apps/trade/client/modules/tutorial/components/TutorialFlowHeader.tsx                                                                                                                                        2              0             28
apps/trade/client/modules/tutorial/components/TutorialFlowPopover.tsx                                                                                                                                       6              7             89
apps/trade/client/modules/tutorial/components/TutorialFlowProgressBar.tsx                                                                                                                                   2              0             31
apps/trade/client/modules/tutorial/components/TutorialFlowSuccessContent.tsx                                                                                                                                1              0             22
apps/trade/client/modules/tutorial/hooks/useTutorialFlowState.ts                                                                                                                                            4              0             29
apps/trade/client/modules/tutorial/hooks/useTutorialFlowSteps.ts                                                                                                                                            4              0             44
apps/trade/client/modules/tutorial/hooks/useUserTutorialFlow.ts                                                                                                                                            12              6            110
apps/trade/client/modules/utm/UtmQueryParamsListener.tsx                                                                                                                                                    6              9             28
apps/trade/client/modules/utm/dialogs/UtmCampaignDialog/UtmCampaignDialog.tsx                                                                                                                               7              0             62
apps/trade/client/modules/vaults/SkateVaultAbi.ts                                                                                                                                                           1              0           1608
apps/trade/client/modules/vaults/components/VaultHeader.tsx                                                                                                                                                 2              0             21
apps/trade/client/modules/vaults/components/VaultPartnerLogoPill.tsx                                                                                                                                        1              0             19
apps/trade/client/modules/vaults/consts.ts                                                                                                                                                                  2              0             33
apps/trade/client/modules/vaults/dialogs/deposit/SkateDepositSubmitButton.tsx                                                                                                                               4              0             33
apps/trade/client/modules/vaults/dialogs/deposit/SkateVaultDepositDialog.tsx                                                                                                                                3              0            117
apps/trade/client/modules/vaults/dialogs/deposit/SkateVaultWithdrawalDisclosureCard.tsx                                                                                                                     2              0             16
apps/trade/client/modules/vaults/dialogs/deposit/hooks/useSkateVaultDepositDialog.ts                                                                                                                       25             12            185
apps/trade/client/modules/vaults/dialogs/hooks/useVaultFormAmountErrorTooltipContent.ts                                                                                                                     3              0             13
apps/trade/client/modules/vaults/dialogs/types.ts                                                                                                                                                           2              0              6
apps/trade/client/modules/vaults/dialogs/withdraw/SkateVaultWithdrawDialog.tsx                                                                                                                              3              0            102
apps/trade/client/modules/vaults/dialogs/withdraw/SkateWithdrawSubmitButton.tsx                                                                                                                             3              0             29
apps/trade/client/modules/vaults/dialogs/withdraw/hooks/useSkateVaultWithdrawDialog.ts                                                                                                                     25             11            158
apps/trade/client/modules/vaults/hooks/execute/useExecuteBurnSkateVaultShares.ts                                                                                                                           20             19            132
apps/trade/client/modules/vaults/hooks/execute/useExecuteMintSkateVaultShares.ts                                                                                                                           12             12             69
apps/trade/client/modules/vaults/hooks/query/useSkateOllies.ts                                                                                                                                             10              4             45
apps/trade/client/modules/vaults/hooks/query/useSkateVaultApyFraction.ts                                                                                                                                   13              9             45
apps/trade/client/modules/vaults/hooks/query/useSkateVaultEstimatedQuoteReceived.ts                                                                                                                         8              9             42
apps/trade/client/modules/vaults/hooks/query/useSkateVaultEstimatedSharesReceived.ts                                                                                                                        9              8             42
apps/trade/client/modules/vaults/hooks/query/useSkateVaultState.ts                                                                                                                                         13             11             77
apps/trade/client/pages/BlitzRewards/BlitzRewardsPage.tsx                                                                                                                                                   1              0             45
apps/trade/client/pages/BlitzRewards/components/BlitzRewardsOverviewCard/BlitzRewardsOverviewCard.tsx                                                                                                       5              0            121
apps/trade/client/pages/BlitzRewards/components/BlitzRewardsOverviewCard/useBlitzRewardsOverviewCard.ts                                                                                                     4              1             26
apps/trade/client/pages/BlitzRewards/components/BlitzRewardsPageHeader.tsx                                                                                                                                  2              0             20
apps/trade/client/pages/BlitzRewards/components/earnings/BlitzBlastGoldEarningsCard/BlitzBlastGoldEarningsCard.tsx                                                                                          2              0             34
apps/trade/client/pages/BlitzRewards/components/earnings/BlitzBlastGoldEarningsCard/BlitzBlastGoldEarningsCardContent.tsx                                                                                   3              0             12
apps/trade/client/pages/BlitzRewards/components/earnings/BlitzBlastPointsEarningsCard/BlitzBlastPointsEarningsCard.tsx                                                                                      1              0             32
apps/trade/client/pages/BlitzRewards/components/earnings/BlitzBlastPointsEarningsCard/BlitzBlastPointsEarningsCardContent.tsx                                                                               3              0             12
apps/trade/client/pages/BlitzRewards/components/earnings/BlitzEarningsBulletItem.tsx                                                                                                                        2              0             18
apps/trade/client/pages/BlitzRewards/components/earnings/BlitzEarningsCard.tsx                                                                                                                              2              0             43
apps/trade/client/pages/BlitzRewards/components/earnings/BlitzEarningsContentValueCard.tsx                                                                                                                  2              0             20
apps/trade/client/pages/BlitzRewards/components/earnings/BlitzPointsEarningsCard/BlitzPointsEarningsCard.tsx                                                                                                1              0             20
apps/trade/client/pages/BlitzRewards/components/earnings/BlitzPointsEarningsCard/BlitzPointsEarningsCardContent.tsx                                                                                         3              0             40
apps/trade/client/pages/BlitzRewards/components/earnings/BlitzPointsEarningsCard/BlitzPointsEarningsCardFooter.tsx                                                                                          4              0             53
apps/trade/client/pages/BlitzRewards/components/leaderboard/BlitzPointsLeaderboardHeader.tsx                                                                                                                3              0             24
apps/trade/client/pages/BlitzRewards/components/leaderboard/BlitzPointsLeaderboardTable/BlitzPointsLeaderboardTable.tsx                                                                                     7              0            100
apps/trade/client/pages/BlitzRewards/components/leaderboard/BlitzPointsLeaderboardTable/useBlitzPointsLeaderboardTable.ts                                                                                  11              0             93
apps/trade/client/pages/BlitzRewards/components/opportunity/BlitzOpportunitiesHeader.tsx                                                                                                                    1              0             31
apps/trade/client/pages/BlitzRewards/components/opportunity/BlitzOpportunityCard.tsx                                                                                                                        2              0             30
apps/trade/client/pages/BlitzRewards/components/opportunity/BlitzPoolsOpportunityCard/BlitzPoolOpportunityItem.tsx                                                                                          3              0             58
apps/trade/client/pages/BlitzRewards/components/opportunity/BlitzPoolsOpportunityCard/BlitzPoolsOpportunityCard.tsx                                                                                         1              0             13
apps/trade/client/pages/BlitzRewards/components/opportunity/BlitzPoolsOpportunityCard/BlitzPoolsOpportunityCardContent.tsx                                                                                  3              0             24
apps/trade/client/pages/BlitzRewards/components/opportunity/BlitzPoolsOpportunityCard/useBlitzPoolOpportunities.ts                                                                                          6              0             35
apps/trade/client/pages/BlitzRewards/components/opportunity/BlitzReferOpportunityCard/BlitzReferOpportunityCard.tsx                                                                                         1              0             13
apps/trade/client/pages/BlitzRewards/components/opportunity/BlitzReferOpportunityCard/BlitzReferOpportunityCardContent.tsx                                                                                  4              0             36
apps/trade/client/pages/BlitzRewards/components/opportunity/BlitzTradeOpportunityCard/BlitzTradeOpportunityCard.tsx                                                                                         1              0             13
apps/trade/client/pages/BlitzRewards/components/opportunity/BlitzTradeOpportunityCard/BlitzTradeOpportunityCardContent.tsx                                                                                  3              0             24
apps/trade/client/pages/BlitzRewards/components/opportunity/BlitzTradingCompetitionOpportunityCard/BlitzTradingCompetitionOpportunityCard.tsx                                                               2              3             23
apps/trade/client/pages/BlitzRewards/components/opportunity/BlitzTradingCompetitionOpportunityCard/BlitzTradingCompetitionOpportunityCardContent.tsx                                                        8              1             93
apps/trade/client/pages/BlitzRewards/components/opportunity/BlitzTradingCompetitionOpportunityCard/BlitzTradingCompetitionOpportunityTbaCardContent.tsx                                                     2              1             13
apps/trade/client/pages/BlitzRewards/components/opportunity/BlitzVaultsOpportunityCard/BlitzVaultsOpportunityCard.tsx                                                                                       3              0             23
apps/trade/client/pages/BlitzRewards/components/opportunity/BlitzVaultsOpportunityCard/BlitzVaultsOpportunityCardContent.tsx                                                                                4              0             47
apps/trade/client/pages/BlitzRewards/config.ts                                                                                                                                                              2              5              7
apps/trade/client/pages/BlitzRewards/hooks/useCurrentBlitzPointsEpoch.ts                                                                                                                                    5              2             29
apps/trade/client/pages/Error/ErrorPage.tsx                                                                                                                                                                 1              0             20
apps/trade/client/pages/Markets/MarketsPage.tsx                                                                                                                                                             2              2             27
apps/trade/client/pages/Markets/components/BlitzMarketBoostsDisclosure.tsx                                                                                                                                  4              0             67
apps/trade/client/pages/Markets/components/FundingRateCountdown.tsx                                                                                                                                         2              0             18
apps/trade/client/pages/Markets/components/MarketTableTabs/MarketsTableTabs.tsx                                                                                                                             3              0             39
apps/trade/client/pages/Markets/components/MarketTableTabs/useMarketsTableTabs.tsx                                                                                                                          4              0             55
apps/trade/client/pages/Markets/components/MarketsCarouselBanner/MarketsCarouselBanner.tsx                                                                                                                  9              0            173
apps/trade/client/pages/Markets/components/MarketsFirstCarousel.tsx                                                                                                                                         2              0             30
apps/trade/client/pages/Markets/components/MarketsOverviewCards/MarketsOverviewCard.tsx                                                                                                                     2              1             20
apps/trade/client/pages/Markets/components/MarketsOverviewCards/MarketsOverviewCards.tsx                                                                                                                    3              0             19
apps/trade/client/pages/Markets/components/MarketsOverviewCards/useMarketsOverviewCards.ts                                                                                                                  3              0             46
apps/trade/client/pages/Markets/components/MarketsPageHeader.tsx                                                                                                                                            1              0             10
apps/trade/client/pages/Markets/components/MarketsSecondCarousel.tsx                                                                                                                                        2              0             33
apps/trade/client/pages/Markets/components/MarketsTableSearchWrapper.tsx                                                                                                                                    3              0             20
apps/trade/client/pages/Markets/components/StatsLinkButton.tsx                                                                                                                                              2              0             18
apps/trade/client/pages/Markets/components/SwiperNavigation.tsx                                                                                                                                             3              0             35
apps/trade/client/pages/Markets/components/cards/MarketsCardContent.tsx                                                                                                                                     2              1             57
apps/trade/client/pages/Markets/components/cards/MarketsCardItemButton.tsx                                                                                                                                  6              0             52
apps/trade/client/pages/Markets/components/cards/MarketsDepositRates/MarketsDepositRates.tsx                                                                                                                2              0             50
apps/trade/client/pages/Markets/components/cards/MarketsDepositRates/useMarketsDepositRates.ts                                                                                                              4              3             16
apps/trade/client/pages/Markets/components/cards/MarketsGainersLosers/MarketsGainersLosers.tsx                                                                                                              6              1             74
apps/trade/client/pages/Markets/components/cards/MarketsGainersLosers/useMarketsGainersLosers.ts                                                                                                            6              3             45
apps/trade/client/pages/Markets/components/cards/MarketsHotMarkets/MarketsHotMarkets.tsx                                                                                                                    2              0             42
apps/trade/client/pages/Markets/components/cards/MarketsHotMarkets/useMarketsHotMarkets.ts                                                                                                                  4              4             48
apps/trade/client/pages/Markets/components/cards/MarketsRecentlyAdded/MarketsRecentlyAdded.tsx                                                                                                              2              0             66
apps/trade/client/pages/Markets/components/cards/MarketsRecentlyAdded/useMarketsRecentlyAdded.ts                                                                                                            8              4             58
apps/trade/client/pages/Markets/components/cards/MarketsStaking/MarketsStaking.tsx                                                                                                                          4              0             47
apps/trade/client/pages/Markets/components/cards/MarketsTopPredictedFunding/MarketsTopPredictedFunding.tsx                                                                                                  2              0             50
apps/trade/client/pages/Markets/components/cards/MarketsTopPredictedFunding/useMarketsTopPredictedFunding.ts                                                                                                6              3             39
apps/trade/client/pages/Markets/components/consts.ts                                                                                                                                                        3              3             25
apps/trade/client/pages/Markets/hooks/useFundingRateMarketsTable.ts                                                                                                                                        18              0            166
apps/trade/client/pages/Markets/hooks/useFundingRatePeriodSelect.ts                                                                                                                                         4              0             32
apps/trade/client/pages/Markets/hooks/usePerpMarketsTable.ts                                                                                                                                                9              0            104
apps/trade/client/pages/Markets/hooks/useSpotMarketsTable.ts                                                                                                                                                7              0             72
apps/trade/client/pages/Markets/tables/FundingRateMarketsTable.tsx                                                                                                                                          5              1            189
apps/trade/client/pages/Markets/tables/PerpMarketsTable.tsx                                                                                                                                                 6              0            242
apps/trade/client/pages/Markets/tables/SpotMarketsTable.tsx                                                                                                                                                 6              0            164
apps/trade/client/pages/Markets/tables/components/FundingRateCell.tsx                                                                                                                                       4              0             23
apps/trade/client/pages/Markets/tables/components/FundingRatePeriodSelect.tsx                                                                                                                               2              1             35
apps/trade/client/pages/Markets/utils/sortAndTrim.ts                                                                                                                                                        2              0             28
apps/trade/client/pages/Markets/utils/sortingFns.ts                                                                                                                                                         1              1              8
apps/trade/client/pages/MoneyMarkets/MoneyMarketsPage.tsx                                                                                                                                                   1              0             17
apps/trade/client/pages/MoneyMarkets/components/MoneyMarketActionsCell.tsx                                                                                                                                  3              0             44
apps/trade/client/pages/MoneyMarkets/components/TvlStats.tsx                                                                                                                                                2              0             20
apps/trade/client/pages/MoneyMarkets/components/TvlStatsLink.tsx                                                                                                                                            3              0             34
apps/trade/client/pages/MoneyMarkets/hooks/useTvlUsd.ts                                                                                                                                                     2              4             15
apps/trade/client/pages/PerpTrading/PerpTradingPage.tsx                                                                                                                                                     6              4             51
apps/trade/client/pages/PerpTrading/components/PerpLeverageDialog/PerpLeverageDialog.tsx                                                                                                                    3              0             68
apps/trade/client/pages/PerpTrading/components/PerpLeverageDialog/PerpLeverageInfoCollapsible.tsx                                                                                                           2              0             26
apps/trade/client/pages/PerpTrading/components/PerpLeverageDialog/usePerpLeverageDialog.ts                                                                                                                  4              0             22
apps/trade/client/pages/PerpTrading/components/PerpMarginModeDialog/PerpMarginModeCrossTabContent.tsx                                                                                                       3              0             36
apps/trade/client/pages/PerpTrading/components/PerpMarginModeDialog/PerpMarginModeDialog.tsx                                                                                                                4              0             80
apps/trade/client/pages/PerpTrading/components/PerpMarginModeDialog/PerpMarginModeIsolatedTabContent.tsx                                                                                                    4              0             55
apps/trade/client/pages/PerpTrading/components/PerpMarginModeDialog/PerpMarginModeLeverageInput.tsx                                                                                                         4              0             44
apps/trade/client/pages/PerpTrading/components/PerpMarginModeDialog/usePerpMarginModeDialog.ts                                                                                                              9              2             76
apps/trade/client/pages/PerpTrading/components/PerpMarketInfoCards.tsx                                                                                                                                      3              0            186
apps/trade/client/pages/PerpTrading/components/PerpOrderPlacementSection/PerpOrderPlacementSection.tsx                                                                                                      5              0            145
apps/trade/client/pages/PerpTrading/components/PerpOrderPlacementSection/components/FtmDelistInfoPanel.tsx                                                                                                  1              0             27
apps/trade/client/pages/PerpTrading/components/PerpOrderPlacementSection/components/PerpLeverageSelector.tsx                                                                                                7              0             62
apps/trade/client/pages/PerpTrading/components/PerpOrderPlacementSection/components/PerpOrderSummary.tsx                                                                                                    8              0            131
apps/trade/client/pages/PerpTrading/components/PerpOrderPlacementSection/components/PerpTpSlSection/PerpTpSlCheckbox.tsx                                                                                    2              0             31
apps/trade/client/pages/PerpTrading/components/PerpOrderPlacementSection/components/PerpTpSlSection/PerpTpSlOrderForm.tsx                                                                                   6              0             76
apps/trade/client/pages/PerpTrading/components/PerpOrderPlacementSection/components/PerpTpSlSection/PerpTpSlSection.tsx                                                                                     2              0             34
apps/trade/client/pages/PerpTrading/components/PerpOrderPlacementSection/components/PerpTpSlSection/PerpTpSlWarningPanel.tsx                                                                                4              0             24
apps/trade/client/pages/PerpTrading/components/PerpPositionsTab.tsx                                                                                                                                         6              1             55
apps/trade/client/pages/PerpTrading/context/PerpOrderFormContext.tsx                                                                                                                                       30            116            385
apps/trade/client/pages/PerpTrading/context/hooks/usePerpOrderFormMaxOrderSizes.ts                                                                                                                         12             12             99
apps/trade/client/pages/PerpTrading/context/hooks/usePerpOrderFormOnChangeSideEffects.ts                                                                                                                    5              9             55
apps/trade/client/pages/PerpTrading/context/types.ts                                                                                                                                                        1              0              2
apps/trade/client/pages/PerpTrading/hooks/usePerpMarketInfoCards.ts                                                                                                                                         8              0            100
apps/trade/client/pages/PerpTrading/hooks/usePerpTpSlOrderForm.ts                                                                                                                                          13              3            108
apps/trade/client/pages/PerpTrading/hooks/usePerpTradingFormTradingAccountMetrics.tsx                                                                                                                      30             21            241
apps/trade/client/pages/PerpTrading/hooks/usePerpTradingTableTabs.tsx                                                                                                                                       3              0            119
apps/trade/client/pages/PerpTrading/hooks/useSelectedPerpMarginMode.ts                                                                                                                                     15              8             95
apps/trade/client/pages/PerpTrading/utils/calcMaxOrderSizeWithLeverage.ts                                                                                                                                   1              0             10
apps/trade/client/pages/Pools/PoolsPage.tsx                                                                                                                                                                 2              0             14
apps/trade/client/pages/Pools/components/LpMarketsTable.tsx                                                                                                                                                 6              1            179
apps/trade/client/pages/Portfolio/charts/components/PortfolioChart.tsx                                                                                                                                      2              3             75
apps/trade/client/pages/Portfolio/charts/components/PortfolioChartGradientDefinitions.tsx                                                                                                                   1              0             68
apps/trade/client/pages/Portfolio/charts/components/PortfolioChartTooltip.tsx                                                                                                                               5              2             30
apps/trade/client/pages/Portfolio/charts/components/PortfolioChartTopBar/PortfolioChartTabs.tsx                                                                                                             2              0             39
apps/trade/client/pages/Portfolio/charts/components/PortfolioChartTopBar/PortfolioChartTimespanFilter.tsx                                                                                                   3              0             34
apps/trade/client/pages/Portfolio/charts/components/PortfolioChartTopBar/PortfolioChartTopBar.tsx                                                                                                           2              0             42
apps/trade/client/pages/Portfolio/charts/components/PortfolioDynamicGradientDefinitions.tsx                                                                                                                 5             13             70
apps/trade/client/pages/Portfolio/charts/components/SignedCurrencyChangeMetric.tsx                                                                                                                          2              0             32
apps/trade/client/pages/Portfolio/charts/consts.ts                                                                                                                                                         11              3            146
apps/trade/client/pages/Portfolio/charts/hooks/useChartGradientOffset.ts                                                                                                                                    5              7             26
apps/trade/client/pages/Portfolio/charts/hooks/useChartQueryTimes.ts                                                                                                                                        8             13             56
apps/trade/client/pages/Portfolio/charts/hooks/usePnlChartColors.tsx                                                                                                                                        2              0             35
apps/trade/client/pages/Portfolio/charts/hooks/usePortfolioChartData/calcDecimalAdjustedDeltas.ts                                                                                                           2              5             15
apps/trade/client/pages/Portfolio/charts/hooks/usePortfolioChartData/calcDecimalAdjustedUsdValue.ts                                                                                                         2              5             10
apps/trade/client/pages/Portfolio/charts/hooks/usePortfolioChartData/usePortfolioChartData.ts                                                                                                              25              8            177
apps/trade/client/pages/Portfolio/charts/hooks/usePortfolioChartXAxisFormatter.ts                                                                                                                           1              0              7
apps/trade/client/pages/Portfolio/charts/hooks/usePortfolioCharts.ts                                                                                                                                        3              0             27
apps/trade/client/pages/Portfolio/charts/types.ts                                                                                                                                                           4              3             41
apps/trade/client/pages/Portfolio/charts/utils/axisFormatters.ts                                                                                                                                            5             17             31
apps/trade/client/pages/Portfolio/charts/utils/dataKeys.ts                                                                                                                                                  1              0              4
apps/trade/client/pages/Portfolio/charts/utils/getTimespanAxisFormatter.ts                                                                                                                                  1              3             15
apps/trade/client/pages/Portfolio/components/LiquidationRiskBars.tsx                                                                                                                                        2              0             23
apps/trade/client/pages/Portfolio/components/PortfolioHeader.tsx                                                                                                                                            1              0             20
apps/trade/client/pages/Portfolio/components/PortfolioHeroMetricsPane.tsx                                                                                                                                   8              0            104
apps/trade/client/pages/Portfolio/components/PortfolioHeroSection.tsx                                                                                                                                       3              3             39
apps/trade/client/pages/Portfolio/components/PortfolioPageContentWrapper.tsx                                                                                                                                1              2             22
apps/trade/client/pages/Portfolio/components/navigation/DesktopPortfolioSubNavMenu.tsx                                                                                                                      4              0             41
apps/trade/client/pages/Portfolio/components/navigation/MobilePortfolioSubNavMenu.tsx                                                                                                                       3              1             44
apps/trade/client/pages/Portfolio/components/navigation/PortfolioSubNavButton.tsx                                                                                                                           5              3             47
apps/trade/client/pages/Portfolio/components/navigation/PortfolioSubNavSubaccountSwitcher.tsx                                                                                                               4              0             48
apps/trade/client/pages/Portfolio/components/navigation/types.ts                                                                                                                                            0              1              7
apps/trade/client/pages/Portfolio/hooks/usePortfolioNavItems.tsx                                                                                                                                            3              0             76
apps/trade/client/pages/Portfolio/subpages/Balances/PortfolioBalancesPage.tsx                                                                                                                               1              0             13
apps/trade/client/pages/Portfolio/subpages/Balances/charts/PortfolioBalancesDepositsBorrowsChart.tsx                                                                                                        5              0            106
apps/trade/client/pages/Portfolio/subpages/Balances/charts/PortfolioBalancesNetBalanceInterestChart.tsx                                                                                                     5              3            139
apps/trade/client/pages/Portfolio/subpages/Balances/components/BalancesHeader.tsx                                                                                                                           4              0             37
apps/trade/client/pages/Portfolio/subpages/Balances/components/BalancesHeroMetricsHeader.tsx                                                                                                                2              0             22
apps/trade/client/pages/Portfolio/subpages/Balances/components/BalancesHeroMetricsItems.tsx                                                                                                                 2              0            124
apps/trade/client/pages/Portfolio/subpages/Balances/components/BalancesHeroSection.tsx                                                                                                                      5              0             53
apps/trade/client/pages/Portfolio/subpages/Balances/components/BalancesTabs.tsx                                                                                                                             3              0             45
apps/trade/client/pages/Portfolio/subpages/Balances/hooks/useBalancesTabs.tsx                                                                                                                               3              0             24
apps/trade/client/pages/Portfolio/subpages/Faucet/PortfolioFaucetPage.tsx                                                                                                                                   1              0             15
apps/trade/client/pages/Portfolio/subpages/Faucet/components/Faucet.tsx                                                                                                                                    12              6            124
apps/trade/client/pages/Portfolio/subpages/History/PortfolioHistoryPage.tsx                                                                                                                                 3              0             78
apps/trade/client/pages/Portfolio/subpages/History/components/HistoricalDepositsTable.tsx                                                                                                                   4              0            100
apps/trade/client/pages/Portfolio/subpages/History/components/HistoricalLiquidationsTable.tsx                                                                                                               4              0            172
apps/trade/client/pages/Portfolio/subpages/History/components/HistoricalLpEventsTable.tsx                                                                                                                   3              0            146
apps/trade/client/pages/Portfolio/subpages/History/components/HistoricalPnlAccountingTable.tsx                                                                                                              5              0            182
apps/trade/client/pages/Portfolio/subpages/History/components/HistoricalSettlementsTable.tsx                                                                                                                4              0             91
apps/trade/client/pages/Portfolio/subpages/History/components/HistoricalTransfersTable.tsx                                                                                                                  4              0            127
apps/trade/client/pages/Portfolio/subpages/History/components/HistoricalTriggerOrdersTable.tsx                                                                                                              4              0            145
apps/trade/client/pages/Portfolio/subpages/History/components/HistoricalWithdrawalsTable.tsx                                                                                                                5              0            130
apps/trade/client/pages/Portfolio/subpages/History/components/HistoryTabsDropdown.tsx                                                                                                                       5              1             63
apps/trade/client/pages/Portfolio/subpages/History/components/cells/HistoricalTriggerOrderStatusDetailsCell.tsx                                                                                             5              4             56
apps/trade/client/pages/Portfolio/subpages/History/components/cells/LpEventTypeCell.tsx                                                                                                                     2              0             19
apps/trade/client/pages/Portfolio/subpages/History/components/cells/WithdrawalStatusCell.tsx                                                                                                                6              1             78
apps/trade/client/pages/Portfolio/subpages/History/components/cells/liquidation/LiquidationAmountInfoCell/LiquidationAmountInfoCell.tsx                                                                     2              0             64
apps/trade/client/pages/Portfolio/subpages/History/components/cells/liquidation/LiquidationAmountInfoCell/components/LiquidationInfo.tsx                                                                    2              0             45
apps/trade/client/pages/Portfolio/subpages/History/components/cells/liquidation/LiquidationAmountInfoCell/components/LiquidationProductInfo.tsx                                                             3              0             57
apps/trade/client/pages/Portfolio/subpages/History/components/cells/liquidation/LiquidationAmountInfoCell/components/LiquidationSizeInfo.tsx                                                                2              0             32
apps/trade/client/pages/Portfolio/subpages/History/components/cells/liquidation/LiquidationAmountInfoCell/components/LpLiquidationInfo.tsx                                                                  2              0             30
apps/trade/client/pages/Portfolio/subpages/History/components/cells/liquidation/LiquidationAmountInfoCell/components/LpLiquidationPairInfo.tsx                                                              2              0             18
apps/trade/client/pages/Portfolio/subpages/History/components/cells/liquidation/LiquidationAmountInfoCell/components/LpStackedSizeInfo.tsx                                                                  3              0             29
apps/trade/client/pages/Portfolio/subpages/History/components/cells/liquidation/LiquidationAmountInfoCell/components/StackedTokenPairIcon.tsx                                                               2              0             32
apps/trade/client/pages/Portfolio/subpages/History/components/cells/liquidation/LiquidationBalanceChangesCell.tsx                                                                                           2              0             75
apps/trade/client/pages/Portfolio/subpages/History/components/cells/liquidation/LiquidationOraclePriceCell.tsx                                                                                              3              0             66
apps/trade/client/pages/Portfolio/subpages/History/components/cells/liquidation/LiquidationTypeCell.tsx                                                                                                     3              0             36
apps/trade/client/pages/Portfolio/subpages/History/components/cells/liquidation/consts.ts                                                                                                                   0              4              2
apps/trade/client/pages/Portfolio/subpages/History/consts.ts                                                                                                                                                0              0             12
apps/trade/client/pages/Portfolio/subpages/History/exportHistory/ExportHistoryDialog.tsx                                                                                                                    2              0             55
apps/trade/client/pages/Portfolio/subpages/History/exportHistory/components/ExportHistoryDateRangeSelector.tsx                                                                                              2              0             53
apps/trade/client/pages/Portfolio/subpages/History/exportHistory/components/ExportHistorySubmitButton.tsx                                                                                                   3              0             30
apps/trade/client/pages/Portfolio/subpages/History/exportHistory/components/ExportHistoryTypeSelect.tsx                                                                                                     4              0             87
apps/trade/client/pages/Portfolio/subpages/History/exportHistory/hooks/useExecuteExportHistory/consts.ts                                                                                                   11              5             63
apps/trade/client/pages/Portfolio/subpages/History/exportHistory/hooks/useExecuteExportHistory/getExportHistoryCollateralData.ts                                                                           12              5             91
apps/trade/client/pages/Portfolio/subpages/History/exportHistory/hooks/useExecuteExportHistory/getExportHistoryLiquidationsData.ts                                                                         15              8            104
apps/trade/client/pages/Portfolio/subpages/History/exportHistory/hooks/useExecuteExportHistory/getExportHistoryLpData.ts                                                                                   12              4             69
apps/trade/client/pages/Portfolio/subpages/History/exportHistory/hooks/useExecuteExportHistory/getExportHistoryRealizedPnlData.ts                                                                          14              5             79
apps/trade/client/pages/Portfolio/subpages/History/exportHistory/hooks/useExecuteExportHistory/getExportHistoryTradesData.ts                                                                               12              4             65
apps/trade/client/pages/Portfolio/subpages/History/exportHistory/hooks/useExecuteExportHistory/types.ts                                                                                                     3              3             10
apps/trade/client/pages/Portfolio/subpages/History/exportHistory/hooks/useExecuteExportHistory/useExecuteExportHistory.ts                                                                                  11              4             96
apps/trade/client/pages/Portfolio/subpages/History/exportHistory/hooks/useExecuteExportHistory/utils.ts                                                                                                     0              0              3
apps/trade/client/pages/Portfolio/subpages/History/exportHistory/hooks/useExportHistoryDialog.ts                                                                                                           14              5             86
apps/trade/client/pages/Portfolio/subpages/History/exportHistory/types.ts                                                                                                                                   7              9             57
apps/trade/client/pages/Portfolio/subpages/History/hooks/useHistoricalCollateralEventsTable.ts                                                                                                             23              3            216
apps/trade/client/pages/Portfolio/subpages/History/hooks/useHistoricalLiquidationsTable.ts                                                                                                                 30             19            255
apps/trade/client/pages/Portfolio/subpages/History/hooks/useHistoricalLpEventsTable.ts                                                                                                                     14              1            134
apps/trade/client/pages/Portfolio/subpages/History/hooks/useHistoricalPnlAccountingTable.ts                                                                                                                14              0            139
apps/trade/client/pages/Portfolio/subpages/History/hooks/useHistoricalSettlementsTable.ts                                                                                                                  11              2            106
apps/trade/client/pages/Portfolio/subpages/History/hooks/useHistoricalTriggerOrdersTable.ts                                                                                                                11              7            110
apps/trade/client/pages/Portfolio/subpages/History/hooks/usePortfolioHistoryTabs.tsx                                                                                                                       12              1            135
apps/trade/client/pages/Portfolio/subpages/History/types.ts                                                                                                                                                 1              0              2
apps/trade/client/pages/Portfolio/subpages/MarginManager/PortfolioMarginManagerPage.tsx                                                                                                                     1              0             23
apps/trade/client/pages/Portfolio/subpages/MarginManager/components/MarginManagerDefinitionsCollapsible/HowToUseTheMarginManagerDefinition.tsx                                                              2              0             90
apps/trade/client/pages/Portfolio/subpages/MarginManager/components/MarginManagerDefinitionsCollapsible/InitialAndMaintenanceWeightsDefinition.tsx                                                          2              0             41
apps/trade/client/pages/Portfolio/subpages/MarginManager/components/MarginManagerDefinitionsCollapsible/InitialVsMaintenanceDefinition.tsx                                                                  2              0             42
apps/trade/client/pages/Portfolio/subpages/MarginManager/components/MarginManagerDefinitionsCollapsible/LiquidationRiskAndFundsAvailableDefinition.tsx                                                      2              0             69
apps/trade/client/pages/Portfolio/subpages/MarginManager/components/MarginManagerDefinitionsCollapsible/MarginManagerDefinition.tsx                                                                         8              0             81
apps/trade/client/pages/Portfolio/subpages/MarginManager/components/MarginManagerDefinitionsCollapsible/MarginManagerDefinitionsCollapsible.tsx                                                             4              0             45
apps/trade/client/pages/Portfolio/subpages/MarginManager/components/MarginManagerDefinitionsCollapsible/MarginManagerDefinitionsTabs.tsx                                                                    5              0            111
apps/trade/client/pages/Portfolio/subpages/MarginManager/components/MarginManagerDefinitionsCollapsible/MarginUsageAndFundsAvailableDefinition.tsx                                                          2              0             69
apps/trade/client/pages/Portfolio/subpages/MarginManager/components/MarginManagerHeader/InitialMarginUsagePane.tsx                                                                                          5              1             62
apps/trade/client/pages/Portfolio/subpages/MarginManager/components/MarginManagerHeader/MaintenanceMarginUsagePane.tsx                                                                                      5              1             70
apps/trade/client/pages/Portfolio/subpages/MarginManager/components/MarginManagerHeader/MarginManagerHeader.tsx                                                                                             3              0             25
apps/trade/client/pages/Portfolio/subpages/MarginManager/components/MarginManagerHeader/MarginManagerHeaderInfo.tsx                                                                                         5              0             54
apps/trade/client/pages/Portfolio/subpages/MarginManager/components/SignOfValuePill.tsx                                                                                                                     2              0             28
apps/trade/client/pages/Portfolio/subpages/MarginManager/tables/MarginManagerPerpPositionsTable.tsx                                                                                                         7              1            209
apps/trade/client/pages/Portfolio/subpages/MarginManager/tables/MarginManagerPoolsTable.tsx                                                                                                                 6              1            165
apps/trade/client/pages/Portfolio/subpages/MarginManager/tables/MarginManagerQuoteBalanceTable.tsx                                                                                                          6              1            173
apps/trade/client/pages/Portfolio/subpages/MarginManager/tables/MarginManagerSpotBalancesTable.tsx                                                                                                          7              1            165
apps/trade/client/pages/Portfolio/subpages/MarginManager/tables/MarginManagerSpreadsTable.tsx                                                                                                               9              1            197
apps/trade/client/pages/Portfolio/subpages/MarginManager/tables/cells/CalculatorIconHeaderCell.tsx                                                                                                          2              0             26
apps/trade/client/pages/Portfolio/subpages/MarginManager/tables/cells/MarginManagerActionsCell.tsx                                                                                                          4              0             50
apps/trade/client/pages/Portfolio/subpages/MarginManager/tables/cells/MarginWeightCell.tsx                                                                                                                  4              0             33
apps/trade/client/pages/Portfolio/subpages/MarginManager/tables/cells/MarginWeightHeaderCell.tsx                                                                                                            3              1             24
apps/trade/client/pages/Portfolio/subpages/MarginManager/tables/cells/SpotBalanceInfoCell.tsx                                                                                                               2              0             39
apps/trade/client/pages/Portfolio/subpages/MarginManager/tables/cells/SpreadCell.tsx                                                                                                                        3              0             32
apps/trade/client/pages/Portfolio/subpages/MarginManager/tables/components/MarginManagerTableActionsDropdown.tsx                                                                                            5              0             63
apps/trade/client/pages/Portfolio/subpages/MarginManager/tables/hooks/useMarginManagerPerpPositionsTable.ts                                                                                                 9              3             91
apps/trade/client/pages/Portfolio/subpages/MarginManager/tables/hooks/useMarginManagerPoolsTable.ts                                                                                                        11              2             90
apps/trade/client/pages/Portfolio/subpages/MarginManager/tables/hooks/useMarginManagerQuoteBalanceTable.tsx                                                                                                10              1             67
apps/trade/client/pages/Portfolio/subpages/MarginManager/tables/hooks/useMarginManagerSpotBalancesTable.ts                                                                                                  9              1             73
apps/trade/client/pages/Portfolio/subpages/MarginManager/tables/hooks/useMarginManagerSpreadsTable.ts                                                                                                      10              2             67
apps/trade/client/pages/Portfolio/subpages/MarginManager/tables/hooks/useSpreadBalances.ts                                                                                                                 10              0             70
apps/trade/client/pages/Portfolio/subpages/MarginManager/types.ts                                                                                                                                           1              0              5
apps/trade/client/pages/Portfolio/subpages/OpenOrders/PortfolioOpenOrdersPage.tsx                                                                                                                           4              0             52
apps/trade/client/pages/Portfolio/subpages/OpenOrders/hooks/usePortfolioOpenOrderTabs.tsx                                                                                                                   5              0             45
apps/trade/client/pages/Portfolio/subpages/OpenOrders/types.ts                                                                                                                                              0              0              1
apps/trade/client/pages/Portfolio/subpages/Overview/PortfolioOverviewPage.tsx                                                                                                                               3              0             36
apps/trade/client/pages/Portfolio/subpages/Overview/charts/PortfolioOverviewAccountValueChart.tsx                                                                                                           4              0             86
apps/trade/client/pages/Portfolio/subpages/Overview/charts/PortfolioOverviewPnlChart.tsx                                                                                                                    4              1            113
apps/trade/client/pages/Portfolio/subpages/Overview/components/OverviewHeroSection/OverviewHeroMetricsHeader.tsx                                                                                            5              0             98
apps/trade/client/pages/Portfolio/subpages/Overview/components/OverviewHeroSection/OverviewHeroMetricsItems.tsx                                                                                             7              0            132
apps/trade/client/pages/Portfolio/subpages/Overview/components/OverviewHeroSection/OverviewHeroSection.tsx                                                                                                  5              0             74
apps/trade/client/pages/Portfolio/subpages/Overview/components/OverviewHeroSection/OverviewLiquidationRiskBar.tsx                                                                                           3              0             72
apps/trade/client/pages/Portfolio/subpages/Overview/components/OverviewInfoCardButtons/OverviewInfoBlitzRewardsCardButton.tsx                                                                               2              4             24
apps/trade/client/pages/Portfolio/subpages/Overview/components/OverviewInfoCardButtons/OverviewInfoCardButton.tsx                                                                                           2              0             52
apps/trade/client/pages/Portfolio/subpages/Overview/components/OverviewInfoCardButtons/OverviewInfoCardButtons.tsx                                                                                          3              0            127
apps/trade/client/pages/Portfolio/subpages/Overview/components/OverviewInfoCardButtons/OverviewInfoVrtxCardButton.tsx                                                                                       4              3             65
apps/trade/client/pages/Portfolio/subpages/Overview/components/OverviewTabs.tsx                                                                                                                             2              0             54
apps/trade/client/pages/Portfolio/subpages/Overview/components/OverviewWelcomeHeader/EditProfileAvatarIcon.tsx                                                                                              3              1             34
apps/trade/client/pages/Portfolio/subpages/Overview/components/OverviewWelcomeHeader/OverviewCollateralButtons.tsx                                                                                          3              0             28
apps/trade/client/pages/Portfolio/subpages/Overview/components/OverviewWelcomeHeader/OverviewWelcomeHeader.tsx                                                                                              2              0             14
apps/trade/client/pages/Portfolio/subpages/Overview/hooks/useOverviewTabs.tsx                                                                                                                               5              0             45
apps/trade/client/pages/Portfolio/subpages/Perpetuals/PortfolioPerpPositionsPage.tsx                                                                                                                        1              0             13
apps/trade/client/pages/Portfolio/subpages/Perpetuals/charts/PortfolioPerpFundingChart.tsx                                                                                                                  4              1            107
apps/trade/client/pages/Portfolio/subpages/Perpetuals/charts/PortfolioPerpPnlChart.tsx                                                                                                                      4              1            113
apps/trade/client/pages/Portfolio/subpages/Perpetuals/components/PerpHeroMetricsHeader.tsx                                                                                                                  6              0            101
apps/trade/client/pages/Portfolio/subpages/Perpetuals/components/PerpHeroMetricsItems.tsx                                                                                                                   3              0             62
apps/trade/client/pages/Portfolio/subpages/Perpetuals/components/PerpHeroSection.tsx                                                                                                                        5              0             51
apps/trade/client/pages/Portfolio/subpages/Perpetuals/components/PerpPositionsTabs.tsx                                                                                                                      3              0             54
apps/trade/client/pages/Portfolio/subpages/Perpetuals/hooks/usePerpPositionsTabs.tsx                                                                                                                        5              0             36
apps/trade/client/pages/Portfolio/subpages/Pools/PortfolioPoolsPage.tsx                                                                                                                                     1              0             13
apps/trade/client/pages/Portfolio/subpages/Pools/charts/PortfolioPoolsPnlChart.tsx                                                                                                                          4              1            113
apps/trade/client/pages/Portfolio/subpages/Pools/charts/PortfolioPoolsPositionChart.tsx                                                                                                                     4              0             85
apps/trade/client/pages/Portfolio/subpages/Pools/components/PoolsHeader.tsx                                                                                                                                 1              0             21
apps/trade/client/pages/Portfolio/subpages/Pools/components/PoolsHeroMetricsHeader.tsx                                                                                                                      2              0             20
apps/trade/client/pages/Portfolio/subpages/Pools/components/PoolsHeroMetricsItems.tsx                                                                                                                       2              0             65
apps/trade/client/pages/Portfolio/subpages/Pools/components/PoolsHeroSection.tsx                                                                                                                            5              0             52
apps/trade/client/pages/SonicPoints/SonicPointsPage.tsx                                                                                                                                                     1              0             20
apps/trade/client/pages/SonicPoints/components/SonicPointsCard.tsx                                                                                                                                          3              0             53
apps/trade/client/pages/SonicPoints/components/SonicPointsDismissibleBanner/SonicPointsDismissibleBanner.tsx                                                                                                1              0              9
apps/trade/client/pages/SonicPoints/components/SonicPointsDismissibleBanner/SonicPointsDismissibleBannerContainer.tsx                                                                                       4              0             28
apps/trade/client/pages/SonicPoints/components/SonicPointsDismissibleBanner/SonicPointsDismissibleBannerContent.tsx                                                                                         6              0             80
apps/trade/client/pages/SonicPoints/components/SonicPointsPageHeader.tsx                                                                                                                                    2              0             21
apps/trade/client/pages/SonicPoints/components/SonicPointsSectionHeader.tsx                                                                                                                                 2              0             20
apps/trade/client/pages/SonicPoints/components/earn/SonicPointsEarnDepositCard/SonicPointsEarnDepositCard.tsx                                                                                               1              0             13
apps/trade/client/pages/SonicPoints/components/earn/SonicPointsEarnDepositCard/SonicPointsEarnDepositCardButton.tsx                                                                                         3              0             17
apps/trade/client/pages/SonicPoints/components/earn/SonicPointsEarnReferralsCard/SonicPointsEarnReferralsCard.tsx                                                                                           3              0             48
apps/trade/client/pages/SonicPoints/components/earn/SonicPointsEarnReferralsCard/useSonicPointsEarnReferralsCard.ts                                                                                         3              0             23
apps/trade/client/pages/SonicPoints/components/earn/SonicPointsEarnSection.tsx                                                                                                                              1              0             16
apps/trade/client/pages/SonicPoints/components/earn/SonicPointsEarnTradeCard/SonicPointsEarnTradeCard.tsx                                                                                                   1              0             20
apps/trade/client/pages/SonicPoints/components/earn/SonicPointsEarnTradeCard/SonicPointsEarnTradeCardVolumeItem.tsx                                                                                         4              0             28
apps/trade/client/pages/SonicPoints/components/hero/SonicPointsHeroCreditsCard/SonicPointsHeroCreditsCard.tsx                                                                                               2              0             44
apps/trade/client/pages/SonicPoints/components/hero/SonicPointsHeroCreditsCard/SonicPointsHeroCreditsCardMetrics.tsx                                                                                        5              2             33
apps/trade/client/pages/SonicPoints/components/hero/SonicPointsHeroPointsCard.tsx                                                                                                                           3              0             44
apps/trade/client/pages/SonicPoints/components/hero/SonicPointsHeroSection.tsx                                                                                                                              1              0             14
apps/trade/client/pages/SonicPoints/components/hero/SonicPointsHeroVrtxCard.tsx                                                                                                                             2              0             31
apps/trade/client/pages/SonicPoints/components/hero/assets/balloon.svg                                                                                                                                      0              0            127
apps/trade/client/pages/SonicPoints/components/hero/assets/gems-desktop.svg                                                                                                                                 0              0            122
apps/trade/client/pages/SonicPoints/components/hero/assets/gems-mobile.svg                                                                                                                                  0              0            314
apps/trade/client/pages/SonicPoints/components/hero/assets/points-desktop.svg                                                                                                                               0              0             43
apps/trade/client/pages/SonicPoints/components/hero/assets/points-mobile.svg                                                                                                                                0              0             23
apps/trade/client/pages/SonicPoints/components/leaderboard/SonicPointsLeaderboardSection.tsx                                                                                                                1              0             13
apps/trade/client/pages/SonicPoints/components/leaderboard/SonicPointsLeaderboardTable.tsx                                                                                                                  8              0             99
apps/trade/client/pages/SonicPoints/components/leaderboard/useSonicPointsLeaderboardTable.tsx                                                                                                               9              0             83
apps/trade/client/pages/SonicPoints/vertex-x-sonic-logo.svg                                                                                                                                                 0              0             30
apps/trade/client/pages/SpotTrading/SpotTradingPage.tsx                                                                                                                                                     6              4             48
apps/trade/client/pages/SpotTrading/components/SpotBalancesTab.tsx                                                                                                                                          6              1             63
apps/trade/client/pages/SpotTrading/components/SpotMarketInfoCards.tsx                                                                                                                                      2              0            104
apps/trade/client/pages/SpotTrading/components/SpotOrderPlacementSection/SpotOrderPlacementSection.tsx                                                                                                      9              0            144
apps/trade/client/pages/SpotTrading/components/SpotOrderPlacementSection/components/SpotLeverageOffDismissible.tsx                                                                                          1              0             12
apps/trade/client/pages/SpotTrading/components/SpotOrderPlacementSection/components/SpotLeverageOnDisclosure.tsx                                                                                            4              5             99
apps/trade/client/pages/SpotTrading/components/SpotOrderPlacementSection/components/SpotMarginSwitch.tsx                                                                                                    2              0             24
apps/trade/client/pages/SpotTrading/components/SpotOrderPlacementSection/components/SpotOrderSummary.tsx                                                                                                   12              0            137
apps/trade/client/pages/SpotTrading/components/SpotOrderPlacementSection/components/SpotTradingFormAccountInfo.tsx                                                                                          6              0             66
apps/trade/client/pages/SpotTrading/context/SpotOrderFormContext.tsx                                                                                                                                       25             87            261
apps/trade/client/pages/SpotTrading/context/hooks/useSpotOrderFormOnChangeSideEffects.ts                                                                                                                    2              3             20
apps/trade/client/pages/SpotTrading/context/hooks/useSpotOrderFormUserStateError.ts                                                                                                                         3              4             23
apps/trade/client/pages/SpotTrading/context/types.ts                                                                                                                                                        2              1              6
apps/trade/client/pages/SpotTrading/hooks/useShowLeverageWarnings.ts                                                                                                                                        4              3             24
apps/trade/client/pages/SpotTrading/hooks/useSpotMarketInfoCards.ts                                                                                                                                         8              0             67
apps/trade/client/pages/SpotTrading/hooks/useSpotTradingFormAccountInfo.ts                                                                                                                                  6              1             51
apps/trade/client/pages/SpotTrading/hooks/useSpotTradingFormAccountMetrics.ts                                                                                                                              18              5            181
apps/trade/client/pages/SpotTrading/hooks/useSpotTradingTableTabs.tsx                                                                                                                                       3              4            133
apps/trade/client/pages/Staking/VrtxStakingPage.tsx                                                                                                                                                         3              1             23
apps/trade/client/pages/Staking/components/StakingCard.tsx                                                                                                                                                  2              0             32
apps/trade/client/pages/Staking/components/StakingMultichainSection/StakingMultichainExchanges.tsx                                                                                                          6              1             93
apps/trade/client/pages/Staking/components/StakingMultichainSection/StakingMultichainHeader.tsx                                                                                                             1              0             43
apps/trade/client/pages/Staking/components/StakingMultichainSection/StakingMultichainOpportunities.tsx                                                                                                      6              0            142
apps/trade/client/pages/Staking/components/StakingMultichainSection/StakingMultichainSection.tsx                                                                                                            1              0             12
apps/trade/client/pages/Staking/components/StakingMultichainSection/assets/cg-icon.svg                                                                                                                      0              0             26
apps/trade/client/pages/Staking/components/StakingMultichainSection/assets/cmc-icon.svg                                                                                                                     0              0             12
apps/trade/client/pages/Staking/components/StakingMultichainSection/assets/exchanges/bybit-logo.svg                                                                                                         0              0             37
apps/trade/client/pages/Staking/components/StakingMultichainSection/assets/exchanges/camelot-logo.svg                                                                                                       0              0             52
apps/trade/client/pages/Staking/components/StakingMultichainSection/assets/exchanges/htx-logo.svg                                                                                                           0              0             62
apps/trade/client/pages/Staking/components/StakingMultichainSection/assets/exchanges/kucoin-logo.svg                                                                                                        0              0             48
apps/trade/client/pages/Staking/components/StakingMultichainSection/assets/exchanges/mexc-logo.svg                                                                                                          0              0             63
apps/trade/client/pages/Staking/components/StakingSecondaryClaimButton.tsx                                                                                                                                  4              0             37
apps/trade/client/pages/Staking/components/StakingUsdValueEndElement.tsx                                                                                                                                    2              0             31
apps/trade/client/pages/Staking/consts.ts                                                                                                                                                                   0              0              1
apps/trade/client/pages/Staking/v1/StakingV1PositionCard.tsx                                                                                                                                                3              0             65
apps/trade/client/pages/Staking/v1/StakingV1RewardsCard.tsx                                                                                                                                                 2              0             53
apps/trade/client/pages/Staking/v1/StakingV1SectionContent.tsx                                                                                                                                              3              0             73
apps/trade/client/pages/Staking/v1/StakingV1UnstakeCard.tsx                                                                                                                                                 2              0             75
apps/trade/client/pages/Staking/v1/useStakingV1Section.ts                                                                                                                                                  27              6            187
apps/trade/client/pages/Staking/v2/StakingV2ActionsCard.tsx                                                                                                                                                 8              1            125
apps/trade/client/pages/Staking/v2/StakingV2PositionCard.tsx                                                                                                                                                4              0            116
apps/trade/client/pages/Staking/v2/StakingV2SectionContent.tsx                                                                                                                                              2              0             57
apps/trade/client/pages/Staking/v2/StakingV2TopBar.tsx                                                                                                                                                      7              2            150
apps/trade/client/pages/Staking/v2/useStakingV2HistoryUrl.tsx                                                                                                                                               3              1             17
apps/trade/client/pages/Staking/v2/useStakingV2Section.ts                                                                                                                                                  25              3            184
apps/trade/client/pages/TradingCompetition/TradingCompetitionLandingPage/TradingCompetitionLandingPage.tsx                                                                                                  1              0             16
apps/trade/client/pages/TradingCompetition/TradingCompetitionLandingPage/components/TradingCompetitionJoinHeader.tsx                                                                                        4              0             24
apps/trade/client/pages/TradingCompetition/TradingCompetitionLandingPage/components/TradingCompetitionLandingInfoCards/TradingCompetitionLandingInfoCards.tsx                                               5              0             39
apps/trade/client/pages/TradingCompetition/TradingCompetitionLandingPage/components/TradingCompetitionPrizeHero.tsx                                                                                         4              0             25
apps/trade/client/pages/TradingCompetition/TradingCompetitionLandingPage/components/TradingCompetitionSubaccountsBanner/TradingCompetitionSubaccountsBanner.tsx                                             2              0             30
apps/trade/client/pages/TradingCompetition/TradingCompetitionLandingPage/components/TradingCompetitionSubaccountsBanner/TradingCompetitionSubaccountsBannerCTA.tsx                                          3              0             18
apps/trade/client/pages/TradingCompetition/TradingCompetitionTierPage/TradingCompetitionTierPage.tsx                                                                                                        4              0             26
apps/trade/client/pages/TradingCompetition/TradingCompetitionTierPage/components/TradingCompetitionLeaderboardHeader.tsx                                                                                    1              0             16
apps/trade/client/pages/TradingCompetition/TradingCompetitionTierPage/components/TradingCompetitionSwitchChainEnvCard.tsx                                                                                   4              0             22
apps/trade/client/pages/TradingCompetition/TradingCompetitionTierPage/components/TradingCompetitionTable.tsx                                                                                                7              1            159
apps/trade/client/pages/TradingCompetition/TradingCompetitionTierPage/components/TradingCompetitionTablePrize.tsx                                                                                           2              0             23
apps/trade/client/pages/TradingCompetition/TradingCompetitionTierPage/components/TradingCompetitionTierInfoCards/TradingCompetitionParticipantCard/EligibleParticipantCardContent.tsx                       5              0             66
apps/trade/client/pages/TradingCompetition/TradingCompetitionTierPage/components/TradingCompetitionTierInfoCards/TradingCompetitionParticipantCard/IneligibleParticipantCardContent.tsx                    24              5            180
apps/trade/client/pages/TradingCompetition/TradingCompetitionTierPage/components/TradingCompetitionTierInfoCards/TradingCompetitionParticipantCard/RegisterParticipantCardContent.tsx                      11              0            120
apps/trade/client/pages/TradingCompetition/TradingCompetitionTierPage/components/TradingCompetitionTierInfoCards/TradingCompetitionParticipantCard/TradingCompetitionParticipantCard.tsx                   10             15             72
apps/trade/client/pages/TradingCompetition/TradingCompetitionTierPage/components/TradingCompetitionTierInfoCards/TradingCompetitionTierInfoCards.tsx                                                        3              0             33
apps/trade/client/pages/TradingCompetition/TradingCompetitionTierPage/components/TradingCompetitionTierPageHeader.tsx                                                                                       3              0             14
apps/trade/client/pages/TradingCompetition/TradingCompetitionTierPage/components/blitz/TradingCompetitionBlitzPrize.tsx                                                                                     2              0             37
apps/trade/client/pages/TradingCompetition/assets/details-card/blitz/details-card-bg-bottom.svg                                                                                                             0              0             39
apps/trade/client/pages/TradingCompetition/assets/details-card/blitz/details-card-bg-top.svg                                                                                                                0              0             30
apps/trade/client/pages/TradingCompetition/assets/details-card/details-card-bg-vertex.svg                                                                                                                   0              0             35
apps/trade/client/pages/TradingCompetition/components/TradingCompetitionInfoCards/TradingCompetitionCard.tsx                                                                                                4              2             50
apps/trade/client/pages/TradingCompetition/components/TradingCompetitionInfoCards/TradingCompetitionInfoCards.tsx                                                                                           1              0              6
apps/trade/client/pages/TradingCompetition/components/TradingCompetitionInfoCards/TradingCompetitionTierDetailsCard.tsx                                                                                     7              1            131
apps/trade/client/pages/TradingCompetition/components/TradingCompetitionLayout/TradingCompetitionInitialLoadWrapper.tsx                                                                                     4              2             13
apps/trade/client/pages/TradingCompetition/components/TradingCompetitionLayout/TradingCompetitionLayout.tsx                                                                                                 2              0             17
apps/trade/client/pages/TradingCompetition/components/TradingCompetitionPageHeader/TradingCompetitionCountdownHeader.tsx                                                                                    9              0             72
apps/trade/client/pages/TradingCompetition/components/TradingCompetitionPageHeader/TradingCompetitionPageHeader.tsx                                                                                         3              0             31
apps/trade/client/pages/TradingCompetition/components/TradingCompetitionPageHeader/TradingCompetitionSubheader.tsx                                                                                          8              0             94
apps/trade/client/pages/TradingCompetition/components/blitz/TradingCompetitionBlitzDetailsCardBgImage.tsx                                                                                                   1              1             29
apps/trade/client/pages/TradingCompetition/components/vertex/TradingCompetitionVertexDetailsCardBgImage.tsx                                                                                                 1              1             11
apps/trade/client/pages/TradingCompetition/configs/assets/blitz/tier-label/tier-1-label.svg                                                                                                                 0              0              1
apps/trade/client/pages/TradingCompetition/configs/assets/blitz/tier-label/tier-2-label.svg                                                                                                                 0              0              1
apps/trade/client/pages/TradingCompetition/configs/assets/vertex/tier-label/tier-1-label.svg                                                                                                                0              0              1
apps/trade/client/pages/TradingCompetition/configs/assets/vertex/tier-label/tier-2-label.svg                                                                                                                0              0              1
apps/trade/client/pages/TradingCompetition/configs/blitz/blitz.tsx                                                                                                                                          1              0             15
apps/trade/client/pages/TradingCompetition/configs/blitz/blitzTestnet.tsx                                                                                                                                   1              0             15
apps/trade/client/pages/TradingCompetition/configs/blitz/common.tsx                                                                                                                                         1              0             17
apps/trade/client/pages/TradingCompetition/configs/blitz/consts.tsx                                                                                                                                         3              0             47
apps/trade/client/pages/TradingCompetition/configs/blitz/routes.ts                                                                                                                                          2              0              7
apps/trade/client/pages/TradingCompetition/configs/configs.ts                                                                                                                                               2              0             13
apps/trade/client/pages/TradingCompetition/configs/vrtx/common.tsx                                                                                                                                          1              0             17
apps/trade/client/pages/TradingCompetition/configs/vrtx/consts.tsx                                                                                                                                          3              0             33
apps/trade/client/pages/TradingCompetition/configs/vrtx/routes.ts                                                                                                                                           2              0              7
apps/trade/client/pages/TradingCompetition/configs/vrtx/vertex.tsx                                                                                                                                          1              0             19
apps/trade/client/pages/TradingCompetition/configs/vrtx/vertexTestnet.tsx                                                                                                                                   1              0             19
apps/trade/client/pages/TradingCompetition/context/TradingCompetitionContext.tsx                                                                                                                           10              0             54
apps/trade/client/pages/TradingCompetition/hooks/useTradingCompetitionTable.ts                                                                                                                             12              1            106
apps/trade/client/pages/Vaults/VaultsPage.tsx                                                                                                                                                               1              0             15
apps/trade/client/pages/Vaults/components/ElixirVaultsCard.tsx                                                                                                                                              1              0             34
apps/trade/client/pages/Vaults/components/VaultCard.tsx                                                                                                                                                     2              0             39
apps/trade/client/pages/Vaults/components/skate/BlitzSkateRewardsDisclosure.tsx                                                                                                                             4              0             53
apps/trade/client/pages/Vaults/components/skate/SkateVaultActionButtons.tsx                                                                                                                                 4              0             46
apps/trade/client/pages/Vaults/components/skate/SkateVaultCard.tsx                                                                                                                                          3              0            116
apps/trade/client/pages/Vaults/components/skate/SkateVaultCards.tsx                                                                                                                                         4              0             28
apps/trade/client/pages/Vaults/components/skate/hooks/useSkateVaultCard.ts                                                                                                                                  3              0             45
apps/trade/client/pages/VertexReferrals/VertexReferralsPage.tsx                                                                                                                                             1              0             26
apps/trade/client/pages/VertexReferrals/components/FuulReferralEarningsCard/ClaimFuulEarnings.tsx                                                                                                           5              0             53
apps/trade/client/pages/VertexReferrals/components/FuulReferralEarningsCard/ConfirmFuulReferral.tsx                                                                                                         6              2             59
apps/trade/client/pages/VertexReferrals/components/FuulReferralEarningsCard/FuulReferralEarningsCard.tsx                                                                                                    3              0             89
apps/trade/client/pages/VertexReferrals/components/FuulReferralEarningsCard/useFuulReferralEarningsCard.ts                                                                                                  9              2             58
apps/trade/client/pages/VertexReferrals/components/FuulReferralTierDetailsTooltipContent.tsx                                                                                                                3              3             97
apps/trade/client/pages/VertexReferrals/components/FuulReferralsCard.tsx                                                                                                                                    2              0             27
apps/trade/client/pages/VertexReferrals/components/FuulReferralsLeaderboardHeading/FuulReferralRankPill.tsx                                                                                                 4              0             23
apps/trade/client/pages/VertexReferrals/components/FuulReferralsLeaderboardHeading/FuulReferralsLeaderboardHeading.tsx                                                                                      1              0              9
apps/trade/client/pages/VertexReferrals/components/FuulReferralsOverviewCard/FuulReferralsOverviewCard.tsx                                                                                                  1              0             37
apps/trade/client/pages/VertexReferrals/components/FuulReferralsOverviewCard/FuulReferralsOverviewMetrics.tsx                                                                                               3              0             29
apps/trade/client/pages/VertexReferrals/components/FuulReferralsOverviewCard/FuulReferralsTierInfo.tsx                                                                                                      6              0             65
apps/trade/client/pages/VertexReferrals/components/FuulReferralsOverviewCard/assets/tier-1-icon.svg                                                                                                         0              0             27
apps/trade/client/pages/VertexReferrals/components/FuulReferralsOverviewCard/assets/tier-2-icon.svg                                                                                                         0              0             37
apps/trade/client/pages/VertexReferrals/components/FuulReferralsOverviewCard/assets/tier-3-icon.svg                                                                                                         0              0             37
apps/trade/client/pages/VertexReferrals/components/FuulReferralsOverviewCard/assets/tier-4-icon.svg                                                                                                         0              0             37
apps/trade/client/pages/VertexReferrals/components/FuulReferralsOverviewCard/assets/tier-5-icon.svg                                                                                                         0              0             31
apps/trade/client/pages/VertexReferrals/components/FuulReferralsReferTradersCard/FuulReferralsCustomizeLinkTextButton.tsx                                                                                   3              0             21
apps/trade/client/pages/VertexReferrals/components/FuulReferralsReferTradersCard/FuulReferralsReferTradersCard.tsx                                                                                          1              0             15
apps/trade/client/pages/VertexReferrals/components/FuulReferralsRewardsLeaderboardTable/FuulReferralsRewardsLeaderboardTable.tsx                                                                            5              0            127
apps/trade/client/pages/VertexReferrals/components/FuulReferralsRewardsLeaderboardTable/useFuulReferralsRewardsLeaderboardTable.ts                                                                          7              0             55
apps/trade/client/pages/VertexReferrals/components/ReferralsPageTitle/ReferralsPageTitle.tsx                                                                                                                3              0             22
apps/trade/client/pages/VertexReferrals/components/ReferralsPageTitle/usePastProgramReferralRewards.ts                                                                                                      3              4             15
apps/trade/client/pages/VertexRewards/VertexRewardsPage.tsx                                                                                                                                                 1              0             31
apps/trade/client/pages/VertexRewards/components/ChainDependentRewardsCards.tsx                                                                                                                             4              1             31
apps/trade/client/pages/VertexRewards/components/cards/ArbRewardsSummaryCard/ArbRewardsSummaryCard.tsx                                                                                                      6              0            134
apps/trade/client/pages/VertexRewards/components/cards/ArbRewardsSummaryCard/useArbRewardsSummaryCard.ts                                                                                                    6              1             49
apps/trade/client/pages/VertexRewards/components/cards/ArbRewardsSummaryCard/useClaimArbRewards.ts                                                                                                          7              4             49
apps/trade/client/pages/VertexRewards/components/cards/LbaPositionCollapsibleSummaryCard/LbaPositionCollapsibleSummaryCard.tsx                                                                              8              0            140
apps/trade/client/pages/VertexRewards/components/cards/LbaPositionCollapsibleSummaryCard/LbaPositionTable/LbaPositionActionCell.tsx                                                                         3              0             37
apps/trade/client/pages/VertexRewards/components/cards/LbaPositionCollapsibleSummaryCard/LbaPositionTable/LbaPositionTable.tsx                                                                              6              0            212
apps/trade/client/pages/VertexRewards/components/cards/LbaPositionCollapsibleSummaryCard/LbaPositionTable/LbaPositionUnlockTimeHeaderCell.tsx                                                               3              0             24
apps/trade/client/pages/VertexRewards/components/cards/LbaPositionCollapsibleSummaryCard/LbaPositionTable/useLbaPositionTable.ts                                                                            8              2            122
apps/trade/client/pages/VertexRewards/components/cards/LbaPositionCollapsibleSummaryCard/useLbaPositionSummaryCard.tsx                                                                                      5              0             82
apps/trade/client/pages/VertexRewards/components/cards/LbaPositionCollapsibleSummaryCard/vrtx-lba-pool-icon.svg                                                                                             0              0            214
apps/trade/client/pages/VertexRewards/components/cards/MantleRewardsSummaryCard/MantleRewardsSummaryCard.tsx                                                                                                5              0            122
apps/trade/client/pages/VertexRewards/components/cards/MantleRewardsSummaryCard/useClaimMantleRewards.ts                                                                                                    7              4             49
apps/trade/client/pages/VertexRewards/components/cards/MantleRewardsSummaryCard/useMantleRewardsSummaryCard.ts                                                                                              4              0             40
apps/trade/client/pages/VertexRewards/components/cards/RewardsSummaryCard.tsx                                                                                                                              10              1            168
apps/trade/client/pages/VertexRewards/components/cards/SeiRewardsSummaryCard/SeiRewardsSummaryCard.tsx                                                                                                      7              0            128
apps/trade/client/pages/VertexRewards/components/cards/SeiRewardsSummaryCard/useClaimSeiRewards.ts                                                                                                          7              0             47
apps/trade/client/pages/VertexRewards/components/cards/SeiRewardsSummaryCard/useSeiRewardsSummaryCard.ts                                                                                                    4              0             40
apps/trade/client/pages/VertexRewards/components/cards/VrtxCollapsibleSummaryCard/EpochRewardsTable/EpochRewardsTable.tsx                                                                                   7              3            202
apps/trade/client/pages/VertexRewards/components/cards/VrtxCollapsibleSummaryCard/EpochRewardsTable/cells/EpochNameCell.tsx                                                                                 3              0             43
apps/trade/client/pages/VertexRewards/components/cards/VrtxCollapsibleSummaryCard/EpochRewardsTable/cells/EpochRewardsLiquidClaimActionCell.tsx                                                             8              3             76
apps/trade/client/pages/VertexRewards/components/cards/VrtxCollapsibleSummaryCard/EpochRewardsTable/cells/EpochRewardsPoolCell.tsx                                                                          4              0             41
apps/trade/client/pages/VertexRewards/components/cards/VrtxCollapsibleSummaryCard/EpochRewardsTable/cells/EpochRewardsTimeSpanCell.tsx                                                                      4              2             63
apps/trade/client/pages/VertexRewards/components/cards/VrtxCollapsibleSummaryCard/EpochRewardsTable/useEpochRewardsTable.ts                                                                                14              3            148
apps/trade/client/pages/VertexRewards/components/cards/VrtxCollapsibleSummaryCard/VrtxCollapsibleSummaryCard.tsx                                                                                            8              0            157
apps/trade/client/pages/VertexRewards/components/cards/VrtxCollapsibleSummaryCard/useVrtxSummaryCard.ts                                                                                                    10              2             86
apps/trade/client/pages/VertexRewards/hooks/types.ts                                                                                                                                                        3              0             17
apps/trade/client/pages/VertexRewards/hooks/useCompletedStateFoundationRewards.ts                                                                                                                           8              7             38
apps/trade/client/pages/VertexRewards/hooks/useFoundationRewards.ts                                                                                                                                        23             17            112
apps/trade/client/store/marketsPageStore.ts                                                                                                                                                                 1              0              4
apps/trade/client/store/navigationStore.ts                                                                                                                                                                  1              0              2
apps/trade/client/store/portfolioStore.ts                                                                                                                                                                   3              0              8
apps/trade/client/store/referralsStore.ts                                                                                                                                                                   2              0              3
apps/trade/client/store/trading/commonTradingStore.ts                                                                                                                                                       1              1              3
apps/trade/client/store/trading/perpTradingStore.ts                                                                                                                                                         1              0              3
apps/trade/client/store/trading/spotTradingStore.ts                                                                                                                                                         1              0              3
apps/trade/client/types/BaseActionButtonState.ts                                                                                                                                                            0              0              1
apps/trade/client/types/MarketFilter.ts                                                                                                                                                                     2              4              8
apps/trade/client/types/OnChainActionButtonStateWithApproval.ts                                                                                                                                             2              0              8
apps/trade/client/types/QueryState.ts                                                                                                                                                                       0              1              5
apps/trade/client/types/TxResponse.ts                                                                                                                                                                       0              0              3
apps/trade/client/types/linkedPercentageAmountFormTypes.ts                                                                                                                                                  1              2              6
apps/trade/client/utils/calcs/calcChangeFrac.ts                                                                                                                                                             1              7             11
apps/trade/client/utils/calcs/calcCrossPositionMarginWithoutPnl.ts                                                                                                                                          1              6             13
apps/trade/client/utils/calcs/calcEstimatedLpApr.ts                                                                                                                                                         7             14             45
apps/trade/client/utils/calcs/calcIsoPositionLeverage.ts                                                                                                                                                    1              7              7
apps/trade/client/utils/calcs/calcIsoPositionNetMargin.ts                                                                                                                                                   2              5             13
apps/trade/client/utils/calcs/calcLpConversionPrice.ts                                                                                                                                                      1              4              8
apps/trade/client/utils/calcs/calcMarketConversionPriceFromOraclePrice.ts                                                                                                                                   1              7              8
apps/trade/client/utils/calcs/calcOrderFillPrice.ts                                                                                                                                                         1              8              8
apps/trade/client/utils/calcs/calcPreMatchEventBalanceAmount.ts                                                                                                                                             1              5              6
apps/trade/client/utils/calcs/funding.ts                                                                                                                                                                    4              1             15
apps/trade/client/utils/calcs/getSubaccountMetricsFromIndexerSnapshot.ts                                                                                                                                   11             13            132
apps/trade/client/utils/calcs/healthCalcs.ts                                                                                                                                                               29             51            149
apps/trade/client/utils/calcs/liquidationPriceCalcs.ts                                                                                                                                                      7             19             52
apps/trade/client/utils/calcs/perpEntryCostCalcs.ts                                                                                                                                                         4              3             25
apps/trade/client/utils/calcs/pnlCalcs.ts                                                                                                                                                                  10              8             84
apps/trade/client/utils/calcs/stakingV1Calcs.ts                                                                                                                                                             9             24             59
apps/trade/client/utils/comparators.ts                                                                                                                                                                      3             14             17
apps/trade/client/utils/createToastId.ts                                                                                                                                                                    1              0              4
apps/trade/client/utils/delay.ts                                                                                                                                                                            0              0              3
apps/trade/client/utils/downloadCsv.ts                                                                                                                                                                      4             22             24
apps/trade/client/utils/errors/getExecuteErrorMessage.ts                                                                                                                                                    1              4             20
apps/trade/client/utils/errors/isUserDeniedError.ts                                                                                                                                                         4             10             20
apps/trade/client/utils/form/resolvePercentageAmountSubmitValue.ts                                                                                                                                          1              7             11
apps/trade/client/utils/form/toSafeFormPercentage.ts                                                                                                                                                        4              7             18
apps/trade/client/utils/form/watchFormError.ts                                                                                                                                                              1              0              8
apps/trade/client/utils/getEstimatedExitPrice.ts                                                                                                                                                            1              8              7
apps/trade/client/utils/getLiquidationRiskLevel.ts                                                                                                                                                          2              8             19
apps/trade/client/utils/getLiquidationRiskLevelClassNames.ts                                                                                                                                                2              4             33
apps/trade/client/utils/getSharedProductMetadata.ts                                                                                                                                                         1              5             21
apps/trade/client/utils/getUniqueImageForValue.ts                                                                                                                                                           1              5             13
apps/trade/client/utils/inputValidators.ts                                                                                                                                                                  6              0             51
apps/trade/client/utils/isIsoSubaccount.ts                                                                                                                                                                  2              1              8
apps/trade/client/utils/isLiquidationFinalizationTx.ts                                                                                                                                                      2              4             11
apps/trade/client/utils/isReducePositionMatchEvent.ts                                                                                                                                                       2              5              8
apps/trade/client/utils/isRoughlyZero.ts                                                                                                                                                                    1              6              4
apps/trade/client/utils/reactQueryConfig.ts                                                                                                                                                                 0              3              4
apps/trade/client/utils/rounding.ts                                                                                                                                                                         4              6             46
apps/trade/client/utils/ui/getSignDependentColorClassName.ts                                                                                                                                                1              0              9
apps/trade/common/brandMetadata/brandMetadataByBrandName.ts                                                                                                                                                 1              0             10
apps/trade/common/brandMetadata/connectorMetadata.ts                                                                                                                                                        3              3             40
apps/trade/common/brandMetadata/images.ts                                                                                                                                                                   4              4             48
apps/trade/common/brandMetadata/links/blitzLinks.ts                                                                                                                                                         1              3             46
apps/trade/common/brandMetadata/links/links.ts                                                                                                                                                              3              0             27
apps/trade/common/brandMetadata/links/vertexLinks.ts                                                                                                                                                        1              0             80
apps/trade/common/brandMetadata/seoInfo.ts                                                                                                                                                                  3              0             44
apps/trade/common/brandMetadata/types.ts                                                                                                                                                                    0              0              3
apps/trade/common/environment/baseClientEnv.ts                                                                                                                                                              5              4             24
apps/trade/common/environment/clientEnv.ts                                                                                                                                                                  2              0             27
apps/trade/common/environment/envBrandName.d.ts                                                                                                                                                             2              0              3
apps/trade/common/environment/envBrandName.js                                                                                                                                                               1              1              2
apps/trade/common/environment/integrations/googleAnalyticsIdByBrandName.ts                                                                                                                                  1              0              6
apps/trade/common/environment/integrations/microsoftClarityAnalyticsByBrandName.ts                                                                                                                          1              0              9
apps/trade/common/environment/integrations/walletConnectProjectIdByBrandName.ts                                                                                                                             1              0              7
apps/trade/common/environment/sensitiveData.ts                                                                                                                                                              1              4             31
apps/trade/common/environment/sentryEnv.ts                                                                                                                                                                  2              0              8
apps/trade/common/theme/colors.ts                                                                                                                                                                           2              0             12
apps/trade/common/theme/fonts.ts                                                                                                                                                                            2              0             12
apps/trade/eslint.config.js                                                                                                                                                                                 1              0             18
apps/trade/instrumentation.ts                                                                                                                                                                               1              0              8
apps/trade/middleware.ts                                                                                                                                                                                    2              1             10
apps/trade/netlify.toml                                                                                                                                                                                     0              0              2
apps/trade/package.json                                                                                                                                                                                     0              0             91
apps/trade/postcss.config.js                                                                                                                                                                                0              0              6
apps/trade/public/blitz-icon.svg                                                                                                                                                                            0              0              3
apps/trade/public/blitz-site.webmanifest                                                                                                                                                                    0              0             21
apps/trade/public/vertex-icon.svg                                                                                                                                                                           0              0              3
apps/trade/public/vertex-site.webmanifest                                                                                                                                                                   0              0             21
apps/trade/sentry.client.config.ts                                                                                                                                                                          2             20             27
apps/trade/sentry.edge.config.ts                                                                                                                                                                            2              5             10
apps/trade/sentry.server.config.ts                                                                                                                                                                          2              4             10
apps/trade/styles/globals.css                                                                                                                                                                              18              7            103
apps/trade/tailwind.config.ts                                                                                                                                                                               5              1             44
apps/trade/tsconfig.json                                                                                                                                                                                    0              0             14
apps/trade/types.d.ts                                                                                                                                                                                       0              0              1
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
SUM:                                                                                                                                                                                                      8821           4134          96643
```

#### Summary by Language

```
-------------------------------------------------------------------------------
Language                     files          blank        comment           code
-------------------------------------------------------------------------------
TypeScript                    1621           8585           4084          92793
SVG                             62              6              0           2039
CSS                             18            228             49           1636
JSON                             4              0              0            147
JavaScript                       3              2              1             26
TOML                             1              0              0              2
-------------------------------------------------------------------------------
SUM:                          1709           8821           4134          96643
-------------------------------------------------------------------------------
```

## Packages

### package/common

#### Files

```
-----------------------------------------------------------------------------------------------------------------
File                                                                          blank        comment           code
-----------------------------------------------------------------------------------------------------------------
packages/common/consts/geoblockedCountryNames.ts                                 0              0             11
packages/common/consts/index.ts                                                  0              0              1
packages/common/eslint.config.js                                                 1              4             17
packages/common/hooks/index.ts                                                   0              0              4
packages/common/hooks/useCopyText.ts                                             5              1             22
packages/common/hooks/useIsClient.ts                                             3              9             12
packages/common/hooks/useStorageAtom.ts                                          4              1             31
packages/common/hooks/useWindowSize.ts                                           2              0              8
packages/common/index.ts                                                         0              0              5
packages/common/marketing/GoogleAnalytics.tsx                                    2              0              8
packages/common/marketing/getIsGeolocationBlockedWithFetch.ts                    3              4             10
packages/common/marketing/index.ts                                               0              0              3
packages/common/marketing/useBaseCookiePreference.ts                             4              0             21
packages/common/package.json                                                     0              0             25
packages/common/tsconfig.json                                                    0              0              6
packages/common/types/NextImageSrc.ts                                            1              0              2
packages/common/types/UtilityTypes.ts                                            3              0              4
packages/common/types/index.ts                                                   0              0              2
packages/common/utils/classNameUtils.ts                                          3              6              8
packages/common/utils/createLocalStorageAtom.ts                                  1              3             10
packages/common/utils/hasClass.ts                                                1              3              3
packages/common/utils/index.ts                                                   0              0              8
packages/common/utils/inputValidators.ts                                         4              4             10
packages/common/utils/nonNullFilter.ts                                           0              0              5
packages/common/utils/safeDiv.ts                                                 4              7             14
packages/common/utils/safeParseForData.ts                                        2              8             13
packages/common/utils/truncate.ts                                                3              0             17
-----------------------------------------------------------------------------------------------------------------
SUM:                                                                             46             50            280
```

#### Summary by Language

```
-------------------------------------------------------------------------------
Language                     files          blank        comment           code
-------------------------------------------------------------------------------
TypeScript                      24             45             46            232
JSON                             2              0              0             31
JavaScript                       1              1              4             17
-------------------------------------------------------------------------------
SUM:                            27             46             50            280
-------------------------------------------------------------------------------
```

### package/eslint-config-custom

#### Files

```
----------------------------------------------------------------------------------------------
File                                                       blank        comment           code
----------------------------------------------------------------------------------------------
packages/eslint-config-custom/index.js                        2              0             38
packages/eslint-config-custom/package.json                    0              0             23
----------------------------------------------------------------------------------------------
SUM:                                                           2              0             61
```

#### Summary by Language

```
-------------------------------------------------------------------------------
Language                     files          blank        comment           code
-------------------------------------------------------------------------------
JavaScript                       1              2              0             38
JSON                             1              0              0             23
-------------------------------------------------------------------------------
SUM:                             2              2              0             61
-------------------------------------------------------------------------------
```

### package/react-client

#### Files

```
----------------------------------------------------------------------------------------------------------------------------------------------
File                                                                                                       blank        comment           code
----------------------------------------------------------------------------------------------------------------------------------------------
packages/react-client/chains.ts                                                                               2              0             51
packages/react-client/consts/chainEnvs.ts                                                                     1              0             12
packages/react-client/consts/index.ts                                                                         0              0              1
packages/react-client/context/evm/EVMContext.ts                                                               2              0              4
packages/react-client/context/evm/EVMContextProvider.tsx                                                     20             17            203
packages/react-client/context/evm/consts/index.ts                                                             0              0              1
packages/react-client/context/evm/consts/knownConnectorIds.ts                                                 1              3             11
packages/react-client/context/evm/hooks/index.ts                                                              0              0              7
packages/react-client/context/evm/hooks/useDidInitializeWalletConnection.ts                                   8             16             38
packages/react-client/context/evm/hooks/useEthersProvider.ts                                                  1              0             12
packages/react-client/context/evm/hooks/useEthersSigner.ts                                                    3              0             22
packages/react-client/context/evm/hooks/usePrimaryChainId.ts                                                  1              0              5
packages/react-client/context/evm/hooks/usePrimaryChainPublicClient.ts                                        2              0              6
packages/react-client/context/evm/hooks/usePrimaryChainWalletClient.ts                                        2              0              9
packages/react-client/context/evm/hooks/useWagmiConfig.ts                                                     1              0             11
packages/react-client/context/evm/index.ts                                                                    1              0              6
packages/react-client/context/evm/types/ChainStatus.ts                                                        1              6              6
packages/react-client/context/evm/types/ConnectionStatus.ts                                                   1              3             15
packages/react-client/context/evm/types/EVMContextData.ts                                                     5              4             21
packages/react-client/context/evm/types/WagmiConfigParams.ts                                                  2              1             13
packages/react-client/context/evm/types/index.ts                                                              0              0              4
packages/react-client/context/evm/utils/getIsConnectorEnabledForChainEnv.ts                                   3              0             43
packages/react-client/context/evm/utils/getWagmiConfig.ts                                                     3              3             29
packages/react-client/context/evm/utils/index.ts                                                              0              0              3
packages/react-client/context/evm/utils/viemToEthers.ts                                                       3             12             38
packages/react-client/context/index.ts                                                                        0              0              3
packages/react-client/context/metadata/VertexMetadataContext.tsx                                             20             13            103
packages/react-client/context/metadata/chainMetadata/chainIcons.ts                                            1              0             28
packages/react-client/context/metadata/chainMetadata/chainMetadata.ts                                         3              0             22
packages/react-client/context/metadata/chainMetadata/chains/abstract.svg                                      0              0              5
packages/react-client/context/metadata/chainMetadata/chains/arbitrum.svg                                      0              0             23
packages/react-client/context/metadata/chainMetadata/chains/base.svg                                          0              0              3
packages/react-client/context/metadata/chainMetadata/chains/berachain.svg                                     0              0              9
packages/react-client/context/metadata/chainMetadata/chains/blast.svg                                         0              0              5
packages/react-client/context/metadata/chainMetadata/chains/mantle.svg                                        0              0             12
packages/react-client/context/metadata/chainMetadata/chains/sei.svg                                           0              0             10
packages/react-client/context/metadata/chainMetadata/chains/sonic.svg                                         0              0              8
packages/react-client/context/metadata/chainMetadata/index.ts                                                 0              0              3
packages/react-client/context/metadata/chainMetadata/utils/getChainEnvName.ts                                 1              0              5
packages/react-client/context/metadata/chainMetadata/utils/getChainEnvType.ts                                 2              4             42
packages/react-client/context/metadata/chainMetadata/utils/index.ts                                           0              0              2
packages/react-client/context/metadata/consts/hiddenProductIdsByChainEnv.ts                                   1              0             19
packages/react-client/context/metadata/consts/index.ts                                                        0              0              2
packages/react-client/context/metadata/consts/newProductIdsByChainEnv.ts                                      1              0             19
packages/react-client/context/metadata/index.ts                                                               0              0              4
packages/react-client/context/metadata/productMetadata/abstract/index.ts                                      0              0              3
packages/react-client/context/metadata/productMetadata/abstract/perpMetadataByProductId.ts                    2              0              8
packages/react-client/context/metadata/productMetadata/abstract/spotMetadataByProductId.ts                    4              6             25
packages/react-client/context/metadata/productMetadata/abstract/tokens.ts                                     4              6             18
packages/react-client/context/metadata/productMetadata/arbitrum/index.ts                                      0              0              3
packages/react-client/context/metadata/productMetadata/arbitrum/perpMetadataByProductId.ts                    2              0              8
packages/react-client/context/metadata/productMetadata/arbitrum/spotMetadataByProductId.ts                    4              6            100
packages/react-client/context/metadata/productMetadata/arbitrum/tokens.ts                                    15              6             89
packages/react-client/context/metadata/productMetadata/base/index.ts                                          0              0              3
packages/react-client/context/metadata/productMetadata/base/perpMetadataByProductId.ts                        2              0              8
packages/react-client/context/metadata/productMetadata/base/spotMetadataByProductId.ts                        4              6             58
packages/react-client/context/metadata/productMetadata/base/tokens.ts                                         8              6             46
packages/react-client/context/metadata/productMetadata/blast/index.ts                                         0              0              3
packages/react-client/context/metadata/productMetadata/blast/perpMetadataByProductId.ts                       2              0              8
packages/react-client/context/metadata/productMetadata/blast/spotMetadataByProductId.ts                       4              6             65
packages/react-client/context/metadata/productMetadata/blast/tokens.ts                                       10              6             55
packages/react-client/context/metadata/productMetadata/commonPerpMetadataByProductId.ts                       3              0            129
packages/react-client/context/metadata/productMetadata/index.ts                                               0              0             15
packages/react-client/context/metadata/productMetadata/knownProductIds.ts                                     0              3             15
packages/react-client/context/metadata/productMetadata/local/index.ts                                         0              0              3
packages/react-client/context/metadata/productMetadata/local/perpMetadataByProductId.ts                       1              0              9
packages/react-client/context/metadata/productMetadata/local/spotMetadataByProductId.ts                       1              0             27
packages/react-client/context/metadata/productMetadata/local/tokens.ts                                        5              0             34
packages/react-client/context/metadata/productMetadata/mantle/index.ts                                        0              0              3
packages/react-client/context/metadata/productMetadata/mantle/perpMetadataByProductId.ts                      2              0              8
packages/react-client/context/metadata/productMetadata/mantle/spotMetadataByProductId.ts                      4              8             79
packages/react-client/context/metadata/productMetadata/mantle/tokens.ts                                      12              6             69
packages/react-client/context/metadata/productMetadata/metadataByChainEnv.ts                                  2              2             90
packages/react-client/context/metadata/productMetadata/noopMetadata.ts                                        1              0             10
packages/react-client/context/metadata/productMetadata/perpMetadata.ts                                       59              0            416
packages/react-client/context/metadata/productMetadata/primaryQuoteSymbols.ts                                 0              0              4
packages/react-client/context/metadata/productMetadata/primaryQuoteTokenByChainEnv.ts                         1              1             28
packages/react-client/context/metadata/productMetadata/protocolTokenMetadataByChainEnv.ts                     4             16             67
packages/react-client/context/metadata/productMetadata/sei/index.ts                                           0              0              3
packages/react-client/context/metadata/productMetadata/sei/perpMetadataByProductId.ts                         2              0              8
packages/react-client/context/metadata/productMetadata/sei/spotMetadataByProductId.ts                         4              6             44
packages/react-client/context/metadata/productMetadata/sei/tokens.ts                                          7              6             34
packages/react-client/context/metadata/productMetadata/sonic/index.ts                                         0              0              3
packages/react-client/context/metadata/productMetadata/sonic/perpMetadataByProductId.ts                       2              0              8
packages/react-client/context/metadata/productMetadata/sonic/spotMetadataByProductId.ts                       4             12             25
packages/react-client/context/metadata/productMetadata/sonic/tokens.ts                                        5              6             25
packages/react-client/context/metadata/productMetadata/tokenIcons.ts                                          3              0            286
packages/react-client/context/metadata/productMetadata/tokens/aave.svg                                        0              0             12
packages/react-client/context/metadata/productMetadata/tokens/ada.svg                                         0              0             11
packages/react-client/context/metadata/productMetadata/tokens/ape.svg                                         0              0             66
packages/react-client/context/metadata/productMetadata/tokens/apt.svg                                         0              0             11
packages/react-client/context/metadata/productMetadata/tokens/arb.svg                                         0              0             15
packages/react-client/context/metadata/productMetadata/tokens/atom.svg                                        0              0             15
packages/react-client/context/metadata/productMetadata/tokens/avax.svg                                        0              0              9
packages/react-client/context/metadata/productMetadata/tokens/bch.svg                                         0              0             11
packages/react-client/context/metadata/productMetadata/tokens/benji.svg                                       1              1             38
packages/react-client/context/metadata/productMetadata/tokens/blast.svg                                       0              0              1
packages/react-client/context/metadata/productMetadata/tokens/blur.svg                                        0              0             14
packages/react-client/context/metadata/productMetadata/tokens/bnb.svg                                         0              0             11
packages/react-client/context/metadata/productMetadata/tokens/brett.svg                                       0              0            351
packages/react-client/context/metadata/productMetadata/tokens/btc.svg                                         0              0             11
packages/react-client/context/metadata/productMetadata/tokens/comp.svg                                        0              0             11
packages/react-client/context/metadata/productMetadata/tokens/crv.svg                                         0              0              4
packages/react-client/context/metadata/productMetadata/tokens/degen.svg                                       0              0             12
packages/react-client/context/metadata/productMetadata/tokens/doge.svg                                        0              0            133
packages/react-client/context/metadata/productMetadata/tokens/dot.svg                                         0              0             12
packages/react-client/context/metadata/productMetadata/tokens/dydx.svg                                        0              0             20
packages/react-client/context/metadata/productMetadata/tokens/eigen.svg                                       0              0             11
packages/react-client/context/metadata/productMetadata/tokens/ena.svg                                         0              0              4
packages/react-client/context/metadata/productMetadata/tokens/eth.svg                                         0              0             16
packages/react-client/context/metadata/productMetadata/tokens/fil.svg                                         0              0             16
packages/react-client/context/metadata/productMetadata/tokens/ftm.svg                                         0              0             11
packages/react-client/context/metadata/productMetadata/tokens/gala.svg                                        0              0             11
packages/react-client/context/metadata/productMetadata/tokens/gmci30.svg                                      0              0             17
packages/react-client/context/metadata/productMetadata/tokens/gmmeme.svg                                      0              0             17
packages/react-client/context/metadata/productMetadata/tokens/goat.svg                                        0              0             14
packages/react-client/context/metadata/productMetadata/tokens/icp.svg                                         0              0             22
packages/react-client/context/metadata/productMetadata/tokens/imx.svg                                         0              0              4
packages/react-client/context/metadata/productMetadata/tokens/inj.svg                                         0              0             20
packages/react-client/context/metadata/productMetadata/tokens/jup.svg                                         0              0             39
packages/react-client/context/metadata/productMetadata/tokens/ldo.svg                                         0              0             12
packages/react-client/context/metadata/productMetadata/tokens/link.svg                                        0              0             11
packages/react-client/context/metadata/productMetadata/tokens/ltc.svg                                         0              0              4
packages/react-client/context/metadata/productMetadata/tokens/meme.svg                                        0              0              9
packages/react-client/context/metadata/productMetadata/tokens/meth.svg                                        0              0             24
packages/react-client/context/metadata/productMetadata/tokens/mkr.svg                                         0              0             20
packages/react-client/context/metadata/productMetadata/tokens/mnt.svg                                         0              0             12
packages/react-client/context/metadata/productMetadata/tokens/near.svg                                        0              0              4
packages/react-client/context/metadata/productMetadata/tokens/ondo.svg                                        0              0             18
packages/react-client/context/metadata/productMetadata/tokens/op.svg                                          0              0             11
packages/react-client/context/metadata/productMetadata/tokens/pepe.svg                                        0              0             14
packages/react-client/context/metadata/productMetadata/tokens/pol.svg                                         0              0              9
packages/react-client/context/metadata/productMetadata/tokens/pyth.svg                                        0              0             12
packages/react-client/context/metadata/productMetadata/tokens/scr.svg                                         0              0             22
packages/react-client/context/metadata/productMetadata/tokens/sei.svg                                         0              0             10
packages/react-client/context/metadata/productMetadata/tokens/snx.svg                                         0              0             15
packages/react-client/context/metadata/productMetadata/tokens/sol.svg                                         0              0             25
packages/react-client/context/metadata/productMetadata/tokens/sonic.svg                                       0              0              8
packages/react-client/context/metadata/productMetadata/tokens/stx.svg                                         0              0              4
packages/react-client/context/metadata/productMetadata/tokens/sui.svg                                         0              0             11
packages/react-client/context/metadata/productMetadata/tokens/tia.svg                                         0              0              4
packages/react-client/context/metadata/productMetadata/tokens/ton.svg                                         0              0             11
packages/react-client/context/metadata/productMetadata/tokens/trx.svg                                         0              0              4
packages/react-client/context/metadata/productMetadata/tokens/uni.svg                                         0              0              9
packages/react-client/context/metadata/productMetadata/tokens/usdb.svg                                        0              0              5
packages/react-client/context/metadata/productMetadata/tokens/usdc.svg                                        0              0             12
packages/react-client/context/metadata/productMetadata/tokens/usdt.svg                                        0              0             12
packages/react-client/context/metadata/productMetadata/tokens/vovrtx.svg                                      0              0             14
packages/react-client/context/metadata/productMetadata/tokens/vrtx.svg                                        0              0             17
packages/react-client/context/metadata/productMetadata/tokens/wbtc.svg                                        0              0             13
packages/react-client/context/metadata/productMetadata/tokens/weth.svg                                        0              0             16
packages/react-client/context/metadata/productMetadata/tokens/wif.svg                                         0              0              9
packages/react-client/context/metadata/productMetadata/tokens/wld.svg                                         0              0             15
packages/react-client/context/metadata/productMetadata/tokens/xrp.svg                                         0              0             11
packages/react-client/context/metadata/productMetadata/tokens/zro.svg                                         0              0             11
packages/react-client/context/metadata/productMetadata/types.ts                                              12              4             61
packages/react-client/context/metadata/productMetadata/vertexTokenInfo.ts                                     2              0             10
packages/react-client/context/vertexClient/VertexClientContext.tsx                                           10              2             49
packages/react-client/context/vertexClient/hooks/index.ts                                                     0              0              2
packages/react-client/context/vertexClient/hooks/usePrimaryChainVertexClient.ts                               2              3              5
packages/react-client/context/vertexClient/hooks/useVertexClientForChainEnv.ts                                2              4              7
packages/react-client/context/vertexClient/hooks/useVertexClientsQuery.ts                                    16              7            105
packages/react-client/context/vertexClient/index.ts                                                           0              0              3
packages/react-client/context/vertexClient/types.ts                                                           2              0             13
packages/react-client/eslint.config.js                                                                        1              4             17
packages/react-client/globals.d.ts                                                                            5              0             15
packages/react-client/hooks/index.ts                                                                          0              0              1
packages/react-client/hooks/useIsChainEnvType.ts                                                              3              0             20
packages/react-client/index.ts                                                                                0              0              6
packages/react-client/package.json                                                                            0              0             37
packages/react-client/tsconfig.json                                                                           0              0              6
packages/react-client/types/PrimaryChain.ts                                                                   4              0             40
packages/react-client/types/index.ts                                                                          0              0              1
packages/react-client/utils/QueryDisabledError.ts                                                             0              0              5
packages/react-client/utils/createQueryKey.ts                                                                 3              5             16
packages/react-client/utils/formatNumber/NumberFormatSpecifier.ts                                             2              4             31
packages/react-client/utils/formatNumber/formatNumber.ts                                                      6              0             23
packages/react-client/utils/formatNumber/getMarketPriceFormatSpecifier.ts                                     1              4              9
packages/react-client/utils/formatNumber/getMarketQuoteSizeFormatSpecifier.ts                                 2              6             17
packages/react-client/utils/formatNumber/getMarketSizeFormatSpecifier.ts                                      2             11             16
packages/react-client/utils/formatNumber/index.ts                                                             0              0              8
packages/react-client/utils/formatNumber/mapCustomFormatSpecifier.ts                                          8              5             73
packages/react-client/utils/formatNumber/postProcessFormattedNumber.ts                                        1              7             17
packages/react-client/utils/formatNumber/types.ts                                                             2              3              8
packages/react-client/utils/getPrimaryChain.ts                                                                1              0             55
packages/react-client/utils/index.ts                                                                          0              0              5
packages/react-client/utils/signDependentValue.ts                                                             2              1             23
----------------------------------------------------------------------------------------------------------------------------------------------
SUM:                                                                                                         365            267           4932
```

#### Summary by Language

```
-------------------------------------------------------------------------------
Language                     files          blank        comment           code
-------------------------------------------------------------------------------
TypeScript                     108            363            262           3409
SVG                             76              1              1           1463
JSON                             2              0              0             43
JavaScript                       1              1              4             17
-------------------------------------------------------------------------------
SUM:                           187            365            267           4932
-------------------------------------------------------------------------------
```

### package/ts-config

#### Files

```
-----------------------------------------------------------------------------------------
File                                                  blank        comment           code
-----------------------------------------------------------------------------------------
packages/ts-config/base.json                             0              0             19
packages/ts-config/package.json                          0              0             10
packages/ts-config/react-library.json                    0              0             12
-----------------------------------------------------------------------------------------
SUM:                                                      0              0             41
```

#### Summary by Language

```
-------------------------------------------------------------------------------
Language                     files          blank        comment           code
-------------------------------------------------------------------------------
JSON                             3              0              0             41
-------------------------------------------------------------------------------
SUM:                             3              0              0             41
-------------------------------------------------------------------------------
```

### package/ui

#### Files

```
----------------------------------------------------------------------------------------------------------------------
File                                                                               blank        comment           code
----------------------------------------------------------------------------------------------------------------------
packages/ui/components/BaseDialog/BaseDialog.tsx                                      5              7            123
packages/ui/components/BaseDialog/consts.ts                                           0              0              5
packages/ui/components/BaseDialog/index.ts                                            0              0              3
packages/ui/components/BaseDialog/types.ts                                            5              4             10
packages/ui/components/Button/Button.tsx                                             11              2             99
packages/ui/components/Button/ButtonHelperInfo.tsx                                    3              0             23
packages/ui/components/Button/CardButton/CardButton.tsx                               3              1             32
packages/ui/components/Button/CardButton/ExternalNavCardButton.tsx                    1              0             32
packages/ui/components/Button/CardButton/NavBarCardButton.tsx                         1              0             15
packages/ui/components/Button/CardButton/NavCardButton.tsx                            3              0             47
packages/ui/components/Button/CardButton/NavCardButtonContent.tsx                     2              0             46
packages/ui/components/Button/CardButton/index.ts                                     0              0              5
packages/ui/components/Button/CardButton/types.ts                                     1              0             13
packages/ui/components/Button/IconButton.tsx                                          9              0             85
packages/ui/components/Button/LinkButton.tsx                                          4              1             37
packages/ui/components/Button/PrimaryButton.tsx                                       4              5             44
packages/ui/components/Button/SecondaryButton.tsx                                     4              4             49
packages/ui/components/Button/SegmentedControl.tsx                                    5              0             65
packages/ui/components/Button/TabButton.tsx                                           3              0             26
packages/ui/components/Button/TabTextButton.tsx                                       2              0             22
packages/ui/components/Button/TextButton.tsx                                          2              0             20
packages/ui/components/Button/TradeTabButton.tsx                                      4              0             33
packages/ui/components/Button/consts.ts                                               3              0             26
packages/ui/components/Button/index.ts                                                0              0             14
packages/ui/components/Button/types.ts                                                5              0             31
packages/ui/components/Card/Card.tsx                                                  4              0             17
packages/ui/components/Card/index.ts                                                  0              0              1
packages/ui/components/Checkbox/Checkbox.tsx                                         11              3             89
packages/ui/components/Checkbox/index.ts                                              0              0              1
packages/ui/components/ConditionalAsChild.tsx                                         3              9             15
packages/ui/components/DiscList/DiscList.tsx                                          3              0             27
packages/ui/components/DiscList/IconDiscList.tsx                                      4              0             41
packages/ui/components/DiscList/index.ts                                              0              0              2
packages/ui/components/Disclosure/DisclosureCard.tsx                                  2              0             34
packages/ui/components/Disclosure/DisclosureDismissibleCard.tsx                       3              0             19
packages/ui/components/Disclosure/index.ts                                            0              0              2
packages/ui/components/Divider.tsx                                                    3              1             26
packages/ui/components/DropdownUi/DropdownUi.tsx                                     10              8            116
packages/ui/components/DropdownUi/index.ts                                            0              0              1
packages/ui/components/Icons/UpDownChevronIcon.tsx                                    3              0             13
packages/ui/components/Icons/icons.tsx                                                1              0            178
packages/ui/components/Icons/imageToIconComponent.tsx                                 2              7             27
packages/ui/components/Icons/index.ts                                                 0              0              4
packages/ui/components/Icons/types.ts                                                 2              0              6
packages/ui/components/Input/CompactInput.tsx                                         3              0             69
packages/ui/components/Input/Input.tsx                                               10              1             81
packages/ui/components/Input/LargeNumberInput.tsx                                     8              0             81
packages/ui/components/Input/index.ts                                                 0              0              3
packages/ui/components/Label/Label.tsx                                                3              0             45
packages/ui/components/Label/index.ts                                                 0              0              1
packages/ui/components/Pill/CounterPill.tsx                                           1              0             21
packages/ui/components/Pill/GradientPill.tsx                                          1              1             24
packages/ui/components/Pill/Pill.tsx                                                  6              0             57
packages/ui/components/Pill/index.ts                                                  0              0              3
packages/ui/components/RadioGroup/RadioGroup.tsx                                      2              0             13
packages/ui/components/RadioGroup/RadioGroupCard.tsx                                  2              0             42
packages/ui/components/RadioGroup/RadioGroupIndicator.tsx                             1              0             21
packages/ui/components/RadioGroup/index.ts                                            1              0              3
packages/ui/components/ScrollShadowsContainer.tsx                                     6             23             57
packages/ui/components/SearchBar/SearchBar.tsx                                        7              2             71
packages/ui/components/SearchBar/index.ts                                             0              0              1
packages/ui/components/Select/Select.tsx                                              9              0            157
packages/ui/components/Select/hooks/index.ts                                          0              0              2
packages/ui/components/Select/hooks/types.ts                                          3              2             26
packages/ui/components/Select/hooks/useSelect.ts                                      7              8             42
packages/ui/components/Select/index.ts                                                0              0              2
packages/ui/components/Spinner.tsx                                                    1              0             21
packages/ui/components/Step.tsx                                                       7              1             71
packages/ui/components/Switch/Switch.tsx                                              8              0             68
packages/ui/components/Switch/index.ts                                                0              0              1
packages/ui/components/Tooltip/BaseDefinitionTooltip.tsx                              9              2             77
packages/ui/components/Tooltip/BaseTooltip.module.css                                13              4             46
packages/ui/components/Tooltip/BaseTooltip.tsx                                        5             17             79
packages/ui/components/Tooltip/ErrorTooltip.tsx                                       3              1             48
packages/ui/components/Tooltip/LabelTooltip.tsx                                       2              0             32
packages/ui/components/Tooltip/Tooltip.tsx                                            3              4             29
packages/ui/components/Tooltip/TooltipPortal.tsx                                      3              0             14
packages/ui/components/Tooltip/TooltipPortalRoot.tsx                                  1              0              4
packages/ui/components/Tooltip/index.ts                                               0              0              4
packages/ui/components/Tooltip/tooltipConfig.ts                                       0              0              1
packages/ui/components/UnderlinedTabs.tsx                                             5              0             50
packages/ui/components/Value/Value.tsx                                                3              1             42
packages/ui/components/Value/ValueEndElement.tsx                                      3              2             17
packages/ui/components/Value/ValueWithChange.tsx                                      3              1             65
packages/ui/components/Value/index.ts                                                 0              0              2
packages/ui/components/index.ts                                                       0              0             23
packages/ui/consts/commonColorClassNames.ts                                           0              0              7
packages/ui/consts/index.ts                                                           0              0              3
packages/ui/consts/theme/baseTailwindConfig.ts                                        1              0             34
packages/ui/consts/theme/blitz/blitzBoxShadows.ts                                     1              0              7
packages/ui/consts/theme/blitz/blitzColors.ts                                         1              1             63
packages/ui/consts/theme/blitz/blitzTailwindConfig.ts                                 1              1             18
packages/ui/consts/theme/blitz/fonts/blitzFonts.ts                                    3              0             25
packages/ui/consts/theme/blitz/index.ts                                               0              0              3
packages/ui/consts/theme/edge/edgeBoxShadows.ts                                       0              0              4
packages/ui/consts/theme/edge/edgeColors.ts                                           0              1             70
packages/ui/consts/theme/edge/edgeFonts.ts                                            2              0              9
packages/ui/consts/theme/edge/edgeTailwindConfig.ts                                   1              1             18
packages/ui/consts/theme/edge/index.ts                                                0              0              3
packages/ui/consts/theme/index.ts                                                     0              0              4
packages/ui/consts/theme/types.ts                                                     4              1             75
packages/ui/consts/theme/vertex/index.ts                                              0              0              3
packages/ui/consts/theme/vertex/vertexBoxShadows.ts                                   1              0              7
packages/ui/consts/theme/vertex/vertexColors.ts                                       1              1             62
packages/ui/consts/theme/vertex/vertexFonts.ts                                        2              0             10
packages/ui/consts/theme/vertex/vertexTailwindConfig.ts                               1              2             18
packages/ui/consts/zIndex.ts                                                          0              2              7
packages/ui/eslint.config.js                                                          1              4             17
packages/ui/globals.d.ts                                                              0              0              1
packages/ui/hooks/index.ts                                                            0              0              1
packages/ui/hooks/useScrollShadows.ts                                                20             32             77
packages/ui/index.ts                                                                  0              0              5
packages/ui/package.json                                                              0              0             36
packages/ui/tailwind.config.ts                                                        2              1              7
packages/ui/tailwind.ts                                                               0              0              3
packages/ui/tailwindPlugins/index.ts                                                  0              0              1
packages/ui/tailwindPlugins/utilitiesPlugin.ts                                        8              8             60
packages/ui/tsconfig.json                                                             0              0              8
packages/ui/types/BorderRadiusVariant.ts                                              0              0              1
packages/ui/types/BrandName.ts                                                        0              0              1
packages/ui/types/SizeVariant.ts                                                      0              0              1
packages/ui/types/index.ts                                                            0              0              3
packages/ui/utils/index.ts                                                            0              0              2
packages/ui/utils/stateOverlay/getStateOverlayClassNames.ts                           9             21             50
packages/ui/utils/stateOverlay/index.ts                                               0              0              1
packages/ui/utils/time/TimeFormatSpecifier.ts                                         0             11             13
packages/ui/utils/time/formatDurationMillis.ts                                        3             11             13
packages/ui/utils/time/formatTimestamp.ts                                             2              8             12
packages/ui/utils/time/index.ts                                                       0              0              4
packages/ui/utils/time/types.ts                                                       2              2              6
----------------------------------------------------------------------------------------------------------------------
SUM:                                                                                 336            230           3813
```

#### Summary by Language

```
-------------------------------------------------------------------------------
Language                     files          blank        comment           code
-------------------------------------------------------------------------------
TypeScript                     126            322            222           3706
CSS                              1             13              4             46
JSON                             2              0              0             44
JavaScript                       1              1              4             17
-------------------------------------------------------------------------------
SUM:                           130            336            230           3813
-------------------------------------------------------------------------------
```

## Total Summary

```
-------------------------------------------------------------------------------
Language                     files          blank        comment           code
-------------------------------------------------------------------------------
TypeScript                    2262          10891           5197         117889
JSON                            35              0              0           5870
SVG                            159              8              1           3916
Markdown                         3             52              0           2858
CSS                             26            324             68           2331
JavaScript                      22             15             21            274
Bourne Shell                     2             21             17             79
XML                              5              0              0             45
TOML                             6              0              0             12
-------------------------------------------------------------------------------
SUM:                          2520          11311           5304         133274
-------------------------------------------------------------------------------
```
