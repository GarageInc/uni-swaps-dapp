import { Contract } from '@ethersproject/contracts'
import { ChainId, MULTICALL_ADDRESSES } from '@uniswap/sdk-core'
import UniswapInterfaceMulticallJson from '@uniswap/v3-periphery/artifacts/contracts/lens/UniswapInterfaceMulticall.sol/UniswapInterfaceMulticall.json'
import { useWeb3React } from '@web3-react/core'
import ARGENT_WALLET_DETECTOR_ABI from 'abis/argent-wallet-detector.json'
import ENS_PUBLIC_RESOLVER_ABI from 'abis/ens-public-resolver.json'
import ENS_ABI from 'abis/ens-registrar.json'
import ERC20_ABI from 'abis/erc20.json'
import ERC20_BYTES32_ABI from 'abis/erc20_bytes32.json'
import ERC721_ABI from 'abis/erc721.json'
import ERC1155_ABI from 'abis/erc1155.json'
import { ARGENT_WALLET_DETECTOR_ADDRESS, ENS_REGISTRAR_ADDRESSES } from 'constants/addresses'
import { SupportedChainId } from 'constants/chainsinfo'
import { ZERO_ADDRESS } from 'constants/misc'
import { DEPRECATED_RPC_PROVIDERS, RPC_PROVIDERS } from 'constants/providers'
import { useMemo } from 'react'
import { UniswapInterfaceMulticall } from 'types/v3'
import { getContract } from 'utils'

import { ArgentWalletDetector, EnsPublicResolver, EnsRegistrar, Erc20, Erc721, Erc1155 } from '../abis/types'
import { useActiveWeb3React } from './web3'

const { abi: MulticallABI } = UniswapInterfaceMulticallJson

const CUSTOM_MULTICALL_ADDRESSES = {
  ...MULTICALL_ADDRESSES,
  [SupportedChainId.XFI_TESTNET]: '0x2DbB477a5a8E8744A71e78378a93395871920666',
}

export function useInterfaceMulticall() {
  return useContract<UniswapInterfaceMulticall>(
    CUSTOM_MULTICALL_ADDRESSES,
    MulticallABI,
    false
  ) as UniswapInterfaceMulticall
}

function useMainnetContract<T extends Contract = Contract>(address: string | undefined, ABI: any): T | null {
  const { chainId } = useWeb3React()
  const isMainnet = chainId === ChainId.MAINNET
  const contract = useContract(isMainnet ? address : undefined, ABI, false)
  const providers = RPC_PROVIDERS || DEPRECATED_RPC_PROVIDERS

  return useMemo(() => {
    if (isMainnet) return contract
    if (!address) return null
    const provider = providers[ChainId.MAINNET]
    try {
      return getContract(address, ABI, provider)
    } catch (error) {
      console.error('Failed to get mainnet contract', error)
      return null
    }
  }, [isMainnet, contract, address, providers, ABI]) as T
}

export function useMainnetInterfaceMulticall() {
  return useMainnetContract<UniswapInterfaceMulticall>(
    MULTICALL_ADDRESSES[ChainId.MAINNET],
    MulticallABI
  ) as UniswapInterfaceMulticall
}

// returns null on errors
export function useContract<T extends Contract = Contract>(
  addressOrAddressMap: string | { [chainId: number]: string } | undefined,
  ABI: any,
  withSignerIfPossible = true
): T | null {
  const { library, account, chainId } = useActiveWeb3React()

  return useMemo(() => {
    if (!addressOrAddressMap || !ABI || !library || !chainId) return null
    let address: string | undefined
    if (typeof addressOrAddressMap === 'string') address = addressOrAddressMap
    else address = addressOrAddressMap[chainId]
    if (!address || address === ZERO_ADDRESS) return null
    try {
      return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [addressOrAddressMap, ABI, library, chainId, withSignerIfPossible, account]) as T
}

export function useTokenContract(tokenAddress?: string, withSignerIfPossible?: boolean) {
  return useContract<Erc20>(tokenAddress, ERC20_ABI, withSignerIfPossible)
}

export function useErc721Contract(tokenAddress?: string, withSignerIfPossible?: boolean) {
  return useContract<Erc721>(tokenAddress, ERC721_ABI, withSignerIfPossible)
}

export function useERC1155Contract(nftAddress?: string) {
  return useContract<Erc1155>(nftAddress, ERC1155_ABI, false)
}

export function useArgentWalletDetectorContract() {
  return useContract<ArgentWalletDetector>(ARGENT_WALLET_DETECTOR_ADDRESS, ARGENT_WALLET_DETECTOR_ABI, false)
}

export function useENSRegistrarContract(withSignerIfPossible?: boolean) {
  return useContract<EnsRegistrar>(ENS_REGISTRAR_ADDRESSES, ENS_ABI, withSignerIfPossible)
}

export function useENSResolverContract(address: string | undefined, withSignerIfPossible?: boolean) {
  return useContract<EnsPublicResolver>(address, ENS_PUBLIC_RESOLVER_ABI, withSignerIfPossible)
}

export function useBytes32TokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(tokenAddress, ERC20_BYTES32_ABI, withSignerIfPossible)
}

export function useMulticall2Contract() {
  return useContract<UniswapInterfaceMulticall>(
    CUSTOM_MULTICALL_ADDRESSES,
    MulticallABI,
    false
  ) as UniswapInterfaceMulticall
}
