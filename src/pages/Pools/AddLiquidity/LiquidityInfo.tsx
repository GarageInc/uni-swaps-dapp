import { Row } from 'components'
import Column from 'components/Column'
import { BigNumber } from 'ethers'
import { useTokenAsset } from 'hooks/useTokenAsset'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { ZERO } from 'utils/isZero'
import { formatDecimal } from 'utils/numberWithCommas'

import { CopyAddress } from '../CopyAddress'
import { ILiquidityToken } from '../InfoBox'

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

const Secondary = styled.span`
  color: ${({ theme }) => theme.text60};
`

const CopyAddressStyled = styled(CopyAddress)`
  margin-top: 0 !important;
  margin-left: auto;
`

const Label = styled.span`
  font-size: 16px;
`

export const LiqudityInfo = ({
  lpAddress,
  token0,
  token1,
  amount0 = ZERO,
  amount1 = ZERO,
}: {
  lpAddress: string
  token0: ILiquidityToken
  token1: ILiquidityToken
  amount0?: BigNumber
  amount1?: BigNumber
}) => {
  const token0Asset = useTokenAsset(token0.address)
  const token1Asset = useTokenAsset(token1.address)

  const { t } = useTranslation()

  return (
    <Container>
      <Header>
        <TokensSection>
          <Token>
            <TokenLogo
              src={token0Asset?.icon}
              alt={token0Asset?.symbol || token0Asset?.symbol || token0?.symbol || token0?.address}
            />
            {formatDecimal(amount0, 2, token0.decimals)}
            <span>{token0Asset?.symbol || token0Asset?.symbol || token0?.symbol || token0?.address}</span>
          </Token>

          <Token>
            <TokenLogo
              src={token1Asset?.icon}
              alt={token1Asset?.symbol || token1Asset?.symbol || token1?.symbol || token1?.address}
            />
            {formatDecimal(amount1, 2, token1.decimals)}
            <span>{token1Asset?.symbol || token1Asset?.symbol || token1?.symbol || token1?.address}</span>
          </Token>
        </TokensSection>
      </Header>

      <Column mt="16px">
        <Row alignItems="center">
          <span>
            {t('pools.lpAddress')} <Secondary>{t('pools.poolAddress')}</Secondary>
          </span>
          <CopyAddressStyled address={lpAddress} />
        </Row>
      </Column>
    </Container>
  )
}

export const RemoveLiqudityInfo = ({
  lpAddress,
  token0,
  token1,
  willReceive0 = ZERO,
  willReceive1 = ZERO,
  isPending = true,
}: {
  lpAddress: string
  token0: ILiquidityToken
  token1: ILiquidityToken
  willReceive0?: BigNumber
  willReceive1?: BigNumber
  isPending?: boolean
}) => {
  const { t } = useTranslation()

  const token0Asset = useTokenAsset(token0.address)
  const token1Asset = useTokenAsset(token1.address)

  return (
    <Container>
      <Header>
        <TokensSection>
          <Label>{isPending ? t('pools.willReceive') : t('pools.received')}</Label>

          <Token>
            <TokenLogo
              src={token0Asset?.icon}
              alt={token0Asset?.symbol || token0Asset?.symbol || token0?.symbol || token0?.address}
            />
            {formatDecimal(willReceive0, 2, token0.decimals)}
          </Token>

          <Token>
            <TokenLogo
              src={token1Asset?.icon}
              alt={token1Asset?.symbol || token1Asset?.symbol || token1?.symbol || token1?.address}
            />
            {formatDecimal(willReceive1, 2, token1.decimals)}
          </Token>
        </TokensSection>
      </Header>

      <Column mt="16px">
        <Row alignItems="center">
          <span>
            {t('pools.lpAddress')} <Secondary>{t('pools.poolAddress')}</Secondary>
          </span>
          <CopyAddressStyled address={lpAddress} />
        </Row>
      </Column>
    </Container>
  )
}
