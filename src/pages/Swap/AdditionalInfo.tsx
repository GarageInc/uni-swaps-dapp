import { Stack } from '@mui/material'
import { DropDown } from 'components'
import { IAppToken } from 'components/blocks/AmountInput/useAppCoins'
import { useTxEstimatedGasValue } from 'components/FormActionBtn/FormActionBtn'
import { LinkLikeButton } from 'components/MUI/Button'
import { ITxTemplateInfo } from 'components/TransactionInfo/TransactionInfo'
import { BigNumber } from 'ethers'
import { useTokenAsset } from 'hooks/useTokenAsset'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { ZERO } from 'utils/isZero'
import { formatDecimal, getPrecision } from 'utils/numberWithCommas'

import { RouteModal } from './RouteModal'

const Row = styled.div<{ danger?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;

  color: ${({ danger, theme }) => (danger ? theme.red : theme.text100)};
  font-weight: ${({ danger }) => (danger ? 700 : 400)};
`

export const MAX_PRICE_IMPACT = 20

const InfoBlock = ({
  style,
  slippage,
  priceChange,
  txInfo,
  path,
}: {
  style?: React.CSSProperties
  slippage?: number | string
  priceChange: BigNumber
  txInfo?: ITxTemplateInfo
  path?: string[]
}) => {
  const { t } = useTranslation()

  const [showRoute, setShowRoute] = useState(false)

  const [integer, decimals] = useTxEstimatedGasValue(txInfo)

  const gasValue = txInfo?.usedGasLimit?.gt(ZERO)
    ? formatDecimal(txInfo?.usedGasLimit || ZERO, 2, 6)
    : `${integer + '.' + decimals}`

  return (
    <>
      <Stack style={style} gap=".75rem">
        {priceChange.gte(MAX_PRICE_IMPACT) && (
          <Row danger>
            <span>{t('Swap.priceImpact')}</span>
            <span>-{formatDecimal(priceChange, 2, 0)}%</span>
          </Row>
        )}
        <Row>
          <span>{t('Swap.maxSlippage')}</span>
          <span>{slippage}%</span>
        </Row>
        <Row>
          <span>{t('Swap.gas')}</span>
          <span>{gasValue} XFI</span>
        </Row>
      </Stack>

      {path?.length ? (
        <>
          <Row
            style={{
              marginTop: '1.5rem',
            }}
          >
            <span>{t('Swap.route')}</span>
            <LinkLikeButton
              onClick={(e) => {
                e.stopPropagation()
                setShowRoute(true)
              }}
            >
              {t('Swap.view')}
            </LinkLikeButton>
          </Row>

          <RouteModal
            hideCost={txInfo?.usedGasLimit?.eq(ZERO) && +integer === 0 && decimals === '00'}
            cost={`${gasValue} XFI`}
            isOpenFlag={showRoute}
            onClose={() => {
              setShowRoute(false)
            }}
            path={path}
          />
        </>
      ) : null}
    </>
  )
}

export const AdditionalInfo = ({
  symbolFirst,
  symbolSecond,
  expectedAmountOut = ZERO,
  slippage,
  priceChange,
  txInfo,
  path,
  decimalsOut,
}: {
  symbolFirst: string
  symbolSecond: string
  expectedAmountOut: BigNumber
  slippage?: number | string
  priceChange: BigNumber
  txInfo?: ITxTemplateInfo
  path?: string[]
  decimalsOut?: number
}) => {
  return (
    <DropDown
      title={`1 ${symbolFirst} = ${formatDecimal(
        expectedAmountOut || ZERO,
        getPrecision(decimalsOut),
        decimalsOut
      )} ${symbolSecond}`}
    >
      <InfoBlock
        slippage={slippage}
        priceChange={priceChange}
        style={{
          marginTop: '1.5rem',
        }}
        txInfo={txInfo}
        path={path}
      />
    </DropDown>
  )
}

const Container = styled.div`
  width: 100%;
  padding: 1.25rem 1rem;
  border-radius: 0.75rem;
  border: 1px solid ${({ theme }) => theme.divStroke};
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eff2f4;

  color: ${({ theme }) => theme.text60};
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;
`
const TokensSection = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5rem;
`

const Token = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;
  color: ${({ theme }) => theme.text100};
`

const TokenLogo = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`

export const TotalInfo = ({
  assetIn,
  assetOut,
  pointsAmount,
  slippage,
  priceChange,
  txInfo,
  path,
}: {
  assetIn?: IAppToken
  assetOut?: IAppToken
  pointsAmount?: BigNumber
  priceChange: BigNumber
  slippage?: number | string
  txInfo?: ITxTemplateInfo
  path?: string[]
}) => {
  const tokenData0 = useTokenAsset(assetIn?.address)
  const tokenData1 = useTokenAsset(assetOut?.address)

  const { t } = useTranslation()

  return (
    <Container>
      <Header>
        <TokensSection>
          <Token>
            <TokenLogo src={tokenData0?.icon} alt={tokenData0?.symbol} />
            <span>{tokenData0?.symbol}</span>
          </Token>
          <span> to </span>
          <Token>
            <TokenLogo src={tokenData1?.icon} alt={tokenData1?.symbol} />
            <span>{tokenData1?.symbol}</span>
          </Token>
        </TokensSection>

        {pointsAmount && (
          <span>
            + {formatDecimal(pointsAmount)} {t('Swap.points')}
          </span>
        )}
      </Header>

      <InfoBlock
        path={path}
        slippage={slippage || 0}
        priceChange={priceChange}
        txInfo={txInfo}
        style={{ marginTop: '1rem' }}
      />
    </Container>
  )
}
