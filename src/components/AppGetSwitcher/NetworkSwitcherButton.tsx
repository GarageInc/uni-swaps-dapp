import clsx from 'clsx'
import { ButtonEmpty } from 'components/Button'
import { ReactElement, ReactNode } from 'react'
import styled from 'styled-components'
import { ThemeColors } from 'theme/styled'
import { TYPE } from 'theme/theme'

export type NetworkButtonColor = 'green' | 'main' | 'appViolet'

type Props = {
  label: string
  icon: (color?: ThemeColors) => ReactElement
  tail?: ReactNode
  color?: NetworkButtonColor
  isSelected?: boolean
  isDisabled?: boolean
}

const NetworkSwitcherButton = ({
  label,
  icon,
  color = 'main',
  tail = 'from',
  isSelected = false,
  isDisabled = false,
}: Props) => {
  return (
    <ButtonStyled color={color} className={clsx({ isSelected, isDisabled })}>
      {icon(color)}

      <TYPE.body
        fontWeight={500}
        color={color}
        margin="0 9px 0 6px"
        className={clsx({ isDisabledTextColor: isDisabled })}
      >
        {label}
      </TYPE.body>

      <TYPE.body
        fontWeight={500}
        color={`${color}50`}
        marginLeft="auto"
        className={clsx({ isDisabledTextColor: isDisabled })}
      >
        {tail}
      </TYPE.body>
    </ButtonStyled>
  )
}

const ButtonStyled = styled(ButtonEmpty)<{ color: NetworkButtonColor }>`
  width: auto;
  background-color: ${({ theme, color }) => theme[`${color}15`]};
  border: none;
  padding: 10px 12px;
  border-radius: 24px;
  height: 100%;

  .MuiOutlinedInput-notchedOutline {
    border-width: 0;
  }

  &.isDisabled {
    background-color: ${({ theme }) => theme.dark04};
    cursor: auto;

    .isDisabledTextColor {
      color: ${({ theme, color }) => theme[`${color}35`]};
    }
  }

  &.isSelected {
    background-color: ${({ theme, color }) => theme[`${color}35`]};
  }

  :hover {
    background-color: ${({ theme, color }) => theme[`${color}35`]};

    &.isDisabled {
      background-color: ${({ theme }) => theme.dark04};

      .isDisabledTextColor {
        color: ${({ theme, color }) => theme[`${color}35`]};
      }
    }

    &.isSelected {
      background-color: ${({ theme, color }) => theme[`${color}35`]};
    }
  }
`

export default NetworkSwitcherButton
