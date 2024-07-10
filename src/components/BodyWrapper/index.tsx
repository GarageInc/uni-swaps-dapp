import styled from 'styled-components'

export const BodyWrapper = styled.div`
  flex: 1;
  z-index: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1920px;
  min-height: 100%;
  padding: min(60px, 2%);

  ${({ theme }) => theme.mediaWidth.upToTablet`
    padding: 0rem;
  `}
`
