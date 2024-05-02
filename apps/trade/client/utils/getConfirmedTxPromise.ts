import { ContractTransactionResponse } from 'ethers';

export async function getConfirmedTxPromise(
  txResponse: Promise<ContractTransactionResponse>,
) {
  const awaitedResponse = await txResponse;
  const txData = await awaitedResponse.wait();
  if (txData?.status !== 1) {
    throw new Error('Rejected transaction');
  }
  return txData;
}
