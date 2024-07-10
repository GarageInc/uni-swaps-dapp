/* eslint-disable import/no-unused-modules */
import { LP_ADDRESS, USDT_TESTNET, WETH_XFI, XUSD_TESTNET } from 'constants/app-contracts'
import { SupportedChainId } from 'constants/chainsinfo'
import { useMemo } from 'react'
import { isAddress } from 'utils'

import esXFI from '../assets/icons/tokens/esXfi.svg'
import ETHIcon from '../assets/icons/tokens/eth.svg'
import lpXFI from '../assets/icons/tokens/lp.svg'
import usdcIcon from '../assets/icons/tokens/usdc.svg'
import usdtIcon from '../assets/icons/tokens/usdt.svg'
import WBTCIcon from '../assets/icons/tokens/wbtc.png'
import WETHIcon from '../assets/icons/tokens/weth.png'
import xfiIcon from '../assets/icons/tokens/xfi.svg'
import xUsdIcon from '../assets/icons/tokens/xUsd.svg'
import { useActiveWeb3React } from './web3'

interface ITokenAsset {
  icon: string
  symbol: string
  name?: string
  tokenAddress: {
    [chainId: number]: string
  }
}

const TOKENS: ITokenAsset[] = [
  {
    icon: lpXFI,
    symbol: 'lpXFI',
    name: 'XFI LP',
    tokenAddress: {
      [SupportedChainId.XFI_TESTNET]: LP_ADDRESS,
    },
  },
  {
    icon: esXFI,
    symbol: 'esXFI',
    tokenAddress: {
      [SupportedChainId.XFI_TESTNET]: '',
    },
  },
  {
    icon: xfiIcon,
    symbol: 'XFI',
    name: 'CrossFi Token',
    tokenAddress: {
      [SupportedChainId.XFI_TESTNET]: '',
    },
  },
  {
    icon: ETHIcon,
    symbol: 'ETH',
    name: 'Ethereum',
    tokenAddress: {
      [SupportedChainId.XFI_TESTNET]: '',
    },
  },
  {
    icon: xfiIcon,
    symbol: 'WXFI',
    name: 'Wrapped XFI',
    tokenAddress: {
      [SupportedChainId.XFI_TESTNET]: '0x28cC5eDd54B1E4565317C3e0Cfab551926A4CD2a',
    },
  },
  {
    icon: WETHIcon,
    symbol: 'WETH',
    name: 'Wrapped Ethereum',
    tokenAddress: {
      [SupportedChainId.XFI_TESTNET]: WETH_XFI,
    },
  },
  {
    icon: WBTCIcon,
    symbol: 'WBTC',
    name: 'Wrapped Bitcoin',
    tokenAddress: {
      [SupportedChainId.XFI_TESTNET]: '0x914938e817bd0b5f7984007dA6D27ca2EfB9f8f4',
    },
  },
  {
    icon: usdtIcon,
    symbol: 'USDT',
    name: 'Tether USD',
    tokenAddress: {
      [SupportedChainId.XFI_TESTNET]: USDT_TESTNET,
    },
  },
  {
    icon: usdcIcon,
    symbol: 'USDC',
    name: 'USD Coin',
    tokenAddress: {
      [SupportedChainId.XFI_TESTNET]: '0x562CA64F6Cf6122CA655A6ca09A7d19495f23089',
    },
  },
  {
    icon: xUsdIcon,
    symbol: 'XUSD',
    name: 'XUSD',
    tokenAddress: {
      [SupportedChainId.XFI_TESTNET]: XUSD_TESTNET,
    },
  },
]

// by symbol
// by token address
export const useTokenAsset = (query?: string) => {
  const { chainId = SupportedChainId.XFI_TESTNET } = useActiveWeb3React()

  const foundToken = useMemo(() => {
    if (!query) return undefined

    let token
    if (isAddress(query) && chainId) {
      token = TOKENS.find((token) => token.tokenAddress[chainId]?.toLowerCase() === query?.toLowerCase())
    } else {
      token = TOKENS.find((token) => token.symbol?.toLowerCase() === query?.toLowerCase())
    }

    return token
  }, [chainId, query])

  return foundToken
}
