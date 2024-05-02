import { LINKS } from 'config/links';
import { useGlitchTextOnHover } from 'hooks/useGlitchTextOnHover';
import Link from 'next/link';

const BOTTOM_BAR_LINKS = [
  { name: 'X', href: LINKS.x },
  { name: 'Discord', href: LINKS.discord },
  { name: 'Blog', href: LINKS.blog },
];

/**
 * @name BottomBar
 * @description The bottom bar of the Blitz header
 */
export function BottomBar() {
  const { handleGlitchTextHover, glitchText } = useGlitchTextOnHover({
    text: 'powered by vertex edge',
    allowedCharacters: ['V', 'E', 'R', 'T', 'E', 'X', '_'],
  });
  return (
    <div className="relative flex items-center justify-center px-4 py-6 md:px-10 md:py-8">
      <div className="flex w-full items-center justify-start gap-x-1 md:justify-end">
        <Link
          href={LINKS.edge}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm uppercase tracking-wider md:justify-end md:text-base"
          onMouseOver={handleGlitchTextHover}
        >
          {glitchText}
        </Link>
        <span>_&gt;</span>
      </div>
      <div className="font-ibm absolute -bottom-2 left-auto right-auto flex items-center gap-x-10 text-sm">
        {BOTTOM_BAR_LINKS.map((link, idx) => {
          return (
            <Link
              key={idx}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink bg-pink-dark px-3 sm:px-6"
            >
              {link.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
