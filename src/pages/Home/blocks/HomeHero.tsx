import { Button, FlexContainer, GradientBox, OutlinedButton } from 'components'
import Header from 'components/Header/Header'
import { useIsMobileDevice } from 'hooks/useIsMobileDevice'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import MainPageHeroImgPng from '../../../assets/images/main-page-hero.png'
import MainPageHeroImg from '../../../assets/images/main-page-hero.webp'

const HeroBox = styled(GradientBox)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  width: 100%;
  padding: 3.25rem 0 0;
  ${({ theme }) => theme.mediaWidth.upToTablet`
  border-radius: 0px;
  background: none;
  padding: 1rem 0 0;
  `}
`

const HeaderContainer = styled.div`
  padding: 0px 6.25rem;
  width: 100%;
  ${({ theme }) => theme.mediaWidth.upToTablet`
  padding: 0px 1rem;
  `}
`

const HeroImg = styled.picture`
  max-width: 45%;
  filter: grayscale(1);

  img {
    width: 100%;
  }
`

const HeroLeft = styled.div<{
  desktopPaddingTop?: string
}>`
  padding-left: 6.25rem;
  padding-top: ${({ desktopPaddingTop }) => desktopPaddingTop};
  ${({ theme }) => theme.mediaWidth.upToTablet`
  padding: 0px;
  margin-top: 8.69rem;
  width: 100%;
  padding: 0 1rem;
  gap: 0px;
  & button {
    width: 100%;
    height: 3.25rem;
    font-size: 1.0625rem;
    font-style: normal;
    font-weight: 400;
    line-height: 120%; /* 1.275rem */
    }
  }
  `}
`

const HeroText = styled.h1`
  font-size: 4.375rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.04375rem;
  margin: 0;
  ${({ theme }) => theme.mediaWidth.upToPhone`
  font-size: 3.125rem;
  letter-spacing: -0.03125rem;
  `}
`

const HeroSubText = styled.p`
  color: ${({ theme }) => theme.text60};
  font-family: 'Helvetica Neue', sans-serif;

  font-size: 1.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 2.1rem */
  text-transform: uppercase;
  margin-top: 1.5rem;
  margin-bottom: 0;
  ${({ theme }) => theme.mediaWidth.upToPhone`
  font-size: 1.25rem;
  `}
`

export const HomeHero = () => {
  const isMobile = useIsMobileDevice()
  return isMobile ? <MobileHomeHero /> : <DesktopHomeHero />
}

export const DesktopHomeHero = () => {
  const { t, i18n } = useTranslation()

  const isVietnamese = i18n.language === 'vi'

  const nav = useNavigate()

  return (
    <HeroBox>
      <HeaderContainer>
        <Header />
      </HeaderContainer>
      <FlexContainer
        additionalStyles={{
          marginTop: 134,
          alignItems: 'flex-start',
          minHeight: '41.4rem',
        }}
      >
        <HeroLeft desktopPaddingTop={isVietnamese ? '4.44rem' : '6.31rem'}>
          <HeroText>
            {t('Home.mainText')}
            <HeroSubText>{t('Home.heroSubtext')}</HeroSubText>
          </HeroText>
          <FlexContainer
            additionalStyles={{
              justifyContent: 'flex-start',
              columnGap: '1.5rem',
              marginTop: '3.5rem',
            }}
          >
            <Button
              onClick={() => {
                nav('/swap')
              }}
              size="large"
            >
              {t('Home.getStarted')}
            </Button>
            <OutlinedButton
              onClick={() => {
                nav('/token-sale')
              }}
            >
              {t('Home.tokenSale')}
            </OutlinedButton>
          </FlexContainer>
        </HeroLeft>
        <HeroImg>
          <source srcSet={MainPageHeroImg} type="image/webp" />
          <source srcSet={MainPageHeroImgPng} type="image/png" />
          <img src={MainPageHeroImgPng} alt="" />
        </HeroImg>
      </FlexContainer>
    </HeroBox>
  )
}

export const MobileHomeHero = () => {
  const { t } = useTranslation()

  const nav = useNavigate()

  return (
    <HeroBox>
      <HeaderContainer>
        <Header />
      </HeaderContainer>
      <HeroLeft>
        <HeroText>
          {t('Home.mainText')}
          <HeroSubText>{t('Home.heroSubtext')}</HeroSubText>
        </HeroText>
        <FlexContainer
          additionalStyles={{
            flexDirection: 'column',
            gap: '0.5rem',
            marginTop: '11.56rem',
          }}
        >
          <Button
            onClick={() => {
              nav('/swap')
            }}
            size="large"
          >
            {t('Home.getStarted')}
          </Button>
          <OutlinedButton
            onClick={() => {
              nav('/token-sale')
            }}
          >
            {t('Home.tokenSale')}
          </OutlinedButton>
        </FlexContainer>
      </HeroLeft>
    </HeroBox>
  )
}
