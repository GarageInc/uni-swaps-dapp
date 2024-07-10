import { darken } from 'polished'
import { Button as RebassButton, ButtonProps as ButtonPropsOriginal } from 'rebass/styled-components'
import styled from 'styled-components'

type ButtonProps = Omit<ButtonPropsOriginal, 'css'>

const Base = styled(RebassButton)<
  {
    padding?: string
    width?: string
    $borderRadius?: string
    altDisabledStyle?: boolean
  } & ButtonProps
>`
  font-size: 20px;
  line-height: 1;
  padding: ${({ padding }) => padding ?? '11px 16px'};
  width: ${({ width }) => width ?? '100%'};
  font-weight: 500;
  text-align: center;
  border-radius: ${({ $borderRadius }) => $borderRadius ?? '24px'};
  outline: none;
  border: 1px solid transparent;
  color: white;
  text-decoration: none;
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  align-items: center;
  cursor: pointer;
  position: relative;
  z-index: 1;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  will-change: transform;
  transition: all 450ms ease;
  transform: perspective(1px) translateZ(0);

  > * {
    user-select: none;
  }

  > a {
    text-decoration: none;
  }

  ${({ theme }) => theme.mediaWidth.upToExtraLarge`
    font-size: 25px;
  `};

  ${({ theme }) => theme.mediaWidth.upToLarge`
    font-size: 18px;
  `};

  ${({ theme }) => theme.mediaWidth.upToMedium`
    font-size: 15px;
    padding: 13px 18px;
  `};

  ${({ theme }) => theme.mediaWidth.upToTablet`
    font-size: 17px;
  `};

  ${({ theme }) => theme.mediaWidth.upToSmall`
    font-size: 16px;
  `};

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    font-size: 16px;
  `};
`

export const ButtonPrimary = styled(Base)`
  background-color: ${({ theme }) => theme.darkOrange};
  color: ${({ theme }) => theme.white};
  font-weight: 500;
  height: 44px;

  &:focus {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.05, theme.darkOrange)};
    background-color: ${({ theme }) => darken(0.05, theme.darkOrange)};
  }
  &:hover {
    background-color: ${({ theme }) => darken(0.05, theme.darkOrange)};
  }
  &:active {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.1, theme.darkOrange)};
    background-color: ${({ theme }) => darken(0.1, theme.darkOrange)};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.darkOrange15};
    color: ${({ theme }) => theme.darkOrange35};
  }
`

export const ButtonDarkOrange = styled(Base)`
  background-color: ${({ theme }) => theme.darkOrange15};
  color: ${({ theme }) => theme.darkOrange};
  font-weight: 500;
  height: 44px;

  &:focus {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.05, theme.darkOrange)};
    background-color: ${({ theme }) => darken(0.05, theme.darkOrange)};
  }
  &:hover {
    background-color: ${({ theme }) => darken(0.05, theme.darkOrange)};
    color: ${({ theme }) => theme.white};
  }
  &:active {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.1, theme.darkOrange)};
    background-color: ${({ theme }) => darken(0.1, theme.darkOrange)};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.dark04};
    color: ${({ theme }) => theme.dark30};
  }
`

export const ButtonViolet = styled(Base)`
  background-color: ${({ theme }) => theme.appViolet};
  color: ${({ theme }) => theme.light};
  font-weight: 500;
  height: 44px;

  &:focus {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.05, theme.appViolet)};
    background-color: ${({ theme }) => darken(0.05, theme.appViolet)};
  }
  &:hover {
    background-color: ${({ theme }) => darken(0.05, theme.appViolet)};
    color: ${({ theme }) => theme.white};
  }
  &:active {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.1, theme.appViolet)};
    background-color: ${({ theme }) => darken(0.1, theme.appViolet)};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.dark04};
    color: ${({ theme }) => theme.dark30};
  }
`

export const ButtonOrange = styled(Base)`
  background-color: ${({ theme }) => theme.orange15};
  color: ${({ theme }) => theme.orange};
  font-weight: 500;
  height: 44px;

  &:focus {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.05, theme.orange)};
    background-color: ${({ theme }) => darken(0.05, theme.orange)};
  }
  &:hover {
    background-color: ${({ theme }) => darken(0.05, theme.orange)};
    color: ${({ theme }) => theme.white};
  }
  &:active {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.1, theme.orange)};
    background-color: ${({ theme }) => darken(0.1, theme.orange)};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.dark04};
    color: ${({ theme }) => theme.dark30};
  }
