import WarningIcon from 'assets/icons/warning-yellow.svg'
import { FC } from 'react'
import styled from 'styled-components'

const Icon = styled.img`
  width: 1.25rem;
  height: 1.25rem;
`

const RowStyled = styled.div`
  display: flex;
  padding: 1rem 0.75rem;
  align-items: flex-start;
  gap: 0.75rem;
  align-self: stretch;
  border-radius: 0.75rem;
  background: ${({ theme }) => theme.lightOrange};
`

const Text = styled.p`
  font-size: 0.875rem;
  line-height: 110%;
  margin: 0;
`

type Props = {
  text: string | JSX.Element
  style?: React.CSSProperties
}

export const WarningBlock: FC<Props> = ({ text, style }) => {
  return (
    <RowStyled style={style}>
      <Icon src={WarningIcon} alt="warning" />
      {typeof text === 'string' ? <Text color="dark80">{text}</Text> : text}
    </RowStyled>
  )
}
