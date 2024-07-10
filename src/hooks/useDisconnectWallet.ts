import { useActiveWeb3React } from 'hooks/web3'
import { useCallback } from 'react'
import { useAppDispatch } from 'state/hooks'
import { updateSelectedWallet } from 'state/user/actions'

export function useDisconnectWallet() {
  const dispatch = useAppDispatch()
  const { connector } = useActiveWeb3React()

  const disconnect = useCallback(() => {
    if (connector && connector.deactivate) {
      connector.deactivate()
    }
    connector.resetState()
    dispatch(updateSelectedWallet({ wallet: undefined }))
  }, [connector, dispatch])

  return { disconnect }
}
