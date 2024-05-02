import classNames from 'classnames';
import { HeaderCard } from 'client/components/HeaderCard';
import {
  DEFAULT_SECTION_GAP,
  DEFAULT_SECTION_PADDING,
  DEFAULT_SECTION_WIDTH,
  SECTION_IDS,
} from 'client/consts';
import { FAQSlides } from './components/FAQSlides';

export function FAQ() {
  return (
    <section
      className={classNames(
        'isolate flex min-h-[40rem] flex-col justify-start overflow-hidden',
        DEFAULT_SECTION_PADDING,
        DEFAULT_SECTION_GAP,
        DEFAULT_SECTION_WIDTH,
      )}
      id={SECTION_IDS.faq}
    >
      <HeaderCard
        heading="Why should control mean slow & complex?"
        title="FAQ"
        headingClassNames="sm:w-2/3"
      />
      <FAQSlides />
    </section>
  );
}
