import { TransactionResponse } from '@ethersproject/providers'
import { BigNumber, PopulatedTransaction } from 'ethers'
import { useCallback, useMemo, useState } from 'react'
import { useAddPopup } from 'state/application/hooks'
import { ITxData, useHasPendingNftAction, useTransactionAdder } from 'state/transactions/hooks'
import { calculateGasMargin } from 'utils/calculateGasMargin'
import { ZERO } from 'utils/isZero'

import { useActiveWeb3React } from '../web3'

type AsyncFunc = (data?: any) => Promise<PopulatedTransaction | undefined>

export const useTxTemplate = (
  type: string,
  description: string,
  successMsg: string,
  funcTxData: AsyncFunc,
  txCallback?: (tx: TransactionResponse) => void,
  failMsg?: any,
  manualGazLimit?: BigNumber,
  txSavingParams?: {
    bridge: {
      fromChainId: number
      toChainId: number
    }
  }
) => {
  const { account, chainId, provider: library } = useActiveWeb3React()
  const addTransaction = useTransactionAdder()

  const [disabled, setDisabled] = useState(false)
  const [usedGasLimit, setUsedGasLimit] = useState<BigNumber | undefined>(ZERO)

  const pending = useHasPendingNftAction(description)

  const addPopup = useAddPopup()

  const [calledWallet, setCalledWallet] = useState(false)

  const estimatedGasLimit = useCallback(
    async (showError?: boolean) => {
      if (!chainId || !library || !account) return ZERO

      if (account) {
        setIsError(false)
        const txData = await funcTxData()

        const txn = {
          ...txData,
          value: txData?.value || '0x0',
        }

        try {
          const estimatedCost = await library.getSigner().estimateGas(txn)

          return calculateGasMargin(chainId, estimatedCost)
        } catch (error) {
          console.error('Failed to estimate transaction', error)
          setIsError(true)
          if (showError) {
            addPopup({
              msg: {
                success: false,
                title: <>Transaction Error</>,
                description: 'Can not estimate gas usage for transaction or insufficient funds',
              },
            })
          }
        }
      }

      return ZERO
    },
    [funcTxData, account, chainId, library, addPopup]
  )

  const [isError, setIsError] = useState(false)

  const action = useCallback(
    async (data?: any) => {
      setIsError(false)
      if (!chainId || !library || !account) return

      if (account) {
        const txData = await funcTxData(data)
        const txn = {
          ...txData,
          value: txData?.value || '0x0',
        }

        const estimatedCost = manualGazLimit || (await estimatedGasLimit(true))

        const gazLimit = estimatedCost ? calculateGasMargin(chainId, estimatedCost) : manualGazLimit

        setUsedGasLimit(gazLimit)
        try {
          const newTxn: ITxData = {
            ...txn,
            gasLimit: gazLimit,
          }

          setCalledWallet(true)

          return await library
            .getSigner()
            .sendTransaction(newTxn)
            .then((response: TransactionResponse) => {
              txCallback && txCallback(response)

              addTransaction(response, {
                summary: successMsg,
                nftAction: {
                  nftAddress: '',
                  tokenId: '',
                  type: description,
                },
                type,
                txData: newTxn,
                ...txSavingParams,
              })
            })
        } catch (error) {
          setIsError(true)

          console.error('Failed to send transaction', error)

          setDisabled(true)

          failMsg &&
            addPopup({
              msg: {
                success: false,
                title: <>Transaction Denied</>,
                description: failMsg,
              },
            })

          // we only care if the error is something _other_ than the user rejected the tx
          if (error?.code !== 4001) {
            console.error(error)
          }
        } finally {
          setCalledWallet(false)
        }
      } else {
        return
      }
    },
    [
      successMsg,
      manualGazLimit,
      description,
      type,
      funcTxData,
      account,
      addTransaction,
      chainId,
      library,
      addPopup,
      failMsg,
      estimatedGasLimit,
      txCallback,
      txSavingParams,
    ]
  )

  return useMemo(
    () => ({
      pending,
      action,
      disabled,
      calledWallet,
      isError,
      txInfo: { usedGasLimit, estimatedGasLimitFunc: estimatedGasLimit },
    }),
    [pending, action, disabled, estimatedGasLimit, usedGasLimit, isError, calledWallet]
  )
}
