/**
 * Uses the URL constructor to encode a tweet link with the given text.
 * @param text
 * @returns
 */
export function useTweetLink(text: string) {
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
}
