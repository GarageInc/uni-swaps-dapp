import { createSlice } from '@reduxjs/toolkit'
import { SupportedChainId } from 'constants/chainsinfo'

import { SerializableTransactionReceipt, TransactionDetails, TransactionInfo } from './types'

// TODO(WEB-2053): update this to be a map of account -> chainId -> txHash -> TransactionDetails
// to simplify usage, once we're able to invalidate localstorage
interface TransactionState {
  [chainId: number]: {
    [txHash: string]: TransactionDetails
  }
}

interface AddTransactionPayload {
  chainId: SupportedChainId
  from: string
  hash: string
  info: TransactionInfo
  nonce?: number
  deadline?: number
  receipt?: SerializableTransactionReceipt
}

const initialState: TransactionState = {}

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction(transactions, { payload }: { payload: AddTransactionPayload }) {
      const { chainId, hash } = payload
      if (transactions[chainId]?.[hash]) {
        throw Error('Attempted to add existing transaction.')
      }
      const txs = transactions[chainId] ?? {}
      txs[hash] = { addedTime: Date.now(), ...payload }
      transactions[chainId] = txs
    },
    clearAllTransactions(transactions, { payload: { chainId } }) {
      if (!transactions[chainId]) return
      transactions[chainId] = {}
    },
    removeTransaction(transactions, { payload: { chainId, hash } }) {
      if (transactions[chainId][hash]) {
        delete transactions[chainId][hash]
      }
    },
    checkedTransaction(transactions, { payload: { chainId, hash, blockNumber } }) {
      const tx = transactions[chainId]?.[hash]
      if (!tx) {
        return
      }
      if (!tx.lastCheckedBlockNumber) {
        tx.lastCheckedBlockNumber = blockNumber
      } else {
        tx.lastCheckedBlockNumber = Math.max(blockNumber, tx.lastCheckedBlockNumber)
      }
    },
    finalizeTransaction(transactions, { payload: { hash, chainId, receipt } }) {
      const tx = transactions[chainId]?.[hash]
      if (!tx) {
        return
      }
      tx.receipt = receipt
      tx.confirmedTime = Date.now()
    },
    cancelTransaction(transactions, { payload: { hash, chainId, cancelHash } }) {
      const tx = transactions[chainId]?.[hash]

      if (tx) {
        delete transactions[chainId]?.[hash]
        transactions[chainId][cancelHash] = {
          ...tx,
          hash: cancelHash,
          cancelled: true,
        }
      }
    },
  },
})

export const { checkedTransaction, finalizeTransaction, removeTransaction } = transactionSlice.actions
export default transactionSlice.reducer
