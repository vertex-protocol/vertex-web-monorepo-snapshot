import { VrtxInfoSectionContainer } from 'client/sections/Vrtx/components/VrtxInfoSectionContent/VrtxInfoSectionContainer';
import {
  NetworkMetadata,
  VrtxNetworkCard,
} from 'client/sections/Vrtx/components/VrtxInfoSectionContent/VrtxNetworkCard/VrtxNetworkCard';

import arbIcon from 'client/sections/Vrtx/assets/arb-token.svg';
import ethIcon from 'client/sections/Vrtx/assets/eth-token.svg';

const VRTX_ARB_TOKEN_ADDRESS = '0x95146881b86b3ee99e63705ec87afe29fcc044d9';
const VRTX_ETH_TOKEN_ADDRESS = '0xbbEE07B3e8121227AfCFe1E2B82772246226128e';

const NETWORK_METADATA: NetworkMetadata[] = [
  {
    chainName: 'Arbitrum',
    chainExplorerName: 'Arbiscan',
    chainExplorerUrl: `https://arbiscan.io/token/${VRTX_ARB_TOKEN_ADDRESS}`,
    chainIcon: {
      src: arbIcon,
      bgClassName: 'bg-blue-100/20',
    },
    tokenAddress: VRTX_ARB_TOKEN_ADDRESS,
  },
  {
    chainName: 'Ethereum',
    chainExplorerName: 'Etherscan',
    chainExplorerUrl: `https://etherscan.io/token/${VRTX_ETH_TOKEN_ADDRESS}`,
    chainIcon: {
      src: ethIcon,
      bgClassName: 'bg-purple-100/20',
    },
    tokenAddress: VRTX_ETH_TOKEN_ADDRESS,
  },
];

export function VrtxNetworkCards() {
  return (
    <VrtxInfoSectionContainer
      title="TOKEN ADDRESS"
      contentClassName="grid grid-cols-2 gap-2"
    >
      {NETWORK_METADATA.map(
        ({
          chainExplorerName,
          chainExplorerUrl,
          chainIcon,
          chainName,
          tokenAddress,
        }) => {
          return (
            <VrtxNetworkCard
              key={chainName}
              chainExplorerName={chainExplorerName}
              chainExplorerUrl={chainExplorerUrl}
              chainIcon={chainIcon}
              chainName={chainName}
              tokenAddress={tokenAddress}
            />
          );
        },
      )}
    </VrtxInfoSectionContainer>
  );
}
