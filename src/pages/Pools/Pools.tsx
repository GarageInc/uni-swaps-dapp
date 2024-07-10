import { IApiPool, IUserPool, useLiquidityPools, useUserPools } from 'api/graphql'
import { CommonLayout, FlexContainer, Table } from 'components'
import { ZERO_ADDRESS } from 'constants/misc'
import { useIsMobileDevice } from 'hooks/useIsMobileDevice'
import { useYandexMetrikaHit } from 'hooks/useYandexMetrika'
import { t } from 'i18next'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ApplicationModal } from 'state/application/actions'
import { useModalOpen } from 'state/application/hooks'
import styled from 'styled-components'

import { AddLiquidityModel, LiquidityContext } from './AddLiquidity'
import { PoolsItem, PoolsItemSkeleton } from './PoolsItem'
import { RemoveLiquidityModel } from './RemoveLiquidity'

const PageWrapper = styled.div`
  flex: 1;
  justify-content: center;
  margin: auto;
  width: 100%;

  display: flex;
`

const Title = styled.h2`
  font-size: 2.8125rem;
  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 3.375rem */
  letter-spacing: -0.02813rem;
  margin: 0;

  ${({ theme }) => theme.mediaWidth.upToTablet`    
  font-size: 2.1875rem;
  letter-spacing: -0.01125rem;
  `}
`

const Main = styled.div`
  margin-top: 5.88rem;
  width: 100%;

  ${({ theme }) => theme.mediaWidth.upToTablet`    
  margin-top: 2.81rem;
  `}
`

const Subtitle = styled.h3`
  font-size: 1.875rem;
  line-height: 120%; /* 2.25rem */
  font-weight: 400;
  letter-spacing: -0.01875rem;
  margin: 0;

  ${({ theme }) => theme.mediaWidth.upToTablet`    
  font-size: 1.5rem;
  font-style: normal;
  letter-spacing: -0.015rem;
  `}
`

export default function Pools() {
  useYandexMetrikaHit()
  const isMobile = useIsMobileDevice()

  const [pair, setPair] = useState<string>('')

  const { list, mapped } = useLiquidityPools()

  const { list: userPools } = useUserPools()

  const openLiquidityAdd = useModalOpen(ApplicationModal.ADD_LIQUIDITY)

  const openLiqudityRemove = useModalOpen(ApplicationModal.REMOVE_LIQUIDITY)

  const propsMemo = useMemo(() => {
    return {
      pair,
      setPair,
    }
  }, [pair, setPair])

  return (
    <LiquidityContext.Provider value={propsMemo}>
      {isMobile ? (
        <MobilePools userPools={userPools} list={list} mapped={mapped} />
      ) : (
        <DesktopPools userPools={userPools} list={list} mapped={mapped} />
      )}

      {pair && pair !== ZERO_ADDRESS && (
        <>
          {openLiquidityAdd && <AddLiquidityModel apr={mapped[pair]?.APR} />}
          {openLiqudityRemove && <RemoveLiquidityModel apr={mapped[pair]?.APR} />}
        </>
      )}
    </LiquidityContext.Provider>
  )
}

