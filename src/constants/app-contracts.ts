import { useActiveWeb3React } from 'hooks/web3'
import { useMemo } from 'react'

import erc20Abi from '../abis/erc20.json'
import {
  BonusPoints,
  Erc20,
  LayerZeroResolver,
  Staking,
  UniswapPool,
  UniswapV2Factory,
  UniswapV2Router,
  WrappedOmnichainXfi,
  Wxfi,
} from '../abis/types'
import bonusePointsAbi from '../abis/xswap/bonus-points.json'
import stakingAbi from '../abis/xswap/Staking.json'
import layerZeroErc20Abi from '../abis/xswap/wrapped-omnichain-xfi.json'
import { useContract } from '../hooks/useContract'
import layerZeroResolverAbi from './../abis/layer-zero-resolver.json'
import uniswapPool from './../abis/uniswap/uniswap-pool.json'
import uniswapFactoryAbi from './../abis/uniswap/uniswap-v2-factory.json'
import uniswapRouterAbi from './../abis/uniswap/uniswap-v2-router.json'
import wxfiAbi from './../abis/xswap/wxfi.json'
import { SupportedChainId } from './chainsinfo'

const STAKING_ADDRESS = '0x1E1B4c52A752d80df92B0c96e8B706C065980eC9'

export const LP_ADDRESS = '0xC67dde177Ba6334A04073b13871106467E5e3568'

export const WETH_XFI = '0x74f4B6c7F7F518202231b58CE6e8736DF6B50A81'

const WRAPPED_oXFI_BSC = '0x7e1B68D16C4ACfDcdE38f6eAAbebB34eb3D5E2CB'
const oXFI_BSC = '0x922b644d46AbBc5Faec10d832E2b5826A15baA1c'

export const USDT_TESTNET = '0x83E9A41c38D71f7a06632dE275877FcA48827870'
export const XUSD_TESTNET = '0xC692E6EDe21eC911D9E35C6A52bdD31b2d4b4425'
//  https://scan.testnet.ms/address/0x8c4a6c98966441145315106b0f5f629Ddf44A161/read-contract#address-tabs
const UNI_ROUTER_TESTNET = '0xDbe735426C7DC01F0F153F9C769582a3b48784EC'

const BONUS_POINTS_TESTNET = '0xDbe735426C7DC01F0F153F9C769582a3b48784EC'

// 0xB62cfA9e79f3b085004BE608a316845A5be3f8b0 - WXFI/SHIB
// 0xbF1997De68E59F66aceDd049eaeb555e6B54bF8B - GOJO/SHIB

const WXFI_TESTNET = '0x28cC5eDd54B1E4565317C3e0Cfab551926A4CD2a'
// WXFI https://scan.testnet.ms/address/0x28cC5eDd54B1E4565317C3e0Cfab551926A4CD2a
// SHIBA 0x7A09C7c16959B68fdA3cDDB47abe0B3a9ce8100b
// GOJO 0x18Ca0d6d0b0571372e642191888967BF74702F3B
// BROWNIE 0x7cfB91ccb4e487692015eD8e62A41ea74abe8a48

//  https://scan.testnet.ms/address/0x49B6c694eE6B7E3017952072D44065D169Bbf894/read-contract#address-tabs
const UniswapV2Factory_TESTNET = '0x70a2F463C62ecc565bA38dC7Ace4c0F7a674F7CF'

const TRON_SALE_ADDRESS = 'TAuyzm5B1ZnZJ4mhKFLLV1XUFsqdSMfa37'
export const TRON_OWNER = 'TUte1V6GDN2DGcBZDmxEnWpGCYkanNJ9sn'
const TRON_USDT = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t'

const TRON_REFERRALS = 'TQe36GqjrViJ2qyUnQdSaFJ4JhjUqCLWiv'

export const useTronSaleAddress = () => {
  return TRON_SALE_ADDRESS
}

export const useTronReferralsAddress = () => {
  return TRON_REFERRALS
}

export const useTronUSDTAddress = () => {
  return TRON_USDT
}

export const usePoolContract = (address: string) => {
  return useContract<UniswapPool>(address, uniswapPool)
}

export const useErc20Contract = (token?: string) => {
  return useContract<Erc20>(token, erc20Abi)
}

export const useStakingContract = () => {
  return useContract<Staking>(STAKING_ADDRESS, stakingAbi)
}

const getSourceByNetwork = (
  chainId: number | undefined,
  xfiMainnet = '',
  xfiTestnet = '',
  bsc = '',
  arbitrum = '',
  avalanche = '',
  polygon = '',
  optimism = ''
): string => {
  if (chainId === SupportedChainId.XFI_TESTNET) {
    return xfiTestnet || ''
  } else if (chainId === SupportedChainId.BNB) {
    return bsc
  } else if (chainId === SupportedChainId.ARBITRUM_ONE) {
    return arbitrum
  } else if (chainId === SupportedChainId.AVALANCHE) {
    return avalanche
  }
  if (chainId === SupportedChainId.POLYGON) {
    return polygon
  }
  if (chainId === SupportedChainId.OPTIMISM) {
    return optimism
  }

  return ''
}

