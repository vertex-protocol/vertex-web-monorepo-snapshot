export class XrpWalletRequestRejectedError extends Error {
  constructor() {
    super('XRP Wallet Request Rejected');
    this.name = 'XrpWalletRequestRejectedError';
  }
}
