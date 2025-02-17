'use client';

import {
  CustomNumberFormatSpecifier,
  formatNumber,
} from '@vertex-protocol/react-client';
import { joinClassNames } from '@vertex-protocol/web-common';
import { EdgeTileLink } from 'components/EdgeTileLink/EdgeTileLink';
import { useEdgeMetrics } from 'hooks/useEdgeMetrics';
import Image, { ImageProps } from 'next/image';
import arbitrumImage from 'public/img/arbitrum-arb-logo.svg';
import baseImage from 'public/img/base-logo.svg';
import blastImage from 'public/img/blast-logo.png';
import blitzImage from 'public/img/blitz-app.png';
import blitzLinkBgImage from 'public/img/blitz-button-bg.svg';
import blitzLightLogoImage from 'public/img/blitz-logo-light.svg';
import blitzLogoImage from 'public/img/blitz-logo.svg';
import mantleImage from 'public/img/mantle-logo.svg';
import seiImage from 'public/img/sei-logo.svg';
import sonicImage from 'public/img/sonic-logo.svg';
import vertexImage from 'public/img/vertex-app.png';
import vertexLinkBgImage from 'public/img/vertex-button-bg.svg';
import vertexLightLogoImage from 'public/img/vertex-logo-light.svg';
import vertexLogoImage from 'public/img/vertex-logo.svg';
import { ReactNode, useMemo, useState } from 'react';

interface AppCard {
  preview: ReactNode;
  content: ReactNode;
  contentOnHover: ReactNode;
  url: string;
  feature: ReactNode;
  bgImageOnHover: ImageProps['src'];
}

const featureClassName = 'flex items-center gap-1 whitespace-nowrap';

export function BuiltOnEdge() {
  const [appPreviewName, setAppPreviewName] = useState<string>();
  const { data: chainMetrics } = useEdgeMetrics();

  const apps = useMemo(
    (): Record<string, AppCard> => ({
      vertex: {
        url: 'https://vertexprotocol.com',
        preview: <Image src={vertexImage} alt="Vertex" />,
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
          <span className={featureClassName}>
            <span>
              {formatNumber(chainMetrics?.totalVertexVolume, {
                formatSpecifier:
                  CustomNumberFormatSpecifier.CURRENCY_LARGE_ABBREVIATED,
              })}
              + trading volume |{' '}
            </span>
            <Image src={arbitrumImage} className="h-4 w-auto" alt="Arbitrum" />
            <Image src={mantleImage} className="h-5 w-auto" alt="Mantle" />
            <Image src={seiImage} className="h-4 w-auto" alt="SEI" />
            <Image src={baseImage} className="h-4 w-auto" alt="Base" />
            <Image src={sonicImage} className="h-4 w-auto" alt="Sonic" />
          </span>
        ),
      },
      blitz: {
        url: 'https://blitz.exchange',
        preview: <Image src={blitzImage} alt="Blitz" />,
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
    }),
    [chainMetrics],
  );

  const currentApp = appPreviewName ? apps[appPreviewName] : undefined;

  return (
    <div className="self-end p-6 pb-12 lg:px-12">
      <div className="bg-gray-light relative inline-flex items-center gap-3 rounded-[22px] p-3 pr-1.5">
        {Object.entries(apps).map(([name, app]) => (
          <EdgeTileLink
            key={name}
            href={app.url}
            content={app.content}
            contentOnHover={app.contentOnHover}
            bgImageOnHover={app.bgImageOnHover}
            linkIconClassName="text-white"
            external
            onMouseEnter={() => setAppPreviewName(name)}
            onMouseLeave={() => setAppPreviewName(undefined)}
          />
        ))}

        <span className="w-6">
          <div className="-translate-y-[29px] rotate-90 whitespace-nowrap text-center">
            Built on Edge
          </div>
        </span>

        <div
          className={joinClassNames(
            'absolute bottom-32 right-0 justify-end overflow-hidden',
            'h-[270px] w-[380px]',
            'hidden sm:flex',
            appPreviewName ? 'z-1' : '-z-1',
          )}
        >
          <div
            className={joinClassNames(
              'absolute flex flex-col gap-2',
              'rounded-[14px] border border-zinc-200 p-1.5',
              'bg-zinc-200/20 backdrop-blur-sm',
              'transition-all duration-300',
              appPreviewName ? 'top-0 scale-100' : 'top-6 scale-90 opacity-0',
            )}
          >
            <div className="h-[196px] w-[350px] overflow-hidden rounded-[10px]">
              {currentApp?.preview}
            </div>
            <div className="text-md flex h-9 justify-center rounded-[10px] bg-black py-2 text-white">
              {currentApp?.feature}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
