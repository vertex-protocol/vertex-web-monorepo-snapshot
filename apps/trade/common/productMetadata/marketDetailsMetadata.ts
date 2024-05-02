import { PRIMARY_QUOTE_SYMBOL } from 'common/productMetadata/primaryQuoteSymbol';

export interface MarketDetailsMetadata {
  subtitle: string;
  description: string;
  cmcLink: string;
}

export const WBTC_SPOT_MARKET_DETAILS: MarketDetailsMetadata = {
  subtitle: `wBTC-${PRIMARY_QUOTE_SYMBOL} Spot`,
  description:
    'Wrapped Bitcoin is a tokenized version of Bitcoin (BTC) that runs on the Ethereum (ETH) blockchain.',
  cmcLink: 'https://coinmarketcap.com/currencies/bitcoin/',
};

export const BTC_PERP_MARKET_DETAILS: MarketDetailsMetadata = {
  subtitle: `BTC-${PRIMARY_QUOTE_SYMBOL} Perpetual`,
  description:
    'Bitcoin (BTC) is a decentralized cryptocurrency originally described in a 2008 whitepaper by a person, or group of people, using the alias Satoshi Nakamoto. It was launched soon after, in January 2009. Bitcoin is a peer-to-peer online currency, meaning that all transactions happen directly between equal, independent network participants, without the need for any intermediary to permit or facilitate them.',
  cmcLink: 'https://coinmarketcap.com/currencies/bitcoin/',
};

export const WETH_SPOT_MARKET_DETAILS: MarketDetailsMetadata = {
  subtitle: `wETH-${PRIMARY_QUOTE_SYMBOL} Spot`,
  description:
    'Ethereum is a decentralized open-source blockchain system that features its own cryptocurrency, Ether (ETH). ETH works as a platform for numerous other cryptocurrencies, as well as for the execution of decentralized smart contracts.',
  cmcLink: 'https://coinmarketcap.com/currencies/ethereum/',
};

export const ETH_PERP_MARKET_DETAILS: MarketDetailsMetadata = {
  subtitle: `ETH-${PRIMARY_QUOTE_SYMBOL} Perpetual`,
  description:
    'Ethereum is a decentralized open-source blockchain system that features its own cryptocurrency, Ether (ETH). ETH works as a platform for numerous other cryptocurrencies, as well as for the execution of decentralized smart contracts.',
  cmcLink: 'https://coinmarketcap.com/currencies/ethereum/',
};

export const ARB_SPOT_MARKET_DETAILS: MarketDetailsMetadata = {
  subtitle: `ARB-${PRIMARY_QUOTE_SYMBOL} Spot`,
  description:
    'Arbitrum (ARB) is an Ethereum layer-two (L2) scaling solution. It uses optimistic rollups to achieve its goal of improving speed, scalability and cost-efficiency on Ethereum. Arbitrum benefits from the security and compatibility of Ethereum. Another benefit is the higher throughput and lower fees compared to Ethereum.',
  cmcLink: 'https://coinmarketcap.com/currencies/arbitrum/',
};

export const ARB_PERP_MARKET_DETAILS: MarketDetailsMetadata = {
  subtitle: `ARB-${PRIMARY_QUOTE_SYMBOL} Perpetual`,
  description:
    'Arbitrum (ARB) is an Ethereum layer-two (L2) scaling solution. It uses optimistic rollups to achieve its goal of improving speed, scalability and cost-efficiency on Ethereum. Arbitrum benefits from the security and compatibility of Ethereum. Another benefit is the higher throughput and lower fees compared to Ethereum.',
  cmcLink: 'https://coinmarketcap.com/currencies/arbitrum/',
};

export const BNB_PERP_MARKET_DETAILS: MarketDetailsMetadata = {
  subtitle: `BNB-${PRIMARY_QUOTE_SYMBOL} Perpetual`,
  description:
    'Binance Coin (BNB) is the native token of the crypto exchange Binance’s Binance Chain (BC), and was launched in July 2017. BNB serves as the gas fees for transactions on BC, issuance costs for new assets, minting and burning costs and more.',
  cmcLink: 'https://coinmarketcap.com/currencies/bnb/',
};

