import { SupportedChainId } from './chainsinfo'

/**
 * Fallback JSON-RPC endpoints.
 * These are used if the integrator does not provide an endpoint, or if the endpoint does not work.
 *
 * MetaMask allows switching to any URL, but displays a warning if it is not on the "Safe" list:
 * https://github.com/MetaMask/metamask-mobile/blob/bdb7f37c90e4fc923881a07fca38d4e77c73a579/app/core/RPCMethods/wallet_addEthereumChain.js#L228-L235
 * https://chainid.network/chains.json
 *
 * These "Safe" URLs are listed first, followed by other fallback URLs, which are taken from chainlist.org.
 */
export const FALLBACK_URLS = {
  [SupportedChainId.MAINNET]: [
    // "Safe" URLs
    'https://cloudflare-eth.com',
    // "Fallback" URLs
    'https://rpc.ankr.com/eth',
    'https://eth-mainnet.public.blastapi.io',
  ],

  [SupportedChainId.ARBITRUM_ONE]: [
    // "Safe" URLs
    'https://rpc.ankr.com/arbitrum',
    'https://arb1.arbitrum.io/rpc',
    // "Fallback" URLs
    'https://arbitrum.public-rpc.com',
  ],

  [SupportedChainId.XFI_TESTNET]: ['https://crossfi-testnet.rpc.thirdweb.com'],
  [SupportedChainId.BNB]: [
    'https://endpoints.omniatech.io/v1/bsc/mainnet/public',
    'https://bsc-mainnet.gateway.pokt.network/v1/lb/6136201a7bad1500343e248d',
    'https://1rpc.io/bnb',
    'https://bsc-dataseed3.binance.org',
    'https://bsc-dataseed2.defibit.io',
    'https://bsc-dataseed1.ninicoin.io',
    'https://binance.nodereal.io',
    'https://bsc-dataseed4.defibit.io',
    'https://rpc.ankr.com/bsc',
  ],
  [SupportedChainId.POLYGON]: [
    // "Safe" URLs
    'https://polygon-rpc.com/',
    'https://rpc-mainnet.matic.network',
    'https://matic-mainnet.chainstacklabs.com',
    'https://rpc-mainnet.maticvigil.com',
    'https://rpc-mainnet.matic.quiknode.pro',
    'https://matic-mainnet-full-rpc.bwarelabs.com',
  ],
  [SupportedChainId.OPTIMISM]: [
    // "Safe" URLs
    'https://mainnet.optimism.io/',
    // "Fallback" URLs
    'https://rpc.ankr.com/optimism',
  ],
  [SupportedChainId.AVALANCHE]: [
    // "Safe" URLs
    'https://api.avax.network/ext/bc/C/rpc',
    'https://avalanche-c-chain.publicnode.com',
  ],
}

/**
 * Known JSON-RPC endpoints.
 * These are the URLs used by the interface when there is not another available source of chain data.
 */
export const RPC_URLS = {
  [SupportedChainId.MAINNET]: [...FALLBACK_URLS[SupportedChainId.MAINNET]],
  [SupportedChainId.ARBITRUM_ONE]: ['https://rpc.ankr.com/optimism', ...FALLBACK_URLS[SupportedChainId.ARBITRUM_ONE]],
  [SupportedChainId.XFI_TESTNET]: [
    'https://rpc.testnet.ms',
    //'https://crossfi-testnet.blastapi.io/33bd6bb7-36c7-464b-9a19-502d6691e774',
    ...FALLBACK_URLS[SupportedChainId.XFI_TESTNET],
  ],
  [SupportedChainId.BNB]: [...FALLBACK_URLS[SupportedChainId.BNB]],
  [SupportedChainId.OPTIMISM]: [...FALLBACK_URLS[SupportedChainId.OPTIMISM]],
  [SupportedChainId.POLYGON]: [...FALLBACK_URLS[SupportedChainId.POLYGON]],

  [SupportedChainId.AVALANCHE]: [...FALLBACK_URLS[SupportedChainId.AVALANCHE]],
}
