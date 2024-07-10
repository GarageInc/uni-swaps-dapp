import WarningIcon from 'assets/icons/warning.svg'
import { FC } from 'react'
import styled from 'styled-components'

const Icon = styled.img`
  width: 1.25rem;
  height: 1.25rem;
`

const RowStyled = styled.div`
  display: flex;
  padding: 1.25rem 1rem;
  align-items: flex-start;
  gap: 0.75rem;
  align-self: stretch;
  border-radius: 0.75rem;
  background: ${({ theme }) => theme.lightRed};
`

const Text = styled.p`
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;
  margin: 0;
`

type Props = {
  text: string | JSX.Element
  style?: React.CSSProperties
  className?: string
}

export const WarningBlock: FC<Props> = ({ text, style, className }) => {
  return (
    <RowStyled style={style} className={className}>
      <Icon src={WarningIcon} alt="warning" />
      {typeof text === 'string' ? <Text color="dark80">{text}</Text> : text}
    </RowStyled>
  )
}
