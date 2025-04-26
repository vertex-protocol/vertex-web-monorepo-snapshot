import {
  CustomNumberFormatSpecifier,
  formatNumber,
} from '@vertex-protocol/react-client';
import { NextImageSrc } from '@vertex-protocol/web-common';
import { LINKS } from 'config/links';
import { useEdgeMetrics } from 'hooks/useEdgeMetrics';
import Image from 'next/image';
import { ReactNode, useMemo, useState } from 'react';

// Images
import abstractImage from 'public/img/abstract-logo.svg';
import arbitrumImage from 'public/img/arbitrum-arb-logo.svg';
import baseImage from 'public/img/base-logo.svg';
import beraChainImage from 'public/img/berachain-logo.svg';
import blastImage from 'public/img/blast-logo.png';
import blitzImage from 'public/img/blitz-app.png';
import blitzLinkBgImage from 'public/img/blitz-button-bg.svg';
import blitzLightLogoImage from 'public/img/blitz-logo-light.svg';
import blitzLogoImage from 'public/img/blitz-logo.svg';
import broTradeImage from 'public/img/bro-trade-app.png';
import broTradeLinkBgImage from 'public/img/bro-trade-button-bg.svg';
import broTradeFullLogoImage from 'public/img/bro-trade-full-logo-light.svg';
import broTradeLogoImage from 'public/img/bro-trade-logo-light.svg';
import broTradeLightLogoImage from 'public/img/bro-trade-logo.svg';
import mantleImage from 'public/img/mantle-logo.svg';
import seiImage from 'public/img/sei-logo.svg';
import sonicImage from 'public/img/sonic-logo.svg';
import vertexImage from 'public/img/vertex-app.png';
import vertexLinkBgImage from 'public/img/vertex-button-bg.svg';
import vertexLightLogoImage from 'public/img/vertex-logo-light.svg';
import vertexLogoImage from 'public/img/vertex-logo.svg';

export interface AppCard {
  name: string;
  preview: ReactNode;
  mobileContent: ReactNode;
  content: ReactNode;
  contentOnHover: ReactNode;
  url: string;
  feature: ReactNode;
  bgImageOnHover: NextImageSrc;
}

const featureClassName = 'flex items-center gap-1 whitespace-nowrap';
const vertexChainImageProps = [
  { img: arbitrumImage, label: 'Arbitrum' },
  { img: mantleImage, label: 'Mantle' },
  { img: seiImage, label: 'SEI' },
  { img: baseImage, label: 'Base' },
  { img: sonicImage, label: 'Sonic' },
  { img: abstractImage, label: 'Abstract' },
];

export function useBuiltOnEdge() {
  const [selectedApp, setSelectedApp] = useState<AppCard>();
  const { data: chainMetrics } = useEdgeMetrics();

  const appsData: AppCard[] = useMemo(
    () => [
      {
        name: 'vertex',
        url: LINKS.vertex,
        preview: <Image src={vertexImage} alt="Vertex" />,
        mobileContent: (
          <Image src={vertexLogoImage} alt="Vertex" className="h-4 w-auto" />
        ),
        content: (
          <Image src={vertexLogoImage} alt="Vertex" className="h-2.5 w-auto" />
        ),
        contentOnHover: (
          <Image
            src={vertexLightLogoImage}
            alt="Vertex"
            className="h-2.5 w-auto"
          />
        ),
        bgImageOnHover: vertexLinkBgImage,
        feature: (
          <div className={featureClassName}>
            <span>
              {formatNumber(chainMetrics?.totalVertexVolume, {
                formatSpecifier:
                  CustomNumberFormatSpecifier.CURRENCY_LARGE_ABBREVIATED,
              })}
              + trading volume |{' '}
            </span>
            <div className="flex items-center">
              {vertexChainImageProps.map((imageProps) => {
                return (
                  <Image
                    key={imageProps.label}
                    src={imageProps.img}
                    className="bg-black-dark -ml-1 h-5 w-auto rounded-full p-0.5 first:ml-0"
                    alt={imageProps.label}
                  />
                );
              })}
            </div>
          </div>
        ),
      },
      {
        name: 'blitz',
        url: LINKS.blitz,
        preview: <Image src={blitzImage} alt="Blitz" />,
        mobileContent: (
          <Image src={blitzLogoImage} alt="Blitz" className="h-4 w-auto" />
        ),
        content: (
          <Image src={blitzLogoImage} alt="Blitz" className="h-2.5 w-auto" />
        ),
        contentOnHover: (
          <Image
            src={blitzLightLogoImage}
            alt="Blitz"
            className="h-2.5 w-auto"
          />
        ),
        bgImageOnHover: blitzLinkBgImage,
        feature: (
          <span className={featureClassName}>
            <span>
              {formatNumber(chainMetrics?.totalBlitzVolume, {
                formatSpecifier:
                  CustomNumberFormatSpecifier.CURRENCY_LARGE_ABBREVIATED,
              })}
              + trading volume |{' '}
            </span>
            <Image src={blastImage} className="h-3.5 w-auto" alt="Blast" />
          </span>
        ),
      },
      {
        name: 'broTrade',
        url: LINKS.broTrade,
        preview: <Image src={broTradeImage} alt="Bro.Trade" />,
        mobileContent: (
          <Image
            src={broTradeFullLogoImage}
            alt="BroTrade"
            className="h-5 w-auto"
          />
        ),
        content: (
          <Image
            src={broTradeLogoImage}
            alt="Bro.Trade"
            className="h-6 w-auto"
          />
        ),
        contentOnHover: (
          <Image
            src={broTradeLightLogoImage}
            alt="Bro.Trade"
            className="h-6 w-auto"
          />
        ),
        bgImageOnHover: broTradeLinkBgImage,
        feature: (
          <span className={featureClassName}>
            <span>
              {formatNumber(chainMetrics?.totalBroTradeVolume, {
                formatSpecifier:
                  CustomNumberFormatSpecifier.CURRENCY_LARGE_ABBREVIATED,
              })}
              + trading volume |{' '}
            </span>
            <Image
              src={beraChainImage}
              className="h-4 w-auto"
              alt="Berachain"
            />
          </span>
        ),
      },
    ],
    [chainMetrics],
  );

  return { selectedApp, appsData, setSelectedApp };
}
