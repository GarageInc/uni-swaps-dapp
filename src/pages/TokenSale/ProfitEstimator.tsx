import { Stack } from '@mui/material'
import { BigNumber } from 'ethers'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { formatDecimal } from 'utils/numberWithCommas'

const Box = styled.div`
  border-radius: 0.75rem;
  border: 1px solid rgba(67, 70, 71, 0.15);
  display: flex;
  padding: 1.5rem 1rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.6875rem;
  align-self: stretch;

  ${({ theme }) => theme.mediaWidth.upToTablet`
    padding: 1.25rem;
  `};
`

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: rgba(67, 70, 71, 0.15);
`

const Text = styled.div`
  color: ${({ theme }) => theme.text40};
  font-feature-settings: 'clig' off, 'liga' off;

  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 1.2rem */
`

const AmountText = styled(Text)`
  color: ${({ theme }) => theme.text100};
  font-size: 1.75rem;
  font-weight: 550;
  letter-spacing: 0.0625rem;

  ${({ theme }) => theme.mediaWidth.upToTablet`
    font-size: 1.5rem;
    position: relative;
    top: 0.125rem;
  `};
`

const Icon = styled.img`
  width: 2rem;
  aspect-ratio: 1;

  ${({ theme }) => theme.mediaWidth.upToTablet`
    width: 1.5rem;
  `};
`

const RefApplied = styled.div`
  display: flex;
  padding: 0.25rem 0.5rem;
  align-items: flex-start;
  gap: 0.5rem;
  border-radius: 0.25rem;
  background: ${({ theme }) => theme.lightGreen};
  color: ${({ theme }) => theme.green};
  font-size: 0.875rem;
  line-height: 120%; /* 1.05rem */
`

const RefBonusAmount = styled.div`
  color: ${({ theme }) => theme.green};
  font-size: 1rem;
  font-weight: 550;
  line-height: 120%; /* 2.4rem */
  letter-spacing: 0.0625rem;
`

export const ProfitEstimator = ({
  tokenIcon,
  tokenVal,
  usdVal,
  isCodeAvailable,
}: {
  tokenIcon: string
  tokenVal: BigNumber
  usdVal: BigNumber
  isCodeAvailable: boolean
}) => {
  const { t } = useTranslation()

  return (
    <Box>
      <Stack direction="column" gap=".75rem">
        <Text>{t('TokenSale.YouContribute')}</Text>
        <Stack direction="row" gap=".75rem" alignItems="center">
          <Icon src={tokenIcon} alt="token" />
          <AmountText>{formatDecimal(tokenVal, 2, 6)}</AmountText>
        </Stack>
      </Stack>
      <Divider />
      <Stack direction="column" gap=".75rem" width="100%">
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Text>{t('TokenSale.YourProfit')}</Text>
          {isCodeAvailable && <RefApplied>{t('referrals.applied')}</RefApplied>}
        </Stack>
        <Stack direction="row" alignItems="flex-start" gap=".5rem">
          <AmountText>${formatDecimal(usdVal, 2, 6)}</AmountText>
          {isCodeAvailable && (
            <RefBonusAmount>+{formatDecimal(usdVal.mul(105).div(100).sub(usdVal), 2, 6)}</RefBonusAmount>
          )}
        </Stack>
      </Stack>
    </Box>
  )
}