`

const ButtonPrimaryRed = styled(Base)`
  transition: background-color 0.3s;
  background-color: #f64562;
  color: ${({ theme }) => theme.text1};
  border-radius: 50px;
  width: auto;
  padding: 15px 25px;

  &:focus {
    background-color: #f64562;
    color: ${({ theme }) => theme.white};
  }
  &:hover {
    background-color: #f64562;
    color: ${({ theme }) => theme.white};
  }
  &:active {
    background-color: #f64562;
    color: ${({ theme }) => theme.white};
  }
`

export const ButtonEmpty = styled(Base)`
  background-color: transparent;
  color: ${({ theme }) => theme.primary1};
  display: flex;
  justify-content: center;
  align-items: center;

  &:focus {
    text-decoration: none;
  }
  &:hover {
    text-decoration: none;
  }
  &:active {
    text-decoration: none;
  }
`

export const ButtonRedStyle = styled(Base)<{
  padding?: string
}>`
  padding: ${({ padding }) => padding ?? '25px'};
  background-color: ${({ theme }) => theme.error};
  border: 1px solid ${({ theme }) => theme.error};
  width: initial;

  &:focus {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.05, theme.red)};
    background-color: ${({ theme }) => darken(0.05, theme.red)};
  }
  &:hover {
    background-color: ${({ theme }) => darken(0.05, theme.red)};
  }
  &:active {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.1, theme.red)};
    background-color: ${({ theme }) => darken(0.1, theme.red)};
  }
`
export const ButtonMainStyle = styled(Base)<{
  padding?: string
}>`
  background-color: ${({ theme }) => theme.main};
  border: 1px solid ${({ theme }) => theme.main};
  width: initial;

  &:focus {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.05, theme.main)};
    background-color: ${({ theme }) => darken(0.05, theme.main)};
  }
  &:hover {
    background-color: ${({ theme }) => darken(0.05, theme.main)};
  }
  &:active {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.1, theme.main)};
    background-color: ${({ theme }) => darken(0.1, theme.main)};
  }
`

export const ButtonGreenStyle = styled(Base)<{
  padding?: string
}>`
  background-color: ${({ theme }) => theme.green};
  border: 1px solid ${({ theme }) => theme.green};
  width: initial;

  &:focus {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.05, theme.green)};
    background-color: ${({ theme }) => darken(0.05, theme.green)};
  }
  &:hover {
    background-color: ${({ theme }) => darken(0.05, theme.green)};
  }
  &:active {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.1, theme.green)};
    background-color: ${({ theme }) => darken(0.1, theme.green)};
  }
`

export function BtnApprovTx({ ...rest }: { active?: boolean } & ButtonProps) {
  return <ButtonPrimary {...rest} />
}

export const ButtonPurple = styled(Base)`
  background-color: ${({ theme }) => theme.fuchsia};
  color: ${({ theme }) => theme.light};
  font-weight: 500;

  &:focus {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.05, theme.fuchsia)};
    background-color: ${({ theme }) => darken(0.05, theme.fuchsia)};
  }
  &:hover {
    background-color: ${({ theme }) => darken(0.05, theme.fuchsia)};
  }
  &:active {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.1, theme.fuchsia)};
    background-color: ${({ theme }) => darken(0.1, theme.fuchsia)};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.dark04};
    color: ${({ theme }) => theme.dark30};
  }
`

export const ButtonDark = styled(Base)`
  background-color: ${({ theme }) => theme.dark};
  color: ${({ theme }) => theme.light};
  font-weight: 500;

  &:focus {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.05, theme.dark)};
    background-color: ${({ theme }) => darken(0.05, theme.dark)};
  }
  &:hover {
    background-color: ${({ theme }) => darken(0.05, theme.dark)};
  }
  &:active {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.1, theme.dark)};
    background-color: ${({ theme }) => darken(0.1, theme.dark)};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.dark04};
    color: ${({ theme }) => theme.dark30};
  }
`
