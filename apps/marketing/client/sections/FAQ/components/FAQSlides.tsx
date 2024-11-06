'use client';

import { CaretDown } from '@phosphor-icons/react/dist/ssr/CaretDown';
import { CaretUp } from '@phosphor-icons/react/dist/ssr/CaretUp';
import {
  WithChildren,
  WithClassnames,
  joinClassNames,
} from '@vertex-protocol/web-common';
import { HomePageButton } from 'client/components/Button/HomePageButton';
import { FAQ_DATA } from 'client/sections/FAQ/data';
import { useActiveFAQSlide } from 'client/sections/FAQ/hooks/useActiveFAQSlide';

export function FAQSlides() {
  const { active, setActiveSlide } = useActiveFAQSlide();
  return (
    <div>
      {FAQ_DATA.map(({ question, answer }, index) => {
        return (
          <FAQSlide
            label={question}
            key={index}
            index={index}
            active={active === index}
            setActiveSlide={setActiveSlide}
          >
            {answer}
          </FAQSlide>
        );
      })}
    </div>
  );
}

interface FAQSlideProps extends WithChildren<WithClassnames> {
  label: string;
  index: number;
  active: boolean;
  setActiveSlide: (index: number) => void;
}

function FAQSlide({
  label,
  children,
  index,
  active,
  setActiveSlide,
}: FAQSlideProps) {
  const chevronIcon = active ? (
    <CaretUp size={22} className="opacity-100" />
  ) : (
    <CaretDown size={22} className="opacity-100" />
  );

  const iconContent = (
    <div
      className={joinClassNames(
        'text-white-700 rounded-lg p-2',
        active ? 'bg-white-400' : 'bg-transparent',
      )}
    >
      {chevronIcon}
    </div>
  );

  return (
    <div
      className={joinClassNames(
        'overflow-hidden duration-500',
        active ? 'max-h-screen' : 'max-h-16 md:max-h-20',
      )}
    >
      <div
        className={joinClassNames(
          'bg-white-600 relative z-10 h-px w-full overflow-hidden',
          'before:bg-faqBorder before:absolute before:-z-10 before:h-full before:w-full before:duration-1000',
          active
            ? 'before:translate-x-0 before:opacity-80'
            : 'before:-translate-x-full before:opacity-0',
        )}
      />
      <HomePageButton
        as="div"
        onClick={() => setActiveSlide(index)}
        className={joinClassNames(
          'flex h-16 flex-1 items-center justify-between text-sm font-normal',
          'sm:text-xl',
          'md:h-20',
          active ? 'text-white' : 'text-white-700',
        )}
        endIcon={iconContent}
      >
        {label}
      </HomePageButton>
      <div
        className={joinClassNames(
          'text-white-700 w-full overflow-hidden pb-8 text-xs font-normal',
          'sm:text-base',
          'md:text-lg',
        )}
      >
        {children}
      </div>
    </div>
  );
}
