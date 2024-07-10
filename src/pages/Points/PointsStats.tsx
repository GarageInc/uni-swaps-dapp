import { Stack } from '@mui/material'
import { useBonusPointsAddress } from 'constants/app-contracts'
import { useTokenBalance } from 'hooks/base/token'
import { useIsMobileDevice } from 'hooks/useIsMobileDevice'
import { useNonce } from 'hooks/useNonce'
import { useTotalSupplyToken } from 'hooks/useTotalSupply'
import { useYandexMetrikaHit } from 'hooks/useYandexMetrika'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { ZERO } from 'utils/isZero'
import { formatDecimal } from 'utils/numberWithCommas'

import CoinIcon from './assets/coin.svg'
import SwapIcon from './assets/swap.svg'

interface IStatsItemData {
  title: string
  val: string | number
  icon: string
}

export const PointsStats = () => {
  useYandexMetrikaHit()
  const { t } = useTranslation()

  const isMobile = useIsMobileDevice()

  const bonusPointsAddress = useBonusPointsAddress()

  const balance = useTokenBalance(bonusPointsAddress)

  const totalSupply = useTotalSupplyToken(bonusPointsAddress)

  const nonce = useNonce()

  const Stats: IStatsItemData[] = useMemo(() => {
    return [
      {
        title: t('Points.bonusPoints'),
        val: formatDecimal(balance || ZERO),
        icon: CoinIcon,
      },
      {
        title: t('Points.totalPoints'),
        val: formatDecimal(totalSupply || ZERO),
        icon: CoinIcon,
      },
      {
        title: t('Points.numberOfTransactions'),
        val: formatDecimal(nonce || 0, 0, 0),
        icon: SwapIcon,
      },
    ]
  }, [t, balance, totalSupply, nonce])

  return (
    <Stack direction={isMobile ? 'column' : 'row'} gap={isMobile ? '.5rem' : '1rem'} flex={1}>
      {Stats.map((item) => (
        <StatsItem key={item.title} data={item} />
      ))}
    </Stack>
  )
}

const StatsItem = ({ data }: { data: IStatsItemData }) => {
  const { title, val, icon } = data

  const isMobile = useIsMobileDevice()

  return (
    <StatsItemBox>
      <StatsItemTitle>{title}</StatsItemTitle>
      <Stack
        direction="row"
        gap={isMobile ? '.38rem' : '.75rem'}
        alignItems={isMobile ? 'center' : 'center'}
        marginTop=".5rem"
      >
        <StatsItemIcon src={icon} alt="" />
        <StatsItemValue>{val}</StatsItemValue>
      </Stack>
    </StatsItemBox>
  )
}

const StatsItemBox = styled.div`
  border-radius: 1.5rem;
  background: ${({ theme }) => theme.white};
  display: flex;
  padding: 2rem;
  flex-direction: column;
  align-items: flex-start;
  flex: 1 0 0;

  ${({ theme }) => theme.mediaWidth.upToTablet`
    padding: 1.75rem 1.5rem 1.5rem 1.5rem;
  `}
`

const StatsItemTitle = styled.h3`
  color: ${({ theme }) => theme.text50};
  font-size: 1.125rem;
  line-height: 120%; /* 1.5rem */
  text-transform: uppercase;
  margin: 0;
  font-weight: 400;
  white-space: nowrap;

  ${({ theme }) => theme.mediaWidth.upToTablet`
    font-size: 1rem;
  `};
`

const StatsItemValue = styled.p`
  font-size: 2.5rem;
  line-height: 120%; /* 3.375rem */
  letter-spacing: -0.02813rem;
  margin: 0;

  ${({ theme }) => theme.mediaWidth.upToTablet`
    font-size: 2.1875rem;
  `}
`
const StatsItemIcon = styled.img`
  width: 2.75rem;
  aspect-ratio: 1;

  ${({ theme }) => theme.mediaWidth.upToTablet`
    width: 2.125rem;
  `}
`
