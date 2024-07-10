import { GradientBox } from 'components'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

const Container = styled(GradientBox)`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex: 1;
  width: 100%;
  padding: 11.59rem 14.94rem;
  margin-top: 2.5rem;
  column-gap: 6.25rem;
  ${({ theme }) => theme.mediaWidth.upToTablet`
  margin-top: 2rem;
  margin-left: 1rem;
  margin-right: 1rem;
  border-radius: 1.5rem;
  width: fit-content;
  padding: 5rem 1.5rem 5.06rem 1.5rem;
  flex-direction: column;
  row-gap: 5rem;
  `}
`

const Title = styled.h2`
  font-size: 1.75rem;
  line-height: 120%; /* 2.1rem */
  font-weight: 400;
  text-transform: uppercase;
  margin: 0;
  margin-bottom: 2.5rem;

  ${({ theme }) => theme.mediaWidth.upToTablet`
  font-size: 1.25rem;
  font-style: normal;
  margin-bottom: 1.5rem;
  `}
`

const Description = styled.p`
  font-size: 2rem;
  font-style: normal;
  font-weight: 300;
  line-height: 120%; /* 2.4rem */
  margin: 0;
  color: ${({ theme }) => theme.text70};

  ${({ theme }) => theme.mediaWidth.upToTablet`
  font-size: 1.25rem;
  font-style: normal;
  line-height: 130%; /* 1.625rem */
  `}
`

export const HomeInfo = () => {
  const { t } = useTranslation()

  return (
    <Container>
      <div>
        <Title>{t('Home.provideLiquidity')}</Title>
        <Description>{t('Home.provideLiquiditySubtext')}</Description>
      </div>
      <div>
        <Title>{t('Home.swap')}</Title>
        <Description>{t('Home.swapSubtext')}</Description>
      </div>
    </Container>
  )
}