export const XRP_PERP_MARKET_DETAILS: MarketDetailsMetadata = {
  subtitle: `XRP-${PRIMARY_QUOTE_SYMBOL} Perpetual`,
  description:
    'XRP is a cryptocurrency designed as an alternative to Bitcoin, with a focus on facilitating trustless, instant and cheap cross-border payments. Like Bitcoin, XRP relies on a public ledger, called XRP Ledger, for storing transaction details.',
  cmcLink: 'https://coinmarketcap.com/currencies/xrp/',
};

export const SOL_PERP_MARKET_DETAILS: MarketDetailsMetadata = {
  subtitle: `SOL-${PRIMARY_QUOTE_SYMBOL} Perpetual`,
  description:
    'The Solana (SOL) protocol is designed to facilitate decentralized app (DApp) creation. It aims to improve scalability by introducing a proof-of-history (PoH) consensus combined with the underlying proof-of-stake (PoS) consensus of the blockchain.',
  cmcLink: 'https://coinmarketcap.com/currencies/solana/',
};

export const MATIC_PERP_MARKET_DETAILS: MarketDetailsMetadata = {
  subtitle: `MATIC-${PRIMARY_QUOTE_SYMBOL} Perpetual`,
  description:
    'Polygon (MATIC) is a Layer 2 scaling solution backed by Binance and Coinbase. The project seeks to stimulate mass adoption of cryptocurrencies by resolving the problems of scalability on many blockchains.',
  cmcLink: 'https://coinmarketcap.com/currencies/polygon/',
};

export const SUI_PERP_MARKET_DETAILS: MarketDetailsMetadata = {
  subtitle: `SUI-${PRIMARY_QUOTE_SYMBOL} Perpetual`,
  description:
    'Sui (SUI) is a first-of-its-kind Layer 1 blockchain and smart contract platform designed from the bottom up to make digital asset ownership fast, private, secure, and accessible to everyone. SUI is the native token of the SUI blockchain.',
  cmcLink: 'https://coinmarketcap.com/currencies/sui/',
};

export const OP_PERP_MARKET_DETAILS: MarketDetailsMetadata = {
  subtitle: `OP-${PRIMARY_QUOTE_SYMBOL} Perpetual`,
  description:
    'Optimism (OP) is a layer-two blockchain on top of Ethereum. Optimism benefits from the security of the Ethereum mainnet and helps scale the Ethereum ecosystem by using optimistic rollups. That means transactions are trustlessly recorded on Optimism but ultimately secured on Ethereum.',
  cmcLink: 'https://coinmarketcap.com/currencies/optimism-ethereum/',
};

export const APT_PERP_MARKET_DETAILS: MarketDetailsMetadata = {
  subtitle: `APT-${PRIMARY_QUOTE_SYMBOL} Perpetual`,
  description:
    'Aptos (APT) is a Layer 1 Proof-of-Stake (PoS) blockchain that employs a novel smart contract programming language called Move, a Rust-based programming language that was independently developed by Meta (formerly Facebook)’s Diem blockchain engineers.',
  cmcLink: 'https://coinmarketcap.com/currencies/aptos/',
};

export const LTC_PERP_MARKET_DETAILS: MarketDetailsMetadata = {
  subtitle: `LTC-${PRIMARY_QUOTE_SYMBOL} Perpetual`,
  description:
    'Litecoin (LTC) is a cryptocurrency that was designed to provide fast, secure and low-cost payments by leveraging the unique properties of blockchain technology. The cryptocurrency was created based on the Bitcoin (BTC) protocol, but it differs in terms of the hashing algorithm used, hard cap, block transaction times and a few other factors.',
  cmcLink: 'https://coinmarketcap.com/currencies/litecoin/',
};

