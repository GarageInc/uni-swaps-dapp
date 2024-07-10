import { useWallet } from '@tronweb3/tronwallet-adapter-react-hooks'
import { CurrencyAmount, Token } from '@uniswap/sdk-core'
import { BigNumber } from 'ethers'
import { useCallback, useMemo, useState } from 'react'

import { useSingleCallResult } from '../state/multicall/hooks'
import { useTronWebContract } from './tronweb'
import { useTokenContract } from './useContract'
import { useIntervalEffect } from './useIntervalEffect'

export function useTokenAllowance(token?: Token, owner?: string, spender?: string) {
  const contract = useTokenContract(token?.address, false)

  const inputs = useMemo(() => [owner, spender || ''], [owner, spender])
  const allowance = useSingleCallResult(contract, 'allowance', inputs).result?.[0]

  const currencyAmount = useMemo(
    () => (token && allowance ? CurrencyAmount.fromRawAmount(token, allowance.toString()) : undefined),
    [token, allowance]
  )
  const bnAllowance = useMemo(
    () => (token && allowance ? BigNumber.from(allowance.toString()) : undefined),
    [token, allowance]
  )

  return {
    bnAllowance,
    currencyAmount,
  }
}

export function useTronTokenAllowance(token?: string, spender?: string) {
  const [allowance, setAllowance] = useState<string | undefined>()

  const { address: account } = useWallet()

  const contract = useTronWebContract(token)

  const fetchAllowance = useCallback(async () => {
    if (!token || !spender || !account || !contract) return

    const allowance = await contract.allowance(account, spender).call()

    setAllowance(allowance.remaining)
  }, [token, spender, contract, account])

  useIntervalEffect(fetchAllowance, 1000)

  const currencyAmount = useMemo(() => (token && allowance ? BigNumber.from(allowance) : undefined), [token, allowance])

  const bnAllowance = useMemo(
    () => (token && allowance ? BigNumber.from(allowance.toString()) : undefined),
    [token, allowance]
  )

  return {
    bnAllowance,
    currencyAmount,
  }
}
