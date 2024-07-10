import AppRpcProvider from 'rpc/AppRpcProvider'
import AppStaticJsonRpcProvider from 'rpc/StaticJsonRpcProvider'
import StaticJsonRpcProvider from 'rpc/StaticJsonRpcProvider'

import { SupportedInterfaceChain } from './chains'
import { SupportedChainId } from './chainsinfo'
import { RPC_URLS } from './networks'

const providerFactory = (chainId: SupportedInterfaceChain, i = 0) =>
  new AppStaticJsonRpcProvider(chainId, RPC_URLS[chainId][i])

/**
 * These are the only JsonRpcProviders used directly by the interface.
 */
export const RPC_PROVIDERS: { [key in SupportedInterfaceChain]: StaticJsonRpcProvider } = {
  [SupportedChainId.MAINNET]: new AppRpcProvider(SupportedChainId.MAINNET, [
    providerFactory(SupportedChainId.MAINNET),
    providerFactory(SupportedChainId.MAINNET, 1),
  ]),
  [SupportedChainId.ARBITRUM_ONE]: providerFactory(SupportedChainId.ARBITRUM_ONE),
  [SupportedChainId.XFI_TESTNET]: providerFactory(SupportedChainId.XFI_TESTNET),
  [SupportedChainId.BNB]: providerFactory(SupportedChainId.BNB),
  [SupportedChainId.OPTIMISM]: providerFactory(SupportedChainId.OPTIMISM),
  [SupportedChainId.POLYGON]: providerFactory(SupportedChainId.POLYGON),
  [SupportedChainId.AVALANCHE]: providerFactory(SupportedChainId.AVALANCHE),
}

export const DEPRECATED_RPC_PROVIDERS: { [key in SupportedInterfaceChain]: AppStaticJsonRpcProvider } = {
  [SupportedChainId.MAINNET]: providerFactory(SupportedChainId.MAINNET),
  [SupportedChainId.ARBITRUM_ONE]: providerFactory(SupportedChainId.ARBITRUM_ONE),
  [SupportedChainId.XFI_TESTNET]: providerFactory(SupportedChainId.XFI_TESTNET),
  [SupportedChainId.BNB]: providerFactory(SupportedChainId.BNB),
  [SupportedChainId.OPTIMISM]: providerFactory(SupportedChainId.OPTIMISM),
  [SupportedChainId.POLYGON]: providerFactory(SupportedChainId.POLYGON),
  [SupportedChainId.AVALANCHE]: providerFactory(SupportedChainId.AVALANCHE),
}
