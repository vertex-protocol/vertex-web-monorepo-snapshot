import { ChainType, RouteRequest, SquidCallType } from '@0xsquid/squid-types';
import { ERC20_ABI, subaccountToHex } from '@vertex-protocol/client';
import { addDecimals, toBigDecimal } from '@vertex-protocol/utils';
import { BridgeRequestParams } from 'client/modules/collateral/bridge/types';
import { Address, encodeFunctionData, parseAbi } from 'viem';

interface Params extends BridgeRequestParams {
  subaccountAddress: string;
  subaccountName: string;
  endpointAddress: Address;
}

export function getSquidRouteRequest(params: Params): RouteRequest {
  const encodedApproveFnData = encodeFunctionData({
    abi: ERC20_ABI,
    functionName: 'approve',
    args: [
      params.endpointAddress,
      BigInt(0), // Amount, this is replaced by `payload` below
    ],
  });
  const encodedDepositFnData = encodeFunctionData({
    // Unfortunately, viem does not support function overloads, so the incorrect `depositCollateralWithReferral` function
    // is used if we use `VERTEX_ABIS` directly. To solve this, we manually specify the function to be used
    abi: parseAbi([
      'function depositCollateralWithReferral(bytes32,uint32,uint128,string)',
    ]),
    functionName: 'depositCollateralWithReferral',
    args: [
      // Full subaccount identifier
      subaccountToHex({
        subaccountOwner: params.subaccountAddress,
        subaccountName: params.subaccountName,
      }),
      // Product ID
      params.destinationToken.vertexProduct.productId,
      // Amount, this is replaced by `payload` below
      BigInt(0),
      // Referral code
      params.referralCode ?? '-1', // -1 used to signify no referral code
    ],
  });

  const destinationTokenAddress = params.destinationToken.address;
  return {
    fromAddress: params.subaccountAddress,
    fromToken: params.sourceToken.address,
    fromAmount: addDecimals(
      toBigDecimal(params.amount),
      params.sourceToken.tokenDecimals,
    ).toFixed(),
    fromChain: params.sourceToken.chainId.toFixed(),
    toChain: params.destinationToken.chainId.toFixed(),
    toToken: destinationTokenAddress,
    toAddress: params.subaccountAddress,
    // 5% slippage
    slippage: 5,
    postHook: {
      description: 'Deposit collateral',
      logoURI: 'https://app.vertexprotocol.com/vertex-icon.svg',
      provider: 'Vertex',
      chainType: ChainType.EVM,
      calls: [
        // Approve before depositing into Vertex.
        {
          chainType: ChainType.EVM,
          callType: SquidCallType.FULL_TOKEN_BALANCE,
          target: destinationTokenAddress,
          // This field is actually required. We're not sending any native tokens
          value: '0',
          callData: encodedApproveFnData,
          payload: {
            // Payload specifies where to put the amount bridged into the contract call arguments,
            // for approval it is an index or 1 (amount is 2nd argument)
            tokenAddress: destinationTokenAddress,
            inputPos: 1,
          },
          estimatedGas: '20000',
        },
        // Deposit collateral into Vertex.
        {
          chainType: ChainType.EVM,
          callType: SquidCallType.FULL_TOKEN_BALANCE,
          value: '0',
          target: params.endpointAddress,
          callData: encodedDepositFnData,
          // Payload specifies where to put the amount bridged into the contract call arguments,
          // for deposit it is an index of 2 (amount is the 3rd argument)
          payload: {
            tokenAddress: destinationTokenAddress,
            inputPos: 2,
          },
          // 900K, taken from a mainnet deposit tx + some buffer
          estimatedGas: '900000',
        },
      ],
    },
  };
}
