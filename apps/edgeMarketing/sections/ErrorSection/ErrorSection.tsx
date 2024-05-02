import { joinClassNames } from '@vertex-protocol/web-common';
import { EdgeTileLink } from 'components/EdgeTileLink/EdgeTileLink';
import { EdgeBgImage } from 'components/EdgeBgImage/EdgeBgImage';
import { EdgeDescription } from 'components/EdgeDescription/EdgeDescription';

/**
 * @name ErrorSection
 * @description The error section of the Edge landing page
 */
export function ErrorSection({
  statusCode,
  errorMessage,
}: {
  statusCode: 404 | 500;
  errorMessage: string;
}) {
  return (
    <section className={'relative flex h-full flex-col'}>
      <EdgeBgImage />
      <div className="flex flex-1 flex-col items-start justify-center p-6 pt-10 md:items-center lg:px-12">
        <div className="flex flex-col gap-2">
          <span className="text-xl sm:text-3xl">{statusCode}</span>
          <h1 className="text-[86px] leading-[90%] md:text-[140px]">
            {errorMessage}
          </h1>
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-between sm:flex-none md:flex-row">
        <EdgeDescription />
        <div className="p-6 sm:self-end lg:px-12">
          <EdgeTileLink
            href="/"
            content={
              <span className="whitespace-nowrap px-2">
                Go back to homepage
              </span>
            }
            className="w-full min-w-[260px] sm:w-auto"
            linkIconClassName="text-black"
          />
        </div>
      </div>
    </section>
  );
}
