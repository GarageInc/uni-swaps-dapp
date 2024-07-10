import { Stack } from '@mui/material'
import { Suggestion } from 'components'
import { useTronSaleAddress } from 'constants/app-contracts'
import { BigNumber } from 'ethers'
import { useTronWebContract } from 'hooks/tronweb'
import { useIntervalEffect } from 'hooks/useIntervalEffect'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

const Row = styled.div<{ danger?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;

  color: ${({ danger, theme }) => (danger ? theme.red : theme.text100)};
  font-weight: ${({ danger }) => (danger ? 700 : 400)};

  ${({ theme }) => theme.mediaWidth.upToTablet`
    font-size: 0.875rem;
  `};
`

const Container = styled.div`
  padding: 1.25rem 1rem;
  border-radius: 0.75rem;
  border: 1px solid ${({ theme }) => theme.divStroke};
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;

  ${({ theme }) => theme.mediaWidth.upToTablet`
    font-size: 0.875rem;
  `};
`

export const getSWAAmount = (usdtAmount: BigNumber) => {
  return usdtAmount.mul(100).div(16)
}

export const useMaxDeposit = () => {
  const [maxDeposit, setMaxDeposit] = useState<BigNumber | undefined>()

  const saleAddress = useTronSaleAddress()
  const contract = useTronWebContract(saleAddress)

  const fetchSaleStartTime = useCallback(async () => {
    if (!saleAddress || !contract) return

    const data = await contract.maxDeposit().call()

    setMaxDeposit(data)
  }, [saleAddress, contract])

  useIntervalEffect(fetchSaleStartTime, 3000)

  return { maxDeposit }
}

export const useTotalDeposit = () => {
  const [deposit, setDeposit] = useState<BigNumber | undefined>()

  const saleAddress = useTronSaleAddress()
  const contract = useTronWebContract(saleAddress)

  const fetchData = useCallback(async () => {
    if (!saleAddress || !contract) return

    const data = await contract.totalDeposit().call()

    setDeposit(data)
  }, [saleAddress, contract])

  useIntervalEffect(fetchData, 3000)

  return { deposit }
}

export const InfoBlock = () => {
  const { t } = useTranslation()

  const mockNetworkCost = 104.73

  return (
    <Container>
      <Header>
        <span>1 SWA = 0.16 USDT</span>
      </Header>

      <Header style={{ marginTop: '.75rem' }}>
        <span>{t('TokenSale.Valuation')} $16,000,000</span>
      </Header>
      <Row style={{ marginTop: '1.5rem', gap: '12px' }}>
        <Header>
          <span>{t('TokenSale.NetworkCost')}</span>
        </Header>
        <Stack alignItems="center" direction="row" gap=".5rem">
          <span>{mockNetworkCost} TRX</span>

          {/* //TODO НЕ ЗАБЫТЬ ПОМЕНЯТЬ МОК В ОБОИХ МЕСТАХ!! */}
          {mockNetworkCost && <Suggestion size="small">{t('TokenSale.NetworkCostSuggestion')}</Suggestion>}
        </Stack>
      </Row>
    </Container>
  )
}
