import { BridgeRequestParams } from 'client/modules/collateral/bridge/types';
import { addDecimals } from 'client/utils/decimalAdjustment';
import { toBigDecimal } from '@vertex-protocol/utils';
import { Subaccount } from 'client/context/subaccount/types';
import {
  ChainType,
  RouteRequest,
  SlippageMode,
  SquidCallType,
} from '@0xsquid/squid-types';
import {
  IERC20__factory,
  IEndpoint__factory,
  subaccountToBytes32,
} from '@vertex-protocol/client';

interface Params extends BridgeRequestParams {
  subaccount: Required<Subaccount>;
  endpointAddress: string;
}

export function getSquidRouteRequest(params: Params): RouteRequest {
  const encodedApproveFnData =
    IERC20__factory.createInterface().encodeFunctionData('approve', [
      params.endpointAddress,
      '0', // Amount, this is replaced by `payload` below
    ]);

  const encodedDepositFnData =
    IEndpoint__factory.createInterface().encodeFunctionData(
      'depositCollateralWithReferral(bytes32,uint32,uint128,string)',
      [
        // Subaccount
        subaccountToBytes32({
          subaccountOwner: params.subaccount.address,
          subaccountName: params.subaccount.name,
        }),
        // Product ID
        params.destinationToken.vertexProduct.productId,
        // Amount, this is replaced by `payload` below
        '0',
        // Referral code
        params.referralCode ?? '-1', // -1 used to signify no referral code
      ],
    );

  const destinationTokenAddress = params.destinationToken.address;
  return {
    fromAddress: params.subaccount.address,
    fromToken: params.sourceToken.address,
    fromAmount: addDecimals(
      toBigDecimal(params.amount),
      params.sourceToken.tokenDecimals,
    ).toFixed(),
    fromChain: params.sourceToken.chainId.toFixed(),
    toChain: params.destinationToken.chainId.toFixed(),
    toToken: destinationTokenAddress,
    toAddress: params.subaccount.address,
    slippageConfig: {
      slippage: 5, // 5% slippage
      autoMode: SlippageMode.NORMAL,
    },
    enableBoost: true, // Always enable boost
    postHook: {
      description: 'Deposit collateral',
      chainType: ChainType.EVM,
      // fundAmount/Token are unused
      fundAmount: '1',
      fundToken: destinationTokenAddress,
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
