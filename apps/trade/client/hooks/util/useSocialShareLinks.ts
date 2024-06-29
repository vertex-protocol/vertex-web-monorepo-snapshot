/**
 * Creates links for sharing text on social media
 *
 * @param text the text to share
 * @param link used for Telegram sharing to include a hyperlink
 * @returns an object with the Twitter and Telegram share links
 */
export function useSocialShareLinks(text: string, link?: string) {
  const encodedText = encodeURIComponent(text);

  return {
    twitter: `https://twitter.com/intent/tweet?text=${encodedText}`,
    telegram: `https://telegram.me/share/url?url=${link}&text=${encodedText}`,
  };
}
