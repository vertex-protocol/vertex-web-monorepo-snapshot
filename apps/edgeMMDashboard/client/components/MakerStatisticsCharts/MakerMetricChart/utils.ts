/** Use address to get unique hex color for address */
export function getHexColorForAddress(address: string) {
  return `#${address.slice(3, 9)}`;
}
