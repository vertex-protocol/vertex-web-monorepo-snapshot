import Identicon from 'identicon.js';

export const getUniqueImageForAddress = (address: string) => {
  return new Identicon(address, {
    format: 'svg',
    background: [0, 0, 0, 0],
  }).toString();
};
