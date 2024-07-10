import { Skeleton, SkeletonOwnProps, Stack } from '@mui/material'
import { IApiPool } from 'api/graphql'
import { FlexContainer, Table } from 'components'
import { useTokenBalance, useTokenDecimals } from 'hooks/base/token'
import { useTokenAsset } from 'hooks/useTokenAsset'
import { useTotalSupplyToken } from 'hooks/useTotalSupply'
import { t } from 'i18next'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled, { CSSObject } from 'styled-components'
import { ZERO } from 'utils/isZero'
import { formatDecimal, formatNumber } from 'utils/numberWithCommas'

import { AddLiquidity } from './AddLiquidity'
import { useLockedInPool } from './InfoBox'
import { RemoveLiquidity } from './RemoveLiquidity'

export const PoolsItem = ({
  data,
  poolAddress,
  type,
  withBalance = true,
  isMy = false,
}: {
  data: IApiPool
  poolAddress: string
  type: 'row' | 'card'
  withBalance?: boolean
  isMy?: boolean
}) => {
  const { t } = useTranslation()

  const token0Data = useTokenAsset(data.token0)
  const token1Data = useTokenAsset(data.token1)

  const decimals0 = useTokenDecimals(data.token0)
  const decimals1 = useTokenDecimals(data.token1)

  const [isHovered, setIsHovered] = useState(false)

  const { locked0, locked1 } = useLockedInPool(data.id, data.token0, data.token1, ZERO)

  const APR = data.APR,
    TVL = data.TVL,
    volume_24h = data.volume_24h,
    volume_7d = data.volume_7d

  const rate = useMemo(() => {
    const reserves0 = +data.reserve0
    const reserves1 = +data.reserve1

    if (!reserves0) return 0

    return reserves1 / reserves0
  }, [data])

  const totalSupply = useTotalSupplyToken(data.id) || ZERO
  const balance = useTokenBalance(data.id) || ZERO

  const hideRemove = !balance || balance.isZero()

  if (type === 'card') {
    return (
      <PoolCardContainer>
        <Stack direction="row" alignItems="center" gap="1rem">
          <Stack direction="row" alignItems="center" fontSize="1.25rem" whiteSpace="nowrap">
            <PairedTokens additionalStyles={{ marginRight: '0.5rem' }}>
              <img src={token0Data?.icon} alt={data.token0} style={{ width: '1.5rem' }} />
              <img src={token1Data?.icon} alt={data.token1} style={{ marginLeft: '-0.38rem', width: '1.5rem' }} />
            </PairedTokens>
            {token0Data?.symbol} / {token1Data?.symbol}
          </Stack>

          <AprContainer>
            <span>{t('pools.apr')}</span>
            <span>{+APR?.toFixed(2)}%</span>
          </AprContainer>
        </Stack>

        <GridContainer>
          {withBalance && (
            <>
              <CardRowTitle>{t('pools.balance')}</CardRowTitle>
              <div>{formatDecimal(isMy ? balance : totalSupply)} LP</div>
            </>
          )}
          <CardRowTitle>{t('pools.tvl')}</CardRowTitle>

          <div>${formatNumber(TVL, 2, true)}</div>

          <CardRowTitle>{t('pools.rate')}</CardRowTitle>

          <Stack gap=".25rem" direction="row" alignItems="center">
            <span>1</span>
            <img src={token0Data?.icon} alt={data.token0} style={{ width: '1rem' }} />
            <span>=</span>
            <span>{rate.toFixed(2)}</span>
            <img src={token1Data?.icon} alt={data.token1} style={{ width: '1rem' }} />
          </Stack>

          <CardRowTitle>{t('pools.volume24h')}</CardRowTitle>
          <div>${formatNumber(volume_24h, 2, true)}</div>
          <CardRowTitle>{t('pools.volume7d')}</CardRowTitle>
          <div>${formatNumber(volume_7d, 2, true)}</div>
        </GridContainer>
        <Stack gap=".5rem" width="100%">
          <AddLiquidity pair={poolAddress} />
          {!hideRemove && <RemoveLiquidity pair={poolAddress} />}
        </Stack>
      </PoolCardContainer>
    )
  }

  return (
    <StyledRow onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <Cell>
        <Stack direction="row" alignItems="center">
          <PairedTokens>
            <img src={token0Data?.icon} alt={data.token0} />
            <img src={token1Data?.icon} alt={data.token1} />
          </PairedTokens>
          {token0Data?.symbol} / {token1Data?.symbol}
        </Stack>
      </Cell>

      {withBalance && (
        <Cell
          style={{
            textAlign: 'left',
          }}
        >
          {formatDecimal(isMy ? balance : totalSupply)} LP
          <br />
          <Stack gap=".25rem" mt=".37rem">
            <SmallText>
              {t('pools.allocated')} {formatDecimal(locked0, 2, decimals0)} {token0Data?.symbol} <br />
            </SmallText>
            <SmallText>
              {t('pools.allocated')} {formatDecimal(locked1, 2, decimals1)} {token1Data?.symbol}
            </SmallText>
          </Stack>
        </Cell>
      )}
      <Cell>${formatNumber(TVL, 2, true)}</Cell>
      <Cell>{+APR?.toFixed(2)}%</Cell>
      <Cell>
        <Stack gap=".5rem" direction="row" alignItems="center" justifyContent="flex-end">
          <Stack direction="row" gap=".25rem" alignItems="center">
            <span>1</span>
            <img src={token0Data?.icon} alt={data.token0} style={{ width: '1.75rem' }} />
          </Stack>
          <span>=</span>
          <Stack direction="row" gap=".25rem" alignItems="center">
            <span>{rate.toFixed(2)}</span>
            <img src={token1Data?.icon} alt={data.token1} style={{ width: '1.75rem' }} />
          </Stack>
        </Stack>
      </Cell>

      {isHovered && !hideRemove && (
        <>
          <Cell
            style={{
              width: '16rem',
              display: isHovered ? undefined : 'none',
            }}
          >
            <FlexContainer style={{ minHeight: '6.5rem', justifyContent: 'flex-end' }}>
              <AddLiquidity pair={poolAddress} />
            </FlexContainer>
          </Cell>
          <Cell
            style={{
              width: '16rem',
              display: isHovered ? undefined : 'none',
              borderRadius: '0 1.5rem 1.5rem 0',
            }}
          >
            <FlexContainer style={{ minHeight: '6.5rem', justifyContent: 'flex-end' }}>
              <RemoveLiquidity pair={poolAddress} />
            </FlexContainer>
          </Cell>
        </>
      )}
      {isHovered && hideRemove && (
        <>
          <Cell />
          <Cell
            style={{
              width: '16rem',
              display: isHovered ? undefined : 'none',
              borderRadius: '0 1.5rem 1.5rem 0',
            }}
          >
            <FlexContainer style={{ minHeight: '6.5rem', justifyContent: 'flex-end' }}>
              <AddLiquidity pair={poolAddress} />
            </FlexContainer>
          </Cell>
        </>
      )}
      {!isHovered && (
        <>
          <Cell
            style={{
              width: '16rem',
              display: isHovered ? 'none' : undefined,
            }}
          >
            <FlexContainer style={{ minHeight: '6.5rem', justifyContent: 'flex-end' }}>
              ${formatNumber(volume_24h, 2, true)}
            </FlexContainer>
          </Cell>
          <Cell
            style={{
              width: '16rem',
              display: isHovered ? 'none' : undefined,
            }}
          >
            <FlexContainer style={{ minHeight: '6.5rem', justifyContent: 'flex-end' }}>
              ${formatNumber(volume_7d, 2, true)}
            </FlexContainer>
          </Cell>
        </>
      )}
    </StyledRow>
  )
}

