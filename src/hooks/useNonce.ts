import { useWeb3React } from '@web3-react/core'
import { useBonusPointsContract } from 'constants/app-contracts'
import { BigNumber } from 'ethers'
import { useMemo } from 'react'
import { useSingleCallResult } from 'state/multicall/hooks'
import { ZERO } from 'utils/isZero'

export function useNonce() {
  const contract = useBonusPointsContract()

  const { account } = useWeb3React()
  const deps = useMemo(() => [account], [account])
  const data: BigNumber = useSingleCallResult(contract, 'nonce', deps)?.result?.[0] || ZERO

  return data ? data : undefined
}
