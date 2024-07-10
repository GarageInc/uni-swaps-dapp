import bscScan from 'assets/images/binancesmartchain.png'
import crossFiLogoUrl from 'assets/images/crossfi.png'
import ethereumLogoUrl from 'assets/images/ethereum-logo.png'
import arbitrumLogoUrl from 'assets/svg/arbitrum_logo.svg'
import avalancheLogoUrl from 'assets/svg/avalanche_logo.svg'
import optimismLogoUrl from 'assets/svg/optimism_logo.svg'
import polygonLogoUrl from 'assets/svg/polygon_logo.svg'

import { SupportedL1ChainId, SupportedL2ChainId } from './chains'
import { ARBITRUM_LIST, OPTIMISM_LIST } from './lists'
/**
 * List of all the networks supported by the Uniswap Interface
 */
export enum SupportedChainId {
  MAINNET = 1,
  ARBITRUM_ONE = 42161,

  XFI_TESTNET = 4157,
  BNB = 56,
  OPTIMISM = 10,
  POLYGON = 137,
  AVALANCHE = 43114,
}

enum NetworkType {
  L1,
  L2,
}

interface BaseChainInfo {
  readonly networkType: NetworkType
  readonly docs: string
  readonly bridge?: string
  readonly explorer: string
  readonly logoUrl: string
  readonly label: string
  readonly helpCenterUrl?: string
  readonly nativeCurrency: {
    name: string // e.g. 'Goerli ETH',
    symbol: string // e.g. 'gorETH',
    decimals: number // e.g. 18,
  }
}

interface L1ChainInfo extends BaseChainInfo {
  readonly networkType: NetworkType.L1
}

interface L2ChainInfo extends BaseChainInfo {
  readonly networkType: NetworkType.L2
  readonly bridge: string
  readonly statusPage?: string
  readonly defaultListUrl: string
}

type ChainInfoMap = { readonly [chainId: number]: L1ChainInfo | L2ChainInfo } & {
  readonly [chainId in SupportedL2ChainId]: L2ChainInfo
} & { readonly [chainId in SupportedL1ChainId]: L1ChainInfo }

// @ts-ignore
export const CHAIN_INFO: ChainInfoMap = {
  [SupportedChainId.MAINNET]: {
    networkType: NetworkType.L1,
    docs: 'https://docs.xswap.ve/',
    explorer: 'etherscan.io',
    label: 'Ethereum',
    logoUrl: ethereumLogoUrl,
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  },
  [SupportedChainId.XFI_TESTNET]: {
    networkType: NetworkType.L1,
    docs: 'https://scan.xfi.ms/',
    explorer: 'scan.xfi.ms',
    label: 'CrossFi',
    logoUrl: crossFiLogoUrl,
    nativeCurrency: { name: 'XFI', symbol: 'XFI', decimals: 18 },
  },
  [SupportedChainId.BNB]: {
    networkType: NetworkType.L1,
    bridge: 'https://cbridge.celer.network/1/56',
    docs: 'https://docs.bnbchain.org/',
    explorer: 'bscscan.com',
    label: 'BNB Chain',
    logoUrl: bscScan,
    nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
  },
  [SupportedChainId.ARBITRUM_ONE]: {
    networkType: NetworkType.L2,
    bridge: '#/battles/bridge',
    docs: 'https://offchainlabs.com/',
    explorer: 'arbiscan.io',
    label: 'Arbitrum',
    logoUrl: arbitrumLogoUrl,
    defaultListUrl: ARBITRUM_LIST,
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  },

  [SupportedChainId.AVALANCHE]: {
    networkType: NetworkType.L1,
    bridge: 'https://core.app/bridge/',
    docs: 'https://docs.avax.network/',
    explorer: 'snowtrace.io',
    label: 'Avalanche',
    logoUrl: avalancheLogoUrl,
    nativeCurrency: { name: 'AVAX', symbol: 'AVAX', decimals: 18 },
  },
  [SupportedChainId.OPTIMISM]: {
    networkType: NetworkType.L2,
    bridge: 'https://app.optimism.io/bridge',
    docs: 'https://optimism.io/',
    explorer: 'optimistic.etherscan.io',
    label: 'Optimism',
    statusPage: 'https://optimism.io/status',
    helpCenterUrl: 'https://help.uniswap.org/en/collections/3137778-uniswap-on-optimistic-ethereum-oξ',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    logoUrl: optimismLogoUrl,
    defaultListUrl: OPTIMISM_LIST,
  },
  [SupportedChainId.POLYGON]: {
    networkType: NetworkType.L1,
    bridge: 'https://wallet.polygon.technology/polygon/bridge',
    docs: 'https://polygon.io/',
    explorer: 'polygonscan.com',
    label: 'Polygon',
    nativeCurrency: { name: 'Polygon Matic', symbol: 'MATIC', decimals: 18 },
    logoUrl: polygonLogoUrl,
  },
}
