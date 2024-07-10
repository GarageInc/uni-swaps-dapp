import { useWeb3React as useWeb3ReactCore } from '@web3-react/core'
import { useMemo } from 'react'

export function useActiveWeb3React() {
  const context = useWeb3ReactCore()
  const account = useMemo(() => context?.account?.toLowerCase(), [context])
  return useMemo(() => {
    return {
      ...context,
      library: context?.provider,
      account,
    }
  }, [context, account])
}
