import { SupportedChainId } from 'constants/chainsinfo'
import { BigNumber } from 'ethers'
import { useActiveWeb3React } from 'hooks/web3'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { calculateGasMargin } from 'utils/calculateGasMargin'
import { ZERO } from 'utils/isZero'

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

const Container = styled.div``

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const ReceiveLabel = styled.div<{ bg?: string }>`
  border-radius: 16px;
  background: ${({ theme, bg }) => (theme as any)[bg || 'bg1']};
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  padding: 4px 6px;
`

const BlackBtn = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.dark};
  border-radius: 50%;
  width: 32px;
  height: 32px;
`

export interface ITxTemplateInfo {
  estimatedGasLimitFunc: (showError?: boolean | undefined) => Promise<BigNumber>
  usedGasLimit?: BigNumber
}

export const useEstimatesGasValue = (info?: ITxTemplateInfo) => {
  const [estimatedGas, setEstimatedGas] = useState<BigNumber>(ZERO)

  const { chainId = SupportedChainId.XFI_TESTNET } = useActiveWeb3React()

  useEffect(() => {
    if (!info) {
      return
    }
    const { estimatedGasLimitFunc } = info
    const getEstimatedGas = async () => {
      const gas = await estimatedGasLimitFunc()
      setEstimatedGas(calculateGasMargin(chainId, gas))
    }

    getEstimatedGas()
  }, [info, chainId])

  return estimatedGas
}

const IconStyled = styled.img`
  width: 16px;
  height: 16px;
`
