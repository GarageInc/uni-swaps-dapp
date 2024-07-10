import { useEffect, useState } from 'react'
import { ZERO } from 'utils/isZero'

import { useActiveWeb3React } from './web3'

// returns undefined if input token is undefined, or fails to get token contract,
// or contract total supply cannot be fetched
export function useChainBalance() {
  const [balance, setBalance] = useState(ZERO)
  const { provider, account } = useActiveWeb3React()

  useEffect(() => {
    if (!provider || !account) return
    provider.getBalance(account).then((balance) => {
      setBalance(balance)
    })
  }, [provider, account])

  return balance
}
