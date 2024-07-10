import { CardCentered } from 'components'
import styled from 'styled-components'

export const PageWrapper = styled.div`
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;

  ${({ theme }) => theme.mediaWidth.upToTablet`
    margin: 3rem auto;
  `};
`

export const Container = styled.div`
  max-width: 64rem;
  width: 100%;

  ${({ theme }) => theme.mediaWidth.upToTablet`
    max-width: 100%;
  `};
`

export const Card = styled(CardCentered)`
  padding: 2rem 1.5rem;
  margin: 0;

  ${({ theme }) => theme.mediaWidth.upToTablet`
    padding: 1.5rem 1rem;
    min-width: 0;
  `};
`

export const Title = styled.h2`
  font-size: 1.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 2.25rem */
  letter-spacing: -0.01875rem;
  margin: 0;
  margin-bottom: 1.5rem;

  ${({ theme }) => theme.mediaWidth.upToTablet`
    font-size: 1.5rem;
    margin-bottom: 1rem;
  `};
`

export const PageTitle = styled.h1`
  font-size: 2.1875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 2.625rem */
  letter-spacing: -0.02188rem;
  margin: 0;
  text-align: left;
  width: 100%;
  margin-bottom: 1rem;
`

export const SubTitle = styled.h3`
  color: ${({ theme }) => theme.text60};
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  margin: 0;
  margin-bottom: 1.25rem;

  ${({ theme }) => theme.mediaWidth.upToTablet`
    margin-bottom: 1rem;
  `};
`