export const BCH_PERP_MARKET_DETAILS: MarketDetailsMetadata = {
  subtitle: `BCH-${PRIMARY_QUOTE_SYMBOL} Perpetual`,
  description:
    'Bitcoin Cash (BCH) is a peer-to-peer electronic cash system that aims to become sound global money with fast payments, micro fees, privacy and larger block size. As a permissionless, decentralized cryptocurrency, Bitcoin Cash requires no trusted third parties. Bitcoin Cash was created as an alternative to Bitcoin',
  cmcLink: 'https://coinmarketcap.com/currencies/bitcoin-cash/',
};

export const COMP_PERP_MARKET_DETAILS: MarketDetailsMetadata = {
  subtitle: `COMP-${PRIMARY_QUOTE_SYMBOL} Perpetual`,
  description:
    'Compound (COMP) is a DeFi lending protocol that allows users to earn interest on their cryptocurrencies by depositing them into one of several pools supported by the platform. On the flip side, borrowers can take a secured loan from any Compound pool by depositing collateral.',
  cmcLink: 'https://coinmarketcap.com/currencies/compound/',
};

export const MKR_PERP_MARKET_DETAILS: MarketDetailsMetadata = {
  subtitle: `MKR-${PRIMARY_QUOTE_SYMBOL} Perpetual`,
  description:
    'Maker (MKR) is the governance token of the MakerDAO and Maker Protocol — respectively a decentralized organization and a software platform, both based on the Ethereum blockchain — that allows users to issue and manage the DAI stablecoin.',
  cmcLink: 'https://coinmarketcap.com/currencies/maker/',
};

export const MPEPE_PERP_MARKET_DETAILS: MarketDetailsMetadata = {
  subtitle: `mPEPE-${PRIMARY_QUOTE_SYMBOL} Perpetual`,
  description:
    'PEPE was created as a tribute to the Pepe the Frog internet meme, created by Matt Furie, which gained popularity in the early 2000s.',
  cmcLink: 'https://coinmarketcap.com/currencies/pepe/',
};

export const USDT_SPOT_MARKET_DETAILS: MarketDetailsMetadata = {
  subtitle: `USDT-${PRIMARY_QUOTE_SYMBOL} Spot`,
  description:
    'Launched in 2014, Tether (USDT) is a blockchain-enabled platform designed to facilitate the use of fiat currencies in a digital manner. Tether works to disrupt the conventional financial system via a more modern approach to money.',
  cmcLink: 'https://coinmarketcap.com/currencies/tether/',
};

export const DOGE_PERP_MARKET_DETAILS: MarketDetailsMetadata = {
  subtitle: `DOGE-${PRIMARY_QUOTE_SYMBOL} Perpetual`,
  description:
    'Dogecoin (DOGE) is based on the popular "doge" Internet meme and features a Shiba Inu on its logo. The open-source digital currency was created by Billy Markus from Portland, Oregon and Jackson Palmer from Sydney, Australia, and was forked from Litecoin in December 2013.',
  cmcLink: 'https://coinmarketcap.com/currencies/dogecoin/',
};

export const LINK_PERP_MARKET_DETAILS: MarketDetailsMetadata = {
  subtitle: `LINK-${PRIMARY_QUOTE_SYMBOL} Perpetual`,
  description:
    'Chainlink (LINK) is a blockchain abstraction layer that enables universally connected smart contracts. Through a decentralized oracle network, Chainlink allows blockchains to securely interact with external data feeds, events and payment methods, providing the critical off-chain information needed by complex smart contracts to become the dominant form of digital agreement.',
  cmcLink: 'https://coinmarketcap.com/currencies/chainlink/',
};