const Cell = styled(Table.Cell)`
  font-size: 1.375rem;
  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 1.65rem */
`

const SmallText = styled.span`
  color: ${({ theme }) => theme.text50};
  font-size: 1rem;
  font-weight: 400;
  line-height: 120%; /* 1.2rem */
`

const PairedTokens = styled.div<{ additionalStyles?: CSSObject }>`
  display: flex;
  align-items: center;
  margin-right: 1.25rem;

  img {
    width: 2rem;
    aspect-ratio: 1;
  }

  img:nth-child(2) {
    margin-left: -0.25rem;
  }

  ${({ additionalStyles }) => additionalStyles}
`
const StyledRow = styled(Table.Row)`
  :hover td {
    background: transparent;
  }
`

const PoolCardContainer = styled(FlexContainer)`
  padding: 1.25rem 1rem;
  flex-direction: column;
  gap: 1.25rem;
  border-radius: 1rem;
  background: #fff;
  align-items: flex-start;
`

const AprContainer = styled(FlexContainer)`
  padding: 0.5rem 0.5rem 0.375rem 0.5rem;
  align-items: center;
  gap: 0.25rem;
  width: fit-content;
  border-radius: 0.5rem;
  border: 1px solid var(--Div-Stroke, #d8ecff);
`
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, auto);
  gap: 1rem;
  margin-top: 1.25rem;
  align-items: center;

  ${({ theme }) => theme.mediaWidth.upToTablet`
    margin-top: 0;
  `};
`
const CardRowTitle = styled.div`
  color: ${({ theme }) => theme.text60};
  font-feature-settings: 'clig' off, 'liga' off;

  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 110%; /* 0.9625rem */
