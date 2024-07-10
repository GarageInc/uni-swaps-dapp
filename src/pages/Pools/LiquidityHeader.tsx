import { Stack } from '@mui/material'
import { Suggestion } from 'components'
import { useTokenAsset } from 'hooks/useTokenAsset'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { CopyAddress } from './CopyAddress'
interface ILiquidityHeaderProps {
  token1?: string
  token2?: string
  title: string
  tradingFee?: number
  apr?: number
  poolAddress: string
}

export const LiquidityHeader = ({
  token1,
  token2,
  title,
  tradingFee = 1,
  apr = 20.1,
  poolAddress,
}: ILiquidityHeaderProps) => {
  const token1Data = useTokenAsset(token1)
  const token2Data = useTokenAsset(token2)

  const { t } = useTranslation()

  return (
    <Stack direction="row" gap="1rem" alignItems="flex-start">
      <PairedTokens>
        <img src={token1Data?.icon} alt={token1Data?.symbol} />
        <img src={token2Data?.icon} alt={token2Data?.symbol} />
      </PairedTokens>
      <Stack gap=".38rem">
        <Stack direction="row" gap=".75rem" alignItems="center">
          <Title>{title}</Title>
          <Suggestion size="small">
            <SuggestionContent>
              <SuggestionTitle>{t('pools.poolAddress')}</SuggestionTitle>
              <CopyAddress address={poolAddress} />
            </SuggestionContent>
          </Suggestion>
        </Stack>
        <Stack direction="row" gap=".75rem">
          <TextInfo>
            <span>{t('pools.fee')}</span>
            <span>{tradingFee}%</span>
          </TextInfo>
          <Divider />
          <TextInfo>
            <span>{t('pools.apr')}</span>
            <span>{apr?.toFixed(2)}%</span>
          </TextInfo>
        </Stack>
      </Stack>
    </Stack>
  )
}

const PairedTokens = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 2rem;
    aspect-ratio: 1;
  }

  img:nth-child(2) {
    margin-left: -0.5rem;
  }
`

const Title = styled.h2`
  font-size: 1.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 2.25rem */
  letter-spacing: -0.01875rem;
  margin: 0;
`
const TextInfo = styled.span`
  color: ${({ theme }) => theme.text60};
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 1.2rem */
  display: flex;
  gap: 0.38rem;
`

const Divider = styled.div`
  background: rgba(67, 70, 71, 0.3);
  width: 0.0625rem;
  height: 1rem;
`

const SuggestionTitle = styled.span`
  color: ${({ theme }) => theme.text70};
`

const SuggestionContent = styled.div`
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;
`
