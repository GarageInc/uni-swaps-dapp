import { useWallet } from '@tronweb3/tronwallet-adapter-react-hooks'
import { useErc20Contract } from 'constants/app-contracts'
import { BigNumber } from 'ethers'
import { useTronWebContract } from 'hooks/tronweb'
import { useIntervalEffect } from 'hooks/useIntervalEffect'
import { useActiveWeb3React } from 'hooks/web3'
import { useCallback, useState } from 'react'

import { useBalance, useDecimals } from './useBalance'

export const useTokenBalance = (token?: string) => {
  const contract = useErc20Contract(token)

  const { account } = useActiveWeb3React()

  return useBalance(contract, account)
}
export const useTokenDecimals = (token?: string) => {
  const contract = useErc20Contract(token)

  return useDecimals(contract)
}

export const useTRCTokenBalance = (token?: string) => {
  const [balance, setBalance] = useState<BigNumber | undefined>()

  const { address: account } = useWallet()

  const contract = useTronWebContract(token)

  const fetchBalance = useCallback(async () => {
    if (!token || !account || !contract) return

    const balance = await contract.balanceOf(account).call()

    setBalance(BigNumber.from(balance))
  }, [token, account, contract])

  useIntervalEffect(fetchBalance, 3000)

  return balance
}

export const useTRCTokenBalanceFor = (token: string, account: string) => {
  const [balance, setBalance] = useState<BigNumber | undefined>()

  const contract = useTronWebContract(token)

  const fetchBalance = useCallback(async () => {
    if (!token || !account || !contract) return

    const balance = await contract.balanceOf(account).call()

    setBalance(BigNumber.from(balance))
  }, [token, account, contract])

  useIntervalEffect(fetchBalance, 3000)

  return balance
}
