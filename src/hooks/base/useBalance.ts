import { Contract } from '@ethersproject/contracts'
import { BigNumber } from 'ethers'
import { useMemo } from 'react'
import { ZERO } from 'utils/isZero'

import { useSingleCallResult } from '../../state/multicall/hooks'

export const useBalance = (contract: Contract | null, address: string | null | undefined): BigNumber => {
  const deps = useMemo(() => [address || undefined], [address])

  return useSingleCallResult(contract, 'balanceOf', deps)?.result?.[0] || ZERO
}

export const useDecimals = (contract: Contract | null): number => {
  const val = useSingleCallResult(contract, 'decimals')?.result?.[0]
  return val || 0
}