const LAYER_ZERO_ENDPOINTS = {
  hardhat: '0x66A71Dcef29A0fFBDBE3c6a460a3B5BC225Cd675',
  ethereum: '0x66A71Dcef29A0fFBDBE3c6a460a3B5BC225Cd675',
  bsc: '0x3c2269811836af69497E5F486A85D7316753cf62',
  avalanche: '0x3c2269811836af69497E5F486A85D7316753cf62',
  polygon: '0x3c2269811836af69497E5F486A85D7316753cf62',
  arbitrum: '0x3c2269811836af69497E5F486A85D7316753cf62',
  optimism: '0x3c2269811836af69497E5F486A85D7316753cf62',
  fantom: '0xb6319cC6c8c27A8F5dAF0dD3DF91EA35C4720dd7',
  goerli: '0xbfD2135BFfbb0B5378b56643c2Df8a87552Bfa23',
  'bsc-testnet': '0x6Fcb97553D41516Cb228ac03FdC8B9a0a9df04A1',
  fuji: '0x93f54D755A063cE7bB9e6Ac47Eccc8e33411d706',
  mumbai: '0xf69186dfBa60DdB133E91E9A4B5673624293d8F8',
  'arbitrum-goerli': '0x6aB5Ae6822647046626e83ee6dB8187151E1d5ab',
  'optimism-goerli': '0xae92d5aD7583AD66E49A0c67BAd18F6ba52dDDc1',
  'fantom-testnet': '0x7dcAD72640F835B0FA36EFD3D6d3ec902C7E5acf',
  moonbase: '0x6Fcb97553D41516Cb228ac03FdC8B9a0a9df04A1',
  moonbeam: '0x9740FF91F1985D8d2B71494aE1A2f723bb3Ed9E4',
}

const useLayerZeroResolverAddress = () => {
  const { chainId } = useActiveWeb3React()
  return useMemo(() => {
    return getSourceByNetwork(chainId, '', '', LAYER_ZERO_ENDPOINTS.bsc, LAYER_ZERO_ENDPOINTS.arbitrum)
  }, [chainId])
}

export const useLayerZeroResolverContract = () => {
  const address = useLayerZeroResolverAddress()
  return useContract<LayerZeroResolver>(address, layerZeroResolverAbi)
}

export const useLayerZeroErc20Contract = () => {
  const address = useLayerZeroErc20Address()

  return useContract<WrappedOmnichainXfi>(address, layerZeroErc20Abi)
}

const useLayerZeroErc20Address = () => {
  const { chainId } = useActiveWeb3React()
  return useMemo(() => {
    return getSourceByNetwork(chainId, '', '', WRAPPED_oXFI_BSC, oXFI_BSC, oXFI_BSC, oXFI_BSC, oXFI_BSC)
  }, [chainId])
}

const useUniswapV2FactoryAddress = () => {
  const { chainId } = useActiveWeb3React()
  return useMemo(() => {
    return getSourceByNetwork(chainId, UniswapV2Factory_TESTNET, UniswapV2Factory_TESTNET, '', '', '', '', '')
  }, [chainId])
}

export const useWXFIAddress = () => {
  const { chainId } = useActiveWeb3React()
  return useMemo(() => {
    return getSourceByNetwork(chainId, '', WXFI_TESTNET, '', '', '', '', '')?.toLowerCase()
  }, [chainId])
}

export const useWXfiContract = () => {
  const address = useWXFIAddress()
  return useContract<Wxfi>(address, wxfiAbi)
}

export const useUSDTAddress = () => {
  const { chainId } = useActiveWeb3React()
  return useMemo(() => {
    return getSourceByNetwork(chainId, USDT_TESTNET, USDT_TESTNET, '', '', '', '', '')
  }, [chainId])
}

export const useXUSDAddress = () => {
  const { chainId } = useActiveWeb3React()
  return useMemo(() => {
    return getSourceByNetwork(chainId, XUSD_TESTNET, XUSD_TESTNET, '', '', '', '', '')
  }, [chainId])
}

export const useUniswapV2Factory = () => {
  const address = useUniswapV2FactoryAddress()
  return useContract<UniswapV2Factory>(address, uniswapFactoryAbi)
}

const useUniswapRouterAddress = () => {
  const { chainId } = useActiveWeb3React()
  return useMemo(() => {
    return getSourceByNetwork(chainId, '', UNI_ROUTER_TESTNET, '', '', '', '', '')
  }, [chainId])
}

export const useBonusPointsAddress = () => {
  const { chainId } = useActiveWeb3React()
  return useMemo(() => {
    return getSourceByNetwork(chainId, '', BONUS_POINTS_TESTNET, '', '', '', '', '')
  }, [chainId])
}

export const useBonusPointsContract = () => {
  const address = useBonusPointsAddress()
  return useContract<BonusPoints>(address, bonusePointsAbi)
}

export const useUniswapRouter = () => {
  const address = useUniswapRouterAddress()
  return useContract<UniswapV2Router>(address, uniswapRouterAbi)
}
