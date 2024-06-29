import { GoogleAnalytics as GATag } from '@next/third-parties/google';

interface Props {
  areCookiesAccepted: boolean | null;
  gtmId: string;
}

export function GoogleAnalytics({ areCookiesAccepted, gtmId }: Props) {
  return areCookiesAccepted ? <GATag gaId={gtmId} /> : null;
}
