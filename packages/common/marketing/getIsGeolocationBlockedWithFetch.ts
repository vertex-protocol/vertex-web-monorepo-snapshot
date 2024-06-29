/**
 * Util fn for apps not dependent on the SDK to check if geolocation is blocked
 */
export async function getIsGeolocationBlockedWithFetch() {
  const baseResponse = await fetch(
    // Similar to SDK, this will return { blocked: true, reason: ip } if blocked
    'https://gateway.prod.vertexprotocol.com/ip',
  );

  if (baseResponse.status !== 403) {
    return false;
  }

  const responseData = await baseResponse.json();

  return Boolean(responseData.blocked && responseData.reason === 'ip');
}
