import { Row } from 'components'
import { animated } from 'react-spring'
import styled from 'styled-components'

export const RoundedButton = styled.button`
  border-radius: 2rem;
  background: ${({ theme }) => theme.lightBlue};
  border: 0;
  display: flex;
  justify-content: center;
  width: fit-content;
  aspect-ratio: 1;
  padding: 0.94rem;
  aspect-ratio: 1;
  align-items: center;
  cursor: pointer;
  ${({ theme }) => theme.mediaWidth.upToTablet`
  padding: 0.62rem;
  `}
`

export const Icon = styled.img`
  width: 1.75rem;
  height: 1.75rem;

  ${({ theme }) => theme.mediaWidth.upToTablet`
  width: 1.25rem;
  height: 1.25rem;
  `}
`

export const ToolsCard = styled(animated.div)`
  overflow: hidden;
  padding: 1.25rem 1rem;
  border-radius: 2rem;
  background-color: ${({ theme }) => theme.white};
  position: absolute;
  top: 0;
  gap: 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  left: calc(100% + 1.25rem);
  width: 100%;
`

export const HeaderRow = styled(Row)`
  gap: 0.75rem;
  align-items: flex-end;
`

export const BackBtn = styled.button`
  border-radius: 2rem;
  background: none;
  border: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  :hover > img {
    transform: scale(1.1);
  }
`

export const BackBtnArrow = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  transition: transform 0.3s;
`
export const Title = styled.h2`
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: 'Helvetica Neue', sans-serif;

  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
  line-height: 110%;
  margin: 0;
  min-width: 7.5625rem;
`

export const TextWrapper = styled.div`
  max-height: 20rem;
  overflow: hidden;
  ${({ theme }) => theme.mediaWidth.upToTablet`
  max-height: 100%;
  `};
`

export const Text = styled.p`
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 1.225rem */
  color: ${({ theme }) => theme.text70};
  margin: 0;
  margin-top: 1rem;
  min-width: 18.75rem;
  max-height: 7.5rem;

  ${({ theme }) => theme.mediaWidth.upToTablet`
  min-width: 100%;
  max-height: 100%;
  `};
`