function DesktopPools({
  userPools,
  list,
  mapped,
}: {
  userPools: IUserPool[]
  list: IApiPool[]
  mapped: Record<string, IApiPool>
}) {
  const { t } = useTranslation()

  console.log('list', list)
  return (
    <CommonLayout>
      <PageWrapper>
        <Main>
          <Title>{t('pools.title')}</Title>
          {userPools?.length > 0 && list?.length > 0 && (
            <>
              <Subtitle
                style={{
                  marginTop: '2.5rem',
                }}
              >
                {t('pools.myPositions')}
              </Subtitle>
              <Table
                style={{
                  marginTop: '1.5rem',
                }}
              >
                <Table.Head>
                  <Table.Row>
                    <Table.HeadCell>{t('pools.pool')}</Table.HeadCell>
                    <Table.HeadCell
                      style={{
                        textAlign: 'left',
                      }}
                    >
                      {t('Points.balance')}
                    </Table.HeadCell>
                    <Table.HeadCell>{t('pools.tvl')}</Table.HeadCell>
                    <Table.HeadCell>{t('pools.apr')}</Table.HeadCell>
                    <Table.HeadCell>{t('pools.rate')}</Table.HeadCell>
                    <Table.HeadCell>{t('pools.volume24h')}</Table.HeadCell>
                    <Table.HeadCell>{t('pools.volume7d')}</Table.HeadCell>
                  </Table.Row>
                </Table.Head>
                <Table.Body>
                  {list.length === 0 &&
                    Array.from({ length: 4 }).map((_, i) => {
                      return <PoolsItemSkeleton key={i} type="row" />
                    })}
                  {userPools?.map((pool) => {
                    const target = mapped[pool.pair_address]

                    if (!target) return null

                    return <PoolsItem isMy key={target.id} data={target} poolAddress={target.id} type="row" />
                  })}
                </Table.Body>
              </Table>
            </>
          )}

          <Subtitle
            style={{
              marginTop: userPools?.length > 0 && list?.length > 0 ? '4.5rem' : '2.5rem',
            }}
          >
            {t('pools.allPools')}
          </Subtitle>
          <Table
            style={{
              marginTop: '1.5rem',
            }}
          >
            <Table.Head>
              <Table.Row>
                <Table.HeadCell>{t('pools.pool')}</Table.HeadCell>
                <Table.HeadCell>{t('pools.tvl')}</Table.HeadCell>
                <Table.HeadCell>{t('pools.apr')}</Table.HeadCell>
                <Table.HeadCell>{t('pools.rate')}</Table.HeadCell>
                <Table.HeadCell>{t('pools.volume24h')}</Table.HeadCell>
                <Table.HeadCell>{t('pools.volume7d')}</Table.HeadCell>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {list.length === 0 &&
                Array.from({ length: 4 }).map((_, i) => {
                  return <PoolsItemSkeleton key={i} type="row" withBalance={false} />
                })}
              {list?.map((pool) => (
                <PoolsItem withBalance={false} key={pool.id} data={pool} poolAddress={pool.id} type="row" />
              ))}
            </Table.Body>
          </Table>
        </Main>
      </PageWrapper>
    </CommonLayout>
  )
}

function MobilePools({
  userPools,
  list,
  mapped,
}: {
  userPools: IUserPool[]
  list: IApiPool[]
  mapped: Record<string, IApiPool>
}) {
  return (
    <CommonLayout>
      <PageWrapper>
        <Main>
          <Title>{t('pools.title')}</Title>
          {userPools?.length > 0 && list?.length > 0 && (
            <>
              <Subtitle
                style={{
                  marginTop: '1rem',
                }}
              >
                {t('pools.myPositions')}
              </Subtitle>
              <FlexContainer
                style={{
                  marginTop: '1rem',
                  flexDirection: 'column',
                  gap: '0.5rem',
                }}
              >
                {list.length === 0 &&
                  Array.from({ length: 4 }).map((_, i) => {
                    return <PoolsItemSkeleton key={i} type="card" withBalance={false} />
                  })}
                {userPools?.map((pool) => {
                  const target = mapped[pool.pair_address]

                  if (!target) return null

                  return <PoolsItem isMy key={target.id} data={target} poolAddress={target.id} type="card" />
                })}
              </FlexContainer>
            </>
          )}

          <Subtitle
            style={{
              marginTop: '3rem',
            }}
          >
            {t('pools.allPools')}
          </Subtitle>
          <FlexContainer
            style={{
              marginTop: '1rem',
              flexDirection: 'column',
              gap: '0.5rem',
            }}
          >
            {list.length === 0 &&
              Array.from({ length: 4 }).map((_, i) => {
                return <PoolsItemSkeleton key={i} type="card" withBalance={false} />
              })}
            {list?.map((pool) => (
              <PoolsItem withBalance={false} key={pool.id} data={pool} poolAddress={pool.id} type="card" />
            ))}
          </FlexContainer>
        </Main>
      </PageWrapper>
    </CommonLayout>
  )
}
