// import MockVideo from './assets/mock_video.mp4'
import { Fancybox } from '@fancyapps/ui'
import { Stack } from '@mui/material'
import { FlexContainer } from 'components'
import { useIsMobileDevice } from 'hooks/useIsMobileDevice'
import i18n from 'i18n'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import PlayIcon from './assets/play.svg'
// preview
import PreviewEngStep1 from './assets/Step1-eng.png'
import PreviewEngMobStep1 from './assets/Step1-mob-eng.png'
import PreviewVietMobStep1 from './assets/Step1-mob-viet.png'
import PreviewVietStep1 from './assets/Step1-viet.png'
import PreviewEngStep2 from './assets/Step2-eng.png'
import PreviewEngMobStep2 from './assets/Step2-mob-eng.png'
import PreviewVietMobStep2 from './assets/Step2-mob-viet.png'
import PreviewVietStep2 from './assets/Step2-viet.png'
import PreviewEngStep3 from './assets/Step3-eng.png'
import PreviewEngMobStep3 from './assets/Step3-mob-eng.png'
import PreviewVietMobStep3 from './assets/Step3-mob-viet.png'
import PreviewVietStep3 from './assets/Step3-viet.png'
import PreviewEngStep4 from './assets/Step4-eng.png'
import PreviewEngMobStep4 from './assets/Step4-mob-eng.png'
import PreviewVietMobStep4 from './assets/Step4-mob-viet.png'
import PreviewVietStep4 from './assets/Step4-viet.png'

interface IGuide {
  text: string
  videoDesktop: string
  videoPhone: string
  preview: string
  previewMobile?: string
}

const Title = styled.h2`
  font-size: 2.8125rem;
  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 3.375rem */
  letter-spacing: -0.02813rem;
  margin: 0;

  ${({ theme }) => theme.mediaWidth.upToTablet`
    font-size: 2.1875rem;
  `};
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  row-gap: 2.5rem;
  margin-top: 2.5rem;

  ${({ theme }) => theme.mediaWidth.upToTablet`
    grid-template-columns: 1fr;
    margin-top: 1.5rem;
  `};
`

const GuideVideo = styled.div`
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 2rem;
  cursor: pointer;

  ${({ theme }) => theme.mediaWidth.upToTablet`
    border-radius: 1rem;
    aspect-ratio: 22.5 / 27.8;
  `};

  img,
  video {
    position: absolute;
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: top;
  }
`

const PlayBtn = styled.div`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 100%) no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    width: 4.5rem;
    aspect-ratio: 1;
    padding: 0;
    border: none;
    background: none;
    cursor: pointer;
  }

  img {
    height: 100%;
    width: 100%;
  }
`

const GuideText = styled.p`
  color: var(--TEXT-100, #434647);
  font-size: 1.375rem;
  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 1.65rem */
  margin: 0;
  margin-top: 1.5rem;

  ${({ theme }) => theme.mediaWidth.upToTablet`
    font-size: 1.375rem;
    margin-top: .75rem;
  `};
`

export const VideoGuides = (style: React.CSSProperties = {}) => {
  const { t } = useTranslation()
  const isMobile = useIsMobileDevice()
  const isVietnamese = i18n.language === 'vi'

  const GUIDES_ENG: IGuide[] = useMemo(
    () => [
      {
        text: t('TokenSale.Step1'),
        videoDesktop: '/video-guides/Step1-eng.mp4',
        videoPhone: '/video-guides/Step1-eng-phone.mp4',
        preview: PreviewEngStep1,
        previewMobile: PreviewEngMobStep1,
      },
      {
        text: t('TokenSale.Step2'),
        videoDesktop: '/video-guides/Step2-eng.mp4',
        videoPhone: '/video-guides/Step2-eng-phone.mp4',
        preview: PreviewEngStep2,
        previewMobile: PreviewEngMobStep2,
      },
      {
        text: t('TokenSale.Step3'),
        videoDesktop: '/video-guides/Step3-eng.mp4',
        videoPhone: '/video-guides/Step3-eng-phone.mp4',
        preview: PreviewEngStep3,
        previewMobile: PreviewEngMobStep3,
      },
      {
        text: t('TokenSale.Step4'),
        videoDesktop: '/video-guides/Step4-eng.mp4',
        videoPhone: '/video-guides/Step4-eng-phone.mp4',
        preview: PreviewEngStep4,
        previewMobile: PreviewEngMobStep4,
      },
    ],
    [t]
  )
  const GUIDES_VIET: IGuide[] = useMemo(
    () => [
      {
        text: t('TokenSale.Step1'),
        videoDesktop: '/video-guides/Step1-viet.mp4',
        videoPhone: '/video-guides/Step1-viet-phone.mp4',
        preview: PreviewVietStep1,
        previewMobile: PreviewVietMobStep1,
      },
      {
        text: t('TokenSale.Step2'),
        videoDesktop: '/video-guides/Step2-viet.mp4',
        videoPhone: '/video-guides/Step2-viet-phone.mp4',
        preview: PreviewVietStep2,
        previewMobile: PreviewVietMobStep2,
      },
      {
        text: t('TokenSale.Step3'),
        videoDesktop: '/video-guides/Step3-viet.mp4',
        videoPhone: '/video-guides/Step3-viet-phone.mp4',
        preview: PreviewVietStep3,
        previewMobile: PreviewVietMobStep3,
      },
      {
        text: t('TokenSale.Step4'),
        videoDesktop: '/video-guides/Step4-viet.mp4',
        videoPhone: '/video-guides/Step4-viet-phone.mp4',
        preview: PreviewVietStep4,
        previewMobile: PreviewVietMobStep4,
      },
    ],
    [t]
  )
  const [currentGuide, setCurrentGuide] = useState<IGuide[]>(GUIDES_ENG)
  useEffect(() => {
    if (isVietnamese) {
      setCurrentGuide(GUIDES_VIET)
      return
    }
    setCurrentGuide(GUIDES_ENG)
  }, [GUIDES_ENG, GUIDES_VIET, isVietnamese])

  const onGuideClick = (index: number) => {
    const fancyBoxArray = currentGuide.map(({ videoDesktop, videoPhone, preview, previewMobile }) => {
      const src = isMobile ? videoPhone : videoDesktop
      return { src, thumb: isMobile ? previewMobile : preview }
    })
    Fancybox.show(fancyBoxArray, {
      startIndex: index,
      mainClass: 'token-sale-fancybox',
    })
  }

  return (
    <div
      style={{
        width: '100%',
        ...style,
      }}
    >
      <Title>{t('TokenSale.LearnHow')}</Title>
      <Grid>
        {currentGuide.map((guide, idx) => (
          <Guide key={idx} data={guide} step={idx + 1} onGuideClick={() => onGuideClick(idx)} />
        ))}
      </Grid>
      <div id="token_sale_guides" />
    </div>
  )
}

const Guide = ({
  data: { text, videoPhone: video, preview, previewMobile },
  step,
  onGuideClick,
}: {
  data: IGuide
  step: number
  onGuideClick?: any
}) => {
  const { t } = useTranslation()
  const isMobile = useIsMobileDevice()

  return (
    <Stack direction="column">
      <GuideVideo onClick={onGuideClick}>
        <img src={isMobile ? previewMobile : preview} alt="" />
        <FlexContainer
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', justifyContent: 'center' }}
        >
          <img src={PlayIcon} alt="Play" style={{ width: '5rem', height: '5rem' }} />
        </FlexContainer>
      </GuideVideo>
      <GuideText>
        {t('TokenSale.Step')} {step}: {text}
      </GuideText>
    </Stack>
  )
}
