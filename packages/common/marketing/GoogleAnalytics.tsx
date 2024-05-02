import { GoogleTagManager } from '@next/third-parties/google';

interface Props {
  areCookiesAccepted: boolean | null;
  gtmId: string;
}

export function GoogleAnalytics({ areCookiesAccepted, gtmId }: Props) {
  return areCookiesAccepted ? <GoogleTagManager gtmId={gtmId} /> : null;
}
