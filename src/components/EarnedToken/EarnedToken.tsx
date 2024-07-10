import wethSvg from 'assets/icons/tokens/weth.svg'
import Loading from 'components/Loading'
import { RowBetween } from 'components/Row'
import { BigNumber } from 'ethers'
import { FC, ReactNode } from 'react'
import styled from 'styled-components'
import { Color, ThemeColors } from 'theme/styled'
import { TYPE } from 'theme/theme'
import { ZERO } from 'utils/isZero'
import { formatDecimal } from 'utils/numberWithCommas'

const Label = styled.div`
  display: flex;
  align-items: center;
`

const Value = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`

const Icon = styled.img<{ bgColor: Color }>`
  background-color: ${({ bgColor, theme }) => (bgColor in theme ? (theme as any)[bgColor] : theme.bg1)};
  width: 22px;
  height: 22px;
  margin-right: 4px;
  border-radius: 50%;
`

const RowBetweenStyled = styled(RowBetween)<{ bgColor: Color }>`
  background-color: ${({ bgColor, theme }) => (bgColor in theme ? (theme as any)[bgColor] : theme.bg1)};
  padding: 8px 12px;
  border-radius: 24px;
  height: 44px;
`

type Props = {
  bgColor?: ThemeColors
  icon?: string
  iconBgColor?: ThemeColors
  label?: string
  labelColor?: ThemeColors
  isLoading?: boolean
  amount?: BigNumber
  amountTail?: ReactNode
}

const EarnedToken: FC<Props> = ({
  bgColor = 'dark06',
  icon = wethSvg,
  iconBgColor = 'appViolet15',
  label = 'WETH',
  labelColor = 'appViolet',
  isLoading = false,
  amount = ZERO,
  amountTail,
}) => {
  return (
    <RowBetweenStyled bgColor={bgColor}>
      <Label>
        <Icon src={icon} bgColor={iconBgColor} />
        <TYPE.body fontWeight={500} color={labelColor}>
          {label}
        </TYPE.body>
      </Label>

      <Value>
        <TYPE.body fontWeight={500} color={labelColor}>
          <Loading loading={isLoading}>{formatDecimal(amount)}</Loading>
        </TYPE.body>
        {amountTail}
      </Value>
    </RowBetweenStyled>
  )
}

export default EarnedToken
