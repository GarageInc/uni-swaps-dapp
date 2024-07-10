import { BigNumber } from '@ethersproject/bignumber'
import { useErc20Contract } from 'constants/app-contracts'

import { useSingleCallResult } from '../state/multicall/hooks'

// returns undefined if input token is undefined, or fails to get token contract,
// or contract total supply cannot be fetched
export function useTotalSupplyToken(address?: string) {
  const contract = useErc20Contract(address)

  const totalSupply: BigNumber = useSingleCallResult(contract, 'totalSupply')?.result?.[0]

  return totalSupply ? totalSupply : undefined
}
