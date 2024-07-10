import { Button, GradientBox } from 'components'
import { useMenu } from 'constants/menu'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import HeroBannerSrc from '../../../assets/images/HeroBanner.png'

const Container = styled(GradientBox)`
  background: linear-gradient(90deg, #fff3e9 -5.37%, #e2f1ff 109.61%);
  margin-top: 2.5rem;
  text-align: center;
  padding: 13.12rem 5rem 8.38rem;
  position: relative;
  transform: translateZ(0);
  overflow: hidden;
  ${({ theme }) => theme.mediaWidth.upToTablet`
  border-radius: 1.5rem;
  min-width: 2.5rem;
  margin-top: 2rem;
  margin-left: 1rem;
  margin-right: 1rem;
  padding: 11.25rem 1rem 8.13rem 1rem;
  `}
`

const Bg = styled.img`
  position: absolute;
  z-index: -1;
  height: 100%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.1;
`

const Title = styled.h2`
  font-size: 4.375rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.04375rem;
  margin: 0;

  ${({ theme }) => theme.mediaWidth.upToTablet`
  text-align: center;
  font-size: 3.125rem;
  font-style: normal;
  letter-spacing: -0.03125rem;
  `}
  ${({ theme }) => theme.mediaWidth.upToPhone`
  padding: 0 0.5rem
  `}
`

const Description = styled.p`
  font-size: 1.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 2.1rem */
  text-transform: uppercase;
  margin-top: 1.5rem;
  margin-bottom: 0;

  ${({ theme }) => theme.mediaWidth.upToTablet`
  font-size: 1.25rem;
  `}
`

const StyledButton = styled(Button)`
  margin-top: 3.5rem;
  ${({ theme }) => theme.mediaWidth.upToPhone`
  font-size: 1.25rem;
  width: 100%;
  `}
`

export const HomeBanner = () => {
  const { t, i18n } = useTranslation()

  const menu = useMenu()

  return (
    <Container>
      <Bg src={HeroBannerSrc} alt="banner" />
      <Title>{t('Home.wannaBuild')}</Title>
      <Description>{t('Home.letsBuild')}</Description>
      <StyledButton onClick={() => (window.location.href = menu.docs.href)}>{t('Home.openDocs')}</StyledButton>
    </Container>
  )
}
