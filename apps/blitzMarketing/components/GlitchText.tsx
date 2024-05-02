import { joinClassNames, mergeClassNames } from '@vertex-protocol/web-common';

interface GlitchTextProps {
  children: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
  className?: string;
  wrapperClassName?: string;
}

/**
 * @name GlitchText
 * @description A text component that glitches
 *
 * @param {string} children The text to display
 * @param {string} as The HTML element to use
 * @param {string} className The class name to apply to the component
 */
export function GlitchText({
  children,
  as = 'p',
  className,
  wrapperClassName,
}: GlitchTextProps) {
  const TextElement = as;

  const glitchTextWrapperClassName = mergeClassNames(
    'relative inline-block text-lg',
    wrapperClassName,
  );

  const glitchClassName = joinClassNames(
    'glitch-text relative z-10',
    className,
  );

  return (
    <div className={glitchTextWrapperClassName}>
      <TextElement className={glitchClassName}>{children}</TextElement>
      <TextElement className="clip-rect-0 glitch-text-before absolute inset-0 left-0 top-0 w-full">
        {children}
      </TextElement>
      <TextElement className="clip-rect-0 glitch-text-after absolute inset-0 left-0 top-0 w-full">
        {children}
      </TextElement>
    </div>
  );
}
