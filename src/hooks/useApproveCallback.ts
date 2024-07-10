import { MaxUint256 } from '@ethersproject/constants'
import { TransactionResponse } from '@ethersproject/providers'
import { Currency, CurrencyAmount } from '@uniswap/sdk-core'
import { TxTemplateTypes } from 'constants/transactions'
import { BigNumber } from 'ethers'
import { useState } from 'react'
import { useCallback, useMemo } from 'react'
import { ZERO } from 'utils/isZero'

import { useHasPendingApproval, useTransactionAdder } from '../state/transactions/hooks'
import { calculateGasMargin } from '../utils/calculateGasMargin'
import { useTronWebContract } from './tronweb'
import { useTokenContract } from './useContract'
import { useTokenAllowance, useTronTokenAllowance } from './useTokenAllowance'
import { useActiveWeb3React } from './web3'

export enum ApprovalState {
  UNKNOWN = 'UNKNOWN',
  NOT_APPROVED = 'NOT_APPROVED',
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  NOT_OWNER = 'NOT_OWNER',
}

const MAX = MaxUint256

// returns a variable indicating the state of the approval and a function which approves if necessary or early returns
export function useSimpleApproveCallback(currency: Currency | undefined | null, border: BigNumber, spender?: string) {
  const { account, chainId } = useActiveWeb3React()
  const token = currency?.isToken ? currency : undefined
  const { currencyAmount: currentAllowance, bnAllowance } = useTokenAllowance(token, account ?? undefined, spender)
  const pendingApproval = useHasPendingApproval(token?.address, spender)

  const AmountToApprove = useMemo(
    () => (currency ? CurrencyAmount.fromRawAmount(currency, border.toString()) : undefined),
    [currency, border]
  )

  // check the current approval status
  const approvalState: ApprovalState = useMemo(() => {
    if (!currency || !spender) return ApprovalState.UNKNOWN
    if (currency.isNative) return ApprovalState.APPROVED
    // we might not have enough data to know whether or not we need to approve
    if (!currentAllowance) return ApprovalState.UNKNOWN

    if (pendingApproval) {
      return ApprovalState.PENDING
    }

    return bnAllowance?.lt(border || ZERO) ? ApprovalState.NOT_APPROVED : ApprovalState.APPROVED
  }, [currency, currentAllowance, bnAllowance, pendingApproval, spender, border])

  const tokenContract = useTokenContract(token?.address)
  const addTransaction = useTransactionAdder()

  const estimateGasFunc = useCallback(async () => {
    if (!tokenContract || !spender) return ZERO

    const estimatedGas = await tokenContract.estimateGas.approve(spender, MaxUint256).catch(() => {
      // general fallback for tokens who restrict approval amounts

      return tokenContract.estimateGas.approve(
        spender,
        AmountToApprove ? AmountToApprove.quotient.toString() : MaxUint256
      )
    })

    return estimatedGas
  }, [tokenContract, spender, AmountToApprove])

  const [calledWallet, setCalledWallet] = useState<boolean>(false)

  const approve = useCallback(async (): Promise<void> => {
    if (approvalState !== ApprovalState.NOT_APPROVED) {
      console.error('approve was called unnecessarily')
      return
    }
    if (!chainId) {
      console.error('no chainId')
      return
    }

    if (!token) {
      console.error('no token')
      return
    }

    if (!tokenContract) {
      console.error('tokenContract is null')
      return
    }

    if (!currency) {
      console.error('missing amount to approve')
      return
    }

    if (!spender) {
      console.error('no spender')
      return
    }

    let useExact = false
    const estimatedGas = await estimateGasFunc()

    useExact = true

    setCalledWallet(true)
    return tokenContract
      .approve(spender, useExact && AmountToApprove ? AmountToApprove.quotient.toString() : MaxUint256, {
        gasLimit: calculateGasMargin(chainId, estimatedGas),
      })
      .then((response: TransactionResponse) => {
        addTransaction(response, {
          summary: 'Approve ' + currency.symbol,
          approval: { tokenAddress: token.address, spender },
          type: TxTemplateTypes.Approved,
        })
      })
      .catch((error: Error) => {
        console.debug('Failed to approve token', error)
        throw error
      })
      .finally(() => {
        setCalledWallet(false)
      })
  }, [
    approvalState,
    token,
    tokenContract,
    currency,
    spender,
    addTransaction,
    estimateGasFunc,
    chainId,
    AmountToApprove,
  ])

  return {
    approvalState,
    approve,
    txInfo: { estimatedGasLimitFunc: estimateGasFunc },
    calledWallet,
  }
}

// returns a variable indicating the state of the approval and a function which approves if necessary or early returns
export function useSimpleTronApproveCallback(currency: string, border: BigNumber, spender?: string) {
  const { currencyAmount: currentAllowance, bnAllowance } = useTronTokenAllowance(currency, spender)
  const pendingApproval = useHasPendingApproval(currency, spender)

  const AmountToApprove = useMemo(() => (currency ? BigNumber.from(border.toString()) : undefined), [currency, border])

  // check the current approval status
  const approvalState: ApprovalState = useMemo(() => {
    if (!currency || !spender) return ApprovalState.UNKNOWN

    // Native check?
    if (currency === 'TRX') return ApprovalState.APPROVED

    // we might not have enough data to know whether or not we need to approve
    if (!currentAllowance) return ApprovalState.UNKNOWN

    if (pendingApproval) {
      return ApprovalState.PENDING
    }

    return bnAllowance?.lt(border || ZERO) ? ApprovalState.NOT_APPROVED : ApprovalState.APPROVED
  }, [currency, currentAllowance, bnAllowance, pendingApproval, spender, border])

  const tokenContract = useTronWebContract(currency)

  const addTransaction = useTransactionAdder()

  const [calledWallet, setCalledWallet] = useState<boolean>(false)

  const approve = useCallback(async (): Promise<void> => {
    if (approvalState !== ApprovalState.NOT_APPROVED) {
      console.error('approve was called unnecessarily')
      return
    }

    if (!currency) {
      console.error('no token')
      return
    }

    if (!tokenContract) {
      console.error('tokenContract is null')
      return
    }

    if (!currency) {
      console.error('missing amount to approve')
      return
    }

    if (!spender) {
      console.error('no spender')
      return
    }

    const useExact = true

    const contract = tokenContract

    setCalledWallet(true)

    return contract
      .approve(spender, useExact && AmountToApprove ? AmountToApprove : MaxUint256)
      .send()
      .then((response: TransactionResponse) => {
        addTransaction(response, {
          summary: 'Approve ' + currency,
          approval: { tokenAddress: currency, spender },
          type: TxTemplateTypes.Approved,
        })
      })
      .catch((error: Error) => {
        console.debug('Failed to approve token', error)
        throw error
      })
      .finally(() => {
        setCalledWallet(false)
      })
  }, [approvalState, currency, tokenContract, spender, addTransaction, AmountToApprove])

  return {
    approvalState,
    approve,
    calledWallet,
  }
}
