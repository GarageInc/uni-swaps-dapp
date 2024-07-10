import { SupportedChainId } from 'constants/chainsinfo'
import { useEffect, useState } from 'react'

import { useActiveWeb3React } from '../../hooks/web3'

const BlackList = ['/', '/token-sale', '/not-found']

export const useWarningFlag = () => {
  const { account, chainId } = useActiveWeb3React()
  const [isInBlackList, setIsInBlackList] = useState(false)

  useEffect(() => {
    const currentRote = window.location.pathname
    if (BlackList.includes(currentRote)) {
      setIsInBlackList(true)
    }
  }, [])

  if (!chainId) {
    return {
      notSupportedChain: false,
      account,
    }
  }

  return {
    notSupportedChain: chainId !== SupportedChainId.XFI_TESTNET,
    isInBlackList,
    account,
  }
}
