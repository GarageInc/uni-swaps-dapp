import { TransactionResponse } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import { BigNumber } from 'ethers'
import { useCallback, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from 'state/hooks'

import { useActiveWeb3React } from '../../hooks/web3'
import { addTransaction } from './actions'
import { removeTransaction } from './reducer'
import { TransactionDetails } from './types'

export interface INftAction {
  nftAddress: string
  tokenId: string
  type: string
}

export interface ITxData {
  to?: string
  value: string | BigNumber
  data?: string
  gasLimit?: BigNumber
}

// helper that can take a ethers library transaction response and add it to the list of transactions
export function useTransactionAdder(): (
  response: TransactionResponse,
  customData?: {
    summary?: string
    approval?: { tokenAddress: string; spender: string }
    bridge?: { fromChainId: number; toChainId: number }
    nftAction?: INftAction
    type?: string
    txData?: ITxData
  }
) => void {
  const { chainId, account } = useActiveWeb3React()
  const dispatch = useAppDispatch()

  return useCallback(
    (
      response: TransactionResponse,
      {
        summary,
        approval,
        bridge,
        nftAction,
        type,
        txData,
      }: {
        summary?: string
        approval?: { tokenAddress: string; spender: string }
        bridge?: { fromChainId: number; toChainId: number }
        nftAction?: INftAction
        type?: string
        txData?: ITxData
      } = {}
    ) => {
      if (!account) return
      if (!chainId) return

      const { hash } = response
      if (!hash) {
        throw Error('No transaction hash found.')
      }
      dispatch(
        addTransaction({
          hash,
          from: account,
          chainId,
          approval,
          bridge,
          summary,
          nftAction,
          type,
          txData,
        })
      )
    },
    [dispatch, chainId, account]
  )
}

// returns all the transactions for the current chain
export function useAllTransactions(): { [txHash: string]: TransactionDetails } {
  const { chainId } = useActiveWeb3React()

  const state = useAppSelector((state) => state.transactions)

  return chainId ? state[chainId] ?? {} : {}
}

// returns all the transactions for the all chains
export function useAllChainsTransactions(): { [txHash: string]: TransactionDetails } {
  const state = useAppSelector((state) => state.transactions)

  return useMemo(() => {
    return Object.values(state).reduce((acc, txs) => {
      return { ...acc, ...txs }
    }, {})
  }, [state])
}

/**
 * Returns whether a transaction happened in the last day (86400 seconds * 1000 milliseconds / second)
 * @param tx to check for recency
 */
export function isTransactionRecent(tx: TransactionDetails): boolean {
  return new Date().getTime() - tx.addedTime < 86_400_000
}

export function isPendingTx(tx: TransactionDetails): boolean {
  return !tx.receipt && !tx.cancelled
}

export function useIsTransactionPending(hash: string | undefined): boolean {
  const allTransactions = useAllTransactions()
  return useMemo(() => {
    const tx = typeof hash === 'string' && Object.keys(allTransactions).find((txHash) => txHash === hash)

    if (!tx) return false

    return isPendingTx(allTransactions[tx])
  }, [allTransactions, hash])
}

// returns whether a token has a pending approval transaction
export function useHasPendingApproval(tokenAddress: string | undefined, spender: string | undefined): boolean {
  const allTransactions = useAllTransactions()
  return useMemo(
    () =>
      typeof tokenAddress === 'string' &&
      typeof spender === 'string' &&
      Object.keys(allTransactions).some((hash) => {
        const tx = allTransactions[hash]
        if (!tx) return false
        if (tx.receipt) {
          return false
        } else {
          const approval = tx.approval
          if (!approval) return false
          return approval.spender === spender && approval.tokenAddress === tokenAddress && isTransactionRecent(tx)
        }
      }),
    [allTransactions, spender, tokenAddress]
  )
}

export function useHasPendingNftAction(type: string, nftAddress?: string, tokenId?: string): boolean {
  const allTransactions = useAllTransactions()
  return useMemo(
    () =>
      typeof nftAddress === 'string' &&
      Object.keys(allTransactions).some((hash) => {
        const tx = allTransactions[hash]

        if (!tx) return false

        if (tx.receipt) {
          return false
        } else {
          const { nftAction } = tx
          if (!nftAction) return false
          return (
            nftAction.nftAddress === nftAddress &&
            nftAction.tokenId === tokenId &&
            nftAction.type === type &&
            isTransactionRecent(tx)
          )
        }
      }),
    [allTransactions, nftAddress, tokenId, type]
  )
}

export function useTransactionRemover() {
  const { chainId, account } = useWeb3React()
  const dispatch = useAppDispatch()

  return useCallback(
    (hash: string) => {
      if (!account) return
      if (!chainId) return

      dispatch(removeTransaction({ hash, chainId }))
    },
    [account, chainId, dispatch]
  )
}
