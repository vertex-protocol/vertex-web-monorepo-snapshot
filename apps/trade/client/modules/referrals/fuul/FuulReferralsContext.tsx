import { Fuul } from '@fuul/sdk';
import { useMutation } from '@tanstack/react-query';
import {
  PRIMARY_QUOTE_SYMBOLS,
  PrimaryChain,
  Token,
  USDC_ARB_ONE,
} from '@vertex-protocol/react-client';
import { WithChildren } from '@vertex-protocol/web-common';
import { useEnabledFeatures } from 'client/modules/envSpecificContent/hooks/useEnabledFeatures';
import { fuulReferralCodeAtom } from 'client/store/referralsStore';
import { SENSITIVE_DATA } from 'common/environment/sensitiveData';
import { useAtom } from 'jotai';
import { usePathname } from 'next/navigation';
import {
  createContext,
  Dispatch,
  SetStateAction,
  use,
  useEffect,
  useMemo,
} from 'react';
import { Address } from 'viem';
import { arbitrum } from 'viem/chains';

interface FuulReferralsContextData {
  /**
   * Referral code in the URL query param on initial launch of the app
   */
  referralCodeForSession: string | undefined;
  setReferralCodeForSession: Dispatch<SetStateAction<string | undefined>>;
  apiKey: string;
  /**
   * The token that rewards are paid in (USDC)
   */
  payoutToken: Token;
  /**
   * Volumes are tracked in this currency
   */
  volumeAmountSymbol: string;
  /**
   * The address to execute claiming rewards
   */
  claimContractAddress: Address;
  /**
   * The address of the Fuul contract for Vertex
   */
  projectAddress: Address;
  /**
   * Subgraph endpoint to query on-chain rewards
   */
  subgraphEndpoint: string;
  /**
   * The chain that rewards are claimed on
   */
  rewardsChain: PrimaryChain;
}

const FuulReferralsContext = createContext<FuulReferralsContextData>(
  {} as FuulReferralsContextData,
);

Fuul.init({ apiKey: SENSITIVE_DATA.fuulApiKey });

export function FuulReferralsProvider({ children }: WithChildren) {
  const { isFuulEnabled } = useEnabledFeatures();
  const { mutate: mutateSendPageView } = useMutation({
    mutationFn: ({ route }: { route: string }) => Fuul.sendPageview(route),
  });
  const pathname = usePathname();

  const [referralCodeForSession, setReferralCodeForSession] =
    useAtom(fuulReferralCodeAtom);

  // Send page view on route change
  useEffect(() => {
    if (!isFuulEnabled) {
      return;
    }

    mutateSendPageView({ route: pathname });
  }, [pathname, isFuulEnabled, mutateSendPageView]);

  const value = useMemo(
    (): FuulReferralsContextData =>
      ({
        referralCodeForSession,
        setReferralCodeForSession,
        apiKey: SENSITIVE_DATA.fuulApiKey,
        payoutToken: USDC_ARB_ONE,
        volumeAmountSymbol: PRIMARY_QUOTE_SYMBOLS.usdc,
        claimContractAddress: '0xC38E3A10B5818601b29c83F195E8b5854AAE45aF',
        projectAddress: '0xc063390e478c5b230d4d06283d90930c0af9cc96',
        subgraphEndpoint:
          'https://subgraph.satsuma-prod.com/64a0e71a7397/fuul-team--611570/arbitrum/api',
        rewardsChain: arbitrum,
      }) as const,
    [referralCodeForSession, setReferralCodeForSession],
  );

  return <FuulReferralsContext value={value}>{children}</FuulReferralsContext>;
}

// Hook to consume context
export const useFuulReferralsContext = () => use(FuulReferralsContext);
