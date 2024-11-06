import { StationApiResponse } from 'stationApi/baseTypes';

export async function fetchStationApi<TReqBody, TData>(
  url: string,
  body: TReqBody,
): Promise<TData> {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const responseJson: StationApiResponse<TData> = await response.json();

  if (responseJson.status !== 'success') {
    throw Error(`Request failed: ${JSON.stringify(responseJson)}`);
  }

  return responseJson.data;
}
