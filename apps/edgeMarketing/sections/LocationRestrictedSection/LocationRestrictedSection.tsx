import { GEOBLOCKED_COUNTRY_NAMES } from '@vertex-protocol/web-common';
import { EdgeBgImage } from 'components/EdgeBgImage/EdgeBgImage';
import { EdgeTileLink } from 'components/EdgeTileLink/EdgeTileLink';
import { LINKS } from 'config/links';

export function LocationRestrictedSection() {
  return (
    <section className="relative flex h-full flex-col items-center justify-center">
      <EdgeBgImage />
      <div className="flex flex-col items-start justify-center md:w-max">
        <div className="flex flex-col items-center justify-center p-6 pt-10 lg:px-12">
          <h4 className="text-[86px] leading-[90%] xl:text-[140px]">
            Restricted Territory
          </h4>
        </div>
        <div className="flex flex-col items-center p-6 sm:flex-none lg:px-12">
          <div className="flex flex-col gap-2">
            <p>
              It appears that you are accessing from a Restricted Territory.
              <br />
              Unfortunately, we are not able to support users from the following
              Restricted Territories at this time:
            </p>
            <div className="gap-y flex flex-col">
              {GEOBLOCKED_COUNTRY_NAMES.map((name) => {
                return <p key={name}>{name}</p>;
              })}
            </div>
            <div className="w-full">
              Please refer to our terms for additional information.
            </div>
          </div>
        </div>
        <div className="p-6 lg:px-12">
          <EdgeTileLink
            href={LINKS.termsOfUse}
            content={
              <span className="whitespace-nowrap px-2">Terms of Use</span>
            }
            className="w-full min-w-[260px] sm:w-auto"
            linkIconClassName="text-black"
            external={true}
          />
        </div>
      </div>
    </section>
  );
}
