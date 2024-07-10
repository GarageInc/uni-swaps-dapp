import { createAction } from '@reduxjs/toolkit'

import { INftAction, ITxData } from './hooks'

export const addTransaction = createAction<{
  chainId: number
  hash: string
  from: string
  approval?: { tokenAddress: string; spender: string }
  bridge?: { fromChainId: number; toChainId: number }
  summary?: string
  nftAction?: INftAction
  type?: string
  txData?: ITxData
}>('transactions/addTransaction')

export const clearAllTransactions = createAction<{ chainId: number }>('transactions/clearAllTransactions')
