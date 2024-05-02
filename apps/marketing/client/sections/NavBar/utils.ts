// Smooth scroll into view if internal link
// Doesn't append #id to URL
export function scrollToElementId(href: string) {
  if (typeof document === undefined) return;
  const element = document?.getElementById(href);
  if (!element) return;
  element.scrollIntoView({ behavior: 'smooth' });
}
