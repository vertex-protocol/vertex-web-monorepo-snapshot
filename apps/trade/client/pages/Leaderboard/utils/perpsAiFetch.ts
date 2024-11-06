import { SENSITIVE_DATA } from 'common/environment/sensitiveData';

export type PerpsAiFetchPath =
  | 'get_leaderboard_page_in_timeframe'
  | 'get_profile'
  | 'vertex_markets';

interface Params {
  path: PerpsAiFetchPath;
  reqBody?: unknown;
}

const API_KEY = SENSITIVE_DATA.perpsAiApiKey;
const RPC_URL = 'https://backend-prod.perps.ai/rest/v1/rpc/';
const NORMAL_URL = 'https://backend-prod.perps.ai/rest/v1/';

export async function perpsAiFetch({ path, reqBody }: Params) {
  // GET requests uses RPC_URL
  const baseUrl = reqBody ? RPC_URL : NORMAL_URL;
  const url = `${baseUrl}${path}`;

  const options: RequestInit = {
    method: reqBody ? 'POST' : 'GET',
    headers: {
      'Content-Type': 'application/json',
      apiKey: API_KEY,
    },
    body: reqBody ? JSON.stringify(reqBody) : null,
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}
