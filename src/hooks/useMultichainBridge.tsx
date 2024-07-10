import { TransactionResponse } from '@ethersproject/providers'
import { useLayerZeroErc20Contract, useLayerZeroResolverContract } from 'constants/app-contracts'
import { SupportedChainId } from 'constants/chainsinfo'
import { BigNumber, ethers } from 'ethers'
import { useCallback, useMemo } from 'react'
import { useAddPopup } from 'state/application/hooks'
import { useSingleCallResult } from 'state/multicall/hooks'
import { ZERO } from 'utils/isZero'
import { formatDecimal } from 'utils/numberWithCommas'

import { useTxTemplate } from './base/tx-template'
import { useActiveWeb3React } from './web3'

const LAYER_ZERO_ADDRESSES = {
  ethereum: 101,
  bsc: 102,
  avalanche: 106,
  polygon: 109,
  arbitrum: 110,
  optimism: 111,
  fantom: 112,
  moonbeam: 126,
  goerli: 10121,
  'bsc-testnet': 10102,
  fuji: 10106,
  mumbai: 10109,
  'arbitrum-goerli': 10143,
  'optimism-goerli': 10132,
  'fantom-testnet': 10112,
  moonbase: 10126,
}

const useMappedLayerZeroChain = (chainId: SupportedChainId) => {
  return useMemo(() => {
    switch (chainId) {
      case SupportedChainId.MAINNET: {
        return LAYER_ZERO_ADDRESSES.ethereum
      }
      case SupportedChainId.ARBITRUM_ONE: {
        return LAYER_ZERO_ADDRESSES.arbitrum
      }
      case SupportedChainId.BNB: {
        return LAYER_ZERO_ADDRESSES.bsc
      }

      default: {
        return LAYER_ZERO_ADDRESSES.ethereum
      }
    }
  }, [chainId])
}

export function useLayerZeroErc20Bridge(toChainId: number, value: BigNumber = ZERO, setPendingTx: (v: string) => void) {
  const { account = '', library } = useActiveWeb3React()
  const contract = useLayerZeroErc20Contract()
  const targetChain = useMappedLayerZeroChain(toChainId)
  const actionType = `lz_bridge_token_${value?.toString()}`

  const bigNumberValue = useMemo(() => (value ? value : ZERO), [value])

  const userAccount = account || ''
  const deps = useMemo(
    () => [
      targetChain,
      userAccount,
      bigNumberValue,
      'false',
      ethers.utils.solidityPack(['uint16', 'uint256'], [1, 200000]),
    ],
    [targetChain, userAccount, bigNumberValue]
  )

  const fees = useSingleCallResult(contract, 'estimateSendFee', deps)

  const addPopup = useAddPopup()

  const dataFunc = useCallback(
    async (showPopup?: boolean) => {
      const payableFee = fees && fees.result?.[0].mul(6).div(5)

      try {
        const txAddress = await contract?.populateTransaction.sendFrom(
          userAccount,
          targetChain,
          userAccount,
          bigNumberValue,
          userAccount,
          ethers.constants.AddressZero,
          '0x',
          {
            value: payableFee,
          }
        )

        return txAddress
      } catch (e) {
        showPopup &&
          addPopup({
            msg: {
              success: false,
              title: <>Transaction Error</>,
              description: <>Can not populate transaction or not enough balance for fee</>,
            },
          })
        return undefined
      }
    },
    [userAccount, addPopup, fees, contract, bigNumberValue, targetChain]
  )

  const handleTx = useCallback(
    (tx: TransactionResponse) => {
      setPendingTx(tx.hash)
    },
    [setPendingTx]
  )

  return useTxTemplate(
    'Bridge',
    actionType,
    `Bridged ${formatDecimal(value || ZERO)} XFI tokens`,
    dataFunc,
    handleTx,
    'Something goes wrong with bridge'
  )
}

const useLZStoredPayload = (srcChainId: SupportedChainId) => {
  const { account } = useActiveWeb3React()
  const contract = useLayerZeroResolverContract()
  const mappedChainId = useMappedLayerZeroChain(srcChainId)
  const deps = useMemo(() => [mappedChainId, account || ''], [mappedChainId, account])

  const result = useSingleCallResult(contract, 'hasStoredPayload', deps)

  return {
    hasStoredPayload: result?.result?.[0],
    loading: result.loading,
  }
}
