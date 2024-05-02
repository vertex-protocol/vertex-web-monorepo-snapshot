import {
  joinClassNames,
  mergeClassNames,
  WithChildren,
  WithClassnames,
} from '@vertex-protocol/web-common';
import { BlitzPointsBanner } from 'client/modules/app/components/BlitzPointsBanner';
import { AppNavBar } from 'client/modules/navigation/AppNavBar';
import { clientEnv } from 'common/environment/clientEnv';
import Head from 'next/head';
import { AppBottomSheet } from './AppBottomSheet';
import { AppFooter } from './AppFooter';
import { AppBackgroundHighlights } from './components/AppBackgroundHighlights';

interface RootProps extends WithChildren<WithClassnames> {
  // To be rendered with ` | Vertex` in the browser tab title
  routeName?: string;
  hideHighlights?: boolean;
  contentWrapperClassName?: string;
}

function Root({
  routeName,
  children,
  className,
  hideHighlights,
  contentWrapperClassName,
}: RootProps) {
  const displayName = clientEnv.brandMetadata.displayName;
  const title = routeName ? `${routeName} | ${displayName}` : displayName;

  return (
    <div
      className={joinClassNames(
        'relative flex h-svh w-screen flex-col overflow-hidden',
        className,
      )}
    >
      {!hideHighlights && <AppBackgroundHighlights />}
      <Head>
        <title>{title}</title>
      </Head>
      <AppNavBar className="z-40" />
      <BlitzPointsBanner className="z-30" />
      <div
        // Hide horizontal overflow to ensure that tables never expand fully, but allow vertical scrolling
        className={joinClassNames(
          'no-scrollbar flex-1 overflow-x-hidden',
          contentWrapperClassName,
        )}
      >
        {children}
      </div>
      <AppFooter className="hidden lg:flex" />
      <AppBottomSheet />
    </div>
  );
}

interface HeaderProps {
  title: string;
  description?: string;
}

function Header({
  title,
  description,
  className,
}: WithClassnames<HeaderProps>) {
  return (
    <div className={joinClassNames('flex flex-col gap-y-1', className)}>
      <h1 className="text-text-primary title-text text-xl lg:text-3xl">
        {title}
      </h1>
      {description && (
        <p className="text-text-secondary text-xs lg:text-sm">{description}</p>
      )}
    </div>
  );
}

function Content({ className, children }: WithClassnames<WithChildren>) {
  return (
    <div
      // Max page width from Figma
      className={mergeClassNames(
        'mx-auto flex max-w-[1770px] flex-col',
        className,
      )}
    >
      {children}
    </div>
  );
}

export const AppPage = {
  Root,
  Header,
  Content,
};
