import iconLp from 'assets/icons/tokens/lp.svg'
import walletSvg from 'assets/icons/wallet.svg'
import { WalletIcon } from 'components/blocks/AmountInput/styles'
import { AutoColumn } from 'components/Column'
import { RowBetween } from 'components/Row'
import { useTokenBalance } from 'hooks/base/token'
import styled from 'styled-components'
import { Color } from 'theme/styled'
import { TYPE } from 'theme/theme'
import { formatDecimal } from 'utils/numberWithCommas'

const Header = styled.div`
  font-weight: 500;
  font-size: 20px;
`

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

export const GetOverview = ({ pair }: { pair: string }) => {
  const balance = useTokenBalance(pair)

  return (
    <>
      <Header>Overview</Header>

      <AutoColumn gap="8px">
        <RowBetweenStyled bgColor="appViolet15">
          <Label>
            <Icon src={iconLp} bgColor="appViolet15" />
            <TYPE.body fontWeight={500} color="appViolet">
              Liquidity pool balance
            </TYPE.body>
          </Label>

          <Value>
            <WalletIcon src={walletSvg} />

            <TYPE.body fontWeight={500} color="appViolet">
              {formatDecimal(balance)}
            </TYPE.body>
          </Value>
        </RowBetweenStyled>
      </AutoColumn>
    </>
  )
}