export const DYDX_PERP_MARKET_DETAILS: MarketDetailsMetadata = {
  subtitle: `DYDX-${PRIMARY_QUOTE_SYMBOL} Perpetual`,
  description: `DYDX (dYdX) is the governance token for the layer 2 protocol of the eponymous non-custodial decentralized cryptocurrency exchange. It serves to facilitate the operation of layer 2 and allows traders, liquidity providers and partners to contribute to the definition of the protocol's future as a community.`,
  cmcLink: 'https://coinmarketcap.com/currencies/dydx/',
};

export const CRV_PERP_MARKET_DETAILS: MarketDetailsMetadata = {
  subtitle: `CRV-${PRIMARY_QUOTE_SYMBOL} Perpetual`,
  description: `Curve is a decentralized exchange for stablecoins that uses an automated market maker (AMM) to manage liquidity.`,
  cmcLink: 'https://coinmarketcap.com/currencies/curve-dao-token/',
};

export const VRTX_SPOT_MARKET_DETAILS: MarketDetailsMetadata = {
  subtitle: `VRTX-${PRIMARY_QUOTE_SYMBOL} Spot`,
  description:
    'Launched in April 2023, Vertex Protocol is a hybrid orderbook-AMM DEX built on the Arbitrum L2. Vertex deploys unified cross-margin across spot, perpetuals, and an integrated money market across 23+ markets with a competitive, low trading fee model.',
  cmcLink: 'https://coinmarketcap.com/currencies/vertex-protocol/',
};

export const TIA_PERP_MARKET_DETAILS: MarketDetailsMetadata = {
  subtitle: `TIA-${PRIMARY_QUOTE_SYMBOL} Perpetual`,
  description: `Celestia (TIA) is the first modular blockchain network that enables anyone to easily deploy their own blockchain with minimal overhead.`,
  cmcLink: 'https://coinmarketcap.com/currencies/celestia/',
};

export const PYTH_PERP_MARKET_DETAILS: MarketDetailsMetadata = {
  subtitle: `PYTH-${PRIMARY_QUOTE_SYMBOL} Perpetual`,
  description: `The Pyth Network is the largest and fastest-growing first-party oracle network. Pyth delivers real-time market data to financial dApps across 40+ blockchains and provides 380+ low-latency price feeds across cryptocurrencies, equities, ETFs, FX pairs, and commodities.`,
  cmcLink: 'https://coinmarketcap.com/currencies/pyth-network/',
};

export const JTO_PERP_MARKET_DETAILS: MarketDetailsMetadata = {
  subtitle: `JTO-${PRIMARY_QUOTE_SYMBOL} Perpetual`,
  description: `Jito Network is a major contributor to the Solana ecosystem through its JitoSOL liquid staking pool, and its collection of MEV products. JTO enables token holders to make key decisions to shape the future of Jito Network so that it continues to evolve and thrive in alignment with the needs of those it serves, and of the broader Solana ecosystem. `,
  cmcLink: 'https://coinmarketcap.com/currencies/jito/',
};

export const AVAX_PERP_MARKET_DETAILS: MarketDetailsMetadata = {
  subtitle: `AVAX-${PRIMARY_QUOTE_SYMBOL} Perpetual`,
  description: `Avalanche is a layer one blockchain that functions as a platform for decentralized applications and custom blockchain networks. It is one of Ethereum’s rivals, aiming to unseat Ethereum as the most popular blockchain for smart contracts. It aims to do so by having a higher transaction output of up to 6,500 transactions per second while not compromising scalability.`,
  cmcLink: 'https://coinmarketcap.com/currencies/avalanche/',
};

export const INJ_PERP_MARKET_DETAILS: MarketDetailsMetadata = {
  subtitle: `INJ-${PRIMARY_QUOTE_SYMBOL} Perpetual`,
  description: `Injective is a blockchain built for finance. It is an open, interoperable layer-one blockchain powering next-generation DeFi applications, including decentralized spot and derivatives exchanges, prediction markets, lending protocols and more.`,
  cmcLink: 'https://coinmarketcap.com/currencies/injective/',
};

