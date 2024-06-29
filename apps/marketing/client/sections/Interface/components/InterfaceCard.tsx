import {
  WithChildren,
  WithClassnames,
  joinClassNames,
} from '@vertex-protocol/web-common';

interface CardContentProps {
  heading: string;
  description: string;
}

function Content({
  heading,
  description,
  className,
}: WithClassnames<CardContentProps>) {
  return (
    <div className={joinClassNames('text-center sm:text-left', className)}>
      <div className="text-lg font-bold text-white md:text-2xl lg:text-3xl">
        {heading}
      </div>
      <div
        className={joinClassNames(
          'text-black-500 font-dmSans text-sm leading-5',
          'md:text-base md:leading-6',
        )}
      >
        {description}
      </div>
    </div>
  );
}

interface WrapperProps extends WithChildren<WithClassnames> {
  innerClassName?: string;
}

function Wrapper({ children, className, innerClassName }: WrapperProps) {
  return (
    // Extra container for padding
    <div className={joinClassNames('px-2 sm:px-0', className)}>
      <div
        className={joinClassNames(
          'relative flex h-80 w-full flex-col items-center justify-between overflow-hidden',
          'border-white-600 rounded-3xl border bg-cover',
          'sm:w-full md:h-full md:w-auto',
          'px-6 pt-5 sm:pt-7 md:px-10 md:pt-9',
          innerClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}

export const InterfaceCard = {
  Content,
  Wrapper,
};
