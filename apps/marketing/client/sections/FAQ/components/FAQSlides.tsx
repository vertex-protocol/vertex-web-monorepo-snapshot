import { WithChildren, WithClassnames } from '@vertex-protocol/web-common';
import classNames from 'classnames';
import { HomePageButton } from 'client/components/Button/HomePageButton';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { FAQ_DATA } from '../data';
import { useActiveFAQSlide } from '../hooks/useActiveFAQSlide';

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

export interface SlideType extends WithChildren<WithClassnames> {
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
}: SlideType) {
  const ChevronIcon = active ? FiChevronUp : FiChevronDown;
  const iconContent = (
    <div
      className={classNames(
        'text-white-700 rounded-lg p-2',
        active ? 'bg-white-400' : 'bg-transparent',
      )}
    >
      <ChevronIcon
        size={22}
        className={active ? 'opacity-100' : 'opacity-80'}
      />
    </div>
  );
  return (
    <div
      className={classNames(
        'overflow-hidden duration-500',
        active ? 'max-h-screen' : 'max-h-16 md:max-h-20',
      )}
    >
      <div
        className={classNames(
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
        className={classNames(
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
        className={classNames(
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
