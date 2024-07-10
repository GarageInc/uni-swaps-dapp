import { LP_ADDRESS, WETH_XFI } from 'constants/app-contracts'
import { SupportedChainId } from 'constants/chainsinfo'
import { useMemo } from 'react'

import esXFI from './icons/esXFI.svg'
import ETHIcon from './icons/eth.svg'
import lpXFI from './icons/lpXFI.svg'
import usdtIcon from './icons/usdt.svg'
import xfiIcon from './icons/xfi.svg'
import xUsdIcon from './icons/xUsd.svg'
import { IPickerToken } from './useAmountInput'

export enum TokenSymbol {
  lpXFI = 'lpXFI',
  esXFI = 'esXFI',
  xfi = 'xfi',
  eth = 'eth',
  weth = 'weth',
  usdt = 'usdt',
  xUsd = 'xusd',
  wxfi = 'wxfi',
}

export interface IAppToken extends IPickerToken {
  icon: string
  label: string
  token_addrs?: {
    [chainId: number]: string
  }
}

const TOKENS: IAppToken[] = [
  {
    symbol: TokenSymbol.lpXFI,
    icon: lpXFI,
    label: 'lpXFI',
    token_addrs: {
      [SupportedChainId.XFI_TESTNET]: LP_ADDRESS,
    },
  },
  {
    symbol: TokenSymbol.esXFI,
    icon: esXFI,
    label: 'esXFI',
    // TODO add address
    // token_addrs: {
    // },
  },
  {
    symbol: TokenSymbol.xfi,
    icon: xfiIcon,
    label: 'XFI',
    // TODO add address
    // token_addrs: {
    // },
  },
  {
    symbol: TokenSymbol.eth,
    icon: ETHIcon,
    label: 'ETH',
    token_addrs: {
      [SupportedChainId.XFI_TESTNET]: 'ETH',
    },
  },

  {
    symbol: TokenSymbol.wxfi,
    icon: xfiIcon,
    label: 'wXFI',
  },
  {
    symbol: TokenSymbol.weth,
    icon: ETHIcon,
    label: 'WETH',
    token_addrs: {
      [SupportedChainId.XFI_TESTNET]: WETH_XFI,
    },
  },
  {
    symbol: TokenSymbol.usdt,
    icon: usdtIcon,
    label: 'USDT',
    // TODO add address
    // token_addrs: {
    // },
  },
  {
    symbol: TokenSymbol.xUsd,
    icon: xUsdIcon,
    label: 'XUSD',
    // TODO add address
    // token_addrs: {
    // },
  },
]

const DEFAULT_ETH: IAppToken = {
  symbol: TokenSymbol.xfi,
  label: 'XFI',
  icon: xfiIcon,
}

export const useAppSelectedCoin = (token?: IPickerToken): IAppToken => {
  return useMemo(() => {
    if (!token || !token.symbol) {
      return DEFAULT_ETH
    }

    const foundToken = TOKENS.find((coin) => coin.symbol.toLowerCase() === token.symbol.toLowerCase())

    const target = foundToken || (token?.address ? { ...token, icon: '', label: '' } : DEFAULT_ETH)
    return target
  }, [token])
}
