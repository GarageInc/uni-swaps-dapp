import { Stack } from '@mui/material'
import WarningIcon from 'assets/icons/warning.svg'
import { Button } from 'components/MUI'
import { FC } from 'react'
import styled from 'styled-components'

import BG from './bg.png'

const Icon = styled.img`
  width: 2.3125rem;
  height: 2.3125rem;

  ${({ theme }) => theme.mediaWidth.upToTablet`
    width: 1.75rem;
    height: 1.75rem;
  `};
`

const RowStyled = styled.div`
  display: flex;
  padding: 1.5rem;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  align-self: stretch;
  border-radius: 1.5rem;
  background: ${({ theme }) => theme.lightRed} url(${BG}) 0px 0px / 100% 100% no-repeat;
  position: relative;

  ${({ theme }) => theme.mediaWidth.upToTablet`
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem;
  `};
`

const Text = styled.div`
  font-size: 1.375rem;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;

  ${({ theme }) => theme.mediaWidth.upToTablet`
    font-size: 1.125rem;
    line-height: 120%; /* 1.35rem */
  `};
`

const RedButton = styled(Button)`
  background-color: ${({ theme }) => theme.red};
  color: ${({ theme }) => theme.white};

  &:hover {
    background-color: ${({ theme }) => theme.red};
  }

  ${({ theme }) => theme.mediaWidth.upToTablet`
    width: 100%;
  `};
`

type Props = {
  text: string
  buttonText: string
  onClick: () => void
  style?: React.CSSProperties
}

export const WarningBanner: FC<Props> = ({ style, text, buttonText, onClick }) => {
  return (
    <RowStyled style={style}>
      <Stack direction="row" alignItems="center" gap="1rem">
        <Icon src={WarningIcon} alt="warning" />
        <Text>{text}</Text>
      </Stack>

      <RedButton onClick={onClick}>
        <Text>{buttonText}</Text>
      </RedButton>
    </RowStyled>
  )
}