export const SNX_PERP_MARKET_DETAILS: MarketDetailsMetadata = {
  subtitle: `SNX-${PRIMARY_QUOTE_SYMBOL} Perpetual`,
  description: `Synthetix is building a decentralized liquidity provisioning protocol that any protocol can tap into for various purposes. Its deep liquidity and low fees serve as a backend for many exciting protocols on both Optimism and Ethereum.`,
  cmcLink: 'https://coinmarketcap.com/currencies/synthetix/',
};

export const ADA_PERP_MARKET_DETAILS: MarketDetailsMetadata = {
  subtitle: `ADA-${PRIMARY_QUOTE_SYMBOL} Perpetual`,
  description: `Cardano is a proof-of-stake blockchain platform that says its goal is to allow “changemakers, innovators and visionaries” to bring about positive global change.`,
  cmcLink: 'https://coinmarketcap.com/currencies/cardano/',
};

export const MEME_PERP_MARKET_DETAILS: MarketDetailsMetadata = {
  subtitle: `MEME-${PRIMARY_QUOTE_SYMBOL} Perpetual`,
  description: `Memecoin (MEME) is the native ecosystem token of Memeland.`,
  cmcLink: 'https://coinmarketcap.com/currencies/meme/',
};

export const IMX_PERP_MARKET_DETAILS: MarketDetailsMetadata = {
  subtitle: `IMX-${PRIMARY_QUOTE_SYMBOL} Perpetual`,
  description: `Immutable (IMX) positions itself as the first layer-two scaling solution for NFTs on Ethereum.`,
  cmcLink: 'https://coinmarketcap.com/currencies/immutable-x/',
};

export const SEI_PERP_MARKET_DETAILS: MarketDetailsMetadata = {
  subtitle: `SEI-${PRIMARY_QUOTE_SYMBOL} Perpetual`,
  description: `Sei is the first sector-specific Layer 1 blockchain, specialized for trading to give exchanges an unfair advantage.`,
  cmcLink: 'https://coinmarketcap.com/currencies/sei/',
};

export const STX_PERP_MARKET_DETAILS: MarketDetailsMetadata = {
  subtitle: `STX-${PRIMARY_QUOTE_SYMBOL} Perpetual`,
  description: `Stacks is a Bitcoin Layer for smart contracts; it enables smart contracts and decentralized applications to use Bitcoin as an asset and settle transactions on the Bitcoin blockchain.`,
  cmcLink: 'https://coinmarketcap.com/currencies/stacks/',
};

export const NEAR_PERP_MARKET_DETAILS: MarketDetailsMetadata = {
  subtitle: `NEAR-${PRIMARY_QUOTE_SYMBOL} Perpetual`,
  description: `NEAR Protocol is a layer-one blockchain that was designed as a community-run cloud computing platform and that eliminates some of the limitations that have been bogging competing blockchains, such as low transaction speeds, low throughput and poor interoperability.`,
  cmcLink: 'https://coinmarketcap.com/currencies/near-protocol/',
};

export const BLUR_PERP_MARKET_DETAILS: MarketDetailsMetadata = {
  subtitle: `BLUR-${PRIMARY_QUOTE_SYMBOL} Perpetual`,
  description: `BLUR is the native governance token of Blur, a unique non-fungible token (NFT) marketplace and aggregator platform that offers advanced features such as real-time price feeds, portfolio management and multi-marketplace NFT comparisons.`,
  cmcLink: 'https://coinmarketcap.com/currencies/blur-token/',
};

export const LDO_PERP_MARKET_DETAILS: MarketDetailsMetadata = {
  subtitle: `LDO-${PRIMARY_QUOTE_SYMBOL} Perpetual`,
  description: `Lido DAO is a decentralized autonomous organization (DAO) which provides staking infrastructure for multiple blockchain networks.`,
  cmcLink: 'https://coinmarketcap.com/currencies/lido-dao/',
};

