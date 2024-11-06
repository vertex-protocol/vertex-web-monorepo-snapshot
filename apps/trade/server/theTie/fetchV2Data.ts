import 'server-only';

import { SENSITIVE_DATA } from 'common/environment/sensitiveData';

const THE_TIE_V2_BASE_URL = 'https://api.thetie.io/v2/integrations/vertex';

export async function fetchV2Data<T>(queryPath: string): Promise<T> {
  const resp = await fetch(`${THE_TIE_V2_BASE_URL}${queryPath}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'x-api-key': SENSITIVE_DATA.theTieV2ApiKey,
    },
    next: {
      revalidate: 120,
    },
  });
  if (!resp.ok) {
    throw new Error(`${queryPath} endpoint returned HTTP ${resp.status}`);
  }
  return resp.json();
}
