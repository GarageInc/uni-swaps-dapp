import styled, { CSSObject } from 'styled-components'

export const FlexContainer = styled.div<{ additionalStyles?: CSSObject }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  ${({ additionalStyles }) => additionalStyles}
`
