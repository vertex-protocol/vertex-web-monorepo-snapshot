import 'server-only';
import { SENSITIVE_DATA } from 'common/environment/sensitiveData';

const THE_TIE_V1_BASE_URL = 'https://terminal.thetie.io/v1';

export async function fetchV1Data<T>(queryPath: string): Promise<T> {
  const resp = await fetch(`${THE_TIE_V1_BASE_URL}${queryPath}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${SENSITIVE_DATA.theTieV1ApiKey}`,
    },

    // Next 14's App router's fetch is caching too greedily by default.
    // This behaviour is fixed in Next 15 https://nextjs.org/blog/next-15-rc#caching-updates
    // For now, we have to set no-store to prevent long caching for dynamic data
    cache: 'no-store',
  });
  if (!resp.ok) {
    throw new Error(`${queryPath} endpoint returned HTTP ${resp.status}`);
  }
  return resp.json();
}
