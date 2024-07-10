import { getAddress } from '@ethersproject/address'
import { AddressZero } from '@ethersproject/constants'
import { Contract } from '@ethersproject/contracts'
import { JsonRpcProvider, JsonRpcSigner, Provider } from '@ethersproject/providers'
import { isMobile } from 'react-device-detect'

// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value: any): string | false {
  try {
    return getAddress(value)
  } catch {
    return false
  }
}

// shorten the checksummed version of the input address to have 0x + 4 characters at start and end
export function shortenAddress(address: string, chars = 4): string {
  const parsed = isAddress(address)
  if (!parsed) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }

  const charsByResponsive = isMobile ? 1 : chars

  return `${parsed.substring(0, charsByResponsive + 2)}...${parsed.substring(42 - charsByResponsive)}`
}

export function shortenString(parsed: string, chars = 4): string {
  if (parsed.length > 24) {
    return `${parsed.substring(0, chars)}...${parsed.substring(parsed.length - chars)}`
  }

  return parsed
}

export function getContract(address: string, ABI: any, provider: JsonRpcProvider, account?: string): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }

  return new Contract(address, ABI, getProviderOrSigner(provider, account) as any)
}

// account is optional
function getProviderOrSigner(provider: JsonRpcProvider, account?: string): Provider | JsonRpcSigner {
  return account ? provider.getSigner(account).connectUnchecked() : provider
}

export function escapeRegExp(string: string): string {
  return string && string.toString().replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}