`

const BaseSkeleton = ({ sx, variant = 'rounded', ...props }: SkeletonOwnProps & { style?: React.CSSProperties }) => {
  return <Skeleton variant={variant} sx={{ fontSize: '1rem', bgcolor: 'grey.100', ...sx }} {...props} />
}
export const PoolsItemSkeleton = ({ type, withBalance = true }: { type: 'row' | 'card'; withBalance?: boolean }) => {
  if (type === 'card') {
    return (
      <PoolCardContainer>
        <FlexContainer>
          <Stack direction="row" alignItems="center" fontSize="1.25rem" whiteSpace="nowrap">
            <PairedTokens>
              <BaseSkeleton width="2rem" height="2rem" variant="circular" />
              <BaseSkeleton width="2rem" height="2rem" variant="circular" style={{ marginLeft: '-0.5rem' }} />
            </PairedTokens>
            <BaseSkeleton width="3rem" variant="text" style={{ fontSize: '2rem', marginLeft: '-0.5rem' }} />
            <span style={{ margin: '0 0.5rem' }}>/</span>
            <BaseSkeleton width="3rem" variant="text" style={{ fontSize: '2rem', display: 'inline-block' }} />
          </Stack>

          <AprContainer>
            APR <BaseSkeleton variant="rounded" width="1.5rem" />%
          </AprContainer>
        </FlexContainer>

        <GridContainer>
          {withBalance && (
            <>
              <CardRowTitle>{t('pools.balance')}</CardRowTitle>
              <BaseSkeleton />
            </>
          )}
          <CardRowTitle>{t('pools.tvl')}</CardRowTitle>

          <BaseSkeleton />

          <CardRowTitle>{t('pools.rate')}</CardRowTitle>

          <Stack gap=".25rem" direction="row" alignItems="center">
            <span>1</span>
            <BaseSkeleton variant="circular" width="1rem" height="1rem" />
            <span>=</span>
            <BaseSkeleton width="1rem" variant="rounded" height="1rem" />
            <BaseSkeleton variant="circular" width="1rem" height="1rem" />
          </Stack>

          <CardRowTitle>{t('pools.volume24h')}</CardRowTitle>
          <BaseSkeleton variant="rounded" width="5rem" />
          <CardRowTitle>{t('pools.volume7d')}</CardRowTitle>
          <BaseSkeleton variant="rounded" width="5rem" />
        </GridContainer>
      </PoolCardContainer>
    )
  }

  return (
    <StyledRow>
      <Cell>
        <Stack direction="row" alignItems="center">
          <PairedTokens>
            <BaseSkeleton width="2rem" height="2rem" variant="circular" />
            <BaseSkeleton width="2rem" height="2rem" variant="circular" style={{ marginLeft: '-0.5rem' }} />
          </PairedTokens>
          <BaseSkeleton width="3.5rem" height="2rem" variant="text" style={{ display: 'inline-block' }} />
          <span style={{ margin: '0 0.5rem' }}>/</span>
          <BaseSkeleton width="3.5rem" height="2rem" variant="text" style={{ display: 'inline-block' }} />
        </Stack>
      </Cell>

      {withBalance && (
        <Cell
          style={{
            textAlign: 'left',
          }}
        >
          <BaseSkeleton width="5rem" height="1.5rem" />
          <Stack gap=".25rem" mt=".37rem">
            <SmallText>
              {t('pools.allocated')}{' '}
              <BaseSkeleton
                width="4.5rem"
                height="1.5rem"
                sx={{ fontSize: '1.5rem' }}
                variant="text"
                style={{ display: 'inline-block' }}
              />{' '}
              <br />
            </SmallText>
            <SmallText>
              {t('pools.allocated')}{' '}
              <BaseSkeleton
                width="4.5rem"
                height="1.5rem"
                sx={{ fontSize: '1.5rem' }}
                variant="text"
                style={{ display: 'inline-block' }}
              />
            </SmallText>
          </Stack>
        </Cell>
      )}
      <Cell>
        <BaseSkeleton sx={{ fontSize: '1.5rem' }} />
      </Cell>
      <Cell>
        <BaseSkeleton sx={{ fontSize: '1.5rem' }} />
      </Cell>
      <Cell>
        <Stack gap=".5rem" direction="row" alignItems="center">
          <Stack direction="row" gap=".25rem" alignItems="center">
            <span>1</span>
            <BaseSkeleton width="2rem" height="2rem" variant="circular" />
          </Stack>
          <span>=</span>
          <Stack direction="row" gap=".25rem" alignItems="center">
            <BaseSkeleton width="1rem" variant="rounded" height="2rem" />
            <BaseSkeleton width="2rem" height="2rem" variant="circular" />
          </Stack>
        </Stack>
      </Cell>
      <Cell>
        <FlexContainer style={{ minHeight: '6.5rem', justifyContent: 'flex-end' }}>
          <BaseSkeleton width="6rem" sx={{ fontSize: '1.5rem' }} />
        </FlexContainer>
      </Cell>
      <Cell>
        <FlexContainer style={{ minHeight: '6.5rem', justifyContent: 'flex-end' }}>
          <BaseSkeleton width="6rem" sx={{ fontSize: '1.5rem' }} />
        </FlexContainer>
      </Cell>
    </StyledRow>
  )
}
