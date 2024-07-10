import { Box, Stack } from '@mui/material'
import ExpandIcon from 'components/icons/arrow-down'
import ExpandedIcon from 'components/icons/arrow-up'
import CheckIcon from 'components/icons/check'
import { Menu } from 'components/MUI'
import { Row, RowGapped } from 'components/Row'
import styled from 'styled-components'
import { ThemeColors } from 'theme/styled'
import { TYPE } from 'theme/theme'

interface IOption {
  id: string
  label: string
}

interface IProps {
  selected: IOption
  options: IOption[]
  onChange: (o: IOption) => void
}

const Trigger = styled.div`
  background-color: ${({ theme }) => theme.dark06};
  width: 100%;
  border-radius: 24px;
  color: ${({ theme }) => theme.dark};
  padding: 10px 16px;
  display: flex;
  justify-content: space-between;
`

const AppMenu = ({ selected, options, onChange }: IProps) => {
  const { label } = selected

  return (
    <Menu
      trigger={({ isOpened }: { isOpened: boolean }) => (
        <Trigger>
          <TYPE.body fontWeight={500} margin="0 9px 0 6px">
            {label}
          </TYPE.body>

          <Box width="16px" height="16px">
            {isOpened ? <ExpandedIcon color="dark" /> : <ExpandIcon color="dark" />}
          </Box>
        </Trigger>
      )}
      isChildrenCloseMenu
    >
      <Stack>
        {options.map((item, index) => {
          const { label, id } = item
          return (
            <OptionStyled
              key={`${label}_${index}`}
              onClick={() => {
                onChange(item)
              }}
            >
              <RowGapped justify="space-between" gap="9px">
                <RowGapped gap="6px">
                  <TYPE.body fontWeight={500} color="dark">
                    {label}
                  </TYPE.body>
                </RowGapped>

                {selected.id === id && (
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

export default AppMenu
