import { BigNumber, Contract } from 'ethers'
import { useMemo } from 'react'
import { useSingleCallResult } from 'state/multicall/hooks'

import { useActiveWeb3React } from './web3'

export const useIsOwner = (tokenId: string | BigNumber | undefined, contract: Contract | null) => {
  const { account } = useActiveWeb3React()

  const deps = useMemo(() => [tokenId], [tokenId])
  const currentOwner = useSingleCallResult(contract, 'ownerOf', deps)?.result?.[0]

  return currentOwner?.toLowerCase() === account?.toLowerCase()
}
