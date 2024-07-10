import { FlexContainer } from 'components/Flex'
import styled from 'styled-components'

export const Card = styled(FlexContainer)<{ gap?: string }>`
  gap: ${({ gap }) => gap};
  border-radius: 2rem;
  padding: 1rem;
  background-color: ${({ theme }) => theme.white};
  flex-direction: column;
  align-items: stretch;

  ${({ theme }) => theme.mediaWidth.upToTablet`
    border-radius: 1.5rem;
  `};
`

export const GreyCard = styled(FlexContainer)<{
  isInvalid?: boolean
  gap?: string
}>`
  border-radius: 0.75rem;
  padding: 0.75rem;
  background-color: ${({ theme, isInvalid }) => (isInvalid ? theme.red15 : theme.inputDefault)};
  width: 100%;
  gap: ${({ gap }) => gap};
  flex-direction: column;
  align-items: stretch;
`

export const CardCentered = styled(Card)`
  margin: auto;
  width: 100%;
`

export const CardCenteredGap = styled(Card)`
  margin: auto;
  width: 100%;
`
