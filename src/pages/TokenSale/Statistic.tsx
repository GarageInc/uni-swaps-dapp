import { Stack } from '@mui/material'
import { useWallet } from '@tronweb3/tronwallet-adapter-react-hooks'
import { useTronSaleAddress } from 'constants/app-contracts'
import { BigNumber } from 'ethers'
import { useTronWebContract } from 'hooks/tronweb'
import { useIntervalEffect } from 'hooks/useIntervalEffect'
import { useIsMobileDevice } from 'hooks/useIsMobileDevice'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { formatDecimal } from 'utils/numberWithCommas'

import SWA from '../../assets/svg/swa-token.svg'

const Box = styled.div`
  display: flex;
  padding: 2.5rem 2rem;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  border-radius: 1.5rem;
  background: #fff;
  min-width: 20rem;

  ${({ theme }) => theme.mediaWidth.upToTablet`
    min-width: 0;
    padding: 1.5rem;
  `};
`

const Title = styled.h3`
  color: ${({ theme }) => theme.text50};
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 1.5rem */
  text-transform: uppercase;
  margin: 0;

  ${({ theme }) => theme.mediaWidth.upToTablet`
    font-size: 0.9375rem;
  `};
`

const TokenIcon = styled.img`
  width: 2rem;
  aspect-ratio: 1;

  ${({ theme }) => theme.mediaWidth.upToTablet`
    width: 1.5rem;
  `};
`

const Amount = styled.span`
  font-size: 1.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 2.25rem */
  letter-spacing: -0.01875rem;
  position: relative;
  top: 0.125rem;

  ${({ theme }) => theme.mediaWidth.upToTablet`
    font-size: 1.5rem;
  `};
`

const useGetUserPurchase = () => {
  const [balance, setBalance] = useState<BigNumber | undefined>()

  const { address: account } = useWallet()

  const saleAddress = useTronSaleAddress()
  const contract = useTronWebContract(saleAddress)

  const fetchBalance = useCallback(async () => {
    if (!saleAddress || !account || !contract) return

    const data = await contract.userPurchases(account).call()

    setBalance(BigNumber.from(data.tokensPurchased))
  }, [saleAddress, account, contract])

  useIntervalEffect(fetchBalance, 3000)

  return balance
}

export const Statistic = () => {
  const isMobile = useIsMobileDevice()

  const purchase = useGetUserPurchase()

  const { t } = useTranslation()

  return (
    <Box>
      <Title>{t('TokenSale.PurchasedAmount')}</Title>
      <Stack direction="row" gap=".75rem" marginTop={isMobile ? '.37rem' : '.5rem'}>
        <TokenIcon src={SWA} />
        <Amount>{purchase ? formatDecimal(purchase, 2) : 0} SWA</Amount>
      </Stack>
    </Box>
  )
}
