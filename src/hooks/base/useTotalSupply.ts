import { BigNumber } from '@ethersproject/bignumber'
import { Contract } from '@ethersproject/contracts'

import { useSingleCallResult } from '../../state/multicall/hooks'

const ZERO = BigNumber.from(0)

export const useTotalSupply = (contract: Contract | null) => {
  const totalSupply: BigNumber = useSingleCallResult(contract, 'totalSupply')?.result?.[0] || ZERO
  return totalSupply
}
