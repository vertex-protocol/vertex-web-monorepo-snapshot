import type {
  Address,
  EIP1193RequestFn,
  Hex,
  Transport,
  WalletRpcSchema,
} from 'viem';

export type CustomConnectorProvider = ReturnType<
  Transport<'custom', Record<string, any>, EIP1193RequestFn<WalletRpcSchema>>
>;

export type SignTypedDataEIP1193Parameters = [
  signerAddress: Address,
  signatureParamsJson: string,
];

export type SendTransactionEIP1193Parameters = [
  transaction: { data: Hex; from: Address; to: Address },
];
