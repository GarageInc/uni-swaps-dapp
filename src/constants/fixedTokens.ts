import xfiIcon from 'assets/icons/simpleTokens/xfi.svg'
import { LP_ADDRESS } from 'constants/app-contracts'

export type TokenSymbol = 'xfi' | 'tether' | 'usd' | 'eth'

interface Token {
  symbol: TokenSymbol
  icon: string
  label: string
  currency: string
  token_address?: string
}

export const NATIVE_TOKEN: Token = {
  symbol: 'xfi',
  icon: xfiIcon,
  label: 'XFI',
  currency: 'XFI',
  token_address: LP_ADDRESS,
}

export const FIXED_TOKENS: Token[] = [NATIVE_TOKEN]
