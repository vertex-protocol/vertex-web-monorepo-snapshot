import classNames from 'classnames';
import { HeaderCard } from 'client/components/HeaderCard';
import {
  DEFAULT_SECTION_PADDING,
  DEFAULT_SECTION_WIDTH,
  SECTION_IDS,
} from 'client/consts';
import { InvestorCards } from 'client/sections/Investors/components/InvestorCards';
import { INVESTOR_CARD_DATA } from './data';

export function Investors() {
  return (
    <section
      className={classNames(
        'flex flex-col items-center gap-y-20',
        DEFAULT_SECTION_PADDING,
        DEFAULT_SECTION_WIDTH,
      )}
      id={SECTION_IDS.investors}
    >
      <HeaderCard
        heading="Investors & Partners"
        title="Investors"
        content="Industry-leading market makers and venture capital firms."
        headingClassNames="flex w-full justify-center"
        contentClassNames="flex text-center"
        className="flex w-full items-center lg:px-12"
      />
      <InvestorCards.Container>
        {INVESTOR_CARD_DATA.map(({ imageSrc, name }) => {
          return (
            <InvestorCards.Card imageSrc={imageSrc} name={name} key={name} />
          );
        })}
      </InvestorCards.Container>
    </section>
  );
}
