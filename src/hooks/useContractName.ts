import { useErc20Contract } from 'constants/app-contracts'
import { Contract } from 'ethers'
import { useMemo } from 'react'
import { useSingleCallResult } from 'state/multicall/hooks'

import { useErc721Contract } from './useContract'

const useContractName = (token: string) => {
  const tokenContract = useErc721Contract(token)
  const result = useSingleCallResult(tokenContract, 'name')

  return {
    name: result?.result?.[0],
    loading: result.loading,
  }
}

const useContractERC20Symbol = (tokenContract: Contract | null) => {
  const result = useSingleCallResult(tokenContract, 'symbol')

  return useMemo(() => {
    return {
      symbol: result?.result?.[0],
      loading: result.loading,
    }
  }, [result])
}

export const useERC20Symbol = (token?: string) => {
  const tokenContract = useErc20Contract(token)
  const result = useSingleCallResult(tokenContract, 'symbol')

  return useMemo(() => {
    return {
      symbol: result?.result?.[0],
      loading: result.loading,
    }
  }, [result])
}
