import { BigNumber } from 'ethers'
import { useTokenBalance } from 'hooks/base/token'
import { useTotalSupplyToken } from 'hooks/useTotalSupply'
import { useReserves } from 'pages/Swap/utils'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { ZERO } from 'utils/isZero'
import { formatDecimal } from 'utils/numberWithCommas'

const Row = styled.div<{ danger?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  width: 100%;

  color: ${({ danger, theme }) => (danger ? theme.red : theme.text100)};
  font-weight: ${({ danger }) => (danger ? 700 : 400)};
`

const GreyText = styled.span`
  color: ${({ theme }) => theme.text40};
`

const InfoBoxContainer = styled.div`
  border-radius: 0.75rem;
  border: 1px solid ${({ theme }) => theme.divStroke};
  background: ${({ theme }) => theme.white};
  padding: 1.25rem 1rem;
`

interface IToken {
  tokenAmount: string
  usdAmount: string
  tokenSymbol: string
  staked?: string
  stakedInUsd?: string
}

export interface ILiquidityToken {
  address: string
  name: string
  symbol: string
  decimals: number
}

export interface ILiquidityResults {
  locked0: BigNumber
  locked1: BigNumber
  willReceive0: BigNumber
  willReceive1: BigNumber
  reserves0: BigNumber
  reserves1: BigNumber
}

export const useLockedInPool = (
  pair: string,
  token0: string,
  token1: string,
  amountInput: BigNumber
): ILiquidityResults => {
  const balance = useTokenBalance(pair)

  const totalSupply = useTotalSupplyToken(pair)

  const { mapped } = useReserves(pair)

  return useMemo(() => {
    if (
      !totalSupply ||
      !mapped ||
      !mapped[token0.toLowerCase()] ||
      !mapped[token1.toLowerCase()] ||
      totalSupply.isZero()
    ) {
      return {
        locked0: ZERO,
        locked1: ZERO,
        reserves0: ZERO,
        reserves1: ZERO,
        willReceive0: ZERO,
        willReceive1: ZERO,
      }
    }

    const reserves0 = mapped[token0.toLowerCase()] || ZERO
    const reserves1 = mapped[token1.toLowerCase()] || ZERO

    return {
      locked0: reserves0?.mul(balance)?.div(totalSupply),
      locked1: reserves1?.mul(balance)?.div(totalSupply),
      willReceive0: reserves0?.mul(amountInput)?.div(totalSupply),
      willReceive1: reserves1?.mul(amountInput)?.div(totalSupply),
      reserves0,
      reserves1,
    }
  }, [balance, amountInput, totalSupply, mapped, token0, token1])
}

export const AddLiquidityInfo = ({
  data,
  token1,
  token2,
  variant = 'remove',
}: {
  data: ILiquidityResults
  token1: ILiquidityToken
  token2: ILiquidityToken
  variant?: 'add' | 'remove'
}) => {
  const { t } = useTranslation()

  const { locked0, locked1, reserves0, reserves1 } = data

  return (
    <InfoBoxContainer>
      <Row
        style={{
          marginBottom: '1rem',
        }}
      >
        <span>{t('pools.liquidity')}</span>
        <span>{t('pools.alreadyStaked')}</span>
      </Row>

      <Row
        style={{
          marginBottom: '.5rem',
        }}
      >
        <span>
          {formatDecimal(reserves0, 2, token1.decimals)} <GreyText> {token1.symbol}</GreyText>
        </span>
        <span>
          {formatDecimal(locked0, 2, token1.decimals)}
          <GreyText> {token1.symbol}</GreyText>
        </span>
      </Row>
      <Row>
        <span>
          {formatDecimal(reserves1, 2, token2.decimals)} <GreyText> {token2.symbol}</GreyText>
        </span>
        <span>
          {formatDecimal(locked1, 2, token2.decimals)}
          <GreyText> {token2.symbol}</GreyText>
        </span>
      </Row>
    </InfoBoxContainer>
  )
}

export const RemoveLiquidityInfo = ({
  data,
  variant = 'remove',
  token1,
  token2,
}: {
  data: ILiquidityResults
  variant?: 'add' | 'remove'
  token1: ILiquidityToken
  token2: ILiquidityToken
}) => {
  return <AddLiquidityInfo token1={token1} token2={token2} data={data} variant="add" />
}

/**
 * 
 * 
      <Row
        style={{
          marginTop: '1rem',
        }}
      >
        <span>
          ${+token1.usdAmount + +token2.usdAmount} <GreyText>Total</GreyText>
        </span>
        <span>
          ${(Number(token1.stakedInUsd ?? 0) + Number(token2.stakedInUsd ?? 0)).toFixed(2)}
          <GreyText> Total</GreyText>
        </span>
      </Row>
 */
