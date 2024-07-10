import { ChainId, SUPPORTED_CHAINS } from '@uniswap/sdk-core'

import { SupportedChainId } from './chainsinfo'

export const CHAIN_IDS_TO_NAMES = {
  [SupportedChainId.MAINNET]: 'mainnet',
  [SupportedChainId.ARBITRUM_ONE]: 'arbitrum',
  [SupportedChainId.XFI_TESTNET]: 'crossfi',
  [SupportedChainId.BNB]: 'bnb',
  [SupportedChainId.POLYGON]: 'polygon',
  [SupportedChainId.OPTIMISM]: 'optimism',
  [SupportedChainId.AVALANCHE]: 'avalanche',
} as const

// Include ChainIds in this array if they are not supported by the UX yet, but are already in the SDK.
const NOT_YET_UX_SUPPORTED_CHAIN_IDS: number[] = [ChainId.BASE_GOERLI]

// TODO: include BASE_GOERLI when routing is implemented
export type SupportedInterfaceChain =
  | SupportedChainId.MAINNET
  | SupportedChainId.ARBITRUM_ONE
  | SupportedChainId.XFI_TESTNET
  | SupportedChainId.BNB
  | SupportedChainId.POLYGON
  | SupportedChainId.OPTIMISM
  | SupportedChainId.AVALANCHE

export function isSupportedChain(
  chainId: number | null | undefined | ChainId,
  featureFlags?: Record<number, boolean>
): chainId is SupportedInterfaceChain {
  if (featureFlags && chainId && chainId in featureFlags) {
    return featureFlags[chainId]
  }
  return !!chainId && SUPPORTED_CHAINS.indexOf(chainId) !== -1 && NOT_YET_UX_SUPPORTED_CHAIN_IDS.indexOf(chainId) === -1
}

export function asSupportedChain(
  chainId: number | null | undefined | ChainId,
  featureFlags?: Record<number, boolean>
): SupportedInterfaceChain | undefined {
  if (!chainId) return undefined
  if (featureFlags && chainId in featureFlags && !featureFlags[chainId]) {
    return undefined
  }
  return isSupportedChain(chainId) ? chainId : undefined
}
/**
 * All the chain IDs that are running the Ethereum protocol.
 */
export const L1_CHAIN_IDS = [
  ChainId.MAINNET,
  SupportedChainId.XFI_TESTNET,
  SupportedChainId.BNB,
  SupportedChainId.POLYGON,
  SupportedChainId.AVALANCHE,
] as const

export type SupportedL1ChainId = (typeof L1_CHAIN_IDS)[number]

/**
 * Controls some L2 specific behavior, e.g. slippage tolerance, special UI behavior.
 * The expectation is that all of these networks have immediate transaction confirmation.
 */
export const L2_CHAIN_IDS = [SupportedChainId.ARBITRUM_ONE, SupportedChainId.OPTIMISM] as const

export type SupportedL2ChainId = (typeof L2_CHAIN_IDS)[number]