export const FIL_PERP_MARKET_DETAILS: MarketDetailsMetadata = {
  subtitle: `FIL-${PRIMARY_QUOTE_SYMBOL} Perpetual`,
  description: `Filecoin is a decentralized storage system that aims to “store humanity's most important information.” FIL is the native currency of Filecoin that powers the entire network and all processes.`,
  cmcLink: 'https://coinmarketcap.com/currencies/filecoin/',
};

export const WLD_PERP_MARKET_DETAILS: MarketDetailsMetadata = {
  subtitle: `WLD-${PRIMARY_QUOTE_SYMBOL} Perpetual`,
  description: `The mission of the Worldcoin project is to build the world's largest identity and financial network as a public utility, giving ownership to everyone.`,
  cmcLink: 'https://coinmarketcap.com/currencies/worldcoin-org/',
};

export const ICP_PERP_MARKET_DETAILS: MarketDetailsMetadata = {
  subtitle: `ICP-${PRIMARY_QUOTE_SYMBOL} Perpetual`,
  description: `The Internet Computer blockchain incorporates a radical rethink of blockchain design, powered by innovations in cryptography.`,
  cmcLink: 'https://coinmarketcap.com/currencies/internet-computer/',
};

export const DOT_PERP_MARKET_DETAILS: MarketDetailsMetadata = {
  subtitle: `DOT-${PRIMARY_QUOTE_SYMBOL} Perpetual`,
  description: `Polkadot is an open-source sharded multichain protocol that connects and secures a network of specialized blockchains, facilitating cross-chain transfer of any data or asset types, not just tokens, thereby allowing blockchains to be interoperable with each other.`,
  cmcLink: 'https://coinmarketcap.com/currencies/polkadot-new/',
};

export const TRX_PERP_MARKET_DETAILS: MarketDetailsMetadata = {
  subtitle: `TRX-${PRIMARY_QUOTE_SYMBOL} Perpetual`,
  description: `TRON (TRX) is a decentralized blockchain-based operating system developed by the Tron Foundation and launched in 2017.`,
  cmcLink: 'https://coinmarketcap.com/currencies/tron/',
};

export const GALA_PERP_MARKET_DETAILS: MarketDetailsMetadata = {
  subtitle: `GALA-${PRIMARY_QUOTE_SYMBOL} Perpetual`,
  description: `Gala Games was created by industry-leading game developers who came together to bring value back to the players with the help of Web3 and blockchain tech.`,
  cmcLink: 'https://coinmarketcap.com/currencies/gala/',
};

export const ATOM_PERP_MARKET_DETAILS: MarketDetailsMetadata = {
  subtitle: `ATOM-${PRIMARY_QUOTE_SYMBOL} Perpetual`,
  description: `In a nutshell, Cosmos bills itself as a project that solves some of the “hardest problems” facing the blockchain industry. It aims to offer an antidote to “slow, expensive, unscalable and environmentally harmful” proof-of-work protocols, like those used by Bitcoin, by offering an ecosystem of connected blockchains.`,
  cmcLink: 'https://coinmarketcap.com/currencies/cosmos/',
};

export const APE_PERP_MARKET_DETAILS: MarketDetailsMetadata = {
  subtitle: `APE-${PRIMARY_QUOTE_SYMBOL} Perpetual`,
  description: `ApeCoin is an ERC-20 governance and utility token used within the APE Ecosystem to empower and incentivize a decentralized community building at the forefront of web3.`,
  cmcLink: 'https://coinmarketcap.com/currencies/apecoin-ape/',
};

export const JUP_PERP_MARKET_DETAILS: MarketDetailsMetadata = {
  subtitle: `JUP-${PRIMARY_QUOTE_SYMBOL} Perpetual`,
  description: `As one of the industry's most advanced swap aggregation engines, Jupiter excels in delivering essential liquidity infrastructure for the Solana ecosystem.`,
  cmcLink: 'https://coinmarketcap.com/currencies/jupiter-ag/',
};
