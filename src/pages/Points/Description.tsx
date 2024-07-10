import { Stack } from '@mui/material'
import { Button } from 'components'
import Modal from 'components/Modal'
import { useIsMobileDevice } from 'hooks/useIsMobileDevice'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

export const Description = () => {
  const { t } = useTranslation()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const isMobile = useIsMobileDevice()

  return (
    <>
      <DescriptionBox>
        <Title>{t('Points.howItWorks')}</Title>
        {isMobile ? (
          <>
            <Text>{t('Points.howItWorksShort')}</Text>
            <LearnMore onClick={() => setIsModalOpen(true)}>{t('Points.learnMore')}</LearnMore>
          </>
        ) : (
          <Text>
            {t('Points.howItWorksText1')}
            <br />
            <br />
            {t('Points.howItWorksText2')}
          </Text>
        )}
      </DescriptionBox>
      <Modal withCloseBtn={false} isOpenFlag={isModalOpen} onDismissHandler={() => setIsModalOpen(false)}>
        <Stack
          style={{
            padding: '0 0.5rem',
            gap: '1rem',
          }}
        >
          <Title
            style={{
              fontSize: '1.5rem',
            }}
          >
            {t('Points.howItWorks')}
          </Title>
          <Text>
            {t('Points.howItWorksText1')}
            <br />
            <br />
            {t('Points.howItWorksText2')}
          </Text>
        </Stack>
        <Button
          sx={{
            marginTop: '2rem',
          }}
          onClick={() => setIsModalOpen(false)}
        >
          {t('Points.close')}
        </Button>
      </Modal>
    </>
  )
}

const DescriptionBox = styled.div`
  border-radius: 2rem;
  background: ${({ theme }) => theme.white};
  display: flex;
  width: 32.6875rem;
  padding: 2.25rem 2rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;

  ${({ theme }) => theme.mediaWidth.upToTablet`
    width: 100%;
    gap: .75rem;

  `}
`
const Title = styled.h2`
  color: ${({ theme }) => theme.text100};
  font-size: 1.875rem;
  font-weight: 400;
  line-height: 120%; /* 2.25rem */
  letter-spacing: -0.01875rem;
  margin: 0;

  ${({ theme }) => theme.mediaWidth.upToTablet`
      color: ${({ theme }) => theme.text50};
      font-size: 1rem;
      text-transform: uppercase;
    `}
`
const Text = styled.p`
  color: ${({ theme }) => theme.text70};
  font-size: 1.375rem;
  font-weight: 400;
  line-height: 150%; /* 2.0625rem */
  margin: 0;

  ${({ theme }) => theme.mediaWidth.upToTablet`
      color: ${({ theme }) => theme.text100};
      font-size: 1.125rem;
      line-height: 120%; /* 1.35rem */
    `}
`
const LearnMore = styled.button`
  all: unset;
  color: ${({ theme }) => theme.blue};
  font-feature-settings: 'clig' off, 'liga' off;
  font-size: 1rem;
  font-weight: 400;
  line-height: 110%; /* 1.1rem */
  text-transform: uppercase;
`
