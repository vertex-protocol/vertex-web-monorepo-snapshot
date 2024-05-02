import { joinClassNames } from '@vertex-protocol/web-common';
import { EdgeTileLink } from 'components/EdgeTileLink/EdgeTileLink';
import Image, { ImageProps } from 'next/image';
import arbitrumImage from 'public/img/arbitrum-arb-logo.svg';
import blastImage from 'public/img/blast-logo.png';
import blitzImage from 'public/img/blitz-app.png';
import blitzLinkBgImage from 'public/img/blitz-button-bg.svg';
import blitzLightLogoImage from 'public/img/blitz-logo-light.svg';
import blitzLogoImage from 'public/img/blitz-logo.svg';
import vertexImage from 'public/img/vertex-app.png';
import vertexLinkBgImage from 'public/img/vertex-button-bg.svg';
import vertexLightLogoImage from 'public/img/vertex-logo-light.svg';
import vertexLogoImage from 'public/img/vertex-logo.svg';
import { ReactNode, useState } from 'react';

interface SourceItem {
  preview: ReactNode;
  content: ReactNode;
  contentOnHover: ReactNode;
  url: string;
  features: ReactNode[];
  bgImageOnHover: ImageProps['src'];
}

const featureClassName = 'flex items-center gap-1';

const APPS: Record<string, SourceItem> = {
  vertex: {
    url: 'https://vertexprotocol.com',
    preview: <Image src={vertexImage} alt="Vertex" />,
    content: (
      <Image src={vertexLogoImage} alt="Vertex" className="max-h-2.5 w-auto" />
    ),
    contentOnHover: (
      <Image
        src={vertexLightLogoImage}
        alt="Vertex"
        className="max-h-2.5 w-auto"
      />
    ),
    bgImageOnHover: vertexLinkBgImage,
    features: [
      <span key="vertex-1">$80B+ trading volume</span>,
      <span key="vertex-2" className={featureClassName}>
        Built on Arbitrum{' '}
        <Image src={arbitrumImage} className="max-h-4 w-auto" alt="Arbitrum" />
      </span>,
    ],
  },
  blitz: {
    url: 'https://blitz.exchange',
    preview: <Image src={blitzImage} alt="Blitz" />,
    content: (
      <Image src={blitzLogoImage} alt="Vertex" className="max-h-2.5 w-auto" />
    ),
    contentOnHover: (
      <Image
        src={blitzLightLogoImage}
        alt="Vertex"
        className="max-h-2.5 w-auto"
      />
    ),
    bgImageOnHover: blitzLinkBgImage,
    features: [
      <span key="blitz-1">New trading platform</span>,
      <span key="blitz-2" className={featureClassName}>
        Built on{' '}
        <Image src={blastImage} className="max-h-3.5  w-auto" alt="Blast" />
      </span>,
    ],
  },
};

/**
 * @name BuiltOnEdge
 * @description List of links to applications built on top of the Vertex Edge
 */
export function BuiltOnEdge() {
  const [appPreviewName, setAppPreviewName] = useState<string>();
  const [lastAppPreviewName, setLastAppPreviewName] = useState<string>();

  const currentApp = appPreviewName
    ? APPS[appPreviewName]
    : lastAppPreviewName
      ? APPS[lastAppPreviewName]
      : undefined;

  return (
    <div className="self-end p-6 pb-12 lg:px-12">
      <div className="bg-gray-light relative inline-flex items-center gap-3 rounded-[22px] p-3 pr-1.5">
        {Object.entries(APPS).map(([name, app]) => (
          <EdgeTileLink
            key={name}
            href={app.url}
            content={app.content}
            contentOnHover={app.contentOnHover}
            bgImageOnHover={app.bgImageOnHover}
            linkIconClassName="text-white"
            external={true}
            onMouseEnter={() => {
              setAppPreviewName(name);
              setLastAppPreviewName(name);
            }}
            onMouseLeave={() =>
              appPreviewName === name && setAppPreviewName(undefined)
            }
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
              'transition-all delay-100 duration-300 ease-in-out',
              appPreviewName ? 'top-0 scale-100' : 'top-6 scale-90 opacity-0',
            )}
          >
            <div className="h-[196px] w-[350px] overflow-hidden rounded-[10px]">
              {currentApp?.preview}
            </div>
            <ul className="text-md flex h-9 justify-center rounded-[10px] bg-black px-3 py-2 text-center leading-snug text-white">
              {currentApp?.features.map((feat, idx) => {
                return (
                  <li
                    key={idx}
                    className="after:px-1 after:opacity-50 after:content-['•'] last:after:hidden"
                  >
                    {feat}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
