import { Box, Stack } from '@mui/material'
import NetworkSwitcherButton, { NetworkButtonColor } from 'components/AppGetSwitcher/NetworkSwitcherButton'
import CheckIcon from 'components/icons/check'
import { Menu } from 'components/MUI'
import { Row, RowGapped } from 'components/Row'
import { SupportedChainId } from 'constants/chainsinfo'
import { ReactElement } from 'react'
import styled from 'styled-components'
import { ThemeColors } from 'theme/styled'
import { TYPE } from 'theme/theme'

export interface ChainInfo {
  from: number
  icon: (color?: ThemeColors) => ReactElement
  toChain: number
  label: string
}

interface IProps {
  color?: NetworkButtonColor
  selected: ChainInfo
  options: ChainInfo[]
  tail?: string
  onChange: (from: SupportedChainId) => void
}

const NetworkSwitcher = ({ color = 'main', selected, options, tail = 'from', onChange }: IProps) => {
  if (!selected) return null

  const { label, icon } = selected

  const Trigger = () => <NetworkSwitcherButton label={label} icon={icon} color={color} tail={tail} isSelected />

  return (
    <Menu trigger={Trigger} isChildrenCloseMenu>
      <Stack>
        {options.map(({ label, from, toChain, icon }, index) => {
          return (
            <OptionStyled
              key={`${label}_${index}`}
              onClick={() => {
                onChange(from)
              }}
            >
              <RowGapped justify="space-between" gap="9px">
                <RowGapped gap="6px">
                  {icon('dark')}

                  <TYPE.body fontWeight={500} color="dark">
                    {label}
                  </TYPE.body>
                </RowGapped>

                {selected.from === from && (
                  <Box width="16px" height="16px">
                    <CheckIcon color="dark" />
                  </Box>
                )}
              </RowGapped>
            </OptionStyled>
          )
        })}
      </Stack>
    </Menu>
  )
}

const OptionStyled = styled(Row)<{ color?: ThemeColors; isDisabled?: boolean }>`
  padding: 12px;
  align-items: center;
  border-radius: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  :hover {
    background-color: ${({ theme }) => theme.dark04};
  }
`

export default NetworkSwitcher
