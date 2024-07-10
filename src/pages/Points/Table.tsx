import { Stack } from '@mui/material'
import { Button, Table } from 'components'
import TokenSmallBadge from 'components/badges/TokenSmallBadge/TokenSmallBadge'
import { TokenSymbol } from 'components/blocks/AmountInput/useAppCoins'
import { useTokenBalance } from 'hooks/base/token'
import { useIsMobileDevice } from 'hooks/useIsMobileDevice'
import { useTokenAsset } from 'hooks/useTokenAsset'
import { ISwapToken, useSwapTokensList } from 'pages/Swap/utils'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useNativeCurrencyBalance } from 'state/wallet/hooks'
import styled from 'styled-components'
import { formatDecimal } from 'utils/numberWithCommas'

interface IPointData {
  token: {
    name: string
    icon: string
  }
  balance: {
    tokenAmount: number
    dollarAmount: number
  }
}

export const PointsTable = () => {
  const { t } = useTranslation()

  const isMobile = useIsMobileDevice()

  const { result: assets } = useSwapTokensList()

  if (!assets) return null

  if (isMobile) {
    return (
      <Stack gap=".5rem">
        {assets.map((point) => (
          <MobilePointsItem key={point.address} point={point} />
        ))}
      </Stack>
    )
  }

  return (
    <Table>
      <StyledTableHead>
        <Table.Row>
          <Table.Cell>{t('Points.token')}</Table.Cell>
          <Table.Cell
            style={{
              textAlign: 'left',
            }}
          >
            {t('Points.balance')}
          </Table.Cell>
          <Table.Cell
            style={{
              width: '12rem',
            }}
          ></Table.Cell>
        </Table.Row>
      </StyledTableHead>
      <Table.Body>
        {assets.map((point) => (
          <PointsItem key={point.address} point={point} />
        ))}
      </Table.Body>
    </Table>
  )
}

const PointsItem = ({ point }: { point: ISwapToken }) => {
  const { t } = useTranslation()

  const asset = useTokenAsset(point.address)

  const router = useNavigate()

  return (
    <Table.Row key={point.address}>
      <Table.Cell>
        <Stack direction="row" gap="1rem" alignItems="center">
          <img
            src={asset?.icon}
            alt={asset?.symbol}
            style={{ width: '2rem', aspectRatio: '1/1', objectFit: 'contain' }}
          />
          <Text>{point.data.name}</Text>
        </Stack>
      </Table.Cell>
      <Table.Cell
        style={{
          textAlign: 'left',
        }}
      >
        <Stack direction="column" alignItems="flex-start" gap=".5rem">
          <Balance token={point} />
        </Stack>
      </Table.Cell>

      <Table.Cell>
        <SwapButton onClick={() => router(`/swap?in=${point.address}`)}>{t('Points.swap')}</SwapButton>
      </Table.Cell>
    </Table.Row>
  )
}

const MobilePointsItem = ({ point }: { point: ISwapToken }) => {
  const { t } = useTranslation()

  const asset = useTokenAsset(point.address)

  const router = useNavigate()

  return (
    <WhiteBox>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
        <Stack direction="row" gap=".5rem" alignItems="center">
          <img
            src={asset?.icon}
            alt={asset?.symbol}
            style={{ width: '1.5rem', aspectRatio: '1/1', objectFit: 'contain' }}
          />
          <Text>{point.data.name}</Text>
        </Stack>
        <Stack>
          <Balance token={point} />
        </Stack>
      </Stack>

      <SwapButton onClick={() => router(`/swap?in=${point.address}`)}>{t('Points.swap')}</SwapButton>
    </WhiteBox>
  )
}

const Balance = ({ token }: { token: ISwapToken }) => {
  if (token.address?.toLowerCase() === TokenSymbol.xfi) {
    return <NativeBalance />
  }
  return <Erc20Balance token={token} />
}

const NativeBalance = () => {
  const balance = useNativeCurrencyBalance()

  return <TokenAmount>{formatDecimal(balance || 0, 2, 18)}</TokenAmount>
}

const Erc20Balance = ({ token }: { token: ISwapToken }) => {
  const balance = useTokenBalance(token.address)

  return <TokenAmount>{formatDecimal(balance || 0, 2, 18)}</TokenAmount>
}

const StyledTableHead = styled(Table.Head)`
  background: ${({ theme }) => theme.inputDefault};
`

const TokenIcon = styled(TokenSmallBadge)`
  width: 2rem;
  aspect-ratio: 1;

  ${({ theme }) => theme.mediaWidth.upToTablet`
    width: 1.5rem;
  `}
`

const Text = styled.p`
  font-size: 1.375rem;
  font-weight: 400;
  line-height: 120%; /* 1.65rem */
  margin: 0;

  ${({ theme }) => theme.mediaWidth.upToTablet`
    font-size: 1.25rem;
  `}
`
const SwapButton = styled(Button)`
  border-radius: 3.75rem;
  border: 1px solid ${({ theme }) => theme.dark};
  background: transparent;

  color: ${({ theme }) => theme.dark};

  :hover {
    color: ${({ theme }) => theme.white};
  }
`
const DollarAmount = styled.span`
  color: ${({ theme }) => theme.text60};
  font-feature-settings: 'clig' off, 'liga' off;
  font-size: 1rem;
  font-weight: 400;
  line-height: 120%; /* 1.2rem */

  ${({ theme }) => theme.mediaWidth.upToTablet`
    font-size: 0.875rem;
  `}
`

const TokenAmount = styled.span`
  font-size: 1.375rem;
  font-weight: 400;
  line-height: 120%; /* 1.65rem */
  margin: 0;

  ${({ theme }) => theme.mediaWidth.upToTablet`
font-size: 1.125rem;
  `}
`
const WhiteBox = styled.div`
  background: ${({ theme }) => theme.white};
  border-radius: 1.5rem;
  padding: 1rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`
